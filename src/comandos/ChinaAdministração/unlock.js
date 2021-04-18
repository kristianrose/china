module.exports = (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS", false, true, true)) {
        return message.reply("**Você não tem permissão para usar tal comando!**").catch(()=>{});
    }
    if (!message.guild.me.permissions.has("MANAGE_CHANNELS", false, true)) {
        return message.reply("**Não tenho permissão para bloquear o canal!**").catch(()=>{});
    }
    message.channel.overwritePermissions(message.guild.id, { SEND_MESSAGES: true})
    message.channel.send(`** ${message.author} O canal ${message.channel} foi desbloqueado com sucesso!**`)
};