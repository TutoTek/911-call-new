const COMMANDS = {
  INFORMATIONS: {
    HELP: {
      name: "help",
      alias: ["h"],
      category: "Informations",
      description: "Donne la liste des commandes du bot",
      usage: "<help>",
      cooldown: 3,
      args: false,
    },
  },
  COMMANDES: {
    CALL_FR: {
      name: "call-911-fr",
      alias: false,
      category: "Commandes",
      description: "Appel d'une urgence",
      usage: false,
      cooldown: 3,
      args: false,
    }
  }
};

/*
name: "",
alias: false,
category: "",
description: "",
usage: false,
cooldown: 3,
args: false,
*/

exports.COMMANDS = COMMANDS;
