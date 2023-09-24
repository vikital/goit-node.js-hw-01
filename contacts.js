const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// Шлях до файлу з контактами
const contactsPath = path.join(__dirname, "./db/contacts.json");

// Функція для отримання списку контактів
const listContacts = async () => {
  //  Повертає масив контактів.
  const data = await fs.readFile(contactsPath, "utf-8");
  // Перетворюємо JSON дані на об'єкт
  return JSON.parse(data);
};

// Функція для отримання контакту за його ідентифікатором
const getContactById = async (contactId) => {
  // Повертає об'єкт контакту з таким ID. Повертає null, якщо об'єкт з таким ID не знайдено.
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

// Функція для видалення контакту за його ідентифікатором
const removeContact = async (contactId) => {
  // Повертає об'єкт віддаленого контакту. Повертає null, якщо об'єкт з таким ID не знайдено.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};

// Функція для додавання нового контакту
const addContact = async (data) => {
  //  Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
