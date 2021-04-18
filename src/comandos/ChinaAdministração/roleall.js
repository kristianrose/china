const Discord = require("discord.js")

async function f(membros, i = 0, role, message) {
    if (i % 20 === 0) {
        await message.edit(`${i}/${message.guild.memberCount}`).catch(()=>{});
    }
    if (membros[i]) {
        await membros[i].roles.add(role, "cargo para todos user do serve").catch(()=>{});
    }
    ++i;
    if (i < message.guild.memberCount) {
        setTimeout(() => f(membros, i, role, message), 500);
    } else {
        await message.edit(`Adicionei o cargo em todos os usuários do servidor`).catch(()=>{});
    }
};

module.exports = async (client, message, args) => {       
      
  if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author}, você não possui a permissão \`ADMINISTRATOR\``);
        if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`Eu não tenho a permissão de \`ADMINISTRADORA\``);

        var role = message.mentions.roles.first();
        
        if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(`Verifique se o meu cargo esta acima do cargo: **${role.name}**`);
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(`Oops, o seu cargo e menor que o cargo: **${role.name}**`);
    }
        await message.channel.send(`Começando a seta o cargo a todos os usuário do servidor **(0/${message.guild.memberCount})**`)
            .then(m => {
                message.guild.members.fetch()
                    .then(async guilda => {
                        let membros = guilda.array();
                        await f(membros, 0, role, m);
                    })
                    .catch(err=>message.channel.send(`${err}`));
            })
            .catch(err=>message.channel.send(`${err}`));
};
 