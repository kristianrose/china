const discord = require("discord.js")
module.exports = async (client, message, args) => {
	
	let myconfig = new discord.MessageEmbed()
	.setTitle("Configuração do seu perfil")
	.setColor("4959E9")
	.setDescription(`Olá ${message.author}, seja bem vindo a configuração \`\`particular\`\` do seu perfil.\n\n**Aqui você pode configurar as ilustrações de banimentos.**\n\nUse **i!bangif (link)** para configurar a sua ilustrações\n• Os links devem ser do CDN do discord`)
    .setThumbnail(message.author.avatarURL())
    message.channel.send(myconfig)
}