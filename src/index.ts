import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connecté");
    await sequelize.sync({ alter: true }); // sync les tables
    app.listen(PORT, () =>
      console.log(`🚀 Serveur sur http://localhost:${PORT}`),
    );
  } catch (err) {
    console.error("❌ Erreur de connexion :", err);
  }
})();
