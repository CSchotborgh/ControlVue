<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Authentication Example</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
    <div id="app">
        <h1>User Authentication Example</h1>
        <pre>{{ codeExample }}</pre>
    </div>

    <script>
        const app = Vue.createApp({
            data() {
                return {
                    codeExample: JSON.stringify({
                        sqlSchema: `
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`,
                        registerUser: `
function register_user(username, password, email):
    salt = generate_random_salt()
    password_hash = strong_hash_function(password + salt)

    sql = "INSERT INTO users (username, password_hash, salt, email) VALUES (?, ?, ?, ?)"
    execute_sql(sql, [username, password_hash, salt, email])`,
                        verifyPassword: `
function verify_password(username, password):
    sql = "SELECT password_hash, salt FROM users WHERE username = ?"
    result = execute_sql(sql, [username])

    if result is empty:
        return false

    stored_hash = result.password_hash
    salt = result.salt

    calculated_hash = strong_hash_function(password + salt)

    return calculated_hash == stored_hash`
                    }, null, 2)
                }
            }
        });

        app.mount('#app');
    </script>

<script>
    /* Never store passwords in plain text. Always hash passwords before storing them.
    Use a strong, modern hashing algorithm like bcrypt, Argon2, or PBKDF2.
    Use unique salts for each password to prevent rainbow table attacks.
    Store the hashed password and salt, not the original password.
    Here's an example schema for storing login credentials securely: */
  
    sql
    CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        salt VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
/*pseudocode example of the process:*/
      
      function register_user(username, password, email):
          salt = generate_random_salt()
          password_hash = strong_hash_function(password + salt)

          sql = "INSERT INTO users (username, password_hash, salt, email) VALUES (?, ?, ?, ?)"
          execute_sql(sql, [username, password_hash, salt, email])

      function verify_password(username, password):
          sql = "SELECT password_hash, salt FROM users WHERE username = ?"
          result = execute_sql(sql, [username])

          if result is empty:
              return false

          stored_hash = result.password_hash
          salt = result.salt

          calculated_hash = strong_hash_function(password + salt)

          return calculated_hash == stored_hash
    </script>
    </body>
    </html>