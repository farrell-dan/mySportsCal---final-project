const getItemsByID = require("./handlers/getItemsbyID");
const eplData = require("./handlers/eplData")
const signUp = require("./handlers/signup");
const login = require("./handlers/login");
const LaLigaData = require("./handlers/LaLigaData")

module.exports = {
    getItemsByID,
    eplData,
    LaLigaData,
    signUp,
    login
}