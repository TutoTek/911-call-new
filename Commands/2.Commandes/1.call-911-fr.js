const { COMMANDS } = require("../../Utilitaire/Constants");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const Telephone = Object.values(JSON.parse(fs.readFileSync("./call-911-fr.json")));

module.exports.run = async(client, message, args, Prefix) => {
  let channel = message.channel;
  let user = message.author;

  message.delete();

  const category = message.guild.channels.cache.get("838041363143458816") ? message.guild.channels.cache.get("838041363143458816") : false

  if(!category) return channel.send("La catégorie n'est pas valide. Veyez modifier l'id dans le code.")

  await message.guild.channels.create(`911 call ${user.tag}`, {
    topic: `911 call ${user.tag} (${user.id})`,
    parent: category
  }).then(chnl => channel = chnl);

  channel.send(
    new MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Opérateur")
    .setDescription("911, quelle est votre urgence ?")
    .setFooter("(c)call 911 | 2021.")
  );

  function fail(reason) {
    channel.send(
      new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`:x: | Mission échouée, le salon va être supprimé dans 10 secondes.${reason ? `\n${reason}` : ""}`)
      .setFooter("(c)call 911 | 2021.")
    );
    setTimeout(() => {
      channel.delete();
    }, 10000);
    return;
  }
  function success() {
    channel.send(
      new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("Tu as mené à bien la mission !\nTon salon sera supprimé dans 15 secondes.")
      .setFooter("(c)call 911 | 2021.")
    );
    setTimeout(() => {
      channel.delete();
    }, 15000);
    return;
  }

  let intervention = Object.values(Telephone[Math.floor(Math.random() * Telephone.length)]);

  for(let i = 0; i < intervention.length; i++) {

    await channel.send(
      new MessageEmbed()
      .setTitle(intervention[i].titre)
      .setColor("#FF0000")
      .setFooter("(c)call 911 | 2021.")
      .setDescription(intervention[i].description)
      .addField(intervention[i].addField[0], intervention[i].addField[1])
    ).then(msg => {
      if(intervention[i].newDescription) {
        setTimeout(() => {
          msg.edit(
            new MessageEmbed()
            .setTitle(intervention[i].titre)
            .setColor("#FF0000")
            .setFooter("(c)call 911 | 2021.")
            .setDescription(intervention[i].newDescription)
            .addField(intervention[i].addField[0], intervention[i].addField[1])
          );
        }, 5000);
      }
    });

    let faire;

    let filter = (message) => { return message.author.id == user.id; }
    await channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] }).then(async collected => {
      let newMessage = await collected.first();
      if(i == intervention.length-1) {
        faire = "win";
      } else if(newMessage.content !== `${intervention[i].reponse}`) {
        faire = ["lost", intervention[i].reason];
      }else {
        faire = "win";
      }
    }).catch((err) => {
      faire = ["lost", "Le temps est écoulé..."];
    });

    if(faire == "win") {
      if(i==intervention.length-1){
        return success();
      }
      
    } else if(faire = "lost") {
      return fail(faire);
    }else console.log("suite")
  }
}

module.exports.help = COMMANDS.COMMANDES.CALL_FR;