const discord = require("discord.js");

module.exports = (client, message, prefix) => {
  let embed = new discord.MessageEmbed()
  .setColor('#4959E9')
  .setTitle('Night • Gerenciamento')
  .setDescription(`**-** O sistema de antiraid protegerá seu servidor de ataques maliciosos, tentativas de expurgar o servidor etc, simples né, configure abaixo!

  **Como funciona?**
**-** A ${client.user.tag} tira as permissões de todos cargos do servidor abaixo dela e avisa a posse do servidor de imediato, para que ela protega seu
servidor sem nenhum problema você deve colocar o cargo da ${client.user.tag} no topo de todos cargos.

• Servidor: \`${message.guild.name}\``)
  .addField('**Modo de utilizar:**', `**i!antiraid default** | Para ver as configurações \`\`(Para o default funcionar você deve configurar o tempo)\`\`
  **i!antiraid tempo {numero}** | O tempo que todos os staff devem seguir quando punir
  **i!antiraid qtd {numero}** | Quantidade de bans e kicks no tempo defenido`)
.setFooter(`Requesitado por ${message.author.tag}`)
  message.channel.send(embed).then(message => message.delete(19000))
};