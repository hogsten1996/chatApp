const express = require("express");
const path = require("path");
const students = require("./data.js")

const app = express();

app.use("/", express.static(path.join(__dirname, "public")));


app.get("/api/v1", (req, res) => {
  res.json({
    project: "React and Express Boilerplate",
    from: "Vanaldito",
  });
});

// GET all students route
app.get('/api/v1/students', (req, res) => {
  console.log(students);
  res.send(students);
});

// GET student by id route
app.get('/api/v1/students/:id', (req, res) => {
  const { id } = req.params;
  const student = students.find(student => student.id === parseInt(id));
  res.send(student);
});

// GET student by name route
app.get('/api/v1/students/name/:name', (req, res) => {
  const { name } = req.params;
  const student = students.find(student => student.name === name);
  res.send(student);
});

// GET student by teacher route
app.get('/api/v1/students/teacher/:teacher', (req, res) => {
  const { teacher } = req.params;
  const student = students.find(student => student.teacher === teacher);
  res.send(student);
});

// GET student by age route
app.get('/api/v1/students/age/:age', (req, res) => {
  const { age } = req.params;
  const student = students.find(student => student.age === parseInt(age));
  res.send(student);
});

// GET student by age and teacher route
app.get('/api/v1/students/:age/:teacher', (req, res) => {
  const { age, teacher } = req.params;
  const student = students.find(student => student.age === parseInt(age) && student.teacher === teacher);
  res.send(student);
});

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})



const { PORT = 5001 } = process.env;

app.listen(PORT, () => {
  console.log(`  App running in port ${PORT}`);
 });
