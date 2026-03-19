const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());

const readUsers = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify([]));
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
};

const writeUsers = (users) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error writing data:', err);
    }
};

let usersArray = readUsers();

app.get('/users', (req, res) => {
    res.json(usersArray);
});

app.post('/register', (req, res) => {
    const { username, password, email, name } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    
    if (usersArray.find(u => u.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: Date.now().toString(),
        username,
        password,
        email: email || '',
        name: name || ''
    };

    usersArray.push(newUser);
    writeUsers(usersArray);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = usersArray.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { email, name, password } = req.body;
    
    const index = usersArray.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    usersArray[index] = { ...usersArray[index], email, name, password: password || usersArray[index].password };
    writeUsers(usersArray);
    res.json({ message: 'User updated successfully', user: usersArray[index] });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    usersArray = usersArray.filter(u => u.id !== id);
    writeUsers(usersArray);
    res.json({ message: 'User deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
