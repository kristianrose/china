const Discord = require('discord.js')
const db = require('mongo/db.js')
module.exports = async (client, message, args) => {
  var a = args.slice(3).join('')

  db.Guilds.findOne({ _id: message.guild.id }, async (erro, doc) => {
    if (!doc) {
      doc = new db.Guilds({ _id: message.guild.id, aregs: [], registrado: [] })
    }

    if (!['316470664280145920', '316470664280145920'].includes(message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) {
      message.delete()
      return message.channel.send(` ${message.author}, você precisa ter poder administrativo para utilizar esse comando.`)
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(`China • Registro`, client.user.avatarURL())
      .setThumbnail(client.user.avatarURL())
      .setDescription(`Eii ${message.author}, você deve configurar os cargos para ter acesso ao meu sistema de registro.\n⠀⠀\n> **|** **Cargo registrador:**`)
      .addField(`${doc.prefixo}registro registrador <@cargo>`, `Defina o(s) cargo(s) para registradores no qual apenas usuários com o(s) mesmo(s) poderão registrar em seu servidor.`, false)
      .addField(`${doc.prefixo}registro desativar registrador`, `Desativará e resetará o cargo registrador do servidor.`, false)
      .addField(`${doc.prefixo}registro registrados <@cargo> **(OPCIONAL)**`, `Definirá/Removerá os cargos que serão dados ao membro após ser registrado.\n⠀⠀\n **|** **Cargo novato:**`, false)
      .addField(`${doc.prefixo}registro novato <@cargo>`, `Defina o cargo para novatos no qual será necessário para relizar os registros.`, false)
      .addField(`${doc.prefixo}registro desativar novato`, `Desativará e resetará o cargo novato do servidor.\n⠀⠀\n<:deletou:709744082649350196> **|** **Resetar:**`, false)
      .addField(`${doc.prefixo}registro resetar`, `Resete todos os registros dos registradores de seu servidor.`, false)
      .setFooter(`Requisitado por ${message.author.tag} - ID ${message.author.id}`)
      .setColor("4959E9")
    if (!args[0]) return message.channel.send({ embed }).then(sentMsg => sentMsg.delete(60000).catch(() => {}))

    switch (args[0]) {
      case 'registrador' : {
        if (!['244489368717230090', '244489368717230090'].includes(message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) {
          message.delete()
          return message.channel.send(` ${message.author}, você precisa ter poder administrativo para utilizar esse comando.`)
        }

        var tags = message.mentions.roles.first()
        if (!tags) return message.channel.send(` ${message.author}, você esqueceu de mencionar o cargo.`)

        var delet = !!doc.aregs.includes(tags.id)

        if (delet) {
          doc.aregs.splice(doc.aregs.indexOf(tags.id), 1)
        } else {
          if (doc.aregs.length >= 10) return message.channel.send(`${message.author}, você já definiu 10 ou mais cargos para registradores no servidor.`)
          doc.aregs.unshift(tags.id)
        }

        doc.save()
        var msg = new Discord.RichEmbed()

          .setAuthor('China • Registro', client.user.avatarURL())
          .setDescription(`${!delet ? `${tags} adicionada ao cargo de registradores.` : `${tags} removida dos cargos de registradores.`}`)
          .addField(`Cargos de Registradores`, `${(doc.aregs.map(id => `<@&${id}>`).join(', ')) ? (doc.aregs.map(id => `<@&${id}>`).join(', ')) : 'Não há cargos adicionados como registradores.'}`)
          .setColor("4959E9")
        message.channel.send(msg)

        // end code
        return
      }
      case 'novato' : {
        let mensagem = args
        if (!['316470664280145920', '316470664280145920'].includes(message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) {
          message.delete()
          return message.channel.send(` ${message.author}, você precisa ter poder administrativo para utilizar esse comando.`)
        }

        const documento = await db.Guilds.findOne({ '_id': message.guild.id })
        if (documento) {
          if (!mensagem) {
            if (!documento.autorole) { return message.channel.send(` ${message.author}, esse servidor ainda não possui distribuição automática do cargo novatos. Utilize **${documento.prefixo}registro** para receber as instruções.`) } else { return message.channel.send(`<:folhas:714246905315459133> **|** ${message.author}, estou colocando os seguintes cargos em quem entrar no seu servidor: <@&${documento.autorole}>.`) }
          } else {
            if (args[0] !== 'resetar') {
              documento.autorole = message.mentions.roles.first().id
              await documento.save()
              return message.channel.send(` ${message.author}, você definiu o cargo que irei dar aos novatos.`)
            } else {
              documento.autorole = ''
              await documento.save()
              return message.channel.send(` ${message.author}, desativei a posição automática de cargos nos novatos.`)
            }
          }
        }
        return
      }
      case 'registrados' : {
        if (!['316470664280145920', '316470664280145920'].includes(message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) {
          message.delete()
          return message.channel.send(` ${message.author}, você precisa ter poder administrativo para utilizar esse comando.`)
        }

        var tags = message.mentions.roles.first()
        if (!tags) return message.channel.send(` ${message.author}, você esqueceu de mencionar o cargo.`)

        var delet = !!doc.registrado.includes(tags.id)

        if (delet) {
          doc.registrado.splice(doc.aregs.indexOf(tags.id), 1)
        } else {
          if (doc.registrado.length >= 10) return message.channel.send(`${message.author}, você já definiu 10 ou mais cargos para registrados no servidor.`)
          doc.registrado.unshift(tags.id)
        }

        doc.save()
        var msg = new Discord.MessageEmbed()

          .setAuthor('Registrados', client.user.avatarURL())
          .setDescription(`${!delet ? `${tags} adicionada ao cargo de registrados.` : `${tags} removida dos cargos de registrados.`}`)
          .addField(`Cargos dos registrados`, `${(doc.registrado.map(id => `<@&${id}>`).join(', ')) ? (doc.registrado.map(id => `<@&${id}>`).join(', ')) : 'Não há cargos adicionados.'}`)
          .setColor("4959E9")
        message.channel.send(msg)

        // end code
        return
      }

      case 'resetar': {
        if (!['316470664280145920', '316470664280145920'].includes(message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) {
          return message.channel.send(` ${message.author}, você precisa de permissão administrativa para resetar os arquivos de registramento.`)
        }

        db.Registrar.findOne({ _id: message.guild.id }, async (err, guild) => {
          if (!guild) {
            guild = new db.Registrar({ _id: message.guild.id })
          }
          if (err) return console.log('Erro: ' + err.message)

          message.channel.send(`<:deletou:709744082649350196> **|** ${message.author}, estou resetando um total de **${guild.regsArray.length}** registradores! Aguarde...`)
          let reset = () => {
            return new Promise((res) => {
              let users = []

              guild.regsArray.forEach((reg, i) => {
                db.GuildRegister.findOne({ _id: `${message.guild.id}-${reg}` }, (error, regist) => {
                  var abc = id => {
                    let xc = new db.GuildRegister({ _id: message.guild.id + '-' + reg })
                    xc.save()
                    return xc
                  }

                  if (!regist) { abc(message.guild.id + '-' + reg) }

                  if (regist) {
                    users.push({ regs: regist.regs, name: message.guild.members.find(a => a.user.username) })
                    regist.regs = 0
                    setTimeout(() => regist.save(), 500)
                  }
                  if (i + 1 == guild.regsArray.length) res(users)
                })
              })
            })
          }
          let users = await reset()
          let ganhador = users.sort((a, b) => b.regs - a.regs)[0]
          console.log(ganhador)
          message.channel.send(` ${message.author}, todos registradores do servidor foram resetados. Parabéns a(o) ${ganhador.name}, que registrou ${(ganhador.regs > 1 || ganhador.regs == 0) ? ganhador.regs + ' novatos.' : '1 novato.'}`)
        })
      }
    }
  })
}
