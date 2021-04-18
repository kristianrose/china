const discord = require('discord.js');
const moment = require("moment");
module.exports = async (client, message, args) => {
    message.delete()

    let online = message.guild.members.cache.filter(a => a.presence.status == "online").size;
    let ocupado = message.guild.members.cache.filter(a => a.presence.status == "dnd").size;
    let ausente = message.guild.members.cache.filter(a => a.presence.status == "idle").size;
    let offline = message.guild.members.cache.filter(a => a.presence.status == "offline").size;
    var serverIcon = message.guild.iconURL();
    let embed = new discord.MessageEmbed()
.setThumbnail(serverIcon)
.setColor('#4959E9')
.addField('<:IconID:714304139718295663> ID', `${message.guild.id}`, false)
.addField('<:owner:800043430553714688> Posse', `${message.guild.owner}`, false)
.addField('<:date:714304286913462303> Criado Em', `${message.guild.createdAt}`)
.addField(`Membros (${message.guild.memberCount})`, `<:online:701567671791124601> **Online:** ${online} <:DBH_idle:701567883511201834> **Ausente:** ${ausente} <:6240_dndDOT:800044339413385257> **Ocupado:** ${ocupado} <:offline2:701567758412021880> **Offline:** ${offline} \n**Pessoas:** ${message.guild.members.cache.filter(m => !m.user.bot).size} \n **Bots:** ${message.guild.members.cache.filter(m => m.user.bot).size}`)
.addField('Membros Recente', Array.from(message.channel.guild.members.cache.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>`).splice(0, 5).join(` | `), true)
message.channel.send(embed)

};
