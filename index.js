const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// ZOOS TABLE ENDPOINTS ***********************
// GET ENPOINT
server.get("/zoos", async (req, res) => {
  try {
    const zoos = await db("zoos");
    res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json({
      message: "Houston, we have a problem! Failed to retrieve records."
    });
  }
});
server.get("/zoos/:id", async (req, res) => {
  try {
    const zoo = await db("zoos").where({ id: req.params.id });
    res.status(200).json(zoo);
  } catch (error) {
    res.status(500).json({ message: "we can't get the records" });
  }
});

server.post("/zoos", async (req, res) => {
  try {
    const newAnimal = req.body;
    const id = await db("zoos").insert(newAnimal);
    if (id > 0) {
      res.status(200).json({ message: "Your record is added" });
    } else {
      res.status(400).json({ messsage: "couldn't find the id" });
    }
  } catch (error) {
    res.status(500).json({ message: "we can't add the record" });
  }
});

server.put("/zoos/:id", async (req, res) => {
  try {
    const id = await db("zoos")
      .where({ id: req.params.id })
      .update(req.body);

    if (id > 0) {
      res.status(201).json({ message: "Successfully updated!" });
    } else {
      res.status(404).json({ message: "Record not found to update" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Houston, we have a problem! Failed to insert record."
    });
  }
});

server.delete("/zoos/:id", async (req, res) => {
  try {
    const id = await db("zoos")
      .where({ id: req.params.id })
      .del();
    if (id > 0) {
      res.status(201).json({ message: "Successfully deleted!" });
    } else {
      res.status(404).json({ message: "Record not deleted" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Houston, we have a problem! Failed to delete record."
    });
  }
});
//Bears TABLE ENDPOINTS ***********************
// GET ENPOINT

server.get("/bear", async (req, res) => {
  try {
    const bears = await db("bears");
    res.status(200).json(bears);
  } catch (error) {
    res.status(500).json({
      message: "Houston, we have a problem! Failed to retrieve records."
    });
  }
});
server.get("/bears/:id", async (req, res) => {
  try {
    const bear = await db("bears").where({ id: req.params.id });
    res.status(200).json(bear);
  } catch (error) {
    res.status(500).json({ message: "we can't get the records" });
  }
});

server.post("/bears", async (req, res) => {
  try {
    const newBear = req.body;
    const id = await db("bears").insert(newBear);
    if (id > 0) {
      res.status(200).json({ message: "Your record is added" });
    } else {
      res.status(400).json({ messsage: "couldn't find the id" });
    }
  } catch (error) {
    res.status(500).json({ message: "we can't add the record" });
  }
});

server.put("/bears/:id", async (req, res) => {
  try {
    const id = await db("bears")
      .where({ id: req.params.id })
      .update(req.body);

    if (id > 0) {
      res.status(201).json({ message: "Successfully updated!" });
    } else {
      res.status(404).json({ message: "Record not found to update" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Houston, we have a problem! Failed to insert record."
    });
  }
});

server.delete("/bears/:id", async (req, res) => {
  try {
    const id = await db("bears")
      .where({ id: req.params.id })
      .del();
    if (id > 0) {
      res.status(201).json({ message: "Successfully deleted!" });
    } else {
      res.status(404).json({ message: "Record not deleted" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Houston, we have a problem! Failed to delete record."
    });
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
