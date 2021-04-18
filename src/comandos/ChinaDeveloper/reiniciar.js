const Discord = require('discord.js');
const cooldown = new Set();
module.exports = async (client, message, args) => {
    const pode = ["552942821305221136" , "552942821305221136"]
    if (!pode.includes(message.author.id)) return message.reply("**Você não pode fazer isso!**").then(m => m.delete(5000));

    let embedreniciando = new Discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription(`**${client.user.tag}  Reniciando...**`)
    .setTimestamp()

    let embedreniciado = new Discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription(`${client.user.tag} Reniciada Com Sucesso.**`)
    .setFooter(`Comando Requisitado ${message.author.tag}`)
    message.channel.send(embedreniciando).then(m => m.delete(5000));

    resetBot(message.channel)

    async function resetBot(channel) {
        let token = client.token;
        await message.react('🌸')
        .then(message => client.destroy())
        .then(() => client.login('NzkwNTM0ODM0NTgxNjY3ODcx.X-CA7w.RLiEQtDH1dzjKY_OzxRQlP14LeM'))
        message.channel.send(embedreniciado).then(m => m.delete(5000));
};
};
