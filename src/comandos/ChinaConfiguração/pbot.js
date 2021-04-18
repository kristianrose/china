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
    .setColor('#9026cf')
    .setDescription('**Oops, A proteção contra bots já está desativada nesse servidor.**')
    .setTimestamp()

    let embederroon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Oops, A proteção contra bots já está ativada nesse servidor.**')
    .setTimestamp()

    let embedacertooff = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Proteção contra bots foi desativada com sucesso.**')
    .setTimestamp()

    let embedacertoon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Proteção contra bots foi ativada com sucesso.**')
    .setTimestamp()

    database.ref(`Servidores/${message.guild.id}/`)
    .once('value').then(async function(snap){
        let ProteçãoBots = snap.val().ProteçãoBots;

    let embed = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setTitle('China • Gerenciamento')
    .setDescription(`- Proteção contra bots é muito utilizado em servidores, para proteger seu servidor de raids via bot

Servidor: \`${message.guild.name}\`
Lembra-se quando um bot entra no servidor ele é automaticamente banido.`)
    .addField(`Status Proteção Bot: ${ProteçãoBots ? `<:onnight:799634101715206164> Ativado` : '<:offnight:799634145642807326> Desativado'}`, `Apenas usuários com cargo de \`ADMINISTRADOR\``)
    .addField('Modo de utilizar', `<:numeronight0:799604096599588884> | Ligar Proteção 
    <:numeronight1:799604203046567936> | Desligar Proteção`)
    message.channel.send(embed).then(async msg => { 
        await msg.react('799604096599588884')
        await msg.react('799604203046567936')
        const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "numeronight0", "numeronight1", "❌" && u.id === message.author.id), { time: 30000000 })
        collector.on("collect", async r => {
            switch (r.emoji.name) {
                case 'numeronight0':
                        database.ref(`Servidores/${message.guild.id}/`)
                        .once('value').then(async function(snap) {
                        if (snap.val().ProteçãoBots === 1) return message.channel.send(embederroon).then(m => m.delete(5000))
        
                        message.channel.send(embedacertoon).then(m => m.delete(5000));
        
                        if (snap.val() == null) {
                            database.ref(`Servidores/${message.guild.id}/`)
                            .set({
                            ProteçãoBots: 1
                            });
                          } 
                          database.ref(`Servidores/${message.guild.id}/`)
                          .update({
                            ProteçãoBots: ProteçãoBots = 1
                            })
                          })
                          msg.edit(embed);
                break;
                case 'numeronight1':
                        database.ref(`Servidores/${message.guild.id}/`)
                        .once('value').then(async function(snap) {
                        if (snap.val().ProteçãoBots === 0) return message.channel.send(embederrooff).then(m => m.delete(5000))
        
                        message.channel.send(embedacertooff).then(m => m.delete(5000));
        
                        if (snap.val() == null) {
                            database.ref(`Servidores/${message.guild.id}/`)
                            .set({
                            ProteçãoBots: 0
                            });
                          } 
                          database.ref(`Servidores/${message.guild.id}/`)
                          .update({
                            ProteçãoBots: ProteçãoBots = 0
                            })
                          })
                          msg.edit(embed);
                break;
            };
        });
    });
    });
    };
