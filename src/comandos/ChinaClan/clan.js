const discord = require('discord.js');
const firebase = require('firebase');
const database = firebase.database();
module.exports = async (client, message, args) => {
    message.delete();

    let embederro1 = new discord.MessageEmbed()
    .setColor('4959E9')
    .addField(`Para que serve um clan?`, `Cada clan tem suas reputação, ou até mesmo seus levels, China em sua nova função de criar clan's possibilitou-se você é seus amigos demonstrar qual clan é o melhor.`)
    .addField(`Como que eu faço para ganhar reputação?`, `Cada clan tem seu Level, reputação, ou até mesmo K/DA
Para ganhar reputação etc... basta você ganhar em jogos da China, como truco ou até mesmo jogo da velha...
Ou mesmo tem a forma de fazer alianças, com essas alianças cada clan ganha uma reputação.`)
    .addField(`Como que eu faço para criar meu clan?`, `Após você clicar no emoji você deverá digitar qualquer nome no chat, 
\`LEMBRA-SE: Sé tiver um clan criado já com o mesmo nome, digite novamente **i!clan** para possibilitar a criação novamente.\`
Para criar um clan você precisa de reputação level 3, é 1000 coins em sua conta.`)
    .setDescription(`**Parece que você não tem um clan. Deseja criar um?**`)
    .setFooter('✅ Criar clan')
    .setTimestamp()

    let embederro2 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Para criar um clan é necessário 1000 coins.**')
    .setTimestamp()

    let embederro3 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Para criar um clan é necessário Nivel 2 de reputação.**')
    .setTimestamp()

    let embederro4 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Nome de clan existente, Por favor tente outro nome.**')
    .setTimestamp()

    let embederro5 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Você não tem permissão.**')
    .setTimestamp()

    let embederro6 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Você não tem coins suficiente.**')
    .setTimestamp()

    let embederro7 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Seu clan não tem coins suficiente.**')
    .setTimestamp()

    let embederro8 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Por favor, Mencione um usuário.**')
    .setTimestamp()

    let embederro9 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Por favor, digite outro nome para mudança de nome do clan.**')
    .setTimestamp()

    let embedacerto1 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Por favor, digite o nome do clan.**')
    .setTimestamp()

    let embedacerto2 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Por favor, digite uma quantia de coins para colocar.**')
    .setTimestamp()

    let embedacerto3 = new discord.MessageEmbed()
    .setColor('4959E9')
    .setDescription('**Por favor, digite uma quantia de coins para retirar.**')
    .setTimestamp()


    database.ref(`Membros/${message.author.id}/`)
    .once('value').then(async function(snap){
        let Clan = snap.val().Clan;
        const ClanNome2 = snap.val().ClanNome;
        const ClanCargo = snap.val().ClanCargo;
        const Coins = snap.val().Coins;
    
    if (Clan === 0) {
        message.channel.send(embederro1).then(async msg => { 
            await msg.react('✅')
            const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "✅" && u.id === message.author.id), { time: 30000000 })
            collector.on("collect", async r => {
                switch (r.emoji.name) {
                    case "✅":
                    msg.delete()

                    database.ref(`Membros/${message.author.id}/`)
                    .once('value').then(async function(snap){
                        let Coins = snap.val().Coins;
                        let Reputação = snap.val().Reputação;

                    if (Coins < 1000) return message.channel.send(embederro2).then(m => m.delete(5000));
                    if (Reputação < 2) return message.channel.send(embederro3).then(m => m.delete(5000));

                    message.channel.send(embedacerto1).then(m => m.delete(5000))

                    const filter = res => {
                        return res.author.id === message.author.id && res.content.length;
                    };
                    const nomeclanconfig = await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000
                    });
                    nomeclanconfig.first().delete();
        
                    const nomeclan = nomeclanconfig.first().content.toLowerCase();

                    database.ref(`Clans/${nomeclan}/`)
                    .once('value').then(async function(snap) {
                      if (snap.val() == null) {
                        database.ref(`Clans/${nomeclan}/`)
                          .set({
                              NomeClan: nomeclan,
                              DonoClan: message.author.id,
                              KDAClan: 1,
                              MembrosClan: 1,
                              StaffClan: 1,
                              LevelClan: 1,
                              XpClan: 0,
                              ReputaçãoClan: 1,
                              CoinsC: 0,
                              ComumBC: 0,
                              RaraBC: 0,
                              EpicaBC: 0,
                              LendariaBC: 0,
                              JogoDaVelhaGanhos: 0,
                              JogoDaVelhaPerdidos: 0,
                              JogoTrucoGanhos: 0,
                              JogoTrucoPerdidos: 0,
                              Alianças: 0,
                          });
                        };
                    });
                        database.ref(`Membros/${message.author.id}`)
                        .update({
                          Clan: snap.val().Clan = 1,
                          ClanNome: snap.val().ClanNome = nomeclan,
                          ClanCargo: snap.val().ClanCargo = 3,
                          Coins: snap.val().Coins - 1000
                            })
                        
                    let embedacerto2 = new discord.MessageEmbed()
                    .setColor('4959E9')
                    .addField('Clan criado com sucesso, utilize \`i!clan\` novamente para abrir seu painel.', `Para convidar pessoas ao seu clan, utilize \`i!clan convidar {usuário}\`.`)
                    .addField('Nome Do Clan:', `${nomeclan}`, true)
                    .addField('Dono Do Clan:', `<@${message.author.id}>`, true)
                    .addField('K/DA Do Clan:', `1`, true)
                    .addField('Reputação Do Clan:', `1`, true)
                    .addField('Membros No Clan:', `1/60`, true)
                    .addField('Level Do Clan:', `1`, true)
                    .addField('Xp Do Clan:', `0`, true)
                    .setFooter('Esta mensagem vai ser deletada em 1 minuto.')
                    message.channel.send(embedacerto2).then(m => m.delete(60000))

                    });
                    break;
                }
            })
        })
    }

    if(args[0]==undefined){

    if (Clan === 1) {
    database.ref(`Clans/${ClanNome2}/`)
    .once('value').then(async function(snap){
        let NomeClan = snap.val().NomeClan;
        let DonoClan = snap.val().DonoClan;
        let KDAClan = snap.val().KDAClan;
        let MembrosClan = snap.val().MembrosClan;
        let StaffClan = snap.val().StaffClan;
        let LevelClan = snap.val().LevelClan;
        let XpClan = snap.val().XpClan;
        let CoinsC = snap.val().CoinsC;
        let ComumBC = snap.val().ComumBC;
        let RaraBC = snap.val().RaraBC;
        let EpicaBC = snap.val().EpicaBC;
        let LendariaBC = snap.val().LendariaBC;
        let Alianças = snap.val().Alianças;
        let JogoDaVelhaGanhos = snap.val().JogoDaVelhaGanhos;
        let JogoDaVelhaPerdidos = snap.val().JogoDaVelhaPerdidos;
        let JogoTrucoGanhos = snap.val().JogoTrucoGanhos;
        let JogoTrucoPerdidos = snap.val().JogoTrucoPerdidos;
        let ReputaçãoClan = snap.val().ReputaçãoClan;

let embedacerto3 = new discord.MessageEmbed()
.setTitle(`**🔰 ${NomeClan} Clan 🔰**`)
.setColor('4959E9')
.addField('Nome Do Clan:', `${NomeClan}`, true)
.addField('Dono Do Clan:', `<@${DonoClan}>`, true)
.addField('K/DA Do Clan:', `${KDAClan}`, true)
.addField('Reputação Do Clan:', `${ReputaçãoClan}`, true)
.addField('Coins no baú:', `${CoinsC}`, true)
.addField('Membros Do Clan:', `${MembrosClan}/60`, true)
.addField('Staffs Do Clan:', `${StaffClan}`, true)
.addField('Alianças Do Clan:', `${Alianças}`, true)
.addField('Level Do Clan:', `${LevelClan} \n Xp: ${XpClan}`, true)
.addField('Jogo Da Velha:', `Ganhos: ${JogoDaVelhaGanhos} \n Perdidos: ${JogoDaVelhaPerdidos}`, true)
.addField('Truco:', `Ganhos: ${JogoTrucoGanhos} \n Perdidos: ${JogoTrucoPerdidos}`, true)
.setFooter('🔰 Informação Clan | 📦 Baú de BOX | ❓ Info')

let embedacerto4 = new discord.MessageEmbed()
.setTitle(`**📦 ${NomeClan} Baú 📦**`)
.setColor('4959E9')
.addField('Aqui estão todas caixas armazenadas no clan, lembra-se só admin ou dono pode pegar.', `Use: \`i!clan bau retirar {Box} {Quantidade} \` Para retirar alguma box. \n Use: \`i!clan bau colocar {Box} {Quantidade}\` Para colocar alguma box.`)
.addField('Box Comum:', `${ComumBC}`, true)
.addField('Box Rara:', `${RaraBC}`, true)
.addField('Box Epica:', `${EpicaBC}`, true)
.addField('Box Lendaria:', `${LendariaBC}`, true)
.setFooter('🔰 Informação Clan | 📦 Baú de BOX | ❓ Info')

let embedacerto5 = new discord.MessageEmbed()
.setTitle(`**📦 ${NomeClan} Baú 📦**`)
.setColor('4959E9')
.addField('i!clan', `Abrir painel do clan.`)
.addField('i!clan convidar {usuário}', `Convide seus amigos para o seu clan. **Admin/Owner**`)
.addField('i!clan kick {usuário}', `Remover alguém do clan. **Admin/Owner**`)
.addField('i!clan {Box} retirar {Quantidade}', `Retire caixa pandora no baú do clan. **Admin/Owner**`)
.addField('i!clan {Box} colocar {Quantidade}', `Coloque caixa pandora no baú do clan. **Admin/Owner**`)
.addField('i!clan coins retirar {Quantidade}', `Retire tal quantidade de coins do baú do clan **Admin/Owner**`)
.addField('i!clan coins colocar {Quantidade}', `Coloque tal quantidade de coins do baú do clan **Admin/Owner**`)
.addField('i!clan admin add {usuário}:', `Adicione um Admin ao seu clan. **Owner**`)
.addField('i!clan trasnferir owner {usuário}', `Transferir posse do clan. **Owner**`)
.addField('i1clan trasnferir coins  {clan}', `Transferir coins para tal clan. **Admin/Owner**`)
.setFooter('🔰 Clan | 📦 Baú de BOX |❓ Info')

message.channel.send(embedacerto3).then(async msg2 => { 
    await msg2.react('🔰')
    await msg2.react('📦')
    await msg2.react('❓')
    const collector = msg2.createReactionCollector((r, u) => (r.emoji.name === "🔰", "📦", "❓", "⚙" && u.id === message.author.id), { time: 30000000 })
    collector.on("collect", async r => {
        switch (r.emoji.name) {
            case "🔰":
            msg2.edit(embedacerto3)
            break;
            case "📦":
            msg2.edit(embedacerto4)
            break;
            case "❓":
            msg2.edit(embedacerto5)
            break;
                }
            });
        });
    });  
};
};

    if(args[0] == 'bau') {
    if(args[1] == 'colocar') {
    if(args[2] == 'coins') {
        const quantia = args[3];
        database.ref(`Membros/${message.author.id}/`)
        .once('value').then(async function(snap){
            let CoinsD = snap.val().Coins;
            let ClaNome3 = snap.val().ClanNome;

    if(ClanCargo == 1 || 0) return message.channel.send(embederro5).then(m => m.delete(5000));

    if (!quantia) return message.channel.send(embedacerto2).then(m => m.delete(5000));

    if (CoinsD < quantia) return message.channel.send(embederro6).then(m => m.delete(5000));

        database.ref(`Clans/${ClaNome3}/`)
        .once('value').then(async function(snap){
            let CoinsC = snap.val().CoinsC;

                database.ref(`Clans/${ClaNome3}`)
                .update({
                    CoinsC: CoinsC + parseInt(args[3])
                })

        let embedacerto6 = new discord.MessageEmbed()
        .setColor('4959E9')
        .setDescription(`**Você transferiu uma quantia de \`${quantia}\` de coins, para o baú do clan \`${ClaNome3}\`**`)
        .setTimestamp()

        message.channel.send(embedacerto6).then(m => m.delete(5000));

        })
        database.ref(`Membros/${message.author.id}/`)
        .update({
          Coins: snap.val().Coins - args[3]
            })
    })
    }
    } else if (args[1] == 'retirar') {

        const quantia2 = args[3];
        database.ref(`Membros/${message.author.id}/`)
        .once('value').then(async function(snap){
            let CoinsD = snap.val().Coins;
            let ClaNome3 = snap.val().ClanNome;

    if(ClanCargo == 1 || 0) return message.channel.send(embederro5).then(m => m.delete(5000));

    if (!quantia2) return message.channel.send(embedacerto3).then(m => m.delete(5000));

        database.ref(`Clans/${ClaNome3}/`)
        .once('value').then(async function(snap){
            let CoinsC = snap.val().CoinsC;

            if (CoinsC < quantia2) return message.channel.send(embederro7).then(m => m.delete(5000));

                database.ref(`Clans/${ClaNome3}`)
                .update({
                    CoinsC: CoinsC - parseInt(args[3])
                })

        let embedacerto6 = new discord.MessageEmbed()
        .setColor('4959E9')
        .setDescription(`**Você transferiu uma quantia de \`${quantia2}\` de coins, para sua conta.**`)
        .setTimestamp()

        message.channel.send(embedacerto6).then(m => m.delete(5000));

        })
        database.ref(`Membros/${message.author.id}/`)
        .update({
          Coins: snap.val().Coins + parseInt(args[3])
            })
    })
    } // retirar
    }

    if(args[0] == 'convidar') {

        if(ClanCargo == 1 || 0) return message.channel.send(embederro5).then(m => m.delete(5000));

        let usuario = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

        if (!usuario) return message.channel.send(embederro8).then(m => m.delete(5000));


        database.ref(`Membros/${usuario.id}/`)
        .once('value').then(async function(snap){
            const ClanU = snap.val().Clan;
            const ClanNome = snap.val().ClanNome;

            let embederro9 = new discord.MessageEmbed()
            .setColor('4959E9')
            .setDescription(`**Esse usuário pertence ao clan \`${ClanNome}\`**`)
            .setTimestamp()
            if (ClanU == 1) return message.channel.send(embederro9).then(m => m.delete(5000));
        });

        let embedconvidar = new discord.MessageEmbed()
        .setColor('4959E9')
        .setDescription(`**Hey \`${usuario.displayName}\` você foi convidado para entrar para o clan \`${ClanNome2}\`, Para aceitar o convite clique no emoji: ✅**`)
        .setTimestamp()
        usuario.send(embedconvidar).then(async msg3 => { 
            await msg3.react('✅')
            const collector = msg3.createReactionCollector((r, u) => (r.emoji.name === "✅" && u.id === usuario.id), { time: 30000000 })
            collector.on("collect", async r => {
                switch (r.emoji.name) {
                    case '✅':

                    let embedconviteaceito = new discord.MessageEmbed()
                    .setColor('4959E9')
                    .setDescription(`**O usuário \`${usuario.displayName}\` aceitou o seu convite de clan.**`)
                    .setTimestamp()
                    message.author.send(embedconviteaceito).then(m => m.delete(5000))

                    database.ref(`Membros/${usuario.id}/`)
                    .once('value').then(async function(snap){
                        const Clan = snap.val().Clan;
                        const ClanNome = snap.val().ClanNome;
                        const ClanCargo = snap.val().ClanCargo;


        database.ref(`Membros/${usuario.id}/`)
        .update({
            Clan: snap.val().Clan = 1,
            ClanNome: snap.val().ClanNome = ClanNome2,
            ClanCargo: snap.val().ClanCargo = 1
            })
            });


            let xp = [7, 5, 9]

            let response = (xp[Math.floor(Math.random() * xp.length)])


        database.ref(`Clans/${ClanNome2}/`)
        .once('value').then(async function(snap){
            let MembrosClan = snap.val().MembrosClan

            database.ref(`Clans/${ClanNome2}/`)
            .update({
                MembrosClan: snap.val().MembrosClan + parseInt(1),
                XpClan: snap.val().XpClan + parseInt(response),
                })

        });



                    msg3.delete();


                    let embedconviteaceitopv = new discord.MessageEmbed()
                    .setColor('4959E9')
                    .setDescription(`** \`${usuario.displayName}\` Bem-vindo(a) ao clan \`${ClanNome2}\`.**`)
                    usuario.send(embedconviteaceitopv).then(m => m.delete(5000));
                    break;
                }
            })
        })
    }
});
};
