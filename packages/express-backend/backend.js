// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

/* routes */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

 /* helper function and route for get user name */
 const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

/* get ALL by name and job operation */
const findUserByNameAndJob = (name, job) => {
    return users['users_list']
        .filter( (user) => user['name'] === name && user['job'] === job);
}


/* extended in step 7 from step 4 */
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }else if (name != undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});


/* helper function and route for get user id */
const findUserById = (id) => 
    users['users_list']
        .find( (user) => user['id'] === id);

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});


/* helper function and route for post user */
const addUser = (user) => {
    user.id = String(Math.floor(Math.random() * 999999));
    users['users_list'].push(user);
    return user;
}


app.post('/users', (req, res) => {
    const userToAdd = req.body;
    let user = addUser(userToAdd);
    res.status(201);
    res.send(user);
});

/* hard delete operation */
const deleteUser = (userId) => {
    const index = users['users_list'].findIndex(u => u.id === userId);
    if (index !== -1){
        users['users_list'].splice(index, 1);
        return true;
    }
    return false;
}

app.delete('/users/:id', (req, res) => {
    const userId = req.params['id'];
    let result = deleteUser(userId);

    if (result) {
        res.status(200).json({status: "success", message: "User deleted successfully"});
    } else {
        res.status(404).json({status: "error", message: "User not found"});
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});