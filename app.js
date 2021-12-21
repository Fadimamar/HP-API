const express = require("express");
const {
  getCharacters,
  getCharacterById,
  deleteCharacter,
  addOrUpdateCharacter,
} = require("./dynamo");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Harry Potter API.");
});

app.get("/api/characters", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (error) {
    console.error(err);
    res.status(500).json({ err: "something went wrong" });
  }
});

app.get("/api/characters/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const characters = await getCharacterById(id);
    res.json(characters);
  } catch (error) {
    console.error(err);
    res.status(500).json({ err: "something went wrong" });
  }
});

app.post("/characters", async (req, res) => {
  const character = req.body;
  try {
    const newCharacters = await addOrUpdateCharacter(character);
    res.json(newCharacters);
  } catch (error) {
    console.error(err);
    res.status(500).json({ err: "something went wrong" });
  }
});
app.put("/characters/:id", async (req, res) => {
  const character = req.body;
  const { id } = req.params;
  character.id = id;
  try {
    const updatedCharacter = await addOrUpdateCharacter(character);
    res.json(updatedCharacter);
  } catch (error) {
    console.error(err);
    res.status(500).json({ err: "something went wrong" });
  }
});

app.delete("/characters/:id", async (req, res) => {
  const character = req.body;
  const { id } = req.params;
  character.id = id;
  try {
    res.json(await deleteCharacter(id));
  } catch (error) {
    console.error(err);
    res.status(500).json({ err: "something went wrong" });
  }
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
