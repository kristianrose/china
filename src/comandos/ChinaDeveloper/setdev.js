const Discord = require("discord.js");
//db
const firebase = require("firebase");
const database = firebase.database();


module.exports = async(client, message, args) => {
  if (
    !["552942821305221136"].some(
      a => message.author.id === a
    )
  )
    return message.channel.send(
      "Apenas desenvolvedores do bot podem utilizar este comando!"
    );
 let mlk = message.mentions.users.first();
  if (!args[0]) {
    mlk = message.author;
  }
 let a = new Discord.MessageEmbed()
.setColor("4959E9")
 .addField(`> **Developer's**`,`Dev: **<@552942821305221136>/Kristian**`)
   
 message.channel.send(a).then( msg => {
            msg.react('701567671791124601').then(r => {// 1
               const devFilter = (reaction, user) => reaction.emoji.id === "701567671791124601" && user.id === message.author.id;
               const dev = msg.createReactionCollector(devFilter, { time: 60000 });
   dev.on("collect", r2 => {
                            
         
                                                 let manu2 =  new Discord.MessageEmbed()    
                          .setTitle(client.user.username)
                .setDescription(`**agr o usuario: <@${mlk.id}> recebeu o emblema****`)
                   message.channel.send(manu2)
                    
                            
                        database.ref(`membros/avatar/${mlk.id}/config`)

                  .update({
                    dev: ";-;"
            })     
                    database.ref(`membros/avatar/${mlk.id}/config`)

                  .update({
                    iconi: "China • Desenvolvedor"
            })     
      database.ref(`membros/avatar/${mlk.id}/config`)

                  .update({
                    cor: "#4959E9"
            })     
    
   })
            })
 })
                                                 
}

