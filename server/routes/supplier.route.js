// routes for add/remove/update/get suppliers
const router = require("express").Router();
const Supplier = require("../models/supplier.model");

// Route for adding a new supplier
router.post("/", async (req, res) => {
  try {
    const existingSupplier = await Supplier.findOne({ email: req.body.email });
    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier already exists" });
    }

    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).send(supplier);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "An error occurred while adding supplier" });
  }
});

// Route for getting all suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for getting a single supplier
router.get("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for updating an existing supplier
router.put("/:id", async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSupplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json(updatedSupplier);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the supplier" });
  }
});

// Route for deleting a supplier
router.delete("/:id", async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the supplier" });
  }
});

router.delete("/mail/:email", async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findOneAndDelete({
      email: req.params.email,
    });
    if (!deletedSupplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the supplier" });
  }
});

module.exports = router;
