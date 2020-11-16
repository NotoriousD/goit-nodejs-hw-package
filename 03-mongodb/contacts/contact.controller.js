const contactSchema = require('./contact.models');
const { validation } = require('./contact.validation');

exports.getListContacts = async (req, res) => {
  const contacts = await contactSchema.find();

  if (contacts.length === 0) {
    res.status(404).send({ message: 'List contact is not found' });
  }

  res.status(200).json(contacts);
};

exports.findContact = async (req, res, next) => {
  const {
    params: { contactId },
  } = req;

  try {
    const contact = await contactSchema.findById(contactId);
    res.status(200).json(contact);
  } catch (err) {
    res.status(404).json({ message: 'Contact is not found' });
    next(err);
  }
};

exports.removeContactById = async (req, res, next) => {
  const {
    params: { contactId },
  } = req;
  try {
    const result = await contactSchema.findByIdAndDelete(contactId);
    res.status(200).json({ message: 'Contact has been removed' });
  } catch (err) {
    res.status(404).json({ message: 'Contact is not found' });
    next(err);
  }
};

exports.addNewContact = async (req, res, next) => {
  const { error } = validation.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.messages });
  }

  try {
    const addedContact = await contactSchema.create(req.body);

    return res.status(200).json(addedContact);
  } catch (err) {
    next(err);
  }
};

exports.updateContacts = async (req, res, next) => {
  const {
    params: { contactId },
  } = req;

  try {
    const updatedContact = await contactSchema.findByIdAndUpdate(contactId, {
      $set: req.body,
    });

    res.status(200).json({ message: 'Contact has been changed' });
  } catch (err) {
    next(err);
  }
};
