const db = require('./database');

const generateListFromDB = async () => {
  const usersList = await db.any("SELECT users_name, TO_CHAR(entry_date, 'DD/MM/YYYY') AS reg_date FROM reg_users ORDER BY entry_date;");
  return usersList;
}

const insertUserIntoDB = async (name, date) => {
  await db.none("INSERT INTO reg_users (users_name, entry_date) VALUES ($1, $2);", [name, date]);
}

module.exports = {
  generateListFromDB,
  insertUserIntoDB
};