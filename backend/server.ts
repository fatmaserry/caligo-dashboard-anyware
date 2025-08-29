import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import quizRoutes from "./src/routes/quiz";
import announcementRoutes from "./src/routes/announcement";
import seed from "./src/seed/seed";
import studentRoutes from "./src/routes/student";
import instructorRoutes from "./src/routes/instructor";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/quiz", quizRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/instructor", instructorRoutes);

const PORT = process.env.PORT || 5001;
const MONGO =
  process.env.MONGO_URI || "mongodb://localhost:27017/education-platform";

mongoose
  .connect(MONGO)
  .then(async () => {
    console.log("Mongodb connected");

    // Ensure the database connection is established
    if (!mongoose.connection.db) {
      console.error("Database connection is not established.");
      process.exit(1);
    }

    // for testing: seed only if no collections exis
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    if (collections.length === 0) {
      console.log("No collections found, running seed");
      try {
        await seed();
      } catch (err) {
        process.exit(1);
      }
    } else {
      console.log("Database already has collections, skipping seed.");
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Mongo error", err));
