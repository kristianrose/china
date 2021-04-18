const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = async (client, message, args) => {
      

      if(!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(`Oops! ${message.author}, Você não tem a permissão \`MANAGE_EMOJIS\` portanto não posso executa esse comando para você.`);
      if(!message.guild.me.hasPermission("MANAGE_EMOJIS")) return message.channel.send(`**Oops!** Eu não tenho a permissão \`MANAGE_EMOJIS\``);

    
  
const emoji = args[0];
    if (!emoji)  {
    return message.channel.send(`${message.author}, cade o emoji?`)
  }

     
 let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
                customemoji.animated ? 'gif' : 'png'
            }`;
            const name = args.slice(1).join(' ');
            message.guild.emojis.create(
                `${Link}`,
                `${name || `${customemoji.name}`}`
            ).catch(error => message.channel.send(`Desculpa \`${message.author.username}\`, mas ocorreu um erro em que não foi possivel adicionar o emoji.\n\n**Detalhes:** \`\`\`${error}\`\`\``))
      message.channel.send(`${emoji} **|** ${message.author} Emoji adicionado com sucesso!`);

  
        }
}
