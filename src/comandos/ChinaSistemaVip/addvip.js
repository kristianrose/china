const discord = require("discord.js");



//db
const firebase = require("firebase");
const database = firebase.database();

module.exports = (client, message, args) => {
  message.delete();
  var avatar = message.author.avatarURL;
  var tonka = message.guild.iconURL;

  var get = database
    .ref(`Servidores/${message.guild.id}/${message.author.id}/config/canal`)
    .once("value")
    .then(function(valor) {
      var canal = valor.val();

     // let embederro = new discord.RichEmbed()
        //.setColor(cor.oficial)
       // .setDescription("**Você não tem permissão para essa ação!**");
     // if (!message.member.hasPermission("MANAGE_ROLES")) {
      //  return message.channel.send(embederro);
    //  }

      let embederromençãouser = new discord.MessageEmbed()
        .setColor("4959E9")
        .setDescription("**Você esqueceu de mencionar um usuário!**");

      let embederropossui = new discord.MessageEmbed()
        .setColor("4959E9")
        .setDescription("**Esse usuário já possuí esse cargo.**");

      var get = database
        .ref(`Servidores/${message.guild.id}/${message.author.id}/config/tag`)
       .once("value")
        .then(function(valor) {
          var tag = valor.val();
          var olho = message.guild.roles.cache.get(tag);

          if (olho === undefined) {
            return message.channel.send(
              `**${message.author} Você Não tem nenhum vip, ou esqueceu de configurar o cargo.**`
            );
          }

          var olho2 = message.guild.channels.cache.get(canal);

          if (olho2 === undefined) {
            return message.channel.send(
              `**${message.author} **Você Não tem nenhum vip, ou esqueceu de configurar o canal.**`
            );
          }
          let user =
            message.mentions.users.first() ||
            client.users.cache.get(args[0]) 
            

          if (!user) return message.channel.send(embederromençãouser);

          //try {
          var a = message.guild.member(user);

          //try {
          a.roles.add(tag);
          let embedacerto = new discord.MessageEmbed()
            .setColor("4959E9")
            .setThumbnail(user.avatarURL())
            .setTitle("**China • Sistema Vip**")
            .setDescription("> **Vip adicionado com sucesso!**")
            .addField("Informação",
            `**Usuário selecionado: <@${user.id}>**\n` +
            `**Proprietário: ${message.author}**\n` +
            `**Cargo:** <@&${tag}>`, true)
            .setFooter(`Requesitado por: ${message.author.tag}`,message.author.avatarURL());
          message.channel
            .send(embedacerto)
            .then(msg => msg.delete({timeout: 9000}));

          var vipChannel = message.guild.channels.cache.get(canal);

          var tagVip = message.guild.roles.cache.get(tag);
          let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");

          vipChannel.updateOverwrite(tagVip, {
            CONNECT: true,
            SPEAK: true,
            USE_VAD: true
          });//overwritePermissions
          vipChannel.updateOverwrite(everyone, {
            CONNECT: false
          });
        })

        .catch("Erro | Embed Deletada");
    });
};
