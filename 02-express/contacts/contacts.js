const { json } = require('express');
const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const Joi = require('joi')
const contactPath = path.join(__dirname, './db/contacts.json');

const listContacts = (req, res) => {
    fs.readFile(contactPath, 'utf8', (err, data) => {
        if(err){
            res.status(404).send({
                message: 'Contacts is not found'
            })
        } 
        res.status(200).send(JSON.parse(data));
    });
}; 

const getContactById = (req, res) => {
    const {query} = req
    console.log(query)
    fs.readFile(contactPath, 'utf8', (err, data) => {
        if(err){
            return res.status(404).send({
                message: 'Contacts is not found'
            })
        }
        const result = data.find(item => item.id === query.contactId);
        res.status(200).send(result);
    })
}; 

const removeContact = (contactId) => {
    fs.readFile(contactPath, 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }
        const contacts = JSON.parse(data);

        const deletingItem = contacts.filter(item => item.id === contactId)

        console.table(deletingItem)

        const results = contacts.filter(item => item.id !== contactId)

        fs.writeFile(contactPath, JSON.stringify(results), (err) => {
            if(err){
                console.log(err);
            }
            console.table(results)
        })
    })
};
  
const addContact = (name, email, phone) => {
    const newContact = {
        id: shortid.generate(),
        name: name,
        email: email,
        phone: phone
    }
    console.log('You want to add this contact: ');
    console.table(newContact);
    fs.readFile(contactPath, 'utf8', (err, data) => {
        if(err) throw err;
        const contacts = JSON.parse(data);

        const newContactArray = contacts.push(newContact);

        fs.writeFile(contactPath, JSON.stringify(contacts), (err) => {
            if(err) throw err;

            console.log('New contact list: ');
            console.table(contacts);
        })
    })
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}