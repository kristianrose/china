const discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    message.delete();
    let embederro = new discord.MessageEmbed()
    .setColor("4959E9")
    .setDescription('**Você não tem permissão para essa ação!**')
    .setTimestamp()
    if(!message.member.hasPermission("MUTE_MEMBERS")) {
        return message.channel.send(embederro)
            .then(m => m.delete(5000));
    }

    let role = message.guild.roles.find(`name`, `Nightt Mute`);

    let embederrousuário = new discord.MessageEmbed()
    .setColor("4959E9")
    .setDescription('**Por favor, Mencione um usuário.**')
    .setTimestamp()

    let embederrorole = new discord.MessageEmbed()
    .setColor("4959E9")
    .setDescription('**Esse usuário não está mutado.**')
    .setTimestamp()

    let usuario = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!usuario) return message.channel.send(embederrousuário).then(m => m.delete(5000));
    if (usuario.roles.has(role.id)) {

    usuario.removeRole(role.id)

    let embedacerto = new discord.MessageEmbed()
    .setColor("4959E9")
  .setAuthor(`China | Mute`)
  
    .setDescription('**Usuário desmutado com Sucesso.**')
    .setTimestamp()
    message.channel.send(embedacerto).then(m => m.delete(5000))
    } else{
     message.channel.send(embederrorole).then(m => m.delete(5000))
    }
};