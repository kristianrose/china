
module.exports = (client, message, args) => {
    if (!['552942821305221136'].includes(message.author.id)) return
  
    if (!args[0]) return message.channel.send(` ${message.author} faltou você definir a id do servidor!`)
  
    var guild = client.guilds.cache.find(a => a.id == args[0])
    console.log(guild)
    guild.leave()
    message.channel.send(` ${message.author} você me removeu do servidor **${guild.name}/${guild.id}**`)
  }
  