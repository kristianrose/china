const discord = require('discord.js')
module.exports = async (client, message, args) => {
    message.delete();
    let embederro = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Você não tem permissão para usar tal comando!**')
    .setTimestamp()
    if(!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send(embederro)
            .then(m => m.delete(5000));
    }

    let embederromençãouser = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Por favor, mencione um usuário!**')
    .setTimestamp()

    let embederromençãocargo = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Por favor, mencione um cargo!**')
    .setTimestamp()

    let embederropossui = new discord.MessageEmbed()
    .setColor('#4959E9')
    .setDescription('**Esse usuário já possuí esse cargo.**')
    .setTimestamp()

    let user = message.guild.member(message.mentions.users.first());
    let tag = message.mentions.roles.first()

    if (!user) return message.channel.send(embederromençãouser).then(m => m.delete(5000));
    if (!tag) return message.channel.send(embederromençãocargo).then(m => m.delete(5000));
    if(user.roles.cache.has(tag.id)) return message.channel.send(embederropossui).then(m => m.delete(5000));
    try {
        user.roles.add(tag.id)
        let embedacerto = new discord.MessageEmbed()
        .setColor('#roles.has')
        .addField('Cargo adicionado com sucesso.', `Usuário: <@${user.id}> \n Cargo: ${tag}`)
        .setTimestamp()
        message.channel.send(embedacerto).then(m => m.delete(5000));
        } catch(e) {
            message.channel.send('Um erro aconteceu: ' + e)
        }
    };
