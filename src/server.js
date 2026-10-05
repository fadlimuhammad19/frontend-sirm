const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const pasienRoutes = require("./routes/pasienRoutes");
app.use("/api/pasien", pasienRoutes);

app.get("/", (req, res) => {
  res.json({ message: "SIMRS Backend jalan!" });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS hasil");
    res.json({ status: "sukses", hasil: rows[0].hasil });
  } catch (err) {
    res.status(500).json({
      status: "gagal",
      error: err.message,
      debug_host: process.env.DB_HOST || "KOSONG",
      debug_port: process.env.DB_PORT || "KOSONG",
      debug_ssl: process.env.DB_SSL || "KOSONG",
    });
  }
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
  });
}

module.exports = app;