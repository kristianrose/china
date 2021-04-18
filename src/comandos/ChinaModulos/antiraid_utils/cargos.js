
'use strict'
const discord = require('discord.js')
const AntiRaid = getmodule('controllers/AntiRaid')
module.exports = (client, message) => {
  const antiraid = new AntiRaid(client.datasource, message.guild.id)
  const servidorRoles = message.guild.roles
  antiraid.getElement('roles').then(async guildTable => {
    if (guildTable === undefined)
      return message.reply('Eu não retirei a permissão de nenhum cargo')
    const roles = Object.keys(guildTable)
    const permissions = Object.values(guildTable)
    const size = roles.length
    let text = ''
    let msg = await message.channel.send(`\`\`Voltando permissões dos cargos, AGUARDE!\`\``)
    for (let i = 0; i < size; i++) {
      const roleEdit = await servidorRoles.cache.find(r => r.id === roles[i])
      text += `${roleEdit.name}\n`
      await roleEdit.edit({ permissions: permissions[i] }).catch(() => { })
    }
    antiraid.deletar('roles').then(() => {
      const embed = new discord.MessageEmbed()
        .setAuthor(`Status Cargos`, message.author.displayAvatarURL())
        .setDescription(`**Os cargos:**\n\`\`\`prolog\n${text}\`\`\`**voltaram as suas permissões normais**`)
        .setColor('4959E9')
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp()
      msg.edit(embed).catch(() => { })
    })
  })
}
