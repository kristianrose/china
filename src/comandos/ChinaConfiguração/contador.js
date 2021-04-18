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
    .setDescription('**Oops, o contador já está desativado nesse servidor.**')
    .setTimestamp()

    let embederroon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Oops, o contador já está ativado nesse servidor.**')
    .setTimestamp()

    let embedacertooff = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Contador foi desativado com sucesso.**')
    .setTimestamp()

    let embedacertoon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Contador foi ativado com sucesso.**')
    .setTimestamp()

    let embedlogchannel = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription(`**Canal do Contador definido com sucesso.**`)
    .setTimestamp()

    let embedmensagem = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Você Tem 30 Segundos Para Definir A Mensagem Da Função Contador.**')
    .setTimestamp()

    let embedmensagem2 = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**A Mensagem de Contador foi definida com sucesso.**')
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
        let Contador = snap.val().Contador;
        let ContadorChannel = snap.val().ContadorChannel;
        let ContadorMensagem = snap.val().ContadorMensagem;


    let embed = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setTitle('China • Gerenciamento')
    .setDescription(`- O contador mostra a quantidade de usuarios em seu servidor em tempo REAL com diversos emojis liberados, simples né, configure abaixo!

• Servidor: \`${message.guild.name}\``)
    .addField(`Status Contador: ${Contador ? `<:onnight:799634101715206164> Ativado` : '<:offnight:799634145642807326> Desativado'}`, `Canal Contador: ${ContadorChannel ? `<#${ContadorChannel}>` : 'Não configurado'}\nMensagem Contador: ${ContadorMensagem ? `\`\`\`css\n${ContadorMensagem}\`\`\`` : 'Não configurado'}`)
    .addField('**Emojis:**', `Contadores disponiveis !`)
    .addField('<a:0P:698860198357631056>', `{contador}`, true)
    .addField('<a:0SS:698229947369783356>',`{contador2}`, true)
    .addField('<a:00:698859178713939990>', `{contador3}`, true)
    .addField('<a:0B:698857357433634857>', `{contador4}`, true)
    .addField('<:0R:751873468269592648>',  `{contador5}`, true)
    .addField('**Modo de utilizar:**', `<:numeronight0:799604096599588884> | Ligar Contador
    <:numeronight1:799604203046567936> | Desligar Contador
    <:numeronight2:799604340230586380> | Mensagem Contador
    <:numeronight3:799604416629178419> | Definir canal do Contador
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
                        if (snap.val().Contador == 1) return message.channel.send(embederroon).then(m => m.delete(5000))
        
                        message.channel.send(embedacertoon).then(m => m.delete(5000));
        
                        if (snap.val() == null) {
                            database.ref(`Servidores/${message.guild.id}/`)
                            .set({
                                Contador: 1
                            });
                          } 
                          database.ref(`Servidores/${message.guild.id}/`)
                          .update({
                            Contador: Contador = 1
                            })
                          })

                break;
                case 'numeronight1':
                        database.ref(`Servidores/${message.guild.id}/`)
                        .once('value').then(async function(snap) {
                        if (snap.val().Contador == 0) return message.channel.send(embederrooff).then(m => m.delete(5000))
        
                        message.channel.send(embedacertooff).then(m => m.delete(5000));
        
                        if (snap.val() == null) {
                            database.ref(`Servidores/${message.guild.id}/`)
                            .set({
                                Contador: 0
                            });
                          } 
                          database.ref(`Servidores/${message.guild.id}/`)
                          .update({
                            Contador: Contador = 0
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
                                ContadorChannel: canal2
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
                                ContadorMensagem: 0,
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
                            ContadorMensagem: snap.val().ContadorMensagem = boasvindas
                              }) 
                              message.channel.send(embedmensagem2).then(m => m.delete(5000));
                            })
    
                break;
                case '❌':
                    msg.delete();
                    message.channel.send(embedfinalizaração).then(m => m.delete(5000))
                break;
            }
        })
    });
    })
};
module.exports.help = {
name: 'contador',
aliases: ['canalcontador']
};
