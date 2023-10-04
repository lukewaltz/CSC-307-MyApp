// backend.js
import express from "express";

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



app.use(express.json());

/* routes */

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.send(users);
})

 /* helper function and route for get user name */

 const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
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
    users['users_list'].push(user);
    return user;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

/* hard delete operation */
const deleteUser = (userId) => {
    const index = users['users_list'].findIndex(u => u.id === userId);
    if (index !== -1){
        console.log("in deleteUser");
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