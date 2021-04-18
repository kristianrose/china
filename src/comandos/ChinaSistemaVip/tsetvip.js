const PremiumSchema = require('mongo/db.js')

module.exports = (client, message, args) => {
if (message.deletable) message.delete();

		if(!args) return message.channel.send({ embed:{ color:3066993, description:`Ops! Você precisa mencionar alguém.` } }).then(m => m.delete({ timeout: 30000 }));

		const mUser = await message.mentions.users.first();
		const user = mUser.id;
		const userM = mUser.user;

		if (!mUser) return message.error('Ops! Esse usuário não foi encontrado.');

		const tagName = `Vip de ${userM.username}`;
		const callName = `Hall de ${userM.username}`;
		const inicio = new Date(Date.now()).toDateString();

		PremiumSchema.findOne({
			userID: user,
		}, async (err, res) => {
			if (err) console.log(err.message);

			if (!res) {
				const newPremium = new PremiumSchema({
					userID: user,
					guildID: message.guild.id,
					startDate: inicio,
					tag: tagName,
					call: callName,
					callID: '00',
					tagID: '00',
				});
				try {
					await newPremium.save();
					userM.premium = true;
					const doc = await PremiumSchema.findOne({ userID: user });

					// mUser.roles.add('831343471133720616');

					await message.guild.roles.create({
						data: { name: tagName, color: 'DEFAULT' }
					}).then(r => {
						mUser[0].roles.add(r.id)
						doc.tagID = r.id;
						doc.save();
					});

					await message.guild.channels.create(callName, {
						type: 'voice',
						permissionOverwrites: [{
							id: message.guild.id, deny: ['CONNECT'],
						}, {
							id: user, allow: ['CONNECT'],
						},
					],
					}).then(c => {
						doc.callID = c.id;
						doc.save();
					});

					// await newPremium.set(callID, cID);
					// await newPremium.set(tagID, tID);
					doc.save().catch(err => console.log(err.message));

					message.channel.send({ embed:{ color:3066993, description:`<a:verificado_td:831646839379197972>  ${mUser.user} teve o VIP adicionado.` } }).then(m => m.delete({ timeout: 30000 }));
				} catch (err) {
					message.channel.send({ embed:{ color:3066993, description:`Ops! Um erro ocorreu, tente novamente.` } }).then(m => m.delete({ timeout: 30000 }));
				}
			} else if (res) {
				message.channel.send('Ops! Esse usuário já é um usuário VIP.');
			}
		});
	};