const argv = require("yargs").argv;
const contactsOperation = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperation.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperation.getContactById(id);
      console.log(contact);
      if (!contact) {
        throw new Error(`Contact with id ${id} not found`);
      }
      break;

    case "add":
      const newContact = await contactsOperation.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await contactsOperation.removeContact(id);
      console.log(removedContact);
      if (!removedContact) {
        throw new Error(`Contact with id ${id} not found`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
