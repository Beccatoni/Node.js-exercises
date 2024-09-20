const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const app = express();


app.use(express.json())
const readFileData = async (req, res) => {
  try {
    const data = await fs.readFile("data2.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    if(error.code === "ENOENT"){
        writeData([])
    }
    res.status(500).json({ error: error.message });
  }
};



const writeData = async (data) => {
   
  await fs.writeFile("data2.json", JSON.stringify(data, null, 2), "utf8");
};

const writeFileData = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newItem = { id: uuidv4(), title, description };
    const data = await readFileData();
    data.push(newItem);
    writeData(data);
    res.status(201).json({ message: "Data added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    const data = await readFileData();
    const noteIndex = data.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      throw new Error('Can not find note')
    }
    data[noteIndex] = {...data[noteIndex], title, description}
    writeData(data);
    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
      const data = await readFileData();
      const newData = data.filter(note => note.id !== id);
      writeData(newData);
      res.status(200).json({ message: 'Note deleted successfully' });
    
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}



app.get("/", readFileData);
app.post('/add', writeFileData);
app.put('/update/:id', updateData);
app.delete('/delete/:id', deleteNote);

app.listen(4002, ()=> {
    console.log('Database connection established')
})
