const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    exposedHeaders: ["x-total-count"], // Add the custom headers you want to expose to the frontend
  })
);
app.use(express.json());

// Connect to MongoDB
//const uri = "mongodb://127.0.0.1:27017/MIT-HC";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTERNAME}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const doctorsRouter = require("./routes/doctor.route");
const nursesRouter = require("./routes/nurse.route");
const medicinesRouter = require("./routes/medicine.route");
const suppliersRouter = require("./routes/supplier.route");
const prescriptionsRouter = require("./routes/prescription.route");
const authRouter = require("./routes/auth.route");
const studentRouter = require("./routes/student.route");
const fileUpload = require("./routes/file.route");
const scheduleRouter = require("./routes/schedule.route");
const appointmentRouter = require("./routes/appointment.route");
const queryRouter = require("./routes/query.route");
const feedbackRouter = require("./routes/feedback.route");

app.use("/api/auth", authRouter);
app.use("/api/doctor", doctorsRouter);
app.use("/api/nurse", nursesRouter);
app.use("/api/medicine", medicinesRouter);
app.use("/api/supplier", suppliersRouter);
app.use("/api/prescription", prescriptionsRouter);
app.use("/api/file", fileUpload);
app.use("/api/students", studentRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/query", queryRouter);
app.use("/api/feedback", feedbackRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
