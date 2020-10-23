const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const contactPath = path.join(__dirname, './db/contacts.json');

module.exports.listContacts = () => {
    
    fs.readFile(contactPath, 'utf8', (err, data) => {
        if(err){
            console.log(err);
        } 
        console.table(JSON.parse(data))
    });
}
module.exports.getContactById = (contactId) => {
    fs.readFile(contactPath, 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }
        console.table(JSON.parse(data).filter(item => item.id === contactId))
    })
} 
module.exports. removeContact = (contactId) => {
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
    
}
  
module.exports.addContact = (name, email, phone) => {
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
}