const db = require('mongo/db.js')
const Discord = require('discord.js')
module.exports = async (client, message, args) => {
  db.Guilds.findOne({ _id: message.guild.id }, async (e, server) => {
    var criar = id => {
      var guilda = new db.Guilds({
        _id: message.guild.id,
        logg_registros: ''
      })
      guilda.save()
      return guilda
    }

    if (!server) {
      server = criar(message.guild.id)
    }

    var nullRegs = server.aregs
    if (!nullRegs) {
      return message.channel.send(`** ${message.author}, o cargo \`registrador\` não foi definido neste servidor. **Use:** ${server.prefixo}registro para mais informações.`)
    }

    if (!message.member.hasPermission('ADMINISTRATOR') && !server.aregs.some(a => message.member.roles.has(a))) {
      return message.channel.send(` ${message.author}, você não é um dos registradores desse servidor!`)
    }

    var mention = message.mentions.users.first() || message.author

    db.GuildRegister.findOne({ _id: `${message.guild.id}-${mention.id}` }, async (erro, candy) => {
      if (!candy) {
        candy = db.GuildRegister({ _id: `${message.guild.id}-${mention.id}` })
      }

      const registrou = new Discord.MessageEmbed()
        .setAuthor('China • Registros', client.user.avatarURL())
        .setTitle(`Registrador(a): ${mention.tag}`)
        .setThumbnail(mention.avatarURL)// S
        .setDescription(`Registrou ${candy.regs > 1 ? candy.regs + ' novatos' : '1 novato'}.`, false)
        .setFooter(`Requisitado por ${message.author.tag} - ID ${message.author.id}`)
        .setColor("4959E9")
      message.channel.send({ embed: registrou })
    })
  })
}
