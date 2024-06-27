const { Sequelize } = require("sequelize");

// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize("dpsi", "root", "", {
  // host: "127.0.0.1",
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// Uji koneksi
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Ekspor instance sequelize untuk digunakan di tempat lain
module.exports = sequelize;
