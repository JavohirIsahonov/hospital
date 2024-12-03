const sqlite = require("sqlite3");
const path = require("path");

// Ma'lumotlar bazasi fayliga yo‘l
const dbPath = path.resolve(__dirname, "user.db");

// Ma'lumotlar bazasiga ulanish
const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
    return;
  }
  console.log("Database connected!");
});

// `users` jadvalini yaratish
const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        phone TEXT,
        type TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`;


const createHospitalsTable = `
    CREATE TABLE IF NOT EXISTS hospitals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (doctor_id) REFERENCES users (id)
    )
`;

db.run(createHospitalsTable, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Table 'hospitals' created successfully");
  }
});

// Jadvalni yaratish
db.run(createUserTable, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Table 'users' created successfully");
  }
});

// Eksport qilib qo'yish (kelajakda foydalanish uchun)
module.exports = db;
