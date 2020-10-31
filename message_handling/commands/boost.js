const boostHandler = (message, args, client) => {
    if (args[0]) {
        const user = message.mentions.members.first();
        if (!user) {
            return message.channel.send('Could not fetch tagged user.');
        } else {
            let role = message.guild.roles.cache.get("755165816340611182");
            user.roles.add(role);
            message.channel.send(`${user} has been boosted to the ${role} role for actively contributing to the community recently!`);
        }
    } else {
        message.channel.send('No one tagged!');
    }
}

function getUserFromMention(mention, client) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	if (!matches) return;
	const id = matches[1];
	return client.users.cache.get(id);
}

module.exports = boostHandler;