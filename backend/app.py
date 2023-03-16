from flask import Flask, render_template, request, redirect, session, g, url_for, jsonify, flash
import secrets
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps


secret_key = secrets.token_hex(16)

app = Flask(__name__)
app.secret_key = secret_key
app.config['JSON_SORT_KEYS'] = False

# Configuration for first database
app.config['USERDB_NAME'] = 'users.db'
app.config['USER_DB_CONNECTION'] = None

# Configuration for second database
app.config['DB_NAME'] = 'hack-database.db'
app.config['DB_CONNECTION'] = None


def get_user_db():
    db = getattr(g, '_userdatabase', None)
    if db is None:
        db = g._userdatabase = sqlite3.connect(app.config['USERDB_NAME'])
        db.row_factory = sqlite3.Row
    return db

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(app.config['DB_NAME'])
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_db(error):
    db = getattr(g, '_userdatabase', None)
    if db is not None:
        db.close()
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_user_db()
        user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        if user is None:
            return render_template('login.html', error='Invalid login')
        if check_password_hash(user['password'], password):
            session['logged_in'] = True
            return redirect('/')
        else:
            return render_template('login.html', error='Invalid login')
    return render_template('login.html')
    
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function


@app.route('/stores/<int:store_id>/edit', methods=['GET', 'POST'])
def edit_store(store_id):
    db = get_db()
    store = db.execute('SELECT * FROM stores JOIN addresses ON stores.address_id = addresses.address_id WHERE store_id = ?', (store_id,)).fetchone()
    if request.method == 'POST':
        # print(request.form.to_dict())
        store_name = request.form['store_name']
        street_number = request.form['street_number']
        street_name = request.form['street_name']
        city = request.form['city']
        state = request.form['state']
        zip_code = request.form['zip_code']
        country = request.form['country']
        db.execute('UPDATE stores SET store_name = ? WHERE store_id = ?', (store_name, store_id))
        db.execute('UPDATE addresses SET street_number = ?, street_name = ?, city = ?, state = ?, zip_code = ?, country = ? WHERE address_id = (SELECT address_id FROM stores WHERE store_id = ?)', (street_number, street_name, city, state, zip_code, country, store_id))
        db.commit()
        return redirect(url_for('stores'))
    return render_template('edit-store.html', store=store, store_id=store_id)


@app.route('/view-accessibility-features/<int:store_id>', methods=['GET', 'POST'])
def view_accessibility_features(store_id):
    db = get_db()
    store_features = db.execute('''
    SELECT feature_name
    FROM accessibility_features
    JOIN store_accessibility_features
    ON accessibility_features.feature_id = store_accessibility_features.feature_id
    WHERE store_accessibility_features.store_id = ?
''', (store_id,)).fetchall()
    store_name = db.execute('''
    SELECT store_name from stores where store_id = ?
''', (store_id,)).fetchone()[0]
    return render_template('view-accessibility_features.html', store_features=store_features, store_name=store_name, store_id=store_id)

@app.route('/stores/<int:store_id>/features', methods=['GET', 'POST'])
def edit_store_features(store_id):
    db = get_db()
    store = db.execute('SELECT * FROM stores WHERE store_id = ?', (store_id,)).fetchone()
    features = db.execute('SELECT af.feature_id, af.feature_name, af.addressed_disability FROM accessibility_features af JOIN store_accessibility_features saf ON af.feature_id = saf.feature_id WHERE saf.store_id = ?', (store_id,)).fetchall()
    all_features = db.execute('SELECT feature_id, feature_name, addressed_disability FROM accessibility_features').fetchall()

    if request.method == 'POST':
        # Get list of feature IDs checked in form
        checked_features = request.form.getlist('feature')
        # Delete all existing store_accessibility_features records for this store
        db.execute('DELETE FROM store_accessibility_features WHERE store_id = ?', (store_id,))
        # Insert new records for checked features
        for feature_id in checked_features:
            db.execute('INSERT INTO store_accessibility_features (store_id, feature_id) VALUES (?, ?)', (store_id, feature_id))
        db.commit()
        return redirect(url_for('view_accessibility_features', store_id=store_id))

    return render_template('edit-store-features.html', store=store, features=features, all_features=all_features)


@app.route('/stores/<int:store_id>/employees')
def view_store_employees(store_id):
    db = get_db()
    store = db.execute('SELECT * FROM stores WHERE store_id = ?', (store_id,)).fetchone()
    employees = db.execute('SELECT * FROM employees WHERE employee_id IN (SELECT employee_id FROM store_employees WHERE store_id = ?)', (store_id,)).fetchall()
    return render_template('view-store-employees.html', store=store, employees=employees)
    
@app.route('/stores/<int:store_id>/employees/<int:employee_id>/edit', methods=['GET', 'POST'])
def edit_employee(store_id, employee_id):
    db = get_db()
    store = db.execute('SELECT * FROM stores WHERE store_id = ?', (store_id,)).fetchone()
    employee = db.execute('SELECT * FROM employees WHERE employee_id = ?', (employee_id,)).fetchone()
    disabilities = db.execute('SELECT * FROM disability_types').fetchall()

    if request.method == 'POST':
        # update employee record in database
        employee_firstname = request.form['employee_firstname']
        employee_lastname = request.form['employee_lastname']
        employee_disability = request.form['employee_disability']
        employee_disability_skill = request.form['employee_disability_skill']
        db.execute('UPDATE employees SET employee_firstname=?, employee_lastname=?, employee_disability=?, employee_disability_skill=? WHERE employee_id=?', (employee_firstname, employee_lastname, employee_disability, employee_disability_skill, employee_id))
        db.commit()
        flash('Employee information updated successfully.')
        return redirect(url_for('view_store_employees', store_id=store_id))

    return render_template('edit-employee.html', store=store, employee=employee, disabilities=disabilities)

@app.route('/stores/<int:store_id>/employees/<int:employee_id>/schedule')
def view_employee_schedule(store_id, employee_id):
    db = get_db()
    store = db.execute('SELECT * FROM stores WHERE store_id = ?', (store_id,)).fetchone()
    employee = db.execute('SELECT * FROM employees WHERE employee_id = ?', (employee_id,)).fetchone()
    schedule = db.execute('SELECT * FROM employee_schedule WHERE employee_id = ?', (employee_id,)).fetchall()
    return render_template('employee-schedule.html', store=store, employee=employee, schedule=schedule)


@app.route('/stores/<int:store_id>/employees/<int:employee_id>/schedule/edit', methods=['GET', 'POST'])
def edit_employee_schedule(store_id, employee_id):
    db = get_db()
    store = db.execute('SELECT * FROM stores WHERE store_id = ?', (store_id,)).fetchone()
    employee = db.execute('SELECT * FROM employees WHERE employee_id = ?', (employee_id,)).fetchone()
    schedule = db.execute('SELECT schedule_id, day_of_week, start_time, end_time FROM employee_schedule WHERE employee_id = ?', (employee_id,)).fetchall()

    if request.method == 'POST':
        for item in schedule:
            day_of_week = item['day_of_week']
            start_hour = request.form[str(item[0]) + '-start_hour']
            start_min = request.form[str(item[0]) + '-start_min']
            start_time = datetime.time(int(start_hour), int(start_min))
            end_hour = request.form[str(item[0]) + '-end_hour']
            end_min = request.form[str(item[0]) + '-end_min']
            end_time = datetime.time(int(end_hour), int(end_min))
            db.execute('UPDATE employee_schedule SET start_time = ?, end_time = ? WHERE employee_id = ? AND day_of_week = ?', (start_time, end_time, employee_id, day_of_week))
        db.commit()
        flash('Schedule updated successfully.')
        return redirect(url_for('view_employee_schedule', store_id=store_id, employee_id=employee_id))
        
    return render_template('edit-employee-schedule.html', store=store, employee=employee, schedule=schedule)



@app.route('/api/stores/search')
def search_stores():
    zip_code = request.args.get('zip')
    if not zip_code:
        return jsonify({'error': 'Zip code is required.'}), 400

    db = get_db()
    stores = db.execute('SELECT * FROM stores JOIN addresses ON stores.address_id = addresses.address_id WHERE addresses.zip_code = ?', (zip_code,)).fetchall()
    
    store_list = []
    for store in stores:
        features = db.execute('SELECT af.feature_id, af.feature_name, dt.disability_type_name, dt.disability_type_description FROM accessibility_features af JOIN disability_types dt ON af.addressed_disability = dt.disability_type_id WHERE af.feature_id IN (SELECT feature_id FROM store_accessibility_features WHERE store_id = ?)', (store['store_id'],)).fetchall()
        features_list = [{'feature_name': feature['feature_name'], 'disability_type_name': feature['disability_type_name'], 'disability_type_description': feature['disability_type_description']} for feature in features]
        
        employees = db.execute('SELECT employees.employee_id, employee_disabilities.disability_description FROM employees JOIN employee_disabilities ON employees.employee_id = employee_disabilities.employee_id JOIN store_employees ON employees.employee_id = store_employees.employee_id WHERE store_employees.store_id = ?', (store['store_id'],)).fetchall()
        
        employees_list = []
        for employee in employees:
            employee_dict = {'disability_description': employee['disability_description']}
            employees_list.append(employee_dict)
        
        disability_set = set((d['disability_description'],) for d in employees_list)
        employees_list = [{'disability_description': d[0]} for d in disability_set]
        
        
        store_dict = {'store_id': store['store_id'],
                      'store_name': store['store_name'],
                      'address': {'street_name': store['street_name'],
                                  'street_number': store['street_number'],
                                  'city': store['city'],
                                  'state': store['state'],
                                  'zip_code': store['zip_code'],
                                  'country': store['country'],
                                  'latitude': store['latitude'],
                                  'longitude': store['longitude']},
                      'accessibility_features': features_list,
                      'employee_disabilities': employees_list
                      }
        store_list.append(store_dict)

    return jsonify(store_list)


def sort_keys_func(key):
    key_order = ['store_id', 'store_name', 'address', 'accessibility_features']
    if key == 'accessibility_features':
        return [key_order.index(key), lambda f: (f['feature_name'], f['disability_type_name'], f['disability_type_description'])]
    elif key in key_order:
        return key_order.index(key)
    else:
        return len(key_order)


@app.route('/')
@login_required
def index():
    return redirect(url_for('stores'))


@app.route('/stores')
@login_required
def stores():
    db = get_db()
    stores = db.execute("SELECT s.store_id, s.store_name, a.street_number, a.street_name, a.city, a.state, a.zip_code, a.country FROM stores s JOIN addresses a ON s.address_id = a.address_id;").fetchall()
    return render_template('stores.html', stores=stores)

if __name__ == '__main__':
    app.run(debug=True)
