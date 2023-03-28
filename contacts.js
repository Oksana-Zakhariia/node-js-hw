const fs = require("fs").promises;
const path = require("path");
const { stringify } = require("querystring");
const { v4: uuidv4, v4 } = require("uuid");
const contactsPath = path.join(__dirname, "db", "contacts.json");
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  const [deletedContact] = contacts.splice(idx, 1);
  if (idx === -1) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
