const express = require('express');
const router = express.Router();
const {
  getListContacts,
  findContact,
  addNewContact,
  updateContacts,
  removeContactById,
} = require('./contact.controller');

router.get('/contacts', getListContacts);
router.get('/contacts/:contactId', findContact);
router.post('/contacts', addNewContact);
router.patch('/contacts/:contactId', updateContacts);
router.delete('/contacts/:contactId', removeContactById);

module.exports = router;
