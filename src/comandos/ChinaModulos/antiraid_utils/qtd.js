
module.exports = (client, message, args, prefix, RichEmbed, guild) => {
  if (isNaN(args[1]))
      return message.reply(`Você deve informar a quantidade de membros | Use: \`\`${prefix}antiraid qtd <numero> \`\``)
  guild.updateElement({ 'qtd': args[1] })
      .then(() => {
          message.channel.send(`Quantidade de membros banidos atualizada para: \`\`${args[1]} membros\`\``);
      }).catch(err => {
          console.log(err);
          message.reply("Erro");
      });
};