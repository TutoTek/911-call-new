const { Collection } = require("discord.js");
const { Prefix } = require("../../config");

module.exports = (client , message) => {
  if(message.channel.type === "dm") return;
  if(message.author.bot) return;
  if(!message.content.startsWith(Prefix)) return;

  const args = message.content.slice(Prefix.length).split(/ +/);

  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.alias && cmd.help.alias.includes(commandName));
  
  if(!command) return console.log(`${message.author.id}: ${message.content}`);
  if(command.help.args && !args.length) {
    message.delete();
    let err = `Error !\r\nIl faut faire:\r\n__${Prefix}${command.help.name} ${command.help.usage}__.`;
    return message.channel.send(err);
  }

  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  }

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 1) * 1000;
  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.channel.send(`${message.author.username}, Merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`).then(message => message.delete({timeout: (timeLeft.toFixed(0))*1000}));
      }
    }
  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  command.run(client, message, args, Prefix);
  return;
}