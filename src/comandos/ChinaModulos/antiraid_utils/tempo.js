
module.exports = (client, message, args, prefix, RichEmbed, guild) => {
  if (isNaN(args[1]))
      return message.reply(`Você deve informar o tempo | Use: \`\`${prefix}antiraid tempo <numero> \`\``)
  guild.updateElement({ 'time': args[1] })
      .then(() => {
          message.channel.send(`Tempo atualizado para \`\`${args[1]}\`\``);
      }).catch(err => {
          console.log(err);
          message.reply("Erro");
      });
};