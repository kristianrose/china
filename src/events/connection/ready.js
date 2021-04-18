const titulo = require("console-title")
const moment = require("moment");// puxando o NPM moment (instale utilizando: npm i moment)
moment.locale('pt-BR') // definindo o local do moment, no nosso caso, pt-BR

module.exports = async (client, message) => {

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400); totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600); totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days} d, ${hours}h, ${minutes}m`

  // Status da China
    client.user.setStatus('dnd')
    const statusList = [
      {msg: `Me mencione!`, type: 'PLAYING', status: 'dnd'},
      {msg: `Kristian muito fofu!`, type: 'PLAYING', status: 'dnd'},
      {msg: `Mais de ${Number(client.guilds.cache.reduce( (a, g) => a + g.memberCount,0)).toLocaleString()} usuários`, type: 'STREAMING', status: 'dnd'}
    ];
   

     setInterval(async () => {
       let index = Math.floor(Math.random() * statusList.length + 1) - 1;
       await client.user.setActivity(statusList[index].msg, {
         type: statusList[index].type
       });
     }, 9000);
     titulo(`${client.user.username} a melhor`)
     console.log('==============================')
     console.log(`= ${client.user.tag} Iniciada Com Sucesso =`)
     console.log('==============================')
     console.log(`= ${client.user.tag} DataBase Iniciada  =`)
     console.log('==============================')
  }

