const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
app.use(express.json());

// Load user data from JSON file
const usersFile = path.join(__dirname, 'users.json');
let users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));

// GET API
app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  const user = users[id];
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json(user);
  }
});

// PUT API
app.put('/user/:id', (req, res) => {
  const id = req.params.id;
  const user = users[id];
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    const { name, role } = req.body;
    if (name) user.name = name;
    if (role) user.role = role;
    // Update the JSON file
    fs.writeFileSync(usersFile, JSON.stringify(users));
    res.json({
      message: "User updated successfully",
      user
    });
  }
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
