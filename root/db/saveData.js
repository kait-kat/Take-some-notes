const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'db.json');

function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

function loadData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

module.exports = {
  saveData,
  loadData
};
