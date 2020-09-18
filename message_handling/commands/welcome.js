const welcomeCommandHandler = (message, args) => {
    if (args[0]) {
        const user = getUserFromMention(args[0]);
        if (!user) {
            return message.channel.send('Could not fetch tagged user.');
        } else {
            message.channel.send('Welcome ' + `${user}` + " to the Official DSC KGEC Discord Server!\nHead over the " + message.guild.channels.cache.get('755165862297731173').toString() +  " channel to get started.\n--------------------");
        }
    } else {
        message.channel.send('No one tagged!');
    }
}

module.exports = welcomeCommandHandler