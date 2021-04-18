
const discord = require("discord.js");

module.exports = async (client, message, args) => {
  if (
    !["552942821305221136"].some(
      a => message.author.id === a
    )
  )
    return message.channel.send(
      "Apenas desenvolvedores da China podem utilizar tal comando!"
    );
  let m = await message.channel.send("Carregando codigo...");
  try {
    let beforeRunning = Date.now();
    let result = eval(args.join(" "));

    if (result instanceof Promise) {
      m.edit("O código retornou uma promise - aguardando ela ser resolvida...");
      await result;
    }
    if (typeof result !== "string") result = require("util").inspect(result);
    let end = Date.now() - beforeRunning;
    let embed = new discord.MessageEmbed(message.author)
      .setDescription("```" + result.slice(0, 2000) + "```")
      .setColor("4959E9");
    m.edit("e não é que foi!", { embed: embed });
  } catch (e) {
    let embed = new discord.MessageEmbed(message.author)
      .setDescription("```" + e.stack.slice(0, 2000) + "```");
    m.edit("Falha...", { embed: embed });
  }
};
