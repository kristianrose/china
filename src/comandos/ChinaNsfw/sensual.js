const discord = require('discord.js');
const superagent = require('superagent');
const firebase = require('firebase');
const database = firebase.database();
module.exports = async (client, message, args) => {

    let embederro = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Esse canal não é apropriado para isso.**')
    .setTimestamp()

    let embederro2 = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**A função NSFW está atualmente desligada nesse servidor.**')
    .setTimestamp()

    database.ref(`Servidores/${message.guild.id}/`)
    .once('value').then(async function(snap){
    let NSFWChannel = snap.val().NSFWChannel;

    if(snap.val().NSFW === 0) return message.channel.send(embederro2).then(m => m.delete(5000))
    if (!message.channel.nsfw) return message.channel.send(embederro);
    if (message.channel.id === `${NSFWChannel}`){
        superagent.get('https://nekobot.xyz/api/image')
        .query({ type: 'lewd'})
        .end((err, response) => {
                let embed = new discord.MessageEmbed()
                .setColor('#4959E9')
                .setImage(response.body.message)
                .setFooter('Ninfas Sensuais')
                message.channel.send(embed)
            });

} else {
    message.delete();
    return message.channel.send(embederro).then(m => m.delete(5000));
}
});
};


