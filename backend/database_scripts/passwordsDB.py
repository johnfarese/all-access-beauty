import sqlite3


# Create a connection to the database
conn = sqlite3.connect('users.db')

# Create a cursor to execute SQL commands
c = conn.cursor()

# Create the users table if it doesn't exist
c.execute('''CREATE TABLE IF NOT EXISTS users
             (id INTEGER PRIMARY KEY AUTOINCREMENT, 
              username TEXT UNIQUE NOT NULL, 
              password TEXT NOT NULL)''')



# Commit changes and close the connection
conn.commit()
conn.close()