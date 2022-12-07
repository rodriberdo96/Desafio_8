const moment = require('moment');
const insertMessage = require('../config/SQLite3/mariaDb/insert');
const selectMessages = require('../config/SQLite3/mariaDb/select');

class Message {
    async loadMessages () {
        try {
            const messageList= await selectMessages();
            return messageList;
        } catch (error) {
            console.log(error);
        }
    }
    async saveMessage (data) {
        try {
            const newMessage = {
                email: data.email,
                message: data.message,
                date: moment().format('YYYY-MM-DD HH:mm:ss')
            };
            await insertMessage(newMessage);
            return newMessage;
        } 
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = Message;