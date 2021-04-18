module.exports = (client, message, args) => {
  const database = require("mongo/db.js");
  database.Users.findById(message.author.id).then(async author => {
    author = Object.assign(new database.Users(), author);
    let marriedTo = author.marriage.marriedTo;
    if (!marriedTo.length) {
      return message.reply("Você não está casado com ninguém").catch(() => {});
    }
    if (!checkTime(message, author)) return;
    if ((await validateDivorce(message, author, marriedTo)) === false) return;
    database.Users.findById(marriedTo)
      .then(doc => {
        doc = Object.assign(new database.Users(), doc);
        divorce(message, author, doc);
      })
      .catch(err => {
        message.reply(`Não foi possível efetuar o divórcio`).catch(() => {});
        console.error(err);
      });
  });
};

function checkTime(message, author) {
  const TWO_DAYS = 2 * 24 * 60 * 1000;
  let diff = message.createdTimestamp - author.marriage.marriedTimestamp;
  if (diff < TWO_DAYS) {
    const ms = require("ms");
    var time = ms(TWO_DAYS - diff, { long: true });
    time = time
      .replace(/day/g, "dia")
      .replace(/hour/g, "hora")
      .replace(/minute/g, "minuto")
      .replace(/second/g, "segundo");
    message
      .reply(`Você tem que esperar ${time} antes de se divorciar`)
      .catch(() => {});
    return false;
  } else {
    return true;
  }
}

function validateDivorce(message, author, marriedTo) {
  const discord = require("discord.js");
  return new Promise(resolve => {
    let questionEmbed = new discord.MessageEmbed()
      .setTitle("Confirmação de Divórcio")
      .setDescription(
        `<@${author._id}> tem certeza que deseja se divorciar de <@${marriedTo}> ?`
      )
      .setColor("4959E9");
    message.channel
      .send(`<@${author._id}>`, questionEmbed)
      .then(async msg => {
        let emojis = ["✅", "❌"];
        for (let i = 0; i < emojis.length; ++i) {
          await msg.react(emojis[i]).catch(() => {});
        }
        const filter = (r, u) =>
          emojis.some(e => e === r.emoji.name) && u.id === author._id;
        const collector = msg.createReactionCollector(filter, {
          time: 60 * 1000
        });
        collector.on("collect", reaction => {
          let emoji = reaction.emoji.name;
          if (emoji === "✅") {
            collector.stop();
            msg.delete().catch(() => {});
            resolve(true);
          }
          if (emoji === "❌") {
            collector.stop();
            msg.delete().catch(() => {});
            resolve(false);
          }
        });
      })
      .catch(() => {
        resolve(false);
      });
  });
}

function divorce(message, author, marriedTo) {
  author.marriage.marriedTo = "";
  marriedTo.marriage.marriedTo = "";

  Promise.all([author.save(), marriedTo.save()])
    .then(() => {
      const discord = require("discord.js");
      let embed = new discord.MessageEmbed()
        .setTitle(`China • Divorcio`)
        .setDescription(`<@${author._id}> e <@${marriedTo._id}> se divorciaram`)
        .setColor("4959E9")
        .setFooter("Infelizmente não deu certo...")
        .setTimestamp();
      message.channel.send(embed).catch(() => {});
    })
    .catch(err => {
      message.reply(`Não foi possível efetuar o divórcio`).catch(() => {});
      console.error(err);
    });
}
