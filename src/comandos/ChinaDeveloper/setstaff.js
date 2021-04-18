const discord = require('discord.js');
const firebase = require('firebase');
const database = firebase.database();
module.exports = async(client, message, args) => {
    const pode = ["552942821305221136" , "552942821305221136"]
    if (!pode.includes(message.author.id)) return message.reply("**Você não pode fazer isso!**")

    let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!User) return message.channel.send('**Por favor, Mencione um usuário!**')

    let embed = new discord.MessageEmbed()
    .setColor('4959E9')
    .addField('**Escolha o cargo**', `1⃣ Owner China
2⃣ Developer China
3⃣ Designer China
4⃣ Suporte China
5⃣ Remover Da Staff
`)
message.channel.send(embed).then(async msg => { 
    await msg.react('1⃣')
    await msg.react('2⃣')
    await msg.react('3⃣')
    await msg.react('4⃣')
    await msg.react('5⃣')
    const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "1⃣", "2⃣", "3⃣", "4⃣", "5⃣" && u.id === message.author.id), { time: 30000000 })
    collector.on("collect", async r => {
        switch (r.emoji.name) {
            case "2⃣":
                msg.delete();
                database.ref(`Membros/${message.author.id}/`)
                .once('value').then(async function(snap){
                    if(snap.val().Dev === 1) return message.channel.send('**Esse usuário já é Developer**').then(m => m.delete(5000));
                    let Dev = snap.val().Dev;
                    Dev = snap.val().Dev = 1;
                    database.ref(`Membros/${message.author.id}/`)
                    .update({
                        Dev: Dev
                    })
                });


                let embed2 = new discord.MessageEmbed()
                .setColor('4959E9')
                .setDescription('**Este usuário agora é developer!**')
                message.channel.send(embed2).then(m => m.delete(5000));

            break;
            case "1⃣":
                msg.delete();
                database.ref(`Membros/${message.author.id}/`)
                .once('value').then(async function(snap){
                    if(snap.val().Owner === 1) return message.channel.send('**Esse usuário já é Owner**').then(m => m.delete(5000));
                    let Owner = snap.val().Owner;
                    Owner = snap.val().Owner = 1;
                    database.ref(`Membros/${message.author.id}/`)
                    .update({
                        Owner: Owner
                    })
                });

                let embed3 = new discord.MessageEmbed()
                .setColor('4959E9')
                .setDescription('** Este usuário agora é owner!**')
                message.channel.send(embed3).then(m => m.delete(5000));
            break;
            case "3⃣":
                msg.delete();
                database.ref(`Membros/${message.author.id}/`)
                .once('value').then(async function(snap){
                    if(snap.val().Des === 1) return message.channel.send('**Esse usuário já é Designer**').then(m => m.delete(5000));
                    let Des = snap.val().Des;
                    Des = snap.val().Des = 1;
                    database.ref(`Membros/${message.author.id}/`)
                    .update({
                        Des: Des
                    })
                });

                let embed4 = new discord.MessageEmbed()
                .setColor('4959E9')
                .setDescription('**Este usuário agora é designer!**')
                message.channel.send(embed4).then(m => m.delete(5000));
            break;
            case "4⃣":
                msg.delete();
                database.ref(`Membros/${message.author.id}/`)
                .once('value').then(async function(snap){
                    if(snap.val().Sup === 1) return message.channel.send('**Esse usuário já é Suporte**').then(m => m.delete(5000));
                    let Sup = snap.val().Sup;
                    Sup = snap.val().Sup = 1;
                    database.ref(`Membros/${message.author.id}/`)
                    .update({
                        Sup: Sup
                    })
                });

                let embed6 = new discord.MessageEmbed()
                .setColor('4959E9')
                .setDescription('**Este usuário agora é suporte!**')
                message.channel.send(embed6).then(m => m.delete(5000));
            break;
            case "5⃣":
                msg.delete();
                database.ref(`Membros/${message.author.id}/`)
                .once('value').then(async function(snap){
                    let Dev = snap.val().Des;
                    let Owner = snap.val().Owner;
                    let Des = snap.val().Des;
                    let Sup = snap.val().Sup;
                    Dev = snap.val().Dev = 0;
                    Owner = snap.val().Owner = 0;
                    Des = snap.val().Des = 0;
                    Sup = snap.val().Sup = 0;
                    database.ref(`Membros/${message.author.id}/`)
                    .update({
                        Dev: Dev,
                        Owner: Owner,
                        Des: Des,
                        Sup: Sup
                    })
                });

                let embed5 = new discord.MessageEmbed()
                .setColor('4959E9')
                .setDescription('**Este usuário não é mais staff!**')
                message.channel.send(embed5).then(m => m.delete(5000));
            break;
        };
    });
});
};
