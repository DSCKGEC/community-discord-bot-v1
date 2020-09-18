const { prefix } = require('../config.json');
const checkAuth = require('./commands/checkAuth');
const welcomeCommandHandler = require('./commands/welcome');
const addEventHandler = require('./commands/addEvent');

const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');

const messageHandler = (message, announcementChannel) => {
    if(!message.content.startsWith(prefix)) return;

    /* --------- Made Lowercase to deal with it easily ------------ */
    let messageContentinLowercase = message.content.toLowerCase()
    const messageWithoutPrefix = messageContentinLowercase.slice(prefix.length);
    const split = messageWithoutPrefix.split(/ +/);
    const command = split[0].toLowerCase();
    const args = split.slice(1);


    /* ------------------ Commands & Responses ----------------- */
    switch(command){
        case `welcome`: 
            welcomeCommandHandler(message, args);
            break;
            
        case `add-event`:
            addEventHandler(message, args, announcementChannel);
            break;

        case `auth`:
            checkAuth(message, args);
            break;

        case `scrape`:
            request('https://developers.google.com/events', (error, response, html) => {
                if (!error && response.statusCode === 200) {
                    const $ = cheerio.load(html);
                    var images = []
                    $('.devsite-landing-row-item-media figure a img').each((i, el) => {
                        const img = 'https://developers.google.com' + $(el).attr('src');
                        images.push(img)
                    });
                    var urls = []
                    $('.devsite-landing-row-item-body').each((i, el) => {
                        const url = $(el).children('a').attr('href')
                        urls.push(url)
                    });
                    var dates = []
                    $('.devsite-landing-row-item-description-content').each((i, el) => {
                        const date = $(el).children('p').eq(0).text()
                        dates.push(date)
                    });

                    for (var i = 0; i < Math.min(3, images.length); i++) {
                        const emb = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .addFields(
                            { name: 'Event URL', value: urls[i] },
                            { name: 'Event Date', value: dates[i]},
                        )
                        .setImage(images[i]);
                        message.channel.send(emb).catch(err => {
                            message.channel.send(`Error faced: ${err}`)
                        })
                    }
                }
            })
            break;

            
        case `ping`:
            message.channel.send('Willy here, live.');
            break;

        default:
            message.channel.send(`I haven't been programmed for that command yet.\n\n> We encourage you to add more commands and contribute to the development of the bot. It would really be a fun learning experience this pandemic. \n\nSend a PR with your contributions to our repository:\nhttps://github.com/DSCKGEC/community-discord-bot`)
    }
}

module.exports = messageHandler;