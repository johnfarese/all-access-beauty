CREATE TABLE addresses (
    address_id INTEGER PRIMARY KEY AUTOINCREMENT,
    street_name TEXT,
    street_number TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    country TEXT,
    latitude REAL,
    longitude REAL
);

CREATE TABLE disability_types (
    disability_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    disability_type_name TEXT,
    disability_type_description TEXT
);

CREATE TABLE accessibility_features (
    feature_id INTEGER PRIMARY KEY AUTOINCREMENT,
    feature_name TEXT,
    addressed_disability INTEGER,
    FOREIGN KEY (addressed_disability) REFERENCES disability_types(disability_type_id)
);

CREATE TABLE contacts (
    contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_type TEXT,
    contact_details TEXT
);

CREATE TABLE stores (
    store_id INTEGER PRIMARY KEY AUTOINCREMENT,
    store_name TEXT,
    store_logo TEXT,
    address_id INTEGER,
    FOREIGN KEY (address_id) REFERENCES addresses(address_id)
);

CREATE TABLE store_accessibility_features (
    store_id INTEGER,
    feature_id INTEGER,
    PRIMARY KEY (store_id, feature_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id),
    FOREIGN KEY (feature_id) REFERENCES accessibility_features(feature_id)
);

CREATE TABLE store_contacts (
    store_id INTEGER,
    contact_id INTEGER,
    PRIMARY KEY (store_id, contact_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id),
    FOREIGN KEY (contact_id) REFERENCES contacts(contact_id)
);

CREATE TABLE employees (
    employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_firstname TEXT,
    employee_lastname TEXT,
    employee_disability TEXT,
    employee_disability_skill TEXT
);

CREATE TABLE store_employees (
    store_id INTEGER,
    employee_id INTEGER,
    PRIMARY KEY (store_id, employee_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE employee_disabilities (
    employee_id INTEGER,
    disability_description TEXT,
    disability_type INTEGER,
    PRIMARY KEY (employee_id, disability_description, disability_type),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (disability_type) REFERENCES disability_types(disability_type_id)
);

CREATE TABLE employee_schedule (
    schedule_id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER,
    start_time TEXT,
    end_time TEXT,
    day_of_week TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE store_employee_schedule (
    store_id INTEGER,
    schedule_id INTEGER,
    PRIMARY KEY (store_id, schedule_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id),
    FOREIGN KEY (schedule_id) REFERENCES employee_schedule(schedule_id)
);

