const { Prefix } = require("../../config");
const moment = require("moment");
moment.locale("fr");

module.exports = client => {
    let interval = 0;
    setInterval(() => {
        interval+=1;
        if(interval == 1) {
            client.user.setPresence({activity: {name: `${client.guilds.cache.size} serveur(s)`, type: "LISTENING"}, status: "online"});
        } else if(interval == 2) {
            client.user.setPresence({activity: {name: `${client.users.cache.size} utilisateur(s)`, type: "LISTENING"}, status: "online"});
        } else {
            client.user.setPresence({activity: {name: `${Prefix}help`, type: "LISTENING"}, status: "online"});
            interval = 0;
        }
    }, 5000);
    client.user.setPresence({activity: {name: `${Prefix}help`, type: "LISTENING"}, status: "online"});
    console.log(`\r\n${client.user.tag} est en ligne !\r\n${moment().format("dddd Do MMMM YYYY")} - ${moment().format('LTS')}\r\n`);
}