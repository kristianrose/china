const discord = require('discord.js')
const firebase = require('firebase');
const database = firebase.database();


module.exports = async (client, message, args) => {
    message.delete();
    let embederro = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription(`**${message.author}, Você não tem permissão para tal sistema!**`)

    if(!message.member.permissions.has("ADMINISTRATOR")) {
        return message.channel.send(embederro)
            .then(m => m.delete(5000));
    }

    //embeds

    let embederrooff = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Oops, o AutoRole já está desativado nesse servidor.**')


    let embederroon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Oops, o AutoRole já está ativado nesse servidor.**')


    let embedacertooff = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**O AutoRole foi desativado com sucesso.**')


    let embedacertoon = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**O AutoRole foi ativado com sucesso.**')


    let embedcargoautorole = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Você tem 30 segundos para definir o cargo.**')
    .setTimestamp()

    let embedcargoautoroleacerto = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**O cargo do AutoRole foi definido com sucesso.**')

    let embed3 = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Mencione um canal por id**')
    .setTimestamp()

    let embedfinalizaração = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Configuração finalizada com sucesso.**')



    database.ref(`Servidores/${message.guild.id}/`)
    .once('value').then(async function(snap){
        let Autorole = snap.val().Autorole;
        let Autoroletag = snap.val().Autoroletag;
        


    let embed = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setTitle('China • Gerenciamento')
    .setDescription(`- O sistema de autorole da um cargo automaticamente para usuarios novos no servidor, configure abaixo!

Servidor: \`${message.guild.name}\``)
    .addField('AutoRole Status:', `${Autorole ? `<:onnight:799634101715206164> Ativado` : '<:offnight:799634145642807326> OFF'}`, true)
    .addField('AutoRole Cargo:', `${Autoroletag ? `${Autoroletag}` : ' Não Configurado'}`, true)
    .addField('**Modo de utilizar:**', `<:numeronight0:799604096599588884> | Ligar
    <:numeronight1:799604203046567936> | Configurar Cargo
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
                if (snap.val().Autorole === 1) return message.channel.send(embederroon).then(m => m.delete(5000))

                message.channel.send(embedacertoon).then(m => m.delete(5000));

                if (snap.val() == null) {
                    database.ref(`Servidores/${message.guild.id}/`)
                    .set({
                    Autorole: 1
                    });
                  } 
                  database.ref(`Servidores/${message.guild.id}/`)
                  .update({
                    Autorole: Autorole = 1
                    })
                  })
                  msg.edit(embed);
                break;
                case "numeronight2":
                
                database.ref(`Servidores/${message.guild.id}/`)
                .once('value').then(async function(snap) {
                if (snap.val().Autorole === 0) return message.channel.send(embederrooff).then(m => m.delete(5000))

                message.channel.send(embedacertooff).then(m => m.delete(5000));

                if (snap.val() == null) {
                    database.ref(`Servidores/${message.guild.id}/`)
                    .set({
                    Autorole: 0
                    });
                  } 
                  database.ref(`Servidores/${message.guild.id}/`)
                  .update({
                    Autorole: Autorole = 0
                    })
                  })
                break;
                case "numeronight1":
                        message.channel.send(embedcargoautorole).then(m => m.delete(5000));
            
                        database.ref(`Servidores/${message.guild.id}/`)
                        .once('value').then(async function(snap) {
                  
                          if (snap.val() == null) {
                            database.ref(`Servidores/${message.guild.id}/`)
                            .set({
                            Autoroletag: 0,
                           });
                          } 
                  
                         const filter = res1 => {
                            return res1.author.id === message.author.id && res1.content.length;
                        };
                        const rolea = await message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000
                        });
                        rolea.first().delete();
            
                        const rolea2 = rolea.first().content.toLowerCase();
                        database.ref(`Servidores/${message.guild.id}/`)
                          .update({
                            Autoroletag: snap.val().Autoroletag = rolea2
                              }) 
                              message.channel.send(embedcargoautoroleacerto).then(m => m.delete(5000));
                            })
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

