/* eslint-disable no-undef */
const AntiRaid = getmodule('controllers/AntiRaid')
const discord = require("discord.js")
module.exports = (client, message, args, prefix, config) => {
  const antiraid = new AntiRaid(client.datasource, message.guild.id)
  let msgAntiRaid = `Ativo`

  antiraid.getAll().then(antiraid => {
    let embed = new discord.MessageEmbed()
      .setAuthor('Configuração Anti-Raid', message.author.displayAvatarURL())
      .setDescription(`
                O anti-raid é uma proteção que penaliza o usuário ` +
        `que infringir os parâmetros abaixos.` +
        `  Se qualquer usúario banir ou expulsar mais de **\`\`${antiraid.qtd}\`\`** membros ` +
        `em **\`\`${antiraid.time}\`\`** minutos.`/* Ele será penalizado com ` +
                `**\`\`${antiraid.punishment === 'ban' ? "banimento" : "expulsão"}\`\`** do servidor`)*/)
      .addField("Anti raid", msgAntiRaid, false)
      .addField("Punição", `\`\`\`css\n${antiraid.punishment}\`\`\``, true)
      .addField("Quantidade banidos", `\`\`\`css\n${antiraid.qtd}\`\`\``, true)
      .addField("Tempo", `\`\`\`css\n${antiraid.time} m\`\`\``, true)
      .setColor("4959E9")
      .setFooter(message.guild.name, message.guild.iconURL)
      .setTimestamp()
    message.channel.send(embed).catch(() => { })
  })
};