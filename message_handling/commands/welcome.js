const welcomeCommandHandler = (message, args, client) => {
    if (args[0]) {
        const user = getUserFromMention(args[0], client);
        if (!user) {
            return message.channel.send('Could not fetch tagged user.');
        } else {
            message.channel.send('Welcome ' + `${user}` + " to the Official DSC KGEC Discord Server!\nHead over the " + message.guild.channels.cache.get('755165862297731173').toString() +  " channel to get started.\n--------------------");
        }
    } else {
        message.channel.send('No one tagged!');
    }
}

function getUserFromMention(mention, client) {
	// The id is the first and only match found by the RegEperson.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}

module.exports = welcomeCommandHandler