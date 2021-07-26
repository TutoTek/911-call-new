const { Client, Collection } = require("discord.js");
const { Token } = require("./config");
const { loadCommands, loadEvents } = require("./Utilitaire/Loader");

const client = new Client();
client.commands = new Collection();
client.cooldowns = new Collection();

loadCommands(client);
loadEvents(client);

client.login("NjEwMDY4MDA5NjU4MjIwNTY0.XU_4HA.juvsS_wwu3jKnv8ui0PTUz4tIZY");