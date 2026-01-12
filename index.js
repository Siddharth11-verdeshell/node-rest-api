const express = require('express');
const app = express();

app.use(express.json());

// Sample in-memory data
let user = {
  id: 1,
  name: "Siddharth",
  role: "Intern"
};

// GET API
app.get('/user', (req, res) => {
  res.json(user);
});

// PUT API
app.put('/user', (req, res) => {
  const { name, role } = req.body;

  if (name) user.name = name;
  if (role) user.role = role;

  res.json({
    message: "User updated successfully",
    user
  });
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
