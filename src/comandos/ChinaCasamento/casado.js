
const discord = require("discord.js")
module.exports = (client, message, args) => {
  const database = require("mongo/db.js");
  let mentioned = message.mentions.users.first() || message.author;
  var userDB = database.Users.findById(
    message.author.id || message.mentions.users.first() || client.users.cache.get(args[0]),
    {},
    { lean: true }
  )
    .then(userDB => {
      let { marriedTo, marriageTimestamp } = userDB.marriage;
      if (marriedTo.length) {
        const moment = require("moment");
        moment.locale("pt-BR");
        const { RichEmbed } = require("discord.js");
        //db
const firebase = require("firebase");
const database = firebase.database();

  var get = database
    .ref(`devds/avatar/${message.author.id}/config/dev`)
    .once("value")
    .then(function(valor) {
      var avatar = valor.val() 
      if (avatar === null) avatar = "China • User"
      var get = database
    .ref(`devds/avatar/${message.author.id}/config/iconi`)
    .once("value")
    .then(function(valor) {
      var iconi = valor.val() 
if (iconi === null) iconi = ""
      var get = database
    .ref(`devds/avatar/${message.author.id}/config/cor`)
    .once("value")
    .then(function(valor) {
      var cor = valor.val() 
if (cor === null) cor = "4959E9"
      

        let embed = new discord.MessageEmbed()
         //  .setThumbnail(message.author.avatarURL())
           .addField(`Atualmente casado(a) com:`, `ㅤʺ <@${marriedTo}> ʺ`, false)
         // .addField(`Casados há:`, moment.duration(new Date(message.createdTimestamp - marriageTimestamp)).humanize(), false)
          .setColor(`${cor}`)
          .setFooter(`Requesitado por: ${message.author.tag}`)
          .setTimestamp();
        message.channel.send(embed).catch(() => {});
    })
      })
      })
      } else {
        message.channel
          .send(`<@${mentioned.id}> não está casado 💔`)
          .catch(() => {});
      }
    }).catch(console.error)
    
  }