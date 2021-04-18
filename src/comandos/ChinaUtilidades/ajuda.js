
const db = require("mongo/db.js")
const discord = require("discord.js")
//db
const firebase = require("firebase");
const database = firebase.database();

const cooldown = new Set()



module.exports = async (client, message, args) => {
 
    message.delete().catch(() => {})
  

var server = message.guild.name
var titulo = " China - Versão 3.1.0A"
  let inicio = new discord.MessageEmbed()
  .setColor("4959E9")
  .setAuthor(titulo,client.user.avatarURL())
  .setThumbnail("https://cdn.glitch.com/d99770e4-3c65-4716-9612-8e9087310401%2Ficons8-currency-settings-96.png?v=1610744583691")
  .setDescription(`
 Meu nome é ${client.user.tag} uma botzinha fantastica focada na proteção de servidores,

 • ${message.author} me adicione em seu servidor [clicando aqui](https://discordapp.com/oauth2/authorize?&client_id=790534834581667871&scope=bot&permissions=8)`)           
  .addField('> **Gerenciamento local**',
            `> <:numeronight0:799604096599588884> | Defesa e Gerenc\n` +
            `> <:numeronight2:799604203046567936> | Moderação\n` +
            `> <:numeronight2:799604340230586380> | Registro`, true)
                              // Segunda parte
   .addField("**Outros**",
    `<:numeronight3:799604416629178419> |  Vip e Call\n` +
    `<:numeronight4:799604487840989265> | Utilidades\n` +
    `<:numeronight5:799604555515691050> |  Nsfw`, true)  
  .setFooter(message.guild.name, message.guild.iconURL())


 let defesa = new discord.MessageEmbed()
 .setColor("4959E9")
 .setAuthor(titulo,client.user.avatarURL())
 .setThumbnail("https://cdn.glitch.com/d99770e4-3c65-4716-9612-8e9087310401%2Ficons8-currency-settings-96.png?v=1610744583691")
 .setDescription(`Sistema principal: \`\`i!antiraid help\`\`
 - China Configuração

 > **i!pbot** | Configurar proteção contra bots.
 > **i!plinks** | Configurar proteção contra convites de outros servidore
 > **i!contador** | Configurar proteção contra convites de outros servidore
 > **i!autorole** | Configurar autorole/autocargo.
 > **i!welcome** | Configurar Mensagem de boas vindas.
 > **i!logs**  | Configurar sistema de logs.
 `)
 .addField("Faq", `A Configuração da ${client.user.tag} esta totalmente top10 e atualizada toda ela feita por reação.\nPara desativar o antiraid use \`\`i!antiraid qtd 0\`\`,\n*O antiraid controla os banimentos e expulsões*\nSe configurar o canal em um dos Módulo você tem que configurar o Módulo dentro do canal que queira!`)
 .setFooter(message.guild.name, message.guild.iconURL())


 let moderação = new discord.MessageEmbed()
 .setColor("4959E9")
 .setAuthor(titulo,client.user.avatarURL())
 .setThumbnail("https://cdn.glitch.com/d99770e4-3c65-4716-9612-8e9087310401%2Ficons8-currency-settings-96.png?v=1610744583691")
 .setDescription(`Sistema principal: \`\`i!hackban {usuário} {motivo}\`\`
 - China Moderação

 > **i!ban {usuário} {motivo}** | Banir por reação.
 > **i!unban {ID do usuário}** | Desbanir usuário.
 > **i!mute {usuário} {tempo} {motivo}** | Mutar usuário por tempo.
 > **i!unmute {usuário}** | Desmutar usuário.
 > **i!roleall** {cargo} | Dar cargo a todos membros
 > **i!unlock** | Ativar todos os chats da catégoria.
 > **i!lock** | Desativar todos os chats da catégoria.
 `)
 .addField("Faq", `Lembrando que o comando de \`\`i!hackban\`\` da ban de imediato!\n Use \`\`i!ban {usuário} {motivo}\`\` para evitar esse tipo de problema e aparecer reaçōes antes do banimento.\nPara colocar um banner estiloso quando for banir alguem basta usar \`\`i!myconfig\`\`.`)
 .setFooter(message.guild.name, message.guild.iconURL())



 let registro = new discord.MessageEmbed()
 .setColor("4959E9")
 .setAuthor(titulo,client.user.avatarURL())
 .setThumbnail("https://cdn.glitch.com/d99770e4-3c65-4716-9612-8e9087310401%2Ficons8-currency-settings-96.png?v=1610744583691")
 .setDescription(`Sistema principal: \`\`i!registro\`\`
 - China Registro

 > **i!registrador {usuário}** | Informação do registrador.
 > **i!registrar {usuário}** | Registre algum membro.
 `)
 .addField("Faq", `Sistema de registro ainda esta beta, não é por reação e sim manual,\npara configurar use o sistema principal apresentado acima.`)
 .setFooter(message.guild.name, message.guild.iconURL())



 let sistemas = new discord.MessageEmbed()
 .setColor("4959E9")
 .setAuthor(titulo,client.user.avatarURL())
 .setThumbnail("https://cdn.glitch.com/d99770e4-3c65-4716-9612-8e9087310401%2Ficons8-currency-settings-96.png?v=1610744583691")
 .setDescription(`Sistema principal: \`\`i!configvip\`\`
 - China Sistemas

 **Sistema Vip**
 > **i!vip {usuário}** | Status atual do vip de um usuário
 > **i!addvip {usuário}** | Adicionar vip em algum usuario
 > ㅤㅤㅤㅤ
 **Sistema Mov-Call**
 > Em desenvolvimento
 `)
 .addField("Faq", `Sistema de Mov-Call esta em desenvolvimento, e o sistema vip esta sendo atualizado atualmente e esta funcional!`)
 .setFooter(message.guild.name, message.guild.iconURL())



 let utilidades = new discord.MessageEmbed()
 .setColor("4959E9")
 .setAuthor(titulo,client.user.avatarURL())
 .setThumbnail("https://cdn.glitch.com/d99770e4-3c65-4716-9612-8e9087310401%2Ficons8-currency-settings-96.png?v=1610744583691")
 .setDescription(`Sistema principal: \`\`i!afk\`\`
 - China Utilidades

 > **i!avatar {usuário}** | Mostrar avatar de um usuário.
 > **i!servericon** | Ver icone do servidor.
 > **i!serverinfo** | Mostrar todas informações do servidor.
 > **i!convidar** | Informação do servidor.
 > **i!div {usuário}** | Ver quantos usuarios têm convidado.
 > **i!divs** | Lista dos 5 melhores divulgadores do servidor.
 > **i!addemoji {emoji}** | Adicione qualquer emoji no servidor

 **Casamento**
 > **i!casar {usuário}** | Casar com o usuario que você ama.
 > **i!casado** | Veja com quem você esta casado(a) atualmente.
 > **i!divorciar** | Divorcie com o usuario que você amava ;-;
 `)
 .addField("Faq", `Sistema AFK esta em desenvolvimento e pode não estar a funcionar.`)
 .setFooter(message.guild.name, message.guild.iconURL())



 let nsfw = new discord.MessageEmbed()
 .setColor("4959E9")
 .setAuthor(titulo,client.user.avatarURL())
 .setThumbnail("https://cdn.glitch.com/d99770e4-3c65-4716-9612-8e9087310401%2Ficons8-currency-settings-96.png?v=1610744583691")
 .setDescription(`Sistema principal: \`\`i!nsfw\`\`
 - China NSFW

 > **i!4k** | Ninfas 4k.
 > **i!anal** | Anal em ninfas.
 > **i!buceta** | Buceta de ninfas.
 > **i!bunda** | Bunda de ninfas.
 > **i!coxa** | Coxa de ninfas.
 > **i!hentai** | Hentai.
 > **i!sensual** | Ninfas sensuais.
 > **i!sexo** | Gifs/Imagem de sexo.
 `)
 .addField("Faq", `O sistema nsfw deve ser ativadoo antes de usar, use o comando principal localizado acima.`)
 .setFooter(message.guild.name, message.guild.iconURL())


  message.channel.send(inicio).then(async msg => { 
      await msg.react('799605008152657930')
      await msg.react("799604096599588884")
      await msg.react("799604203046567936")
      await msg.react("799604340230586380")
      await msg.react("799604416629178419")
      await msg.react("799604487840989265")
      await msg.react("799604555515691050")

      const collector = msg.createReactionCollector((r, u) => (r.emoji.id === "<:numeronightX:799605008152657930>", "<:numeronight0:799604096599588884>", "<:numeronight1:799604203046567936>", "<:numeronight2:799604340230586380>", "<:numeronight3:799604416629178419>", "<:numeronight4:799604487840989265>", "<:numeronight5:799604555515691050>" && u.id === message.author.id))
      collector.on("collect", async r => {
          switch (r.emoji.id) {
               case '799605008152657930':
              msg.edit(inicio)
              r.remove(r.users.filter(u => u === message.author).first());
              break;
        }
        switch (r.emoji.id) {
            case '799604096599588884':
           msg.edit(defesa)
           r.remove(r.users.filter(u => u === message.author).first());
           break;
     }
     switch (r.emoji.id) {
        case '799604203046567936':
       msg.edit(moderação)
       r.remove(r.users.filter(u => u === message.author).first());
       break;
 }
     switch (r.emoji.id) {
        case '799604340230586380':
       msg.edit(registro)
       r.remove(r.users.filter(u => u === message.author).first());
       break;
 }
 switch (r.emoji.id) {
    case '799604416629178419':
   msg.edit(sistemas)
   r.remove(r.users.filter(u => u === message.author).first());
   break;
}
switch (r.emoji.id) {
    case '799604487840989265':
   msg.edit(utilidades)
   r.remove(r.users.filter(u => u === message.author).first());
   break;
}
switch (r.emoji.id) {
    case '799604555515691050':
   msg.edit(nsfw)
   r.remove(r.users.filter(u => u === message.author).first());
   break;
}


    })
})
}