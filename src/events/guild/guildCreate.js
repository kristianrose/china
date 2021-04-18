const Discord = require("discord.js");
const db = require("mongo/db.js");
async function newDocDB(doc, res) {
  if (doc === "guilds") {
    var guilda = new db.Guilds({
      _id: res.id,
      autorole: "",
      welcome: "",
      numero: "",
      welcomeChannel: "",
      bye: "",
      byeChannel: "",
      dm: "",
      prefixo: "i!",
      lang: "pt-BR",
      slow: 0,
      texto: "",
      bkchannel: [],
      convites: false,
      convitesES: false,
      invs: false,
      td: false,
      logg_MD: "",
      logg_MUP: "",
      logg_mGA: "",
      logg_mGR: "",
      logg_mGB: "",
      logg_banAction: "",
      girl: "",
      man: "",
      staffer: []
    });
    guilda.save();
  }
}

module.exports = (client, guild) => {
  db.Guilds.findOne({
    _id: guild.id
  }).then(servidor => {
    if (!servidor) {
      var doc = "guilds";
      var res = guild;
      newDocDB(doc, res);
    }
  });

  console.log(
    `Bot adicionado em ${guild.name}/${guild.id} com ${guild.memberCount} membros.`
  );
  let serverID = '798818314712645662'
  let canalID = '799635647866339389'
  const embed = new Discord.MessageEmbed()
    .setTitle(`O servidor ${guild.name}/${guild.id} me escolheu!`)
    .setThumbnail(guild.iconURl)
    .addField('Proprietário:', `<@${guild.ownerID}>/${guild.ownerID}`, true)
    .addField(`N° de Usuários:`, Number(guild.members.cache.size).toLocaleString(), true)
    .addField('N° de Servidores:', client.guilds.cache.size, false)
  client.guilds.cache.get(serverID).channels.cache.get(canalID).send({ embed })


};
