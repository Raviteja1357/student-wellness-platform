const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect("mongodb://localhost:27017/studentwellness")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

// SUGGESTIONS SCHEMA
const SuggestionSchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now },
});

const Suggestion = mongoose.model("Suggestion", SuggestionSchema);

// API: ADD SUGGESTION
app.post("/suggestions", async (req, res) => {
  try {
    const newSuggestion = new Suggestion({ text: req.body.text });
    await newSuggestion.save();
    res.json({ message: "Suggestion saved successfully!" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// API: FETCH ALL SUGGESTIONS
app.get("/suggestions", async (req, res) => {
  const suggestions = await Suggestion.find();
  res.json(suggestions);
});

// START SERVER
app.listen(5000, () => console.log("Server running on port 5000"));
