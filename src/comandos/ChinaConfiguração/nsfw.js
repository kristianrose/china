const discord = require('discord.js')
const firebase = require('firebase');
const database = firebase.database();
module.exports = async (client, message, args) => {
    message.delete();
   let embederro = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Você não tem permissão para tal sistema!**')
    .setTimestamp()
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(embederro)
            .then(m => m.delete(5000));
    }


    let embederrooff = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Oops, O nsfw já está desativado nesse servidor.***')
    .setTimestamp()

    let embederroon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Oops, O nsfw já está ativado nesse servidor.**')
    .setTimestamp()

    let embedacertooff = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Nsfw foi desativado com sucesso.**')
    .setTimestamp()

    let embedacertoon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Nsfw foi ativadoo com sucesso.**')
    .setTimestamp()


    let embedlogchannel = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription(`**Canal de nsfw definido com sucesso.**`)
    .setTimestamp()

    let embed3 = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Mencione um canal por id**')
    .setTimestamp()

    let embedfinalizaração = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Configuração finalizada com sucesso.**')
    .setTimestamp()


    database.ref(`Servidores/${message.guild.id}/`)
    .once('value').then(async function(snap){
        let NSFW = snap.val().NSFW;
        let NSFWChannel = snap.val().NSFWChannel;


        let embed = new discord.MessageEmbed()
        .setColor('#4959E9')
        .setTitle('China • Gerenciamento')
        .setDescription(`Sistema de nsfw, esse sistema permite que o bot China envie fotos +18 em certo canal.

Servidor: \`${message.guild.name}\`
Após você ligar o sistema de NSFW, selecione o canal para esse canal ser o principal de +18`)
        .addField(`Status Nsfw: ${NSFW ? `<:onnight:799634101715206164> Ativado` : '<:offnight:799634145642807326> Desativado'}`, `Canal nsfw: ${NSFWChannel ? `<#${NSFWChannel}>` : 'Não Configurado'}`, true)
        .addField(`Modo de utilizar:`, `Apenas cargos com permissão de \`ADMINISTRADOR\``)
        .addField(`<:numeronight0:799604096599588884> | Ligar\n<:numeronight1:799604203046567936> | Definir canal nsfw\n<:numeronight2:799604340230586380> | Desligar\n❌ | Cancelar configuração`, `Comandos de NSFW só permitido no canal que você selecionar.`)
        message.channel.send(embed).then(async msg => { 
                await msg.react('799604096599588884')
                await msg.react('799604203046567936')
                await msg.react('799604340230586380')
                await msg.react('❌')
                const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "numeronight0", "numeronight1", "numeronight2", "❌" && u.id === message.author.id))
                collector.on("collect", async r => {
                    switch (r.emoji.name) {
                        case "numeronight0":
                                database.ref(`Servidores/${message.guild.id}/`)
                                .once('value').then(async function(snap) {
                                if (snap.val().NSFW === 1) return message.channel.send(embederroon).then(m => m.delete(5000))
                
                                message.channel.send(embedacertoon).then(m => m.delete(5000));
                
                                if (snap.val() == null) {
                                    database.ref(`Servidores/${message.guild.id}/`)
                                    .set({
                                        NSFW: 1
                                    });
                                  } 
                                  database.ref(`Servidores/${message.guild.id}/`)
                                  .update({
                                    NSFW: NSFW = 1
                                    })
                                  })
                                  msg.edit(embed);
                        break;
                        case "numeronight2":
                
                                database.ref(`Servidores/${message.guild.id}/`)
                                .once('value').then(async function(snap) {
                                if (snap.val().NSFW === 0) return message.channel.send(embederrooff).then(m => m.delete(5000))
                
                                message.channel.send(embedacertooff).then(m => m.delete(5000));
                
                                if (snap.val() == null) {
                                    database.ref(`Servidores/${message.guild.id}/`)
                                    .set({
                                        NSFW: 0
                                    });
                                  } 
                                  database.ref(`Servidores/${message.guild.id}/`)
                                  .update({
                                    NSFW: NSFW = 0
                                    })
                                  })
                                break;
                                case "numeronight1":
                          message.channel.send(embed3).then(m => m.delete(5000));
                         const filter = res1 => {
                            return res1.author.id === message.author.id && res1.content.length;
                        };
                        const canal1 = await message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000
                        });
                        canal1.first().delete();
            
                        const canal2 = canal1.first().content.toLowerCase();
                                        database.ref(`Servidores/${message.guild.id}/`)
                                        .once('value').then(async function(snap){
                                            database.ref(`Servidores/${message.guild.id}/`)
                                            .update({
                                                NSFWChannel: canal2
                                            })
                                            message.channel.send(embedlogchannel).then(m => m.delete(5000));
                                        });
                        
                        
                                break;
                                case "❌":
                                        msg.delete()
                        
                                        message.channel.send(embedfinalizaração).then(m => m.delete(5000))
                        
                                        break;
                };
            });
         });
    })
};
