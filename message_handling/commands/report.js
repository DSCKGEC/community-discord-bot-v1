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
    const auth = `By: ${message.author.username}`;
    const authImage = message.author.avatarURL;
    const reportChannel = "755165871793635480";
    const embedColor = "#00fbff";

    const issue = await prompt(message, "What would you like to report or raise? Please explain in details.")

    let reportEmbed = new MessageEmbed()
        .setAuthor(auth, authImage, '')
        .setTitle('New Report!!')
        .setColor(embedColor)
        .addFields(
            { name: 'Description', value: issue },
        )
        .setFooter('Any available admin is requested to look into this asap!')
    message.channel.send("Sent!")
    message.client.channels.cache.get(reportChannel).send({embed: reportEmbed})



}

module.exports = reportHandler