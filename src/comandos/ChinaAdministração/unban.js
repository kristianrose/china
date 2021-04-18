const db = require('mongo/db.js')
const { MessageEmbed } = require('discord.js')
module.exports = async function (client, message, args) {
  message.delete(5000)

  db.Guilds.findOne({ '_id': message.guild.id }, async function (erro, servidor) {
    if (!message.member.hasPermission('ADMINISTRATOR') &&
    !message.member.hasPermission('BAN_MEMBERS')) {
      return message.channel.send(` ${message.author}, você precisa possuir permissão de banir para utilizar esse comando.`)
    }

    let banPerms = message.guild.member(client.user).hasPermission('BAN_MEMBERS')
    if (!banPerms) return message.channel.send(` ${message.author}, não tenho permissão para banir usuários nesse servidor.`).then(sentMsg => sentMsg.delete(15000).catch(() => {}))

    let kael = args.slice(1).join(' ')
      ? args.slice(1).join(' ')
      : `Desbanido por ${message.author.username}#${message.author.discriminator} — Não relatou um motivo.`

    let id = message.mentions.users.first()

      ? message.mentions.users.first().id

      : args
        ? args[0]
        : null
    if (!id) return message.channel.send(` ${message.author}, você precisa especificar uma ID.`).then(sentMsg => sentMsg.delete(15000).catch(() => {}))

    let banido = client.users.cache.has(id) ? client.users.cache.get(id) : null
    if (!banido) return message.channel.send(` ${message.author}, não encontrei nenhum usuário.`).then(sentMsg => sentMsg.delete(15000).catch(() => {}))

    const filtro = ['discord.io', 'discord.gg', 'https://', 'filho da puta', 'fdp', 'cú', 'filho da mãe', 'baka', 'idiota', 'tnc', 'puta', 'puto', 'piranha', 'anta', 'bosta', 'merda', 'baka', 'prostituta', 'vaca', 'bostejando']
    if (filtro.some(p => message.content.includes(p))) {
      message.channel.send(` ${message.author}, você não pode usar minhas funções para ofender alguém.`).then(sentMsg => sentMsg.delete(15000).catch(() => {}))
      return
    }

    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
      return message.channel.send(` ${message.author}, não tenho permissão para desbanir usuários nesse servidor.`)
    }

    message.guild.fetchBans().then(bans => {
      let users = bans.filter(r => r === banido)
      if (!users.first()) { return message.channel.send(` ${message.author} este usuário não encontra-se banido neste servidor.`).then(msg => msg.delete(15000).catch(() => {})) }

      message.members.unban(banido, `Desbanido por ${message.author.username}#${message.author.discriminator} — Motivo: ` + kael)
      message.channel.send(` ${message.author}, você desbaniu **${banido}**.`).then(a => a.delete(5000))


      const privado = new Discord.MessageEmbed()
        .setAuthor(`China | Desbanimento`, client.user.avatarURL())
        .addDescription(`Você foi desbanido(a) no servidor ${message.guild.name}.`)
        .addField(`Usuário:`, banido, true)
        .addField(` Responsável:`, message.author, true)
        .addField(` Motivo:`, `${kael}`, false)
        .setThumbnail(banido.avatarURL)
        .setTimestamp()
        .setColor(cor.oficial)
      banido.user.send({ embed: privado })
    })
  })
}


