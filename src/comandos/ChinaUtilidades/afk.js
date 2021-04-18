const discord = require('discord.js');
const firebase = require('firebase');
const database = firebase.database();
module.exports = async (client, message, args) => {
    message.delete();

    let embederro = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription(`** <@${message.author.id}> Descreva uma razão para o modo ausente.**`)

    let embedacerto = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription(`** <@${message.author.id}> Modo ausente ativado!**`)

    let razãoafk = args.join(" ").slice(0);
    if (!razãoafk) return message.channel.send(embederro).then(m => m.delete(5000));

    database.ref(`Membros/${message.author.id}`)
    .once('value').then(async function(snap){
        let AfkI = snap.val().AfkI;
        let AfkMotivo = snap.val().AfkMotivo;

        AfkMotivo = snap.val().AfkMotivo = razãoafk;
        AfkI = snap.val().AfkI = 1;

        database.ref(`Membros/${message.author.id}`)
        .update({
          AfkI: AfkI,
          AfkMotivo: AfkMotivo
        })
    })

    message.channel.send(embedacerto).then(m => m.delete(5000));
};