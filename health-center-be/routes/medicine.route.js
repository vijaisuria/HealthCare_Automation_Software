const express = require("express");
const router = express.Router();

const Medicine = require("../models/medicine.model");

// Route for adding a new medicine
//get all medicines
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const searchTerm = req.query.search || "";
    const filterSupplier = req.query.supplier || "";
    const sortOption = req.query.sort || "";

    let query = {};

    if (searchTerm) {
      query.name = { $regex: new RegExp(searchTerm, "i") };
    }

    if (filterSupplier) {
      query.supplierId = filterSupplier;
    }

    let sort = {};
    if (sortOption === "name") {
      sort.name = 1;
    } else if (sortOption === "expdate") {
      sort.expdate = 1;
    } else if (sortOption === "countInStock") {
      sort.countInStock = 1;
    }

    const totalMedicines = await Medicine.countDocuments(query);
    const totalPages = Math.ceil(totalMedicines / limit);

    const medicines = await Medicine.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.set("x-total-count", totalMedicines.toString());
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/all", (req, res) => {
  Medicine.find()
    .then((medicines) => res.json(medicines))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route for getting a single medicine
router.get("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, supplierId, expdate, countInStock, type } = req.body;

    const medicine = new Medicine({
      name,
      supplierId,
      expdate,
      countInStock,
      type,
    });

    const savedMedicine = await medicine.save();

    res.json(savedMedicine);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the medicine" });
  }
});

// Route for updating an existing medicine
router.put("/:id", async (req, res) => {
  try {
    const { name, supplierId, expdate, countInStock } = req.body;

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      {
        name,
        supplierId,
        expdate,
        countInStock,
      },
      { new: true }
    );

    res.json(updatedMedicine);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the medicine" });
  }
});

// Route for deleting a medicine
router.delete("/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the medicine" });
  }
});

module.exports = router;
