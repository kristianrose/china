const firebase = require('firebase');
const database = firebase.database();
const Discord = require('discord.js');

module.exports = async (client, message, args) => {


    //seleção de menção
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
  } 

  database.ref(`Membros/${user.id}/`)
  .once('value').then(async function(snap){
    let Level = snap.val().Level;
    let Xp = snap.val().Xp;
    let Coins = snap.val().Coins;
    let Reputação = snap.val().Reputação;
    let imagem = snap.val().Background;
    let ClanNome = snap.val().ClanNome;
    let Clan = snap.val().Clan;
    let ClanCargo = snap.val().ClanCargo;
    let Comum = snap.val().Comum;
    let Rara = snap.val().Rara;
    let Epica = snap.val().Epica;
    let Lendaria = snap.val().Lendaria;
    let Sobre = snap.val().Sobre;


    if (ClanCargo === 0) {
        ClanCargo = 'Nenhum'
    }

    if (ClanCargo === 1) {
        ClanCargo = 'Membro'
    }

    if (ClanCargo === 2) {
        ClanCargo = 'Admin'
    }

    if (ClanCargo === 3) {
        ClanCargo = 'Dono'
    }

    if (Clan === 0) {
        Clan = 'Nenhum'
    }

    if (Clan === 1) {
        Clan = `Tem`
    }







    let embedinicio = new Discord.MessageEmbed()
    .setColor('4959E9')
    .setThumbnail(user.avatarURL())
    .addField('Usuário:', `<@${user.id}>`, true)
    .addField('ID:', `${user.id}`, true)
    .addField('Level:', `${Level}\n Xp: ${Xp}`, true)
    .addField('Coins:', `${Coins}`, true)
    .addField('Reputação:', `${Reputação}`, true)
    .addField('Clan:', `${Clan}`, true)
    .addField('Nome Clan:', `.${ClanNome}`, true)
    .addField('Cargo Clan:', `${ClanCargo}`, true)
    .addField('Sobre:', `${Sobre}`, true)
    .setFooter(' 📦 Caixas | 🏠 Perfil')

    let embedbox = new Discord.MessageEmbed()
    .setColor('4959E9')
    .setThumbnail(user.avatarURL())
    .addField('Usuário:', `<@${user.id}>`, true)
    .addField('ID:', `${user.id}`, true)
    .addField('Comum:', `${Comum}`, true)
    .addField('Rara:', `${Rara}`, true)
    .addField('Epica:', `${Epica}`, true)
    .addField('Lendaria:', `${Lendaria}`, true)
    .setFooter('📦 Caixas | 🏠 Perfil')


  message.channel.send(embedinicio).then(async msg => { 
    await msg.react('📦')
    await msg.react('🏠')
    const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "📦", "🏠" && u.id === message.author.id), { time: 30000000 })
    collector.on("collect", async r => {
        switch (r.emoji.name) {
            case "📦":
            msg.edit(embedbox)
            break;
            case "🏠":
            msg.edit(embedinicio)
            break;
                }
            });
        });
    });
};



