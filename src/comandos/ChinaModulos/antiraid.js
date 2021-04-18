/* eslint-disable no-undef */
const AntiRaid = getmodule('controllers/AntiRaid')
module.exports = (client, message, args, RichEmbed, prefix) => {
  if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
    message.reply("**Você não possui permissões para utilizar esse comando!**");
    return 0;
  }
  const antiraid = new AntiRaid(client.datasource, message.guild.id)
  /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
  if (args.length < 1) {
    client.antiraid_utils.default(client, message, args, RichEmbed, prefix);
    return 0;
  }
  var cmd = client.antiraid_utils[args[0]];
  if (cmd) {
    cmd(client, message, args, prefix, RichEmbed, antiraid);
  } else {
    client.antiraid_utils.typo(message, prefix);
  }

};