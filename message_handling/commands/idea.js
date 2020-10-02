const { DiscordAPIError } = require("discord.js")
const { MessageEmbed } = require('discord.js')

async function prompt(message, msg) {
    const filter = (response) => response.author.id === message.author.id;
    message.channel.send(msg)
    return message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
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
    const auth = `By: ${message.author.username}`;
    const authImage = message.author.avatarURL;
    const ideaChannel = "755194723509076108"
    const embedColor = "#00fbff"
    // Sends the prompt for the topic
    const topic = await prompt(message, "Please enter a short title for your idea.")
    if (topic === "cancel") return message.channel.send("Canceled the command.")
    // Sends the prompt for the description
    const description = await prompt(message, "Please enter a detailed description of your idea.")
    if (description === "cancel") return message.channel.send("Canceled the command.")

    let ideaEmbed = new MessageEmbed()
        .setAuthor(auth, authImage, '')
        .setColor(embedColor)
        .addFields(
            { name: 'The Idea', value: topic },
            { name: 'Description', value: description},
        )
        .setFooter('Upvote or downvote this message by reacting to it!')
    message.channel.send("Submitted your idea successfully!")
    message.client.channels.cache.get(ideaChannel).send({embed: ideaEmbed})
    
}

module.exports = ideaHandler