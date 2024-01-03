const express = require("express");
const router = express.Router();
const Query = require("../models/query.model"); // Make sure to specify the correct path to your Query model file

// Route to get all queries
router.get("/", async (req, res) => {
  try {
    const queries = await Query.find();
    res.json(queries);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get a specific query by ID
router.get("/:id", async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }
    res.json(query);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete a query by ID
router.delete("/:id", async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }
    res.json({ message: "Query deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add a new query
router.post("/", async (req, res) => {
  try {
    const { name, designation, subject, message } = req.body;
    const newQuery = new Query({
      name,
      designation,
      subject,
      message,
    });
    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Bad Request" });
  }
});

module.exports = router;
