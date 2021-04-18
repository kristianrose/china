const db = require('mongo/db.js')
const Discord = require('discord.js')

module.exports = async (client, message, args) => {
  message.delete()
  var servidor = await db.Guilds.findOne({ _id: message.guild.id })
  var xy = args.slice(5).join(' ')
  var ab = args.slice(6).join(' ')

  db.Users.findOne({ _id: message.author.id }, async (erro, user) => {
    var criar = id => {
      let usuario = new db.Users({
        _id: message.author.id, bangif: ''
      })
      usuario.save()
      return usuario
    }

    if (!args[0]) {
      return message.channel.send(` ${message.author}, você deve enviar uma imagem ou especificar um link válido.`)
    }

    user.bangif = args[0]
    user.save()
    message.channel.send(` ${message.author}, você alterou a sua ilustração de banimento!`)

    if (!xy.length < 5) {
      if (message.content.startsWith('n!bangif resetar')) {
        user.bangif = ''
        user.save()
        return message.channel.send(` ${message.author}, você resetou a ilustração de seu banimento personalizado.`)
      }
    }

    if (!ab.lenght < 6) {
      if (message.content.startsWith('n!bangif teste')) {
          let bangif = user.bangif || "https://media.discordapp.net/attachments/744643108351770726/800105059698212904/white-background-2-768x450.png";
        var teste = new Discord.RichEmbed()
          .setAuthor(' Banimento Teste', client.user.avatarURL)
          .setDescription(`${message.author} baniu @USER#0000!`)
          .setImage(bangif)
          .addField('Usuário:', `USER#0000`, true)
          .addField('ID:', `0000000000000000`, true)
          .addField('Motivo:', `Banido por USER#0000 — Não relatou um motivo.`, false)
          .setColor('#4959E9')
        message.channel.send({ embed: teste })
      }
    }
  })
}
