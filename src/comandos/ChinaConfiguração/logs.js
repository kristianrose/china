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
    .setDescription('**Oops, O logs já está desativado nesse servidor.**')
    .setTimestamp()

    let embederroon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Oops, O logs já está ativado nesse servidor.**')
    .setTimestamp()

    let embedacertooff = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Logs foi desativado com sucesso.**')
    .setTimestamp()

    let embedacertoon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Logs foi ativado com sucesso.**')
    .setTimestamp()


    let embedlogchannel = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription(`**Canal de logs definida com sucesso.**`)
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
        let Logs = snap.val().Logs;
        let LogsChannel = snap.val().LogsChannel;


        let embed = new discord.MessageEmbed()
        .setColor('#4959E9')
        .setTitle('China • Gerenciamento')
        .setDescription(`- O sistema de logs, serve muito para você ter total controle do seu servidor. após ativar esse sistema você vai ter acesso os seguintes logs:

 Banimento. |  Desbanimento.
 Criação de Canais. |  Exclusão de Canais.
 Criação de Cargos. |  Exclusão de Cargos.
 Criação de Emojis. | Exclusão de Emojis.
 Exclusão de Mensagens. |  Mensagens atualizadas.

 Servidor: \`${message.guild.name}\``)
        .addField(`Status Logs: ${Logs ? `<:onnight:799634101715206164> Ativado` : '<:offnight:799634145642807326> Desligado'}`, `Canal Logs: ${LogsChannel ? `<#${LogsChannel}>` : 'Não Configurado'}`, true)
        .addField('**Modo de utilizar:**', `<:numeronight0:799604096599588884> | Ligar
        <:numeronight1:799604203046567936> | Selecionar Canal
        <:numeronight2:799604340230586380> | Desligar
        ❌ | Cancelar configuração`)
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
                                if (snap.val().Logs === 1) return message.channel.send(embederroon).then(m => m.delete(5000))
                
                                message.channel.send(embedacertoon).then(m => m.delete(5000));
                
                                if (snap.val() == null) {
                                    database.ref(`Servidores/${message.guild.id}/`)
                                    .set({
                                        Logs: 1
                                    });
                                  } 
                                  database.ref(`Servidores/${message.guild.id}/`)
                                  .update({
                                    Logs: Logs = 1
                                    })
                                  })
                                  msg.edit(embed);
                        break;
                        case "numeronight2":
                
                                database.ref(`Servidores/${message.guild.id}/`)
                                .once('value').then(async function(snap) {
                                if (snap.val().Logs === 0) return message.channel.send(embederrooff).then(m => m.delete(5000))
                
                                message.channel.send(embedacertooff).then(m => m.delete(5000));
                
                                if (snap.val() == null) {
                                    database.ref(`Servidores/${message.guild.id}/`)
                                    .set({
                                        Logs: 0
                                    });
                                  } 
                                  database.ref(`Servidores/${message.guild.id}/`)
                                  .update({
                                    Logs: Logs = 0
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
                                                LogsChannel: canal2
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
