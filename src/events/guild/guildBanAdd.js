/* eslint-disable no-undef */
'use strict'
const AntiRaid = require('./guild_utils/anti_raid')
module.exports = (client, banGuild, user) => {
    if (!banGuild.available) return;
    AntiRaid(client, banGuild, user)
};