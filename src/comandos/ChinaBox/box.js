const firebase = require('firebase');
const database = firebase.database();
const discord = require('discord.js');

module.exports = async(client, message, args) => {

    let embedcomumerro = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Você não possuí caixa comum.**')
    .setTimestamp()

    let embedraraerro = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Você não possuí caixa rara.**')
    .setTimestamp()

    let embedepicaerro = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Você não possuí caixa epica.**')
    .setTimestamp()

    let embedlendariaerro = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Você não possuí caixa lendaria.**')
    .setTimestamp()

    database.ref(`Membros/${message.author.id}/`)
    .once('value').then(async function(snap){
        let Comum = snap.val().Comum;
        let Rara = snap.val().Rara;
        let Epica = snap.val().Epica;
        let Lendaria = snap.val().Lendaria;
        let Coins = snap.val().Coins;
        let Reputação = snap.val().Reputação;
        let Xp = snap.val().Xp;



        let reputaçãoresponsecomum = [1, 2, 1]
        let xpreponsecomum = [89, 55, 96]
        let coinsresponsecomum = [90, 130, 180]

        let respostareputaçãocomum = (reputaçãoresponsecomum[Math.floor(Math.random() * reputaçãoresponsecomum.length)])
        let respostaxpcomum = (xpreponsecomum[Math.floor(Math.random() * xpreponsecomum.length)])
        let respostacoinscomum = (coinsresponsecomum[Math.floor(Math.random() * coinsresponsecomum.length)])

        let reputaçãoresponserara = [1, 2, 2]
        let xpresponserara = [110, 83, 170]
        let coinsresponserara = [50, 150, 200]

        let respostareputaçãorara = (reputaçãoresponserara[Math.floor(Math.random() * reputaçãoresponserara.length)])
        let respostaxprara = (xpresponserara[Math.floor(Math.random() * xpresponserara.length)])
        let respostacoinsrara = (coinsresponserara[Math.floor(Math.random() * coinsresponserara.length)])

        let reputaçãoresponseepica = [2, 3, 4]
        let xpresponseepica = [300, 250, 110]
        let coinsresponseepica = [80, 280, 350]

        let respostareputaçãoepica = (reputaçãoresponseepica[Math.floor(Math.random() * reputaçãoresponseepica.length)])
        let respostaxpepica = (xpresponseepica[Math.floor(Math.random() * xpresponseepica.length)])
        let respostacoinsepica = (coinsresponseepica[Math.floor(Math.random() * coinsresponseepica.length)])

        let reputaçãoresponselendaria = [5, 6, 3]
        let xpresponselendaria = [470, 218, 500]
        let coinsresponselendaria = [100, 300, 500]

        let respostareputaçãolendaria = (reputaçãoresponselendaria[Math.floor(Math.random() * reputaçãoresponselendaria.length)])
        let respostaxplendaria = (xpresponselendaria[Math.floor(Math.random() * xpresponselendaria.length)])
        let respostacoinslendaria = (coinsresponselendaria[Math.floor(Math.random() * coinsresponselendaria.length)])







    if(args[0]==undefined){

        let embed = new discord.MessageEmbed()
        .setColor('4959E9')
        .setTitle(`**<:box:805423264402112523>Caixas pandoras de ${message.author.tag}**`)
        .addField('Todas suas caixas pandoras estão aqui.', `Para abrir utilize: \`i!box abrir {caixa}\``)
        .addField('Caixa Comum:', `${Comum}`, true)
        .addField('Caixa Rara:', `${Rara}`, true)
        .addField('Caixa Epica:', `${Epica}`, true)
        .addField('Caixa Lendaria:', `${Lendaria}`, true)
        message.channel.send(embed)
   }

   if(args[0] == 'abrir') {
   if(args[1] == 'comum') {

    if (Comum == 0) return message.channel.send(embedcomumerro).then(m => m.delete(5000))

    database.ref(`Membros/${message.author.id}/`)
    .update({
        Comum: snap.val().Comum - parseInt(1),
        Reputação: snap.val().Reputação + parseInt(respostareputaçãocomum),
        Xp: snap.val().Xp + parseInt(respostaxpcomum),
        Coins: snap.val().Coins + parseInt(respostacoinscomum)
      })

      let embedcomumacerto = new discord.MessageEmbed()
      .setColor('4959E9')
      .setDescription(`**Você abriu uma caixa comum, seus presentes são: Reputação:\`${respostareputaçãocomum}\`, Xp:\`${respostaxpcomum}\`, Coins:\`${respostacoinscomum}\`.**`)
      .setTimestamp()
      message.channel.send(embedcomumacerto).then(m => m.delete(12000))

   } else if (args[1] == 'rara') {

    if (Rara == 0) return message.channel.send(embedraraerro).then(m => m.delete(5000))

    database.ref(`Membros/${message.author.id}/`)
    .update({
        Rara: snap.val().Rara - parseInt(1),
        Reputação: snap.val().Reputação + parseInt(respostareputaçãorara),
        Xp: snap.val().Xp + parseInt(respostaxprara),
        Coins: snap.val().Coins + parseInt(respostacoinsrara)
      })

      let embedraraacerto = new discord.MessageEmbed()
      .setColor('4959E9')
      .setDescription(`**Você abriu uma caixa rara, seus presentes são: Reputação:\`${respostareputaçãorara}\`, Xp:\`${respostaxprara}\`, Coins:\`${respostacoinsrara}\`.**`)
      .setTimestamp()
      message.channel.send(embedraraacerto).then(m => m.delete(12000))


   } else if (args[1] == 'epica') {

    if (Epica == 0) return message.channel.send(embedepicaerro).then(m => m.delete(5000))

    database.ref(`Membros/${message.author.id}/`)
    .update({
        Epica: snap.val().Epica - parseInt(1),
        Reputação: snap.val().Reputação + parseInt(respostareputaçãorara),
        Xp: snap.val().Xp + parseInt(respostaxprara),
        Coins: snap.val().Coins + parseInt(respostacoinsepica)
      })

      let embedepicoacerto = new discord.MessageEmbed()
      .setColor('4959E9')
      .setDescription(`**Você abriu uma caixa epica, seus presentes são: Reputação:\`${respostareputaçãoepica}\`, Xp:\`${respostaxpepica}\`, Coins:\`${respostacoinsepica}\`.**`)
      .setTimestamp()
      message.channel.send(embedepicoacerto).then(m => m.delete(12000))



   } else if (args[1] == 'lendaria') {

    if (Lendaria == 0) return message.channel.send(embedlendariaerro).then(m => m.delete(5000))

    database.ref(`Membros/${message.author.id}/`)
    .update({
        Lendaria: snap.val().Lendaria - parseInt(1),
        Reputação: snap.val().Reputação + parseInt(respostareputaçãolendaria),
        Xp: snap.val().Xp + parseInt(respostaxplendaria),
        Coins: snap.val().Coins + parseInt(respostacoinslendaria)
      })

      let embedepicoacerto = new discord.MessageEmbed()
      .setColor('4959E9')
      .setDescription(`**Você abriu uma caixa lendaria, seus presentes são: Reputação:\`${respostareputaçãolendaria}\`, Xp:\`${respostaxplendaria}\`, Coins:\`${respostacoinslendaria}\`.**`)
      .setTimestamp()
      message.channel.send(embedepicoacerto).then(m => m.delete(12000))

   }
   if (args[1] == undefined) {
   message.channel.send(`**Por favor, informe a caixa que você deseja abrir que são \`comum . rara . epica . lendaria\`**`).then(m => m.delete(5000))
   }
   }
});
};
