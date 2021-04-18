const Discord = require('discord.js')
module.exports = async (client, message, args) => {
  let invites = await message.guild.fetchInvites().catch(error => {
    return message.channel.send(` ${message.author}, eu não tenho acesso aos convites desse servidor.`)
  })

  let oi = message.mentions.users.first()
    ? message.mentions.users.first().id
    : message.author.id

  let img = message.mentions.users.first()
    ? message.mentions.users.first().tag
    : message.author.tag

  let imagemm = message.mentions.users.first()
    ? message.mentions.users.first().avatarURL
    : message.author.avatarURL

  message.guild.fetchInvites().then(invs => {
    let personalInvites = invs.filter(i => i.inviter.id === oi)
    let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0)
    let convitesAtivos = personalInvites.reduce((a, { code, uses }) => a + `https://discord.gg/${code} -  **${uses} novato(s)**\n`, '')

    let possibleInvites = [['Total', 'Convites']]
    possibleInvites.push([inviteCount, convitesAtivos])

    const embed = new Discord.MessageEmbed()
      .setAuthor('Divulgadores', client.user.avatarURL())
      .addField(`Divulgador ${img}`, `Convidou um total de **${Number(inviteCount)}** novato(s). `, true)
      .addField('Convites:', `${convitesAtivos || `**${img}** não possui convites no servidor.`}`, false)
      .setThumbnail(imagemm)
      .setFooter(`Requisitado por ${message.author.tag} - ID ${message.author.id}`)
      .setColor("4959E9")
    message.channel.send({ embed })
  })
}

