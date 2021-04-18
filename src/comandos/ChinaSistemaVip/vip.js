
const discord = require("discord.js");

//db
const firebase = require("firebase");
const database = firebase.database();

module.exports = (client, message, args) => {
  message.delete();
 

  var get = database
    .ref(`Servidores/${message.guild.id}/${message.author.id}/config/canal`)
    .once("value")
    .then(function(valor) {
      var canal = valor.val();

      let embederro = new discord.MessageEmbed()
        .setColor("4959E9")
        .setDescription(
          "**Oops, Você não tem permissão para tal comando!**"
        );
    //  if (!message.member.hasPermission("MANAGE_ROLES")) {
       // return message.channel.send(embederro);
      //}

      let embederropossui = new discord.MessageEmbed()
        .setColor("4959E9")
        .setDescription(
          "**Esse usuário já possuí esse cargo.**"
        );

      var get = database
        .ref(`Servidores/${message.guild.id}/${message.author.id}/config/tag`)
        .once("value")
        .then(function(valor) {
          var tag = valor.val();
          if (tag === null) tag = "Nenhum";
          var get = database
            .ref(
              `Servidores/${message.guild.id}/${message.author.id}/config/canal`
            )
            .once("value")
            .then(function(valor) {
              var canal = valor.val();
              if (canal === null) canal = "Nenhum";
     var olho = message.guild.roles.cache.get(tag);

          if (olho === undefined) {
            return message.channel.send(
              `**${message.author} ** ocê não tem nenhum vip, ou esqueceu de configurar o cargo.**`
            );
          }

          var olho2 = message.guild.channels.cache.get(canal);

          if (olho2 === undefined) {
            return message.channel.send(
              `**${message.author} ** Você não tem nenhum vip, ou esqueceu de configurar o canal.**`
            );
          }
              
                  let embedacerto = new discord.MessageEmbed()
                    .setColor("4959E9")
                    .setAuthor(`China • Sistema Vip`,message.author.displayAvatarURL({dynamic: true}))
                    .setThumbnail(
                      message.author.avatarURL()
                    )
                    .addField(
                      "• **Interface VIP do usuário.**",
                      `Usuário: **${message.author}**\n> Duração: **Permanente**\n> Cargo vinculado:** ${olho}**\n> Canal vinculado:** ${olho2}**\nPara dar seu vip em algum usuário use **n!addvip @usuario`
                    )
               /*     .addField(
                      "Configurações Disponiveis",
                      `> **(EMOJI NIGHT)** Mudar o nome da tag\n> **(EMOJI NIGHT)** Mudar a cor da tag\n\n
        Para dar seu vip em algum usuário use **prefix addvip @usuario**`
                    )*/
                    .setFooter(`Requesitado por: ${message.author.tag}`);

                  message.channel.send(embedacerto)}).the(m => m.delete({timeout: 5000}))
                });
            });
       
};

