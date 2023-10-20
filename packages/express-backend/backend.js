// backend.js
import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

/* routes */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

/* VALID */
app.get('/users', (req, res) => {
    //console.log("IN GET");
    const name = req.query.name;
    const job = req.query.job;
    let result = userServices
        .getUsers(name, job)
        .then((result) => res.send(result))
        .catch((error) => {
            console.error("ERROR FETCHING USERS:", error);
            res.status(500).send("Error caught in get/users");
        }
    );
});

/* VALID */
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    //let result = findUserById(id);
    let result = userServices
        .findUserById(id)
        .then((result) => result === undefined
          ? res.status(404).send("Resource not found")
          : res.send(result)
        )
        .catch((error) => {
        console.error("ERROR FETCHING USERS:", error);
        res.status(500).send("Error caught in get/users");
        }
    );
});


/* NOT VALID */
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    //console.log(userToAdd);
    //let user = addUser(userToAdd);
    if (userToAdd === undefined){
        res.status(404).send("UserToAdd not found");
    } else {
        //console.log(userToAdd);
        userServices
        .addUser(userToAdd)
        .then(res.status(201)
        .send(userToAdd)
        .catch((error) => console.error("error caught in post.catch", error)));
    }
    
});


app.delete('/users/:id', (req, res) => {
    const userId = req.params['id'];
    //let result = deleteUser(userId);
    let result = userServices
        .deleteUser(userId)
        .then((result) =>
        result === undefined
          ? res.status(404).send("Resource not found")
          : res.status(204).send()
        )
        .catch((error) => {
            console.error("Error deleting user:", error);
            res.status(500).send("Error caught in delete/users/:id");
        }
    );
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});