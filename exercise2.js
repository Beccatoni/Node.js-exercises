const express = require("express");
const app = express();
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

app.use(express.json());

const readFileData = async (req, res) => {
  try {
    const data = await fs.readFile("data.json", "utf-8");
    res.send(JSON.parse(data));
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile("data.json", JSON.stringify([], null, 2), "utf-8");
    }
  }
};

const writeFileData = async (req, res) => {
  try {
    const { name, age } = req.body;

    console.log()
    const data = await fs.readFile("data.json", "utf-8");

    const currentData = JSON.parse(data);
    const newEntry = { id: uuidv4(), name, age };

    currentData.push(newEntry);
    await fs.writeFile(
      "data.json",
      JSON.stringify(currentData, null, 2),
      "utf-8"
    );
    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

app.get("/", readFileData);
app.post("/add", writeFileData);

app.listen(3004, () => {
  console.log("Server is listening on 3004");
});
