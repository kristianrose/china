/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint no-console: [" error", { allow: ["warn", "error", "log"]}] */
'use strict'
var { ownerID, prefix } = require('config.json')
const db = require("mongo/db.js");
const discord = require('discord.js')
const cooldown = new Set()
module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type === "dm") return;
  // if(!message.member.hasPermission("ADMINISTRATOR")) return;

  let criando = id => {
    let a = new db.Users({
      _id: message.author.id,
      rep: 0,
      perf: 0,
      perfTime: 0,
      repTime: 0,
      ambar: 0,
      rubi: 0,
      dailyTime: 0,
      diamond: 0,
      bgprofile: "",
      favcolor: "",
      bgbio: ""
    });
    a.save();
    return a;
  };
  
  let ent = await db.Users.findOne({ _id: message.author.id });
  if (!ent) {
    ent = criando(message.author.id);
  }

  var createAccount = id => {
    var server = new db.Guilds({
      _id: message.guild.id,
      autorole: "",
      autoroleArray: [],
      welcome: "",
      welcomeChannel: "",
      bye: "",
      byeChannel: "",
      dm: "",
      prefixo: "i!",
      slow: 0,
      sloww: 0,
      lang: "pt-BR",
      bkchannel: [],
      convites: false,
      convitesES: false,
      invs: false,
      texto: "",
      txt: "",
      numero: "",
      logg_MD: "",
      logg_MUP: "",
      logg_mGA: "",
      logg_mGR: "",
      logg_mGB: "",
      logg_banAction: "",
      logg_wordsAction: "",
      logg_fakes: "",
      td: false,
      md: false,
      bot: false,
      fakes: false,
      apng: false,
      girl: "",
      man: "",
      staffer: "",
      nb: "",
      capslock: 0,
      massBan: false,
      massBanLog: "",
      convitesCanais: [],
      linksCanais: [],
      spoilerCanais: []
    });
    server.save();
    return server;
  };

  if (!message.guild) return
  if (message.author.bot) return
  if (message.channel.type == "dm") return
  if (message.content.includes(`<@${client.user.id}>`) || message.content.includes(`<@!${client.user.id}>`)) {
    return message.channel.send(`${message.author}, **Precisando de ajuda? basta usar** \`\`i!ajuda\`\` **para receber meus comandos**\n\n**Servidor suporte:**  https://discord.gg/CPv7eQyQ`).then(msg => {
    msg.delete({ timeout: 5000 })
  })
  }

  if (!message.content.startsWith(prefix)) return
  if (cooldown.has(message.author.id) && message.author.id !== ownerID)
    return message.reply("Aguarde 2.5s para usar os comandos novamente");

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const cmd = client.comandos[command];
  if (cmd) cmd(client, message, args, prefix);
  cooldown.add(message.author.id)
  timeUser(message.author.id)
  message.delete().catch(() => { })
}

const timeUser = (user_id) => setTimeout(() => cooldown.delete(user_id), 1000 * 2.5)