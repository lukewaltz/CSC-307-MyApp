// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter (index) {
        const userID = characters[index]["id"];
        deleteUser(userID)
        .then(res => {
            if (res.status === 200) {
                const updated = characters.filter((character, i) => {
	            return i !== index
            });
            setCharacters(updated);
        }
	    });
	}

    function deleteUser(id) {
        const removeURI = `${"http://localhost:8000/users/"}${id}`;
        const promise = fetch(removeURI, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return promise;
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    } 

    function postUser(person){
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json['users_list']))
            .catch((error) => {console.log(error); });
    }, [] );

    function updateList(person){
        postUser(person)
            .then(() => setCharacters([...characters, person]))
            .catch((error) => {
                console.log(error);
            }) 
    }

    return (
        <div className="container">
            <Table characterData={characters} 
                removeCharacter={removeOneCharacter} />
                <Form handleSubmit={updateList}/>
        </div>  
    )
}


export default MyApp;