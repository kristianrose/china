module.exports = async (client, message, args) => {

        const cmd = args[0];
        if(!cmd || isNaN(cmd)) return message.reply("Esqueceu de colocar a quantidade a ser apagada");
        if(cmd > 50) return message.reply(`Oops, Você pode apenas apagar \`\`50\`\` mensagens  `);

        await message.channel.bulkDelete(parseInt(cmd) + 1);
        
        return message.reply(`\`${cmd}\` mensagens fora apagados`);
}

