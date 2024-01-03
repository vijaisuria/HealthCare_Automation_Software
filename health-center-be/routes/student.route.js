const express = require("express");
const router = express.Router();
const Student = require("../models/student.model");

//auth register student
router.post("/register", async (req, res) => {
  try {
    const { name, registerNumber, dob, department, gender, residence, email } =
      req.body;
    console.log(req.body);
    const existingUser = await Student.findOne({ registerNumber });
    if (existingUser) {
      return res.status(409).json({ error: "User already exist" });
    }

    const newStudent = new Student({
      name,
      registerNumber,
      email,
      dob,
      department,
      gender,
      residence,
      password: dob.toString().slice(0, 10),
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({
      message: "Student signed up successfully",
      student: savedStudent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sign-up failed" });
  }
});

//login student
router.post("/login", async (req, res) => {
  try {
    const { registerNumber, password } = req.body;
    const student = await Student.findOne({ registerNumber: registerNumber });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (password != student.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({
      message: "Login succesful",
      student: {
        name: student.name,
        registerNumber: student.registerNumber,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a particular student by ID
router.get("/:id", getStudent, (req, res) => {
  res.json(res.student);
});

router.get("/reg/:regno", (req, res) => {
  if (req.params.regno == null) {
    return res.status(404).json({ message: "Student not found" });
  }
  Student.findOne({ registerNumber: req.params.regno })
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});

// Update a student by ID
router.patch("/:id", getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.registerNumber != null) {
    res.student.registerNumber = req.body.registerNumber;
  }
  if (req.body.dob != null) {
    res.student.dob = req.body.dob;
  }
  if (req.body.department != null) {
    res.student.department = req.body.department;
  }
  if (req.body.gender != null) {
    res.student.gender = req.body.gender;
  }

  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student by ID
router.delete("/:id", getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/verifyRegister/:registerNumber", async (req, res) => {
  const { registerNumber } = req.params;
  const { verifiedBy } = req.body;

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { registerNumber },
      { verified: true, verifiedBy },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for getting a student by registerNumber
router.get("/getStudentByRegisterNumber/:registerNumber", async (req, res) => {
  const { registerNumber } = req.params;

  try {
    const student = await Student.findOne({ registerNumber });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware function to get a particular student by ID
async function getStudent(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.student = student;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
