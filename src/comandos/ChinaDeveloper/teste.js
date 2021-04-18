
module.exports = (client, message, args, RichEmbed, prefix) => {
  console.log('entrei teste')
  client.emit('guildBanAdd', message.guild, message.member)
};