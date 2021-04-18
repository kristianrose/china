module.exports = async (client, message, args) => {
    let regexArray = /([0-9]{18})/.exec(args[0]);
    if (!regexArray || regexArray.length < 1) {
    }
    let mentionedMember = await message.guild
      .members.fetch(regexArray[0])
      .catch(() => {});
    if (!mentionedMember) {
      return message.reply(`Mencione um membro do servidor`).catch(() => {});
    } else if (mentionedMember.user.bot) {
     return message.reply(`**Você não pode casar com um bot**`).catch(() => {});
    }
    const database = require("mongo/db.js");

    let author, proposed;
    try {
      [author, proposed] = await Promise.all([
        database.Users.findById(message.author.id),
        database.Users.findById(mentionedMember.id)
      ]);
    } catch (e) {
      message.reply("Erro").catch(() => {});
      console.error(e);
    }
  
    author = Object.assign(new database.Users(), author);
    proposed = Object.assign(new database.Users(), proposed);
    if (checkMarriage(author)) {
      return message.reply(`Você já está casado(a)`).catch(() => {});
    }
    if (checkMarriage(proposed)) {
      return message
        .reply(` **${mentionedMember.user.tag} já está casado(a)**`)
        .catch(() => {});
    }
  
    if (checkCooldown(message, author)) return;
  
    let check = await validate(author, proposed, message);
    if (!check) return;
  
    const timestamp = new Date() - 0;
  
    author.marriage.marriedTo = proposed._id;
    proposed.marriage.marriedTo = author._id;
  
    author.lastMarriageAttempt = timestamp;
    author.marriage.marriedTimestamp = timestamp;
  
    proposed.lastMarriageAttempt = timestamp;
    proposed.marriage.marriedTimestamp = timestamp;
  
    Promise.all([author.save(), proposed.save()])
      .then(() => {
        const discord = require("discord.js");
        let embed = new discord.MessageEmbed()
          .setTitle("China • Casamento")
          .setDescription(
            `**Parece que temos um novo casal \n\n<@${author._id}> casou com <@${proposed._id}>**`
          )
          .setColor("4959E9")
          .setTimestamp();
        message.channel.send(embed).catch(() => {});
      })
      .catch(() => {});
  };
  
  const checkMarriage = user => user.marriage.marriedTo.length > 0;
  
  const checkCooldown = (message, author) => {
    const lastTimestamp = author.lastMarriageAttempt;
    const DAY = 24 * 60 * 60 * 1000;
    if (message.createdTimestamp - lastTimestamp >= DAY) return 0;
    const ms = require("ms");
    let time = ms(DAY - (message.createdTimestamp - lastTimestamp), {
      long: true
    });
    time = time
      .replace(/hour/g, "hora")
      .replace(/minute/g, "minuto")
      .replace(/second/g, "segundo");
    message
      .reply(` **Você precisa esperar ${time} antes de tentar casar novamente**`)
      .catch(() => {});
    return 1;
  };
  
  const validate = (author, proposed, message) =>
    new Promise(async resolve => {
      const discord = require("discord.js");
      let questionEmbed = new discord.MessageEmbed()
        .setTitle("Pedido de casamento")
        .setDescription(`**<@${proposed._id}> aceita casar com <@${author._id}> ?**`)
        .setColor("4959E9");
      let msg = await message.channel
        .send(`<@${proposed._id}>`, questionEmbed)
        .catch(() => resolve(false));
  
      let emojis = ["✅", "❌"];
      for (let i = 0; i < emojis.length; ++i) {
        await msg.react(emojis[i]).catch(() => {});
      }
      const filter = (r, u) =>
        emojis.includes(r.emoji.name) && u.id === proposed._id;
      const collector = msg.createReactionCollector(filter, { time: 60 * 1000 });
      collector.on("collect", reaction => {
        let emoji = reaction.emoji.name;
        collector.stop();
        msg.delete().catch(() => {});
        if (emoji === "✅") resolve(true);
        if (emoji === "❌") resolve(false);
      });
    });
  
