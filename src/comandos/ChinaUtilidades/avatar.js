const Discord = require("discord.js");
                 /// Rapidas

//db
const firebase = require("firebase");
const database = firebase.database();

module.exports = (client, message, args) => {
  let mlk = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
 let feat = `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.${message.author}.avatar.startsWith("a_) ? "gif" : "jpg"}`
  var get = database
    .ref(`devds/avatar/${mlk.id}/config/dev`)
    .once("value")
    .then(function(valor) {
      var avatar = valor.val() 
      if (avatar === null) avatar = " China • User"
      var get = database
    .ref(`devds/avatar/${mlk.id}/config/iconi`)
    .once("value")
    .then(function(valor) {
      var iconi = valor.val() 
if (iconi === null) iconi = ""
      var get = database
    .ref(`devds/avatar/${mlk.id}/config/cor`)
    .once("value")
    .then(function(valor) {
      var cor = valor.val() 
if (cor === null) cor = "4959E9"
     
  let msg = new Discord.MessageEmbed()
    .setTitle(`${avatar} ${iconi}`)
    .setDescription(`**Avatar de ${mlk.username}**`)
  //.setDescription(`**[Clique aqui](${mlk.avatarURL})** **para baixar**`)
    .setImage(
      `https://cdn.discordapp.com/avatars/${mlk.id}/${mlk.avatar}.${
        mlk.avatar.startsWith("a_") ? "gif" : "png"
      }?size=2048`
    )
   .setFooter(`Requesitado por ${message.author.tag}`)
   .setColor(`${cor}`)
   message.channel.send(msg);
    
    })
    })
    })
}

