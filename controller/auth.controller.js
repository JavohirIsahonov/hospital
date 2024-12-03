const db = require("../db/database");

const registerUser = (req, res) => {
  const { username, email, password, phone, type } = req.body;

  if (!username || !email || !password || !type) {
    return res.status(400).send("Barcha maydonlar to'ldirilishi shart.");
  }

  if (type !== "patient" && type !== "doctor") {
    return res.status(400).send("Noto'g'ri type kiritildi type patient yoki doctor bo'lishi kerak.");
  }

  const query = `
    INSERT INTO users (username, email, password, phone, type)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [username, email, password, phone || null, type], (err) => {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return res.status(400).send("Bu email mavjud.");
      }
      console.error("Foydalanuvchini ro'yxatdan o'tkazishda xato:", err.message);
      return res.status(500).send("Server xatosi.");
    }
    res.status(201).send("Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tkazildi.");
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email va parol kiritilishi shart.");
  }

  const query = `
    SELECT * FROM users WHERE email = ? AND password = ?
  `;

  db.get(query, [email, password], (err, user) => {
    if (err) {
      console.error("Tizimga kirishda xato:", err.message);
      return res.status(500).send("Server xatosi.");
    }

    if (!user) {
      return res.status(400).send("Email yoki parol noto'g'ri.");
    }

    res.status(200).send(`Xush kelibsiz, ${user.username} siz ${user.type} sifatida tizimga kirdingiz.`);
  });
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Foydalanuvchi id si kiritilishi shart.");
  }

  const query = `DELETE FROM users WHERE id = ?`;

  db.run(query, [id], (err) => {
    if (err) {
      console.error("Foydalanuvchini o'chirishda xato:", err.message);
      return res.status(500).send("Server xatosi.");
    }

    res.status(200).send(`id si ${id} bo'lgan foydalanuvchi o'chirildi.`);
  });
};

const allUsers = async (req, res) => {
  const query = `
    SELECT id, username, email, phone, type, created_at, updated_at FROM users
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Foydalanuvchilarni olishda xato:", err.message);
      return res.status(500).send("Server xatosi.");
    }

    res.status(200).json(rows);
  });
};

module.exports = {
  registerUser,
  loginUser,
  deleteUserById,
  allUsers,
};
