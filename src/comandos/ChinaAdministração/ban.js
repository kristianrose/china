const Discord = require("discord.js");

module.exports = async (client, message, args) => {
  //if(message.author.id !== "472570458756218880") return message.channel.send("<:incorreto:659626406757531651>⇾ **Oops!** Esse comando não foi encontrado em meus sistemas.").then(msg => msg.delete(10000))
    
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`**Oops!** Eu não tenho a permissão \`BAN_MEMBERS\` portanto não posso executa esse comando para você.`);
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Desculpa ${message.author}, Mas você não possui a permissão \`BAN_MEMBERS\``);

  const membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!membro) {
    return message.channel.send(`${message.author}, Esqueceu. de mencionar alguem para banir`)
  }
  if (!membro.bannable) return message.channel.send(`O cargo de **${membro}** é maior que o meu, por isso não posso **puni-lo**!`)
  if (membro == message.member) return message.channel.send(`Você não pode se auto **punir**`)

  const motivo = args.slice(1).join(" ") ? args.slice(1).join(" ") : "Não foi informado nenhum motivo...";
  if (!motivo) return message.channel.send(`Informe um motivo para eu **punir** o membro \`${membro}\``)

  

  const embed = new Discord.MessageEmbed()
    .setTitle("Gerenciamento", client.user.avatarURL())
    .setFooter(`Requesitado por: ${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription(`**Você realmente deseja banir o usuário?** ${membro}\n<a:certo2:805445696529629206> ・**Sim**\n<a:aredtick:805806446687158272>・**Não**`)
    .setColor("4959E9");
  message.channel.send(`${message.author}`, embed).then(msg => {
    msg.react("805806446687158272").then(a => msg.react("805445696529629206"))

    const filtro = (reaction, user) => reaction.emoji.id === "805806446687158272" && user.id === message.author.id;
    const sim = msg.createReactionCollector(filtro, { time: 600000 });

    const filtro1 = (reaction, user) => reaction.emoji.id === "805445696529629206" && user.id === message.author.id;
    const não = msg.createReactionCollector(filtro1, { time: 600000 });

    não.on("collect", emoji => {
      msg.delete().catch;
      const não = new Discord.MessageEmbed()
        .setTitle("Ban Cancelado", client.user.avatarURL())
        .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
        .setDescription(`<a:aredtick:805806446687158272>  **|**  \`Banimento\` de ${membro} foi **cancelada** com sucesso!`)
        .setColor("4959E9 ");
     message.channel.send(`${message.author}`, não).then(message => {
setTimeout(() => {
message.delete()
}, 5000)
})
 

    });

    sim.on("collect", emoji => {
      msg.delete().catch
      membro.ban({ reason: motivo});


      const sim = new Discord.MessageEmbed()
        .setTitle("Ban Confirmado", client.user.avatarURL())
        .setDescription(`<a:certo2:805445696529629206>  **|** O membro ${membro} acabou de ser \`Banido\` do servidor por\n• Motivo: \`\`${motivo}\`\``)
        .setThumbnail(membro.displayAvatarURL)
        .setFooter(`Usuário banido por: ${message.author.tag}`, message.author.displayAvatarURL)
        .setTimestamp()
        .setColor("4959E9");
      message.channel.send(`${message.author}`, sim).then(message => {
setTimeout(() => {
message.delete()
}, 5000)
})
 
    });
  });
};
