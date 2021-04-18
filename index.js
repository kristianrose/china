
process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();
require('getmodule')


const config = require('./config/database')
const datasource = require('./config/datasource')

const Discord = require('discord.js')
const client = new Discord.Client()
//Extra
const fs = require('fs-extra');
const invites = {};
const moment = require("moment");
moment.updateLocale('pt-br')
client.getData = () => moment(new Date()).format('LL')

var source = fs.readdirSync("./src");
client.queue = new Map()
const { token } = require('config.json')

const { ownerGuild, ownerID } = require('config.json')
client.delTime = 5000
client.owner = () => { return client.guilds.cache.get(ownerGuild).members.cache.get(ownerID) }
/**
* `Instânciando o banco no` @object `client`
*/
client.config = config
client.datasource = datasource(client)




const firebase = require('firebase');
var dbco = {
    apiKey: "AIzaSyDaN95vTZCs0ZwXqqfpTUdAoUFSCB68cW8",
    authDomain: "fallen-brasil.firebaseapp.com",
    databaseURL: "https://fallen-brasil.firebaseio.com",
    projectId: "fallen-brasil",
    storageBucket: "fallen-brasil.appspot.com",
    messagingSenderId: "349941110503",
    appId: "1:349941110503:web:c98011524b067f5736f442",
    measurementId: "G-5R242KLX0B"
  };
  if (!firebase.apps.length) { firebase.initializeApp(dbco); }
             const database = firebase.database();


             client.on('guildCreate', guild => {
                database.ref(`Servidores/${guild.id}/`)
                .once('value').then(async function(snap) {
                  if (snap.val() == null) {
                   database.ref(`Servidores/${guild.id}/`)
                      .set({
                        Nome: guild.name,
                        ID: guild.id,
                        Autorole: 0,
                        Autoroletag: '',
                        Contador: 0,
                        ContadorChannel: '',
                        ContadorMensagem: 'Estamos com: {contador}, sejam bem vindos ao servidor!',
                        BemVindo: 0,
                        BemVindoChannel: '',
                        BemVindoMensagem: '',
                        BemVindoMensagemType: 0,
                        BemVindoPrivado: 0,
                        BemVindoMensagemPrivado: '',
                        BemVindoEmbedImagem: 0,
                        BemVindoEmbedImagemURL: '',
                        Saida: 0,
                        SaidaChannel: '',
                        SaidaMensagem: '',
                        Logs: 0,
                        LogsChannel: '',
                        Links: '',
                        Invites: 0,
                        InvitesChannel: '',
                        ProteçãoBots: 0,
                        ProteçãoLinks: 0,
                        ProteçãoRaid: 0,
                        ProteçãoFlood: 0,
                        NSFW: 0,
                        NSFWChannel: '',
                        LogsRaid: 0,
                        LogsChannelRaid: '',
                        Premium: 0,
                        PTBR: 1,
                        ES: 0,
                        EN: 0,
                      });
                    };
                });
                console.log(`Um servidor foi salvo no banco de dados`)
              });

              client.on('message', async message => {
  global.Xp = '';
  global.nextLevel = '';
  global.msg = '';

  let xpAdd = Math.floor(Math.random() * 7) + 8;

  database.ref(`Membros/${message.author.id}/`)
  .once('value').then(async function(snap) {
    if (snap.val() == null) {
      database.ref(`Membros/${message.author.id}/`)
        .set({
          Level: 1,
          Xp: 0,
          Dev: 0,
          Des: 0,
          Sup: 0,
          Owner: 0,
          Ban: 0,
          Sobre: 'Use `sobre` para definir seu sobre!',
          Background: 'https://i.pinimg.com/originals/4e/f9/3b/4ef93bfb8dfe14681d3f50ed4e03290b.jpg',
          Coins: 1000,
          Reputação: 1,
          AfkI: 0,
          AfkMotivo: '',
          Clan: 0,
          ClanNome: '',
          ClanCargo: 0,
          Comum: 0,
          Rara: 0,
          Epica: 0,
          Lendaria: 0,
          TimeDaily: '86400000'        
        });
      } else {
        Xp = snap.val().Xp + xpAdd;
        nextLevel = snap.val().Level * 600;
        database.ref(`Membros/${message.author.id}/`)
          .update({
            Xp: Xp
          })
  
        if (nextLevel <= Xp) {
          nextLevel = snap.val().Level + 1;
          database.ref(`Membros/${message.author.id}/`)
          .update({
            Level: nextLevel
          })
        }
      }
  });
});
            

client.on('ready', () => {

    //Invites
 client.guilds.cache.forEach(g => {
      g.fetchInvites().then(guildInvites => {
          invites[g.id] = guildInvites;
      });
  });

});

              client.on('message', async message => {
                if(message.author.bot === false) {
                 message.mentions.users.array().forEach(async mention => {
                  database.ref(`Membros/${mention.id}/`)
                  .once('value').then(async function(snap){
                    let AfkI = snap.val().AfkI;
                    let AfkMotivo = snap.val().AfkMotivo
                    if(AfkI === 1) {
                      message.channel.send(`**<:DBH_idle:701567883511201834> | <@${mention.id}> está ausente!
              Motivo:** \`${AfkMotivo}\``).then(m => m.delete(5000));
                    }
                  })
                })
              }
              
              
              database.ref(`Membros/${message.author.id}`)
              .once('value').then(async function(snap){
                let AfkI = snap.val().AfkI;
                if (AfkI === 1) {
                  database.ref(`Membros/${message.author.id}`)
                  .once('value').then(async function(snap){
                      let AfkI = snap.val().AfkI;
                      let AfkMotivo = snap.val().AfkMotivo;
                      AfkMotivo = snap.val().AfkMotivo = '';
                      AfkI = snap.val().AfkI = 0;
                      database.ref(`Membros/${message.author.id}`)
                      .update({
                        AfkI: AfkI,
                        AfkMotivo: AfkMotivo
                      })
                  });
              
                  message.channel.send(`**Bem-vindo de volta! <@${message.author.id}>, você não está mais ausente.**`).then(m => m.delete(5000));
                }
              })
              })

              client.on('guildMemberAdd', async member => {
                database.ref(`Servidores/${member.guild.id}`)
                .once('value').then(async function(snap){
                let Autorole = snap.val().Autorole;
                let AutoRoleTag = snap.val().AutoRoleTag;
                let ProteçãoBots = snap.val().ProteçãoBots;
                if(Autorole === 1) {
                let role = member.guild.roles.cache.find(r => r.name === `${AutoRoleTag}`);
                member.roles.add(role.id)
                }
                if(ProteçãoBots === 1) {
                if(member.user.bot) {
                member.members.ban('China Proteção BOT Ligada')
                }
               }
             })
             })
            
                client.on('guildMemberAdd', async member => {
            
                    database.ref(`Servidores/${member.guild.id}`)
                    .once('value').then(async function(snap) {
                  
                      let BemVindo = snap.val().BemVindo;
                      let BemVindoChannel = snap.val().BemVindoChannel;
                      let BemVindoMensagem = snap.val().BemVindoMensagem;
                  
                      if (BemVindo == 1) {
                        let message = BemVindoMensagem
                  
                        let boasvindascanalchannel = member.guild.channels.cache.find(channel => channel.id === `${BemVindoChannel}`);
                        boasvindascanalchannel.send(message.replace(/{usuario}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`).replace(/{name}/g, `${member.displayName}`)).catch(()=>{});
                  
                      }
                    })
                  });
            
                  client.on('guildMemberAdd', member => {
            
                    function contador(_números) {
                                   _números = _números.toString();
                                   var texto = ``, números = { 1: 'a:1P:698505595786887208', 2: 'a:2P:698505662006689813', 3: 'a:3P:698505744131293254', 4: 'a:A4:575197202054512640', 5: 'a:4P:698505796866146334', 6: 'a:5P:698556202032037959', 7: 'a:7P:698505908086636575', 8: 'a:8P:698506402104213574', 9: 'a:9P:698506462556586044', 0: 'a:0P:698860198357631056' };
                               
                                   for(let i =0; i < _números.length; i++) texto += '<' + números[parseInt(_números[i])] + '>';
                               
                                  return texto;
                               }
             
                               function contador2(_números2) {
                                 _números2 = _números2.toString();
                                 var texto = ``, números2 = { 1: 'a:1SS:698230343118880868', 2: 'a:2SS:698230688368951447', 3: 'a:3SS:698231027575029771', 4: 'a:4SS:698231659501191188', 5: 'a:5SS:698231843861823488', 6: 'a:6SS:698232125006020658', 7: 'a:7SS:698232458302324866', 8: 'a:8SS:698232738674901112', 9: 'a:9SS:698232944778674206', 0: 'a:0SS:698229947369783356' };
                             
                                 for(let i =0; i < _números2.length; i++) texto += '<' + números2[parseInt(_números2[i])] + '>';
                             
                                return texto;
                             }
             
                             function contador3(_números3) {
                               _números3 = _números3.toString();
                               var texto = ``, números3 = { 1: 'a:01:698243929467912252', 2: 'a:02:698243989236613120', 3: 'a:03:698244081423351849', 4: 'a:04:698244184791973988', 5: 'a:05:698244247429578793', 6: 'a:06:698244837392122016', 7: 'a:07:698245078820585513', 8: 'a:08:698245165843742871', 9: 'a:09:698245262581170187', 0: 'a:00:698859178713939990' };
                           
                               for(let i =0; i < _números3.length; i++) texto += '<' + números3[parseInt(_números3[i])] + '>';
                           
                              return texto;
                           }
             
                           function contador4(_números4) {
                             _números4 = _números4.toString();
                             var texto = ``, números4 = { 1: 'a:1B:698858368718077964', 2: 'a:2B:698857496256839761', 3: 'a:3B:698857559871848478', 4: 'a:4P:698505796866146334', 5: 'a:5B:698857664729317386', 6: 'a:6B:698857738213523508', 7: 'a:7B:698857838159724576', 8: 'a:8B:698857953230323764', 9: 'a:9B:698858015498960906', 0: 'a:0B:698857357433634857' };
                         
                             for(let i =0; i < _números4.length; i++) texto += '<' + números4[parseInt(_números4[i])] + '>';
                         
                            return texto;
                         }
             
                         function contador5(_números5) {
                           _números5 = _números5.toString();
                           var texto = ``, números5 = { 1: ':1R:751872711336394813', 2: ':2R:751873333112340530', 3: ':3R:751872779338383390', 4: ':4R:751872815485026405', 5: ':5R:751872844551684186', 6: ':6R:751872869411192974', 7: ':7R:751872893553606756', 8: ':8R:751872916496580622', 9: ':9R:751872944413868082', 0: ':0R:751873468269592648' };
                       
                           for(let i =0; i < _números5.length; i++) texto += '<' + números5[parseInt(_números5[i])] + '>';
                       
                          return texto;
                       }
             
                       database.ref(`Servidores/${member.guild.id}`)
                       .once('value').then(async function(snap){
                         let Contador = snap.val().Contador;
                         let ContadorChannel = snap.val().ContadorChannel;
                         let ContadorMensagem = snap.val().ContadorMensagem;
             
                         if(Contador == 1) {            
                               let channeltopic = member.guild.channels.cache.find(channel => channel.id === `${ContadorChannel}`);
                               channeltopic.setTopic(ContadorMensagem.replace(/{contador}/g, `${contador(member.guild.memberCount)}`).replace(/{contador2}/g, `${contador2(member.guild.memberCount)}`).replace(/{contador3}/g, `${contador3(member.guild.memberCount)}`).replace(/{contador4}/g, `${contador4(member.guild.memberCount)}`).replace(/{contador5}/g, `${contador5(member.guild.memberCount)}`));
                         }
                             });
             })

             client.on('guildMemberRemove', member => {
            
                function contador(_números) {
                               _números = _números.toString();
                               var texto = ``, números = { 1: 'a:1P:698505595786887208', 2: 'a:2P:698505662006689813', 3: 'a:3P:698505744131293254', 4: 'a:A4:575197202054512640', 5: 'a:4P:698505796866146334', 6: 'a:5P:698556202032037959', 7: 'a:7P:698505908086636575', 8: 'a:8P:698506402104213574', 9: 'a:9P:698506462556586044', 0: 'a:0P:698860198357631056' };
                           
                               for(let i =0; i < _números.length; i++) texto += '<' + números[parseInt(_números[i])] + '>';
                           
                              return texto;
                           }
         
                           function contador2(_números2) {
                             _números2 = _números2.toString();
                             var texto = ``, números2 = { 1: 'a:1SS:698230343118880868', 2: 'a:2SS:698230688368951447', 3: 'a:3SS:698231027575029771', 4: 'a:4SS:698231659501191188', 5: 'a:5SS:698231843861823488', 6: 'a:6SS:698232125006020658', 7: 'a:7SS:698232458302324866', 8: 'a:8SS:698232738674901112', 9: 'a:9SS:698232944778674206', 0: 'a:0SS:698229947369783356' };
                         
                             for(let i =0; i < _números2.length; i++) texto += '<' + números2[parseInt(_números2[i])] + '>';
                         
                            return texto;
                         }
         
                         function contador3(_números3) {
                           _números3 = _números3.toString();
                           var texto = ``, números3 = { 1: 'a:01:698243929467912252', 2: 'a:02:698243989236613120', 3: 'a:03:698244081423351849', 4: 'a:04:698244184791973988', 5: 'a:05:698244247429578793', 6: 'a:06:698244837392122016', 7: 'a:07:698245078820585513', 8: 'a:08:698245165843742871', 9: 'a:09:698245262581170187', 0: 'a:00:698859178713939990' };
                       
                           for(let i =0; i < _números3.length; i++) texto += '<' + números3[parseInt(_números3[i])] + '>';
                       
                          return texto;
                       }
         
                       function contador4(_números4) {
                         _números4 = _números4.toString();
                         var texto = ``, números4 = { 1: 'a:1B:698858368718077964', 2: 'a:2B:698857496256839761', 3: 'a:3B:698857559871848478', 4: 'a:4P:698505796866146334', 5: 'a:5B:698857664729317386', 6: 'a:6B:698857738213523508', 7: 'a:7B:698857838159724576', 8: 'a:8B:698857953230323764', 9: 'a:9B:698858015498960906', 0: 'a:0B:698857357433634857' };
                     
                         for(let i =0; i < _números4.length; i++) texto += '<' + números4[parseInt(_números4[i])] + '>';
                     
                        return texto;
                     }
         
                     function contador5(_números5) {
                       _números5 = _números5.toString();
                       var texto = ``, números5 = { 1: ':1R:751872711336394813', 2: ':2R:751873333112340530', 3: ':3R:751872779338383390', 4: ':4R:751872815485026405', 5: ':5R:751872844551684186', 6: ':6R:751872869411192974', 7: ':7R:751872893553606756', 8: ':8R:751872916496580622', 9: ':9R:751872944413868082', 0: ':0R:751873468269592648' };
                   
                       for(let i =0; i < _números5.length; i++) texto += '<' + números5[parseInt(_números5[i])] + '>';
                   
                      return texto;
                   }
         
                   database.ref(`Servidores/${member.guild.id}`)
                   .once('value').then(async function(snap){
                     let Contador = snap.val().Contador;
                     let ContadorChannel = snap.val().ContadorChannel;
                     let ContadorMensagem = snap.val().ContadorMensagem;
         
                     if(Contador == 1) {            
                           let channeltopic = member.guild.channels.cache.find(channel => channel.id === `${ContadorChannel}`);
                           channeltopic.setTopic(ContadorMensagem.replace(/{contador}/g, `${contador(member.guild.memberCount)}`).replace(/{contador2}/g, `${contador2(member.guild.memberCount)}`).replace(/{contador3}/g, `${contador3(member.guild.memberCount)}`).replace(/{contador4}/g, `${contador4(member.guild.memberCount)}`).replace(/{contador5}/g, `${contador5(member.guild.memberCount)}`));
                     }
                         });
         })
             
             client.on('message', async message => {
            
                database.ref(`Servidores/${message.guild.id}`)
                .once('value').then(async function(snap){
                  let ProteçãoLinks = snap.val().ProteçãoLinks;
                  let LogsChannel = snap.val().LogsChannel;
                  let Logs = snap.val().LogsChannel;
            
                  if(ProteçãoLinks == 1) {
                  if(message.author.bot) return;
                  if (message.content.includes('discord.gg') || message.content.includes('.gg') || message.content.includes("d i s c o r d . g g" ) || message.content.includes(". g g" ) || message.content.includes('d.i.s.c.o.r.d.g.g')){
                  if (message.member.hasPermission('ADMINISTRATOR')) return;
                  message.delete();
                  
                  if (Logs == 1) {
                  let embedreport = new Discord.MessageEmbed()
                  .setColor('#4959E9')
                  .setDescription('**Logs Proteção Links**')
                  .addField('Usuário:', `${message.author}`)
                  .addField('URL:', `${message.content}`)
                  .addField('Canal:', `${message.channel}`)
                  const channelreport = message.guild.channels.find(channel => channel.id === `${LogsChannel}`);
                  channelreport.send(embedreport);
                      }
                  message.channel.send(`**${message.author} Você não pode enviar convite de outros servidores aqui.**`).then(msg => {
                    msg.delete({ timeout: 12000 })
                  })
                    }
                  }
                })
              })
            
            
              client.on('guildBanAdd', (guild, user) => {
            
                database.ref(`Servidores/${guild.id}`)
                .once('value').then(async function(snap){
                  let Logs = snap.val().Logs;
                  let LogsChannel = snap.val().LogsChannel;
                  if(Logs === 1) {
              
                    let embed = new Discord.MessageEmbed()
                    .setThumbnail(user.avatarURL())
                    .setColor('#9026cf')
                    .setTitle('**China • Logs **')
                    .addField('Função:', `Ban`)
                    .addField('Usuário:', `<@${user.id}>`)
                    .addField('ID:', `${user.id}`)
                    .setTimestamp()
              
                    const logChannel = guild.channels.cache.find(channel => channel.id === `${LogsChannel}`);
                    logChannel.send(embed);
                  };
                });
              });
              
              client.on('guildBanRemove', (guild, user) => {
              
                database.ref(`Servidores/${guild.id}`)
                .once('value').then(async function(snap){
                  let Logs = snap.val().Logs;
                  let LogsChannel = snap.val().LogsChannel;
                  if(Logs === 1) {
              
                    let embed = new Discord.MessageEmbed()
                    .setThumbnail(user.avatarURL())
                    .setColor('#4959E9')
                    .setTitle('**China • Logs **')
                    .addField('Função:', `UnBan`)
                    .addField('Usuário:', `<@${user.id}>`)
                    .addField('ID:', `${user.id}`)
                    .setTimestamp()
              
                    const logChannel = guild.channels.cache.find(channel => channel.id === `${LogsChannel}`);
                    logChannel.send(embed);
                  };
                });
              });
              
              client.on('channelCreate', async (channel) => {
              
                database.ref(`Servidores/${channel.guild.id}`)
                .once('value').then(async function(snap){
                  let Logs = snap.val().Logs;
                  let LogsChannel = snap.val().LogsChannel;
                  if(Logs === 1) {
              
                    let embed = new Discord.MessageEmbed()
                    .setThumbnail(channel.guild.iconURL())
                    .setColor('#4959E9')
                    .setTitle('**China • Logs **')
                    .addField('Função:', `Criamento De Canal`)
                    .addField('Nome Do Canal:', `${channel.name}`)
                    .addField('ID Do Canal:', `${channel.id}`)
                    .addField('Tipo Do Canal:', `${channel.type}`)
                    .setTimestamp()
              
                    const logChannel = channel.guild.channels.cache.find(channel => channel.id === `${LogsChannel}`);
                    logChannel.send(embed);
                  };
                });
              })
              
              client.on('channelDelete', async (channel) => {
              
                database.ref(`Servidores/${channel.guild.id}`)
                .once('value').then(async function(snap){
                  let Logs = snap.val().Logs;
                  let LogsChannel = snap.val().LogsChannel;
                  if(Logs === 1) {
              
                    let embed = new Discord.MessageEmbed()
                    .setThumbnail(channel.guild.iconURL())
                    .setColor('#4959E9')
                    .setTitle('**China • Logs **')
                    .addField('Função:', `Removedor De Canal`)
                    .addField('Nome Do Canal:', `${channel.name}`)
                    .addField('ID Do Canal:', `${channel.id}`)
                    .addField('Tipo Do Canal:', `${channel.type}`)
                    .setTimestamp()
              
                    const logChannel = channel.guild.channels.cache.find(channel => channel.id === `${LogsChannel}`);
                    logChannel.send(embed);
                  };
                });
              })
              
              client.on('roleCreate', async (role) => {
              
                database.ref(`Servidores/${role.guild.id}`)
                .once('value').then(async function(snap){
                  let Logs = snap.val().Logs;
                  let LogsChannel = snap.val().LogsChannel;
                  if(Logs === 1) {
              
                    let embed = new Discord.MessageEmbed()
                    .setThumbnail(role.guild.iconURL())
                    .setColor('#4959E9')
                    .setTitle('**China • Logs **')
                    .addField('Função:', `Criamento De Cargo`)
                    .addField('Nome Do Cargo:', `${role.name}`)
                    .addField('ID Do Cargo:', `${role.id}`)
                    .setTimestamp()
              
                    const logChannel = role.guild.channels.cache.find(channel => channel.id === `${LogsChannel}`);
                    logChannel.send(embed);
                  };
                });
              })
              
              client.on('roleDelete', async (role) => {
              
                database.ref(`Servidores/${role.guild.id}`)
                .once('value').then(async function(snap){
                  let Logs = snap.val().Logs;
                  let LogsChannel = snap.val().LogsChannel;
                  if(Logs === 1) {
              
                    let embed = new Discord.MessageEmbed()
                    .setThumbnail(role.guild.iconURL())
                    .setColor('#4959E9')
                    .setTitle('**China • Logs **')
                    .addField('Função:', `Removedor De Cargo`)
                    .addField('Nome Do Cargo:', `${role.name}`)
                    .addField('ID Do Cargo:', `${role.id}`)
                    .setTimestamp()
              
                    const logChannel = role.guild.channels.cache.find(channel => channel.id === `${LogsChannel}`);
                    logChannel.send(embed);
                  };
                });
              })
              
              client.on('emojiCreate', async (emoji) => {
              
                database.ref(`Servidores/${emoji.guild.id}`)
                .once('value').then(async function(snap){
                  let Logs = snap.val().Logs;
                  let LogsChannel = snap.val().LogsChannel;
                  if(Logs === 1) {
              
                    let embed = new Discord.MessageEmbed()
                    .setThumbnail(emoji.guild.iconURL())
                    .setColor('#4959E9')
                    .setTitle('**China • Logs **')
                    .addField('Função:', `Criador De Emoji`)
                    .addField('Nome Do Emoji:', `${emoji.name}`)
                    .addField('ID Do Emoji:', `${emoji.id}`)
                    .setTimestamp()
              
                    const logChannel = emoji.guild.channels.cache.find(channel => channel.id === `${LogsChannel}`);
                    logChannel.send(embed);
                  };
                });
              })
              
              client.on('emojiDelete', async (emoji) => {
              
                database.ref(`Servidores/${emoji.guild.id}`)
                .once('value').then(async function(snap){
                  let Logs = snap.val().Logs;
                  let LogsChannel = snap.val().LogsChannel;
                  if(Logs === 1) {
              
                    let embed = new Discord.MessageEmbed()
                    .setThumbnail(emoji.guild.iconURL())
                    .setColor('#4959E9')
                    .setTitle('**China • Logs **')
                    .addField('Função:', `Removedor De Emoji`)
                    .addField('Nome Do Emoji:', `${emoji.name}`)
                    .addField('ID Do Emoji:', `${emoji.id}`)
                    .setTimestamp()
              
                    const logChannel = emoji.guild.channels.cache.find(channel => channel.id === `${LogsChannel}`);
                    logChannel.send(embed);
                  };
                });
              })
              
              client.on('messageDelete', async (message) => {
              
                database.ref(`Servidores/${message.guild.id}`)
                .once('value').then(async function(snap){
                  let Logs = snap.val().Logs;
                  let LogsChannel = snap.val().LogsChannel;
                  if(Logs === 1) {
              
                    if(message.author.bot === false) {
              
                    let embed = new Discord.MessageEmbed()
                    .setThumbnail(message.guild.iconURL())
                    .setColor('#4959E9')
                    .setTitle('**China • Logs **')
                    .addField('Função:', `Removedor De Mensagem`)
                    .addField('Author Da Mensagem:', `<@${message.author.id}>`)
                    .addField('ID Da Mensagem:', `${message.id}`)
                    .addField('Canal Da Mensagem:', `${message.channel}`)
                    .addField('Mensagem:', `\`${message}\``)
                    .setTimestamp()
              
                    const logChannel = message.guild.channels.cache.find(channel => channel.id === `${LogsChannel}`);
                    logChannel.send(embed);
                    };
                  };
                });
              })
              
              client.on('messageUpdate', async (message) => {
              
                database.ref(`Servidores/${message.guild.id}`)
                .once('value').then(async function(snap){
                  let Logs = snap.val().Logs;
                  let LogsChannel = snap.val().LogsChannel;
                  if(Logs === 1) {
              
                    if(message.author.bot === false) {
              
                    let embed = new Discord.MessageEmbed()
                    .setThumbnail(client.user.avatarURL())
                    .setColor('#4959E9')
                    .setTitle('**China • Logs **')
                    .addField('Função:', `Removedor De Mensagem`)
                    .addField('Author Da Mensagem:', `<@${message.author.id}>`)
                    .addField('ID Da Mensagem:', `${message.id}`)
                    .addField('Canal Da Mensagem:', `${message.channel}`)
                    .addField('Mensagem Antiga:', `\`${message}\``)
                    .addField('Mensagem Nova:', `\`${message.edits}\``)
                    .setTimestamp()
              
                    const logChannel = message.guild.channels.cache.find(channel => channel.id === `${LogsChannel}`);
                    logChannel.send(embed);
                    };
                  };
                });
              })
              
              
              
              client.on('guildMemberAdd', async member => {
                database.ref(`Servidores/${member.guild.id}`)
                .once('value').then(async function(snap){
                  let Invites = snap.val().Invites;
                  let InvitesChannel = snap.val().InvitesChannel;
                   if(Invites === 1) {
                 member.guild.fetchInvites().then(guildInvites => {
                 const ei = invites[member.guild.id];
                 invites[member.guild.id] = guildInvites;
                 const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
                 const inviter = client.users.cache.get(invite.inviter.id);
                 const logChannel = member.guild.channels.cache.find(channel => channel.id === `${InvitesChannel}`);
                let embed2 = new Discord.MessageEmbed()
                .setColor('4959E9')
                .addField('Convite:', `${invite.code}`)
                .addField('Membro:', `<@${member.id}>`, true)
                .addField('ID:', `${member.id}`, true)
                .addField('De:', `<@${inviter.id}>`, true)
                .addField('ID:', `${inviter.id}`, true)
                 logChannel.send(embed2);
                });
                }
                })
                })

client.on('message', message => {
  if(message.author.bot) return;
  if(message.guild == null) return;


  database.ref(`Servidores/${message.guild.id}`)
  .once('value').then(async function(snap){
    let Caixa = snap.val().Caixa;
    let Caixatipo = snap.val().Caixatipo;

    let prc = Math.round(Math.random() * 1340)
    if (prc == 133) {


      database.ref(`Servidores/${message.guild.id}/`)
      .update({
          Caixa: snap.val().Caixa = 1,
          Caixatipo: snap.val().Caixatipo = 'Lendaria',
        })


        let embedlendaria = new Discord.MessageEmbed()
        .setColor('4959E9')
        .setTitle('**<:box:805423264402112523> Uma caixa lendaria foi dropada!**')
        .setDescription('**<:box:805423264402112523> Rápido! pege-a antes que todos! \n Use: \`i!getbox\` para capturá-la.')
        message.channel.send(embedlendaria)
    } else if(prc == 1333) {


      database.ref(`Servidores/${message.guild.id}/`)
      .update({
          Caixa: snap.val().Caixa = 1,
          Caixatipo: snap.val().Caixatipo = 'Epica',
        })


        let embedepica = new Discord.MessageEmbed()
        .setColor('4959E9')
        .setTitle('**<:box:805423264402112523> Uma caixa epica foi dropada!**')
        .setDescription('**<:box:805423264402112523> Rápido! pege-a antes que todos! \n Use: \`i!getbox\` para capturá-la.')
        message.channel.send(embedepica)
    } else if(prc == 1339) {

      database.ref(`Servidores/${message.guild.id}/`)
      .update({
          Caixa: snap.val().Caixa = 1,
          Caixatipo: snap.val().Caixatipo = 'Rara',
        })


        let embedrara = new Discord.MessageEmbed()
        .setColor('4959E9')
        .setTitle('**<:box:805423264402112523> Uma caixa rara foi dropada!**')
        .setDescription('**<:box:805423264402112523> Rápido! pege-a antes que todos! \n Use: \`i!getbox\` para capturá-la.')
        message.channel.send(embedrara)
    } else if(prc == 1339) {

      database.ref(`Servidores/${message.guild.id}/`)
      .update({
          Caixa: snap.val().Caixa = 1,
          Caixatipo: snap.val().Caixatipo = 'Comum',
        })


        let embedcomum = new Discord.MessageEmbed()
        .setColor('4959E9')
        .setTitle('**<:box:805423264402112523> Uma caixa comum foi dropada!**')
        .setDescription('**<:box:805423264402112523> Rápido! pege-a antes que todos! \n Use: \`k.getbox\` para capturá-la.')
        message.channel.send(embedcomum)

    }
  })
})
              

isDir = path => {
    try {
        let stat = fs.lstatSync(path)
        return stat.isDirectory()
    } catch (err) {
        return false;
    }
}

source.forEach(folder => {
    if (folder === 'commands') {
        client[folder] = {};
    } else if (folder !== 'events') return
    let subFolder = fs.readdirSync(`./src/${folder}`)
    subFolder.forEach(subFolder => {
        let all = fs.readdirSync(`./src/${folder}/${subFolder}`)
        let files = all.filter(f => {
            let dirCheck = isDir(`./src/${folder}/${subFolder}/${f}`)
            return f.endsWith('.js') && !dirCheck
        })
        files.forEach(file => {
            let name = file.split('.')[0]
            let exported = require(`./src/${folder}/${subFolder}/${file}`)
            if (folder === "events") {
                client.on(name, exported.bind(null, client))
            }
            else
                client[folder][name] = exported
            delete require.cache[require.resolve(`./src/${folder}/${subFolder}/${file}`)]
        })
        let subFilesFolders = all.filter(f => isDir(`./src/${folder}/${subFolder}/${f}`))
        subFilesFolders.forEach(subFilesFolders => {
            client[subFilesFolders] = {}
            let subFiles = fs.readdirSync(`./src/${folder}/${subFolder}/${subFilesFolders}`)
            subFiles.forEach(subFile => {
                let name = subFile.split('.')[0]
                let exported = require(`./src/${folder}/${subFolder}/${subFilesFolders}/${subFile}`)
                client[subFilesFolders][name] = exported
                delete require.cache[require.resolve(`./src/${folder}/${subFolder}/${subFilesFolders}/${subFile}`)]
            })
        })
    })

})

client.login("NzkwNTM0ODM0NTgxNjY3ODcx.X-CA7w.n_1DiwMMq3FypC90yEOKD4dvHgM").catch(console.error)