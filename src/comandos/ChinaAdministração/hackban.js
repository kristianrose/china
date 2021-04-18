const db = require("mongo/db.js");
const Discord = require("discord.js");

module.exports = async (client, message, args) => {
  message.delete();
  var server = await db.Guilds.findOne({ _id: message.guild.id });
  var aa = await db.Users.findOne({ _id: message.author.id });

  var criar = id => {
    let servidor = new db.Guilds({
      _id: message.guild.id
    });
    servidor.save();
    return servidor;
  };
  var usuario = id => {
    var aiai = new db.Users({
      _id: message.author.id,
      bangif: ""
    });
    aiai.save();
    return aiai;
  };

  if (!server) {
    criar(message.guild.id);
  }
  if (!aa) {
    usuario(message.author.id);
  }

  if (!message.member.permissions.has("BAN_MEMBERS")) {
    return message.channel
      .send(
        `**${message.author}, Você precisa possuir permissão de banir para usar tal comando.**`
      )
      .then(msg => msg.delete(15000));
  }

  let banPerms = message.guild.member(client.user).permissions.has("BAN_MEMBERS");
  if (!banPerms)
    return message.channel
      .send(
        `**${message.author}, Não tenho permissão para banir usuários nesse servidor.**`
      )
      .then(msg => msg.delete(15000));

  let mention =
    message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  /* ? message.mentions.members.first() 
  : client.users.get(args[0]) 
  ? client.users.get(args[0]) 
  : message.guild.members.find(user => user.user.username === args[0]) 
  ? message.guild.members.find(user => user.user.username === args[0]) 
  : message.guild.members.find(user => user.user.tag === args[0]) 
  ? message.guild.members.find(user => user.user.tag === args[0]) 
  : false*/
  if (!mention)
    return message.channel
      .send(`**${message.author}, mencione um usuário ou especifique um ID.**`)
      .then(msg => msg.delete(10000));

  let bannable = message.guild.member(mention);
  if (bannable) {
    if (bannable.roles.highest.position >= message.member.roles.highest.position) {
      return message.channel
        .send(`**${message.author}, você não pode banir esse usuário.**`)
        .then(msg => msg.delete(15000));
    }
  }

  var args = args;
  let kael = args.slice(1).join(" ")
    ? args.slice(1).join(" ")
    : `Banido por ${message.author.username}#${message.author.discriminator} — Não relatou um motivo.`;

  message.guild.members.ban(mention, { days: 7, reason: kael });

  let bangif = aa.bangif || "https://media.discordapp.net/attachments/744643108351770726/800105059698212904/white-background-2-768x450.png";

  /* Mensagem de sucesso */
  var ban = new Discord.MessageEmbed();
  ban.setThumbnail(message.author.displayAvatarURL())
  ban.setImage(`${aa.bangif}`);
  ban.setDescription(`${message.author} baniu ${mention}!`);
  ban.addField("Usuário:", `${mention}`, true);
  ban.addField("ID:", `${mention.id}`, true);
  ban.addField("Motivo:", `${kael}`, false);
  ban.setColor("4959E9");
  message.channel.send({ embed: ban }).then(msg => msg.delete(20000));
   console.log(ban)
    console.log(ban.setImage(aa.bangif))

  /* Mensagem no privado */
  var banPV = new Discord.MessageEmbed();
  banPV.setAuthor(`${message.guild.name} | Notificação`, client.user.avatarURL());
  banPV.setThumbnail(`${message.guild.iconURL}`);
  banPV.setDescription(
    `Você foi banido de nosso servidor, entre em contato com ${message.author}, caso seja algum engano!`
  );
  banPV.addField("Motivo:", `${kael}`, false);
  banPV.setColor("4959E9");
  banPV.setTimestamp();
  mention.send({ embed: banPV });

  /* Mensagem no informes */
  var banInformes = new Discord.MessageEmbed();
  banInformes.setAuthor("China • Punições", client.user.avatarURL());
  banInformes.setThumbnail(message.author.avatarURL());
  banInformes.setImage(`${aa.bangif}`);
  banInformes.addField("Responsável:", `${message.author}`, true);
  banInformes.addField("Usuário:", `${mention}`, true);
  banInformes.addField("ID Responsável:", `${message.author.id}`, true);
  banInformes.addField("ID Usuário:", `${mention.id}`, true);
  banInformes.addField("Motivo:", `${kael}`, false);
  banInformes.setColor("4959E9");
  if (
    server.logg_banAction &&
    client.guilds.cache.get(message.guild.id).channels.cache.get(server.logg_banAction)
  ) {
    client.guilds.cache
      .get(message.guild.id)
      .channels.cache.get(server.logg_banAction)
      .send({ embed: banInformes });
  }
  

};

