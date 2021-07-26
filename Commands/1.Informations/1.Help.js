const { COMMANDS } = require("../../Utilitaire/Constants");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const categoryList = fs.readdirSync("./Commands");

module.exports.run = (client, message, args, Prefix) => {
    let E = new MessageEmbed()
    .setColor("#0000FF")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
    if(!args.length) {
        E.setTitle(`Help`)
        .setDescription(`Prefix: \`\`${Prefix}\`\`\r\nPour plus d'informations sur une commande:\r\n__${Prefix}${COMMANDS.INFORMATIONS.HELP.name} ${COMMANDS.INFORMATIONS.HELP.usage}__`);
        for(let category of categoryList) {
            category = category.split(".");
            if(category[0] != 0) {
                if(client.commands.filter(cat => cat.help.category.toLowerCase() == category[1].toLowerCase()).map(cmd => `__${cmd.help.name}__`).join(', ')) {
                    catName = category[1];
                    tf = true;
                    while(tf) { if(catName.includes("-")) { catName = catName.replace("-", " ")} else { tf = false }}
                    E.addField(`${catName}`, `${client.commands.filter(cat => cat.help.category.toLowerCase() == category[1].toLowerCase()).map(cmd => `__${cmd.help.name}__`).join(', ')}`);
                }
            }
        }
    } else {
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.alias && cmd.help.alias.includes(args[0]));
        if(!command) return message.channel.send("Cette commande n'existe pas.");
        E.setTitle(`Help-${command.help.name}`)
        .addField(`Description`, command.help.description ? `${command.help.description}.` : `Cette commande n'a pas de description.`)
        .addField(`Cooldown`, `**${command.help.cooldown}** secondes.`)
        .addField(`Utilisation:`, `__${Prefix}${command.help.usage ? `${command.help.name} ${command.help.usage}` : `${command.help.name}`}__`)
        .addField(`Alias`, `${command.help.alias ? `Alias: __${command.help.alias.join('__, __')}__` : `Cette commande ne possède pas d'alias`}`);
    }
    message.channel.send(E);
}

module.exports.help = COMMANDS.INFORMATIONS.HELP;