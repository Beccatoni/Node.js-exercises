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

    console.log();
    const data = await fs.readFile("data.json", "utf-8");

    const currentData = JSON.parse(data);
    const newEntry = { id: uuidv4(), name, age };

    currentData.push(newEntry);
    await fs.writeFile(
      "data.json",
      JSON.stringify(currentData, null, 2),
      "utf-8"
    );
    res.status(201).json({ message: "Data added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, age } = req.body;
    const data = await fs.readFile("data.json", "utf-8");
    const currentData = JSON.parse(data);
    const userWithId = currentData.findIndex((user) => user.id === id);

    if (userWithId === -1) {
      throw new Error(`User with id: "${id}" does not exist`);
    }
    currentData[userWithId] = { ...currentData[userWithId], name, age };
    await fs.writeFile('data.json', JSON.stringify(currentData, null, 2), 'utf-8')
    res
      .status(200)
      .json({ message: `User with id: "${id}" updated successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteUser = async(req, res) => {
  try {
    const id = req.params.id;
    const data = await fs.readFile('data.json', 'utf-8');
    const currentData = JSON.parse(data);
    const newData = currentData.filter(user => user.id !== id);
    await fs.writeFile('data.json', JSON.stringify(newData, null, 2), 'utf-8');

    res.status(200).json({ message: `User with id: "${id}" deleted successfully` });
  } catch (error) {
    
  }
}
app.get("/", readFileData);
app.post("/add", writeFileData);
app.put("/update/:id", updateData);
app.delete("/deleteOne/:id", deleteUser)

app.listen(3004, () => {
  console.log("Server is listening on 3004");
});
