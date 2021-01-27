const { DiscordAPIError } = require("discord.js")
const { MessageEmbed } = require('discord.js')

async function prompt(message, msg) {
    const filter = (response) => response.author.id === message.author.id;
    message.channel.send(msg)
    return message.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] })
        .then(collected => {
            const content = collected.first().content;
            if (content.toLowerCase() === "cancel") return "cancel"
            return content;
        })
        .catch(_ => {
            console.log(_)
            return message.channel.send("You ran out of time! (1m)")
        });
}


const ideaHandler = async (message, args) => {
    var auth = await prompt(message, "Please enter your name.");
    auth = "By: " + auth;
    const authImage = message.author.avatarURL();
    const ideaChannel = "755194723509076108"
    const embedColor = "#00fbff"
    // Sends the prompt for the topic
    const topic = await prompt(message, "Please enter a short title for your idea.")
    if (topic === "cancel") return message.channel.send("Cancelled the command.")
    // Sends the prompt for the description
    const description = await prompt(message, "Please enter a detailed description of your idea.")
    if (description === "cancel") return message.channel.send("Cancelled the command.")

    let ideaEmbed = new MessageEmbed()
        .setTitle(auth)
        .setColor(embedColor)
        .setThumbnail(authImage)
        .addFields(
            { name: 'Title', value: topic },
            { name: 'Description of the idea', value: description},
        );
    message.channel.send("Submitted your idea successfully!")
    message.client.channels.cache.get(ideaChannel).send({embed: ideaEmbed})
    
}

module.exports = ideaHandler