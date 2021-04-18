const discord = require('discord.js')
const firebase = require('firebase');
const database = firebase.database();
module.exports = async(client, message, args) => {

    let embederro = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Nenhuma caixa foi dropada ainda.**')
    .setTimestamp()


    let embedcomum = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription(`**Parabéns ${message.author.tag} você conseguiu uma caixa comum.**`)

    let embedrara = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription(`**Parabéns ${message.author.tag} você conseguiu uma caixa rara.**`)

    let embedepica = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription(`**Parabéns ${message.author.tag} você conseguiu uma caixa epica.**`)

    let embedlendaria = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription(`**Parabéns ${message.author.tag} você conseguiu uma caixa lendaria.**`)

    database.ref(`Servidores/${message.guild.id}/`)
    .once('value').then(async function(snap){
        let Caixa = snap.val().Caixa;
        let Caixatipo = snap.val().Caixatipo;

        if (Caixa == 0) return message.channel.send(embederro).then(m => m.delete(5000));

        if(Caixatipo == 'Comum') {

            database.ref(`Servidores/${message.guild.id}/`)
            .update({
                Caixa: Caixa = 0
              })

            database.ref(`Membros/${message.author.id}/`)
            .once('value').then(async function(snap){
                let Comum = snap.val().Comum

                database.ref(`Membros/${message.author.id}/`)
                .update({
                    Comum: Comum + parseInt(1)
                  })

            })

            message.channel.send(embedcomum).then(m => m.delete(5000))
        }

        if(Caixatipo == 'Rara') {

            database.ref(`Servidores/${message.guild.id}/`)
            .update({
                Caixa: Caixa = 0
              })

            database.ref(`Membros/${message.author.id}/`)
            .once('value').then(async function(snap){
                let Rara = snap.val().Rara

                database.ref(`Membros/${message.author.id}/`)
                .update({
                    Rara: Rara + parseInt(1)
                  })

            })

            message.channel.send(embedrara).then(m => m.delete(5000))
        }

        if(Caixatipo == 'Epica') {

            database.ref(`Servidores/${message.guild.id}/`)
            .update({
                Caixa: Caixa = 0
              })

            database.ref(`Membros/${message.author.id}/`)
            .once('value').then(async function(snap){
                let Epica = snap.val().Epica

                database.ref(`Membros/${message.author.id}/`)
                .update({
                    Epica: Epica + parseInt(1)
                  })

            })

            message.channel.send(embedepica).then(m => m.delete(5000))
        }

        if(Caixatipo == 'Lendaria') {

            database.ref(`Servidores/${message.guild.id}/`)
            .update({
                Caixa: Caixa = 0
              })

            database.ref(`Membros/${message.author.id}/`)
            .once('value').then(async function(snap){
                let Lendaria = snap.val().Lendaria

                database.ref(`Membros/${message.author.id}/`)
                .update({
                    Lendaria: Lendaria + parseInt(1)
                  })

            })

            message.channel.send(embedlendaria).then(m => m.delete(5000))
        }
    });
};

