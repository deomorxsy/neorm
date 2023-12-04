const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
// set port and listen for requests
const PORT = process.env.PORT || 8080;

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions))

// parse requests of content-type - application/json
//app.use(express.json());
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
//app.get("/", (req, res) => {
//    res.json({ message: "hello world!"});
//});


// listening on port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// DATABASE CONF

// sequelize setup
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
});

const SEQPORT = 3000

// User model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
});

sequelize.sync().then(() => {
    app.listen(SEQPORT, () => {
        console.log(`Server is running on http://localhost:${SEQPORT}`);
    })
});

// routing
app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({error: 'User not found'});
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error)  {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    const deletedRowCount = await User.destroy({
        where: { id: req.params.id },
    });
    if (deletedRowCount > 0) {
        res.json({ message: 'User deleted sucessfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

//const db = require("./app/models");
//db.sequelize.sync().then(() => {
//    console.log("synced db");
//    }).catch
