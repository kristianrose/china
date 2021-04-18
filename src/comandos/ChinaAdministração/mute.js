const discord = require('discord.js');
const ms = require("ms");
module.exports = async (client, message, args) => {
    message.delete();
    let embederro = new discord.MessageEmbed()
    .setColor(cor.oficial)
    .setDescription(`**${message.author} Você não tem permissão para essa ação!**`)
    .setTimestamp()
    if(!message.member.hasPermission("MUTE_MEMBERS")) {
        return message.channel.send(embederro)
            .then(m => m.delete(5000));
    }

    let embederrousuário = new discord.MessageEmbed()
    .setColor("4959E9")
    .setDescription('**Por favor, Mencione um usuário.**')
    .setTimestamp()

    let embederropermissão = new discord.MessageEmbed()
    .setColor("4959E9")
    .setDescription('**Eu não tenho permissão suficiente para mutar esse usuário.**')
    .setTimestamp()

    let embederrotempo = new discord.MessageEmbed()
    .setColor("4959E9")
    .setDescription('**Por favor, Define um tempo.**')
    .setTimestamp()


    let usuario = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!usuario) return message.channel.send(embederrousuário).then(m => m.delete(5000));
    if(usuario.hasPermission("ADMINISTRATOR")) return message.channel.send(embederropermissão).then(m => m.delete({timeout: 5000}))
    let razão = args.slice(2).join(" ");
    if (!razão) {
        razão = 'Não informado'
    }

    let muterole = message.guild.roles.cache.some(role => role.name === 'Yae Mute')
    if (!muterole) {
        try{
            muterole = await message.guild.roles.create({
                name: "Night Mute",
                color: cor.oficial,
                permissions:[]
            })
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.updateOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                   
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }

    let time = args[1];
    if (!time) return message.channel.send(embederrotempo).then(m => m.delete(5000));

    let embed = new discord.MessageEmbed()
    .setColor("4959E9")
    .setAuthor(`China • Mute`)
    .addField(`Moderador: ${message.author.tag}`, `**ID: ${message.author.id}**`, true)
    .addField(`Usuário: ${usuario.user.tag}`, `**ID: ${usuario.id}**`, false)
    .addField(`Tempo: ${time}`, `Razão: ${razão}`, false)
    .setFooter(`Comando requisitado por: ${message.author.tag}`, message.author.avatarURL)
    message.channel.send(embed).then(m => m.delete({time: 12000}))



var a = message.guild.member(usuario);

    message.delete().catch(O_o=>{});
    try{
         usuario.send(embed)
      }catch(e){
        message.channel.send(embed).then(m => m.delete({ timeout: 12000}))
      }

    await  (a.roles.add(muterole.id))

      setTimeout(function(){
        a.roles.remove(muterole.id);
      }, ms(time));
    };



