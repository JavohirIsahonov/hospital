const db = require("../db/database");

const createHospital = (req, res) => {
  const { user_id, doctor_id, description } = req.body;

  if (!user_id || !doctor_id) {
    return res.status(400).send("Foydalanuvchi id si va Doktor id si kiritilishi shart.");
  }

  // Doktor ID sini tekshirish
  const checkDoctor = `
    SELECT * FROM users WHERE id = ? AND type = 'doctor'
  `;

  db.get(checkDoctor, [doctor_id], (err, doctor) => {
    if (err) {
      console.error("Doktor id sini tekshirishda xato:", err.message);
      return res.status(500).send("Server xatosi.");
    }

    if (!doctor) {
      return res.status(404).send("Doktor topilmadi. Noto'g'ri doktor ID.");
    }

    const query = `
      INSERT INTO hospitals (user_id, doctor_id, description)
      VALUES (?, ?, ?)
    `;

    db.run(query, [user_id, doctor_id, description || null], (err) => {
      if (err) {
        console.error("Shifoxona yozuvini yaratishda xato:", err.message);
        return res.status(500).send("Server xatosi.");
      }
      res.status(201).send("Shifoxona yozuvi muvaffaqiyatli yaratildi.");
    });
  });
};

const getAllHospitals = (req, res) => {
  const query = `
    SELECT * FROM hospitals
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Barcha shifoxona yozuvlarini olishda xato:", err.message);
      return res.status(500).send("Server xatosi.");
    }

    res.status(200).json(rows);
  });
};

const getUserHospitals = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).send("Foydalanuvchi id si kiritilishi shart.");
  }

  const query = `
    SELECT * FROM hospitals WHERE user_id = ?
  `;

  db.all(query, [user_id], (err, rows) => {
    if (err) {
      console.error("Shifoxona yozuvlarini olishda xato:", err.message);
      return res.status(500).send("Server xatosi.");
    }

    res.status(200).json(rows);
  });
};

const getHospitalById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Shifoxona id si kiritilishi shart.");
  }

  const query = `
    SELECT * FROM hospitals WHERE id = ?
  `;

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error("Shifoxona yozuvini olishda xato:", err.message);
      return res.status(500).send("Server xatosi.");
    }

    if (!row) {
      return res.status(404).send("Shifoxona yozuvi topilmadi.");
    }

    res.status(200).json(row);
  });
};

const updateHospital = (req, res) => {
  const { id } = req.params;
  const { user_id, doctor_id, description } = req.body;

  if (!id || !user_id || !doctor_id) {
    return res.status(400).send("Barcha maydonlar to'ldirilishi shart.");
  }

  const query = `
    UPDATE hospitals
    SET user_id = ?, doctor_id = ?, description = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [user_id, doctor_id, description || null, id], (err) => {
    if (err) {
      console.error("Shifoxona yozuvini yangilashda xato:", err.message);
      return res.status(500).send("Server xatosi.");
    }

    res.status(200).send("Shifoxona yozuvi muvaffaqiyatli yangilandi.");
  });
};

const deleteHospital = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Shifoxona id si kiritilishi shart.");
  }

  const query = `
    DELETE FROM hospitals WHERE id = ?
  `;

  db.run(query, [id], (err) => {
    if (err) {
      console.error("Shifoxona yozuvini o'chirishda xato:", err.message);
      return res.status(500).send("Server xatosi.");
    }

    res.status(200).send("Shifoxona yozuvi muvaffaqiyatli o'chirildi.");
  });
};

module.exports = {
  createHospital,
  getAllHospitals,
  getUserHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
};
