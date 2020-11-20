const models = require('./contact.models');
const {validation} = require('./contact.validation');

exports.getListContacts = (req, res) => {
    const contacts = models.listContacts();

    if(contacts.length === 0){
        res.status(404).send({message: 'List contact is not found'});
    }

    res.status(200).json(contacts);
}

exports.findContact = (req, res) => {
    const {params: {contactId}} = req;
    const contact = models.getContactById(contactId);

    if(contact.length === 0){
        res.status(404).json({message: 'Contact is not found'});
    }

    res.status(200).json(contact);
}

exports.removeContactById = (req, res) => {
    const { params: { contactId } } = req;
    const result = models.removeContact(contactId);
    if(!result) {
        res.status(404).json({message: 'Contact is not found'})
    }
    res.status(200).json({message: 'Contact has been removed'});
}

exports.addNewContact = (req, res) => {
    const { body: { name, email, phone } } = req;
    const {error} = validation.validate(req.body);
    if(error) {
        res.status(404).json({message: error.messages})
    }

    const addedContact = models.addContact(name, email, phone)

    res.status(200).json(addedContact);
}

exports.updateContacts = (req, res) => {
    const {params: {contactId}} = req;
    if(Object.keys(req.body).length === 0){ 
        res.status(400).json({message: 'nothing to change'})
    }

    const result = models.updateContact(contactId, req.body);

    if(!result){
        res.status(404).json({message: 'Contact is not defined'})
    }

    res.status(200).json({message: "Contact has changed"});
}