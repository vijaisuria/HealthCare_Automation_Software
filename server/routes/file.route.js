const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const Medicine = require("../models/medicine.model");
const fs = require("fs-extra");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const medicines = data.map((item) => {
      const dataValue = XLSX.SSF.parse_date_code(item.expdate);
      const dateObject = new Date(
        dataValue.y,
        dataValue.m - 1,
        dataValue.d + 1
      );
      return new Medicine({
        name: item.name,
        supplierId: item.supplierId,
        countInStock: item.countInStock,
        expdate: dateObject,
        type: item.type,
      });
    });

    Medicine.insertMany(medicines)
      .then((result) => {
        console.log("Medicines inserted successfully:", result);
        fs.emptyDirSync("uploads");
      })
      .catch((error) => {
        console.error("Error inserting medicines:", error);
      });

    res.status(201).json({ message: "Medicines created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
