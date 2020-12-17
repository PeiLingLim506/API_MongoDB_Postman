//import { v4 as uuidv4 } from 'uuid';
import mongodb from 'mongodb';
import db from '../db.js';

const ObjectId = mongodb.ObjectId;

//const users = [
    /* //one user obj
    {
        firstname: "John",
        lastname: "Doe",
        age: 25
    },
    {
        firstname: "Jane",
        lastname: "Doe",
        age: 24
    } */
//]

export const createUser = (req, res) => {
    //const user = req.body;
    //console.log('user');
    //const userId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    //const userWithId = { ...user, id: uuidv4()}
    //users.push({ ...user, id: uuidv4()});
    //res.send(`User with the username ${user.firstname} added to the database`);

    //users.push({ ...user, id: new ObjectId(req.params.id)});

    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
      };
      //users.push({ ...newUser, _id: new ObjectId(req.params.id)});
      /* MongoClient.connect('mongodb+srv://mongo-user11:asE0gCaYMjX8c2wE@cluster0.mpn7q.mongodb.net/shop?retryWrites=true&w=majority')
      .then(client => {
        client
          .db() */
          db.getDb().db()
          .collection('users')
          .insertOne(newUser)
          .then(result => {
            console.log(result);
            //client.close();
            // res
            //   .status(201)
            //   .json({ message: 'user added', userId: result.insertedId });
              res.send(`User added to the database`);
        }).catch(err => {
          console.log(err);
          //client.close();
          res.status(500).json({ message: 'an error occured'});
        });
}

export const getUsers = (req, res) => {
    //console.log(users);
    //res.send(users);
    const users = [];
    db.getDb().db()
        .collection('users')
        .find()
        .sort({firstname: 1})
        .forEach(userDoc => {
            users.push(userDoc);
        })
        .then(result => {
            res.send(users);
            //res.status(200).json(users);
        }).catch(err => {
            console.log(err);
            res.status(500).json({message: 'an error occured'});
        });
}

export const getUser = (req, res) => {
    //const {id} = req.params;
    //const foundUser = users.find((user) => user.id == id);
    //const foundUser = users.find((user) => user.id == new ObjectId(req.params.id));
    //res.send(foundUser);

    db.getDb().db()
        .collection('users')
        .findOne({_id: new ObjectId(req.params.id)})
        //.findOne(foundUser)
        .then(userDoc => {
            //res.status(200).json(users);
            res.send(userDoc);
        }).catch(err => {
            console.log(err);
            res.status(500).json({message: 'an error occured'});
        });
}

export const deleteUser = (req, res) => {
    //const {id} = req.params;
    //users = users.filter((user) => user.id != id);
    //const foundUser = users.find((user) => user.id == new ObjectId(req.params.id));
    //users = users.filter((user) => user.id != new ObjectId(req.params.id));
    //res.send(`User with the id ${id} deleted from the database`);

    db.getDb()
      .db()
      .collection('users')
      .deleteOne({_id: new ObjectId(req.params.id)})
      .then(result => {
          console.log(result)
        //res.status(200).json({ message: 'user deleted' });
        res.send(`User deleted from the database`);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'an error occured' });

      });
}

export const updateUser = (req, res) => {
    /* const {id} = req.params;
    const {firstname, lastname, age} = req.body;

    const user = users.find((user) => user.id == id); 
    if(firstname) {
        user.firstname = firstname;
    }
    if(lastname) {
        user.lastname = lastname;
    }
    if(age) {
        user.age = age;
    } */
    //res.send(`User with the id ${id} is updated`);


    const updatedUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
      };
      db.getDb()
          .db()
          .collection('users')
          .updateOne(
            {_id: new ObjectId(req.params.id)}, 
            {
              $set: updatedUser
            
          }
        ).then(result => {
          //res.status(200).json({ message: 'user updated', userId: req.params.id });
          res.send(`User is updated`);
        })
        .catch(err => {
          console.log(err);
          //client.close();
          res.status(500).json({ message: 'an error occured'});
    
        });
}