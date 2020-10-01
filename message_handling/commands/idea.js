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
    const ideaChannel = "755194723509076108"
    const embedColor = "#00fbff"
    // Sends the prompt for the topic
    const topic = await prompt(message, "What is the topic of your idea?")
    if (topic === "cancel") return message.channel.send("Canceled the command.")
    if (topic.length > 256) return message.channel.send("Please shorten the topic to 256 characters or shorter.")
    // Sends the prompt for the description
    const description = await prompt(message, "What is the description of your idea?")
    if (description === "cancel") return message.channel.send("Canceled the command.")
    if (description.length > 2048) return message.channel.send("Please shorten the description to 2048 characters or shorter.")

    let ideaEmbed = new MessageEmbed()
        .setTitle(topic)
        .setDescription(description)
        .setColor(embedColor)
        .setFooter(message.author.tag)
    message.channel.send("Sent!")
    message.client.channels.cache.get(ideaChannel).send({embed: ideaEmbed})
    
}

module.exports = ideaHandler