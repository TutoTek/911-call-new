const fs = require("fs");

const loadCommands = (client, dir = "./Commands/") => {
  console.log("\r\nCommandes chargées:");
  fs.readdirSync(dir).forEach(dirs => {
    const commands = fs.readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js"));
    for(const file of commands) {
      const getFileName = require(`../${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`${getFileName.help.name}`);
    }
  });
}

const loadEvents = (client, dir = "./Events/") => {
  console.log("\r\nEvents chargés:");
  fs.readdirSync(dir).forEach(dirs => {
    const events = fs.readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js"));
    for(const event of events) {
      const evtName = event.split(".")[0];
      const evt = require(`../${dir}/${dirs}/${event}`);
      client.on(evtName, evt.bind(null, client));
      console.log(`${evtName}`);
    }
  });
}

module.exports = {
  loadCommands,
  loadEvents
}