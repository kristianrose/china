const Discord = require("discord.js");;
const hast = require("hastebin-gen");

module.exports = async (client, message, args) => {
  if (
    !["552942821305221136"].some(
      a => message.author.id === a
    )
  )
    return message.channel.send(
      "Apenas desenvolvedores da China podem utilizar tal comando!"
    );

  let v11 = args.slice(0).join(" ");
  if (!v11) {
    return message.channel.send(
      "Você escreveu o código V11?"
    );
  }
  if (v11.length > 1024) {
    return message.channel.send(
      "Você pode escrever seu código dividindo mais de 1024 caracteres?"
    );
  }
  let v12 = v11
    .split("get")
    .join("cache.get")
    .split("addRole")
    .join("roles.add")
    .split("removeRole")
    .join("roles.remove")
    .split("users.exists")
    .join("users.cache.some")
    .split("channels.exists")
    .join("channels.cache.some")
    .split("find")
    .join("cache.find")
    .split("RichEmbed")
    .join("MessageEmbed")
    .split("fetchUser")
    .join("users.fetch")
    .split("fetchMember")
    .join("users.members")
    .split("fetchMessage")
    .join("users.messages")
    .split("fetchPinnedMessages")
    .join("messages.fetchPinned")
    .split("sendMessage")
    .join("send")
    .split("sendEmbed")
    .join("send")
    .split("sendCode")
    .join("send")
    .split("sendFile")
    .join("send")
    .split("sendFiles")
    .join("send")
    .split("setRoles")
    .join("roles.set")
    .split("colorRole")
    .join("roles.color")
    .split("highestRole")
    .join("roles.highest")
    .split("hoistRole")
    .join("roles.hoist")
    .split("ban")
    .join("members.ban")
    .split("unban")
    .join("members.unban")
    .split("avatarURL")
    .join("avatarURL()")
    .split("displayAvatarURL")
    .join("displayAvatarURL()")
    .split("iconURL")
    .join("iconURL()")
    .split("splashURL")
    .join("splashURL()")
    .split("playFile")
    .join("play")
    .split("playStream")
    .join("play")
    .split("playArbitraryInput")
    .join("play")
    .split("playBroadcast")
    .join("play")
    .split("playOpusStream")
    .join("play")
    .split("playConvertedStream")
    .join("play")
    .split("dispatcher.end()")
    .join("dispatcher.destroy()")
    .split("createVoiceBroadcast")
    .join("voice.createBroadcast")
    .split("broadcast.dispatchers")
    .join("broadcast.subscribers")
    .split("forEach")
    .join("cache.forEach")
   .split("client.ping")
    .join("client.ws.ping")

  if (v11 == v12) {
    return message.channel.send("Este código já é V12.");
  }

    
    const embed = new Discord.MessageEmbed()
    .addField(
        `:inbox_tray: Codigo V11:`,
        `   \`\`\`
  ${v11}\`\`\` `
      )
    .addField(
      `:outbox_tray: Codigo V12:`,
      `   \`\`\`
${v12}\`\`\` `
    )


  message.channel.send(embed);
  
};