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
    .setDescription('**Oops, o boas Vindas já está desativado nesse servidor.**')
    .setTimestamp()

    let embederroon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Oops, o boas Vindas já está ativado nesse servidor.**')
    .setTimestamp()

    let embedacertooff = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Boas Vindas foi desativado com sucesso.**')
    .setTimestamp()

    let embedacertoon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Boas Vindas foi ativado com sucesso.**')
    .setTimestamp()

    let embedlogchannel = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription(`**Boas Vindas definida com sucesso.**`)
    .setTimestamp()

    let embedmensagem = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Você Tem 30 Segundos Para Definir A Mensagem Da Função Boas Vindas.**')
    .setTimestamp()

    let embedmensagem2 = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**A Mensagem de boas vindas foi definida com sucesso.**')
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
        let BemVindo = snap.val().BemVindo;
        let BemVindoChannel = snap.val().BemVindoChannel;
        let BemVindoMensagem = snap.val().BemVindoMensagem;

    let embed = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setTitle('China • Gerenciamento')
    .setDescription(`- O sistema de boas vindas é famoso por dar boas vindas a novos membros em seu servidor, simples né, configure abaixo!

• Servidor: \`${message.guild.name}\``)
    .addField(`Status Boas Vindas: ${BemVindo ? `<:onnight:799634101715206164> Ativado` : '<:offnight:799634145642807326> Desativado'}`, `Canal Boas Vindas: ${BemVindoChannel ? `<#${BemVindoChannel}>` : 'Não configurado'} \nMensagem Boas Vindas: ${BemVindoMensagem ? `\`\`\`css\n${BemVindoMensagem}\`\`\`` : 'Não configurado'}`)
    .addField('**Markdown da Night:**', `Para marcar o usuário: {usuario}
Para colocar nome do servidor: {guild}
Para apenas dizer o nome do usuário: {name}`)
    .addField('**Modo de utilizar:**', `<:numeronight0:799604096599588884> | Ligar Boas Vindas
    <:numeronight1:799604203046567936> | Desligar Boas Vindas
    <:numeronight2:799604340230586380> | Mensagem boas vindas
    <:numeronight3:799604416629178419> | Definir canal de boas vindas
    ❌ | Cancelar configuração`)
    message.channel.send(embed).then(async msg => { 
        await msg.react('799604096599588884')
        await msg.react('799604203046567936')
        await msg.react('799604340230586380')
        await msg.react('799604416629178419')
        await msg.react('❌')
        const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "numeronight0", "numeronight1", "numeronight2", "numeronight3", "❌" && u.id === message.author.id), { time: 30000000 })
        collector.on("collect", async r => {
            switch (r.emoji.name) {
                case 'numeronight0':
                        database.ref(`Servidores/${message.guild.id}/`)
                        .once('value').then(async function(snap) {
                        if (snap.val().BemVindo == 1) return message.channel.send(embederroon).then(m => m.delete(5000))
        
                        message.channel.send(embedacertoon).then(m => m.delete(5000));
        
                        if (snap.val() == null) {
                            database.ref(`Servidores/${message.guild.id}/`)
                            .set({
                            BemVindo: 1
                            });
                          } 
                          database.ref(`Servidores/${message.guild.id}/`)
                          .update({
                            BemVindo: BemVindo = 1
                            })
                          })
                break;
                case 'numeronight1':
                        database.ref(`Servidores/${message.guild.id}/`)
                        .once('value').then(async function(snap) {
                        if (snap.val().BemVindo == 0) return message.channel.send(embederrooff).then(m => m.delete(5000))
        
                        message.channel.send(embedacertooff).then(m => m.delete(5000));
        
                        if (snap.val() == null) {
                            database.ref(`Servidores/${message.guild.id}/`)
                            .set({
                            BemVindo: 0
                            });
                          } 
                          database.ref(`Servidores/${message.guild.id}/`)
                          .update({
                            BemVindo: BemVindo = 0
                            })
                          })
                break;
                case "numeronight3":
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
                                BemVindoChannel: canal2
                            })
                            message.channel.send(embedlogchannel).then(m => m.delete(5000));
                        });
                break;
                case "numeronight2":
                        message.channel.send(embedmensagem).then(m => m.delete(5000));
    
                        database.ref(`Servidores/${message.guild.id}/`)
                        .once('value').then(async function(snap) {
                  
                          if (snap.val() == null) {
                            database.ref(`Servidores/${message.guild.id}/`)
                            .set({
                            BemVindoMensagem: 0,
                           });
                          } 
                  
                          const filter2 = res1 => {
                            return res1.author.id === message.author.id && res1.content.length;
                        };
                        const msgboasvindas = await message.channel.awaitMessages(filter2, {
                            max: 1,
                            time: 30000
                        });
                        msgboasvindas.first().delete();
            
                        const boasvindas = msgboasvindas.first().content.toLowerCase();
                  
                        database.ref(`Servidores/${message.guild.id}/`)
                          .update({
                            BemVindoMensagem: snap.val().BemVindoMensagem = boasvindas
                              }) 
                              message.channel.send(embedmensagem2).then(m => m.delete(5000));
                            })
    
                break;
                case '❌':
                    msg.delete();
                    message.channel.send(embedfinalizaração).then(m => m.delete(5000))
                break;
            };
        });
    });

    });

};

