from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3



# Create a connection to the database
conn = sqlite3.connect('users.db')

# Create a cursor to execute SQL commands
c = conn.cursor()

password = 'passssap'
hashed_password = generate_password_hash(password)

# Insert a new user
c.execute("INSERT INTO users (username, password) VALUES (?, ?)", 
          ('admin', hashed_password))

conn.commit()
conn.close()