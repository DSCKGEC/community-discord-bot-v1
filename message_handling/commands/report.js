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


const reportHandler = async (message, args) => {
    const reportChannel = "755165871793635480"
    const embedColor = "#00fbff"

    const issue = await prompt(message, "What is the issue?")
    if (issue.length > 1024) return message.channel.send("Please shorten the issue to 1024 characters or shorter.")
    const desc = await prompt(message, "Please explain the issue or steps to reproduce.")
    if (desc.length > 1024) return message.channel.send("Please shorten the desc to 1024 characters or shorter.")

    let reportEmbed = new MessageEmbed()
        .setTitle("Report")
        .addField("Issue", issue)
        .addField("Description/Steps to produce", desc)
        .setColor(embedColor)
        .setFooter(message.author.tag)
    message.channel.send("Sent!")
    message.client.channels.cache.get(reportChannel).send({embed: reportEmbed})



}

module.exports = reportHandler