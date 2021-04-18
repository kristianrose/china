const db = require('mongo/db.js')
const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-BR')

module.exports = async (client, message, args) => {
  message.delete().catch(() => {})

  var criando = id => {
    var criar = new db.Users({
      _id: message.author.id,
      rep: 0,
      repTime: 0,
      perf: 0,
      perfTime: 0
    })
    criar.save()
    return criar
  }

  var autor = await db.Users.findOne({ _id: message.author.id })

  if (!autor) {
    autor = criando(message.author.id)
  }

  let mention = message.mentions.members.first() || message.guild.members.find(h => h.user.id == args[0]) || message.guild.members.find(a => a.user.tag == args[0])
  if (!mention) return message.channel.send(` ${message.author}, faltou você mencionar o usuário a ser registrado(a).`)

  db.Guilds.findOne({ _id: message.guild.id }, async (e, server) => {
    var criar = id => {
      var guilda = new db.Guilds({
        _id: message.guild.id,
        logg_registros: '',
        registrado: []
      })
      guilda.save()
      return guilda
    }

    if (!server) {
      server = criar(message.guild.id)
    }

    db.Registrar.findOne({ _id: message.guild.id }, async (erro, register) => {
      console.log(register)
      if (!register) {
        register = new db.Registrar({ _id: message.guild.id })
      }

      var nullRegs = server.aregs
      if (!nullRegs) {
        return message.channel.send(` ${message.author}, o cargo \`registrador\` não foi definido neste servidor. **Use:** ${server.prefixo}registro para mais informações.`)
      }

      if (!message.member.hasPermission('ADMINISTRATOR') && !server.aregs.some(a => message.member.roles.has(a))) {
        return message.channel.send(`${message.author}, você não é um dos registradores desse servidor`)
      }

      var nullAutorole = message.guild.roles.find(search => search.id === server.autorole)
      if (nullAutorole == null) {
        return message.channel.send(` ${message.author}, o cargo \`membro\` não foi definido neste servidor. **Use:** ${server.prefixo}registro para mais informações.`)
      }

   

      if (mention.user.bot) {
        return message.channel.send(`. ${message.author}, não é possível registrar bots.`)
      }

      if (mention.user.id == message.author.id) {
        return message.channel.send(` ${message.author}, não é possível registrar a sí mesmo.`)
      }

      if (!message.guild.members.get(mention.user.id).roles.find(search => search.id === server.autorole)) {
        return message.channel.send(` ${message.author}, o usuário mencionado não possui o cargo de novato.`)
      }

      ['regs', 'regsArray'].forEach(o => { if (!register[o]) register[o] = [] })

      db.GuildRegister.findOne({ _id: `${message.guild.id}-${message.author.id}` }, async (erro, candy) => {
        console.log(candy)

        if (!candy) {
          candy = db.GuildRegister({ _id: `${message.guild.id}-${message.author.id}` })
        }

        if (!register.regsArray.some(a => a == message.author.id)) {
          register.regsArray.push(message.author.id)
          register.save()
        }

        if (register.regs.some(b => mention.user.id == b.id)) { return message.channel.send(`<@${mention.user.id}> já foi registrado por <@${register.regs.find(a => a.id == mention.user.id).registrador}> em **${register.regs.find(a => a.id == mention.user.id).date}**`) }

        await mention.removeRole(server.autorole)
        server.registrado.forEach(async role => await mention.addRole(role))
        candy.regs++
        register.regs.push({ id: mention.user.id, date: moment().format('LLL'), registrador: message.author.id })
        await candy.save()
        await register.save()

        // Mensagem de sucesso.
        const embed = new Discord.MessageEmbed()
          .setAuthor('China •  Registro', client.user.avatarURL())
          .setThumbnail(mention.user.avatarURL)
          .setDescription(`**Parabéns**, você acaba de efetuar o registro!`)
          .addField(` Registrador(a):`, `**${message.author.tag}** (Já registrou ${candy.regs > 1 ? candy.regs + ' novatos' : '1 novato'}!)`)
          .addField(`Registrado`, `${mention.user.tag}`)
          .setTimestamp()
          .setFooter(`${message.guild.name}`)
          .setColor("4959E9")
        message.channel.send({ embed })
        // Mensagem informes.
        const informesRegistro = new Discord.MessageEmbed()
          // Azu editar
          .setAuthor('Informes | Registros', client.user.avatarURL())
          .setThumbnail(mention.user.avatarURL)
          .addField(`Registrador:`, `${message.author}`, true)
          .addField(`Novato:`, `${mention}`, true)
          .addField(`Total:`, `Registrou ${candy.regs > 1 ? candy.regs + ' novatos.' : '1 novato.'}`, false)
          .setTimestamp()
          .setFooter(message.guild.name)
          .setColor(cor.oficial)
        if (server.logg_registros && client.guilds.cache.get(message.guild.id).channels.cache.get(server.logg_registros)) { client.guilds.cacheget(message.guild.id).channels.cache.get(server.logg_registros).send({ embed: informesRegistro }) } // Mensagem no privado.
        const privado = new Discord.MessageEmbed()
          .setAuthor(`${message.guild.name} | Notificação`, message.guild.iconURL)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`Seu registro em nosso servidor foi efetuado com sucesso!`)
          .addField(` Registrador(a):`, `${message.author.tag}`, false)
          .addField(' Precisa de ajuda?', '[Clique aqui](https://discord.gg/) e venha conhecer meus criadores!', false)
          .setTimestamp()
          .setFooter('Hoje uma carne fresca iria bem! 😋', yae.user.avatarURL)
          .setColor("4959E9")
        mention.user.send({ embed: privado }).then(async rt => {
          await rt.react('507421776054321152')
          let col = rt.createReactionCollector((e, u) => (e.emoji.id == '507421776054321152') &&
              u.id == mention.user.id, { time: 1 * 60 * 60 * 1000 })
          col.on('collect', async (e, u) => {
            var op = id => {
              let opq = new db.Users({
                _id: mention.user.id,
                rep: 0,
                repTime: 0
              })
              opq.save()
              return opq
            }

            var ah = await db.Users.findOne({ _id: mention.user.id })

            if (!ah) { ah = op(mention.user.id) }

            let current = ah.repTime
            if (current == 0) { current = Date.now() - 60 * 60 * 1E3 } // primeiro rep
            console.log(current)

            if (new Date() >= current) {
              ah.repTime = Date.now() + 60 * 60 * 1E3
              ah.save()

              autor.rep += 1
              autor.save()
              message.author.send(` Você recebeu um ponto de reputação de ${mention.user} pelo seu registro! Você possui ${autor.rep} reputações.`).then(a => a.delete(300000))
            } else {
              let restante = current - Date.now()
              let humanize = require('humanize-duration')
              let humanize_config = {
                language: 'pt',
                conjunction: ' e ',
                serialComma: false,
                round: true,
                units: ['h', 'm', 's']
              }
              mention.user.send(` ${mention.user}, você pode dar outro ponto de reputação dentro de **${humanize(restante, humanize_config)}** `).then(a => a.delete(2000))
            }
          })
        })
      })
    })
  })
}
