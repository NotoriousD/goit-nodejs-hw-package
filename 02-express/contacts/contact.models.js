const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const { get } = require('./contact.routers');

const contactPath = path.join(__dirname, '../db/contacts.json');

const contacts = require(contactPath);

const listContacts = () => {  
    return contacts;
}; 

const getContactById = (contactId) => {
    let id = String(contactId);
    return contacts.find(contact => String(contact.id) === id);
}; 

const removeContact = (contactId) => {

    if(getContactById(contactId)){
        const results = contacts.filter(item => String(item.id) !== String(contactId))
        fs.writeFile(contactPath, JSON.stringify(results), (err) => {
            if(err) throw err;
        });
        return true;
    }else return false;

};  
  
const addContact = (name, email, phone) => {
    const newContact = {
        id: shortid.generate(),
        name: name,
        email: email,
        phone: phone
    }
    const newContactArray = [...contacts ,newContact];

    fs.writeFile(contactPath, JSON.stringify(newContactArray), (err) => {
        if(err) throw err;
    })
};

const updateContact = (contactId, newData) => {
    const contactIndex = contacts.findIndex(contact => String(contact.id) === String(contactId));

    if(!contactIndex < 0){
        return false;
    }
    
    contacts[contactIndex] = {
        ...contacts[contactIndex],
        ...newData
    }

    fs.writeFile(contactPath, JSON.stringify(contacts), (err) => {
        if(err) throw err;
    })

    return true;
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
}