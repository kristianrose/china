const Discord = require("discord.js");
//db
const firebase = require("firebase");
const database = firebase.database();

module.exports = (client, message, args) => {
  message.delete();

  var user = message.mentions.users.first() || client.users.cache.get(args[0]);
  if (!args[0]) {
    user = message.author;
  }
  let embederro = new Discord.MessageEmbed()
    .setColor("4959E9")
    .setDescription(
      "**Oops, Você não tem permissão para tal comando!**"
    );
  if (!message.member.hasPermission("MANAGE_ROLES")) {
    return message.channel.send(embederro);
  }
  var get = database
    .ref(`Servidores/${message.guild.id}/${user.id}/config/canal`)
    .once("value")
    .then(function(valor) {
      var canal = valor.val();
      if (canal === null) canal = "Nenhum";
      var u = message.guild.channels.cache.get(canal);
      if (u === undefined) u = "Nao Setado";
      var get = database
        .ref(`Servidores/${message.guild.id}/${user.id}/config/tag`)
        .once("value")
        .then(function(valor) {
          var tag = valor.val();
          if (tag === null) tag = "Nenhum";
          var uu = message.guild.roles.cache.get(tag);
          if (uu === undefined) uu = "Nao Setado";
          let embed = new Discord.MessageEmbed()
            embed.setAuthor(`China • Gerenciamento Vip`)
            .setThumbnail(
              user.avatarURL()
            )
            embed.addField("> **Informações:**",
              ` **Usuário Selecionado:** <@${user.id}>
**Tag Vinculada:** **${uu}**
**Canal Vinculado:** **${u}**
**Duração  atual do vip:** Permanente`
            )
            embed.addField("> **Configurações:**",
              `<:numeronight0:799604096599588884> **| Vincular uma tag vip ao usuário**\n<:numeronight2:799604203046567936> **| Vincular um canal ao usuário**
**<:numeronight2:799604340230586380> | Adicionar Tempo ao VIP do usuário**\n<:numeronight3:799604416629178419> **| Desvincular tag e canal do usuário**`
            )
            .setColor("4959E9")
          message.channel.send(embed).then(msg => {
            msg.react("799604096599588884").then(r => {
              // 1
              msg.react("799604340230586380").then(r => {
                // 2
                msg.react("799604203046567936").then(r => {
                  // 3
                  msg.react("799604416629178419").then(r => {
                    // 4
                    //745010736186523749
//\<:yae3p:747764657590239243>
                    //\<:yae4p:747764753023107134>
                    const tagFilter = (reaction, user) =>
                      reaction.emoji.id === "799604096599588884" &&
                      user.id === message.author.id;
                    const resetFilter = (reaction, user) =>
                      reaction.emoji.id === "799604203046567936" &&
                      user.id === message.author.id;
                    const canalFilter = (reaction, user) =>
                      reaction.emoji.id === "799604340230586380" &&
                      user.id === message.author.id;
                    const tempoFilter = (reaction, user) =>
                      reaction.emoji.id === "799604416629178419" &&
                      user.id === message.author.id;
                    const setarCANAL = msg.createReactionCollector(
                      canalFilter,
                      { time: 60000 }
                    );
                    const setarRESET = msg.createReactionCollector(
                      resetFilter,
                      { time: 60000 }
                    );
                    const setarTAG = msg.createReactionCollector(tagFilter, {
                      time: 60000
                    });
                    const setarTEMPO = msg.createReactionCollector(
                      tempoFilter,
                      { time: 60000 }
                    );

                    //1

                    setarRESET.on("collect", r2 => {
                      let tag11 = new Discord.MessageEmbed()
                       .setAuthor(`China • Gerenciamento Vip`)
                      .setThumbnail(
                        user.avatarURL()
                      )
                      .addField("> **Informações:**",
                        ` **Usuário Selecionado:** <@${user.id}>
**Tag Vinculada:** **Nao Setado**
**Canal Vinculado:** **Setado**
**Duração  atual do vip:** Permanente`
                                )
                                .addField("> **Configurações:**",
                                `<:numeronight0:799604096599588884> **| Vincular uma tag vip ao usuário**\n<:numeronight2:799604203046567936> **| Vincular um canal ao usuário**
                  **<:numeronight2:799604340230586380> | Adicionar Tempo ao VIP do usuário**\n<:numeronight3:799604416629178419> **| Desvincular tag e canal do usuário**`
                              )
                       .setColor("4959E9")
                      msg.edit(tag11);

                      message.channel.send(
                        `**${message.author} Resetado com Sucesso.**`
                      );

                      database
                        .ref(`Servidores/${message.guild.id}/${user.id}/config`)

                        .update({
                          tag: null
                        });
                      database
                        .ref(`Servidores/${message.guild.id}/${user.id}/config`)

                        .update({
                          canal: null
                        });
                    });
                    setarTEMPO.on("collect", r2 => {
                      // message.channel.send(`${message.author}**| Mencione um cargo de voz ou utilize um ID.**`).then(m => {
                    });

                    setarTAG.on("collect", r2 => {
                      var get = database
    .ref(`Servidores/${message.guild.id}/${user.id}/config/canal`)
    .once("value")
    .then(function(valor) {
      var canal = valor.val();
      if (canal === null) canal = "Nenhum";
      var u = message.guild.channels.cache.get(canal);
      if (u === undefined) u = "Nao Setado";
      var get = database
        .ref(`Servidores/${message.guild.id}/${user.id}/config/tag`)
        .once("value")
        .then(function(valor) {
          var tag = valor.val();
                      message.channel
                        .send(
                          `**${message.author} Mencione um cargo ou utilize um ID.**`
                        )
                        .then(mm => {
                          let hxn = message.channel
                            .createMessageCollector(
                              x => x.author.id === message.author.id,
                              {
                                max: 1
                              }
                            )
                            .on("collect", c => {
                              mm.delete();

                              let rolll =
                                c.mentions.roles.keys().next().value ||
                                c.content;

                              c.delete();

                              let err = new Discord.MessageEmbed();

                              if (!message.guild.roles.cache.get(rolll))
                                return message.channel
                                  .send(
                                    `**${message.author} Digite um cargo valido.** `
                                  )
                                  .then(a => {
                                    a.delete(7000);
                                  });
                              var rrr = message.guild.roles.cache.get(rolll);
                              var a = message.guild.member(user);

                              //try {
                              a.roles.add(rrr);
                              /* if(uu.id === rolll.id) {
                                 return message.channel.send(`Este cargo ja esta sendo utilizado`)
                               }*/
                              database
                                .ref(
                                  `Servidores/${message.guild.id}/${user.id}/config`
                                )
                                .update({
                                  tag: rrr.id
                                });
var a = message.guild.channels.cache.get(canal)
                              let tag1 = new Discord.MessageEmbed()
                              .setAuthor(`China • Gerenciamento Vip`)
                              .setThumbnail(
                                user.avatarURL()
                              )
                              .addField("> **Informações:**",
                                ` **Usuário Selecionado:** <@${user.id}>
**Tag Vinculada:** **${rrr}**
**Canal Vinculado:** **${u}**
**Duração  atual do vip:** Permanente`
                                )
                                .addField("> **Configurações:**",
                                `<:numeronight0:799604096599588884> **| Vincular uma tag vip ao usuário**\n<:numeronight2:799604203046567936> **| Vincular um canal ao usuário**
                  **<:numeronight2:799604340230586380> | Adicionar Tempo ao VIP do usuário**\n<:numeronight3:799604416629178419> **| Desvincular tag e canal do usuário**`
                              )
                              .setColor("4959E9")
                              msg.edit(tag1);
                              message.channel
                                .send(
                                  `**${message.author} Cargo setado: ${rrr}**`
                                )
                                .then(msg => msg.delete({timeout: 12000}))
                                .catch(() => {});
                            });
                        });
                    });
    })
                      })
                  
             
          
      
     

                    setarCANAL.on("collect", r2 => {
                      var get = database
    .ref(`Servidores/${message.guild.id}/${user.id}/config/canal`)
    .once("value")
    .then(function(valor) {
      var canal = valor.val();
      if (canal === null) canal = "Nenhum";
      var u = message.guild.channels.cache.get(canal);
      if (u === undefined) u = "Nao Setado";
      var get = database
        .ref(`Servidores/${message.guild.id}/${user.id}/config/tag`)
        .once("value")
        .then(function(valor) {
          var tag = valor.val();
                      message.channel
                        .send(
                          `**${message.author} Mencione um canal de voz ou utilize um ID.**`
                        )
                        .then(m => {
                          let hxn = message.channel
                            .createMessageCollector(
                              x => x.author.id === message.author.id,
                              {
                                max: 1
                              }
                            )
                            .on("collect", c => {
                              let roll =
                                c.mentions.channels.keys().next().value ||
                                c.content;

                              m.delete();
                              c.delete();
                              let err = new Discord.MessageEmbed();

                              if (!message.guild.channels.cache.get(roll))
                                return message.channel
                                  .send(
                                    `**${message.author} Digite um canal valido.** `
                                  )
                                  .then(a => {
                                    a.delete(7000);
                                  });
                              var rr = message.guild.channels.cache.get(roll);
                              if (rr.type !== "voice")
                                return message.channel
                                  .send(
                                    `**${message.author} O canal precisa ser um canal de vóz**`
                                  )
                                  .then(msg => msg.delete(3000))
                                  .catch(() => {});

                              database
                                .ref(
                                  `Servidores/${message.guild.id}/${user.id}/config`
                                )

                                .update({
                                  canal: rr.id
                                });
var t = message.guild.roles.cache.get(tag)
if (t === undefined) t = "Nao Setado";
                              // const everyone = message.guild.roles.cache.find(e => e.name === `${tag}`);
                              // canal.overwritePermissions(message.guild.roles.cache.find(e => e.name === '@everyone'), { 'CONNECT' : false });
                              //canal.overwritePermissions(message.guild.roles.cache.find(e => e.name === tag), { 'CONNECT' : true });

                              let l = new Discord.MessageEmbed()
                              .setAuthor(`China • Gerenciamento Vip`)
                              .setThumbnail(
                                user.avatarURL()
                              )
                              .addField("> **Informações:**",
                                ` **Usuário Selecionado:** <@${user.id}>
**Tag Vinculada:** **${t}**
**Canal Vinculado:** **${rr}**
**Duração  atual do vip:** Permanente`
                                )
                                .addField("> **Configurações:**",
                                `<:numeronight0:799604096599588884> **| Vincular uma tag vip ao usuário**\n<:numeronight2:799604203046567936> **| Vincular um canal ao usuário**
                  **<:numeronight2:799604340230586380> | Adicionar Tempo ao VIP do usuário**\n<:numeronight3:799604416629178419> **| Desvincular tag e canal do usuário**`
                              )
                               .setColor("4959E9")
                              msg.edit(l);
                              message.channel
                                .send(
                                  `**${message.author} Canal setado em: ${rr}**`
                                )
                                .then(msg => msg.delete({timeout:12000}))
                                .catch(() => {});
                            });
                        });
                    });
    })
              
      })
        })     
                })
              })
          })
        }) 
        })
      })
};


