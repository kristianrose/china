
module.exports = async (client, message, args) => {
    let url = message.guild.iconURL({dynamic: true}) || "https://loritta.website/assets/img/unknown.png";
    const discord = require("discord.js");
    let embed = new discord.MessageEmbed()
    .setTitle(message.guild.name)
    .setDescription(`Servidor: ${message.guild.name} ${message.guild.iconURL ? `: **[Baixar](${message.guild.iconURL({dynamic: true})}?size=2048)**` : ""}`)
    .setColor("4959E9")
    .setImage(`${url}${message.guild.iconURL({dynamic: true}) ? "?size=2048" : ""}`)
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTimestamp();
    message.channel.send(embed).catch(()=>{});
};
