const Discord = require('discord.js')
module.exports = (client, message, args) => {
  message.channel.guild.fetchInvites().then(invites => {
    if (!invites) return message.channel.send(`${message.author}, esse servidor não possui convites!`)

    var rank = invites.array().sort((a, b) => b.uses - a.uses).slice(0, 5)
    var primeiro = rank[0]
    var segundo = rank[1]
    var terceiro = rank[2]
    var quarto = rank[3]
    var quinto = rank[4]
    if (!primeiro) return message.channel.send(` ${message.author}, esse servidor precisa possuir 5 convites para ter um "ranking"!`)
    if (!segundo) return message.channel.send(` ${message.author}, esse servidor precisa possuir 5 convites para ter um "ranking"!`)
    if (!terceiro) return message.channel.send(` ${message.author}, esse servidor precisa possuir 5 convites para ter um "ranking"!`)
    if (!quarto) return message.channel.send(` ${message.author}, esse servidor precisa possuir 5 convites para ter um "ranking"!`)
    if (!quinto) return message.channel.send(` ${message.author}, esse servidor precisa possuir 5 convites para ter um "ranking"!`)

    let total = primeiro.uses + segundo.uses + terceiro.uses + quarto.uses + quinto.uses
  
    var embed = new Discord.MessageEmbed()
      .setAuthor(`Divulgador | ${message.guild.name}`, client.user.avatarURL())
      .setDescription('Esse é meu "ranking" e apenas os melhores na divulgação se encontram nele!')
      .setThumbnail(message.guild.iconURL)
      .addField(`⠀⠀⠀⠀`, `**1º** ${primeiro.inviter.username} \`\`\`Convidados: ${primeiro.uses}\`\`\``, false)
      .addField(`⠀⠀⠀⠀`, `**2º** ${segundo.inviter.username} \`\`\`Convidados: ${segundo.uses}\`\`\``, false)
      .addField(`⠀⠀⠀⠀`, `**3º** ${terceiro.inviter.username} \`\`\`Convidados: ${terceiro.uses}\`\`\``, false)
      .addField(`⠀⠀⠀⠀`, `**4º** ${quarto.inviter.username} \`\`\`Convidados: ${quarto.uses}\`\`\``, false)
      .addField(`⠀⠀⠀⠀`, `**5º** ${quinto.inviter.username} \`\`\`Convidados: ${quinto.uses}\`\`\`\n⠀⠀`, false)
      .addField('Total/Convidados', `~ ${total}`, true)
      .addField('Total/Convites', ` ~ ${invites.size}`, true)
      .setFooter(`Requisitado por ${message.author.tag} - ID ${message.author.id}`)
      .setColor("4959E9")
    message.channel.send({ embed })
  })
}

