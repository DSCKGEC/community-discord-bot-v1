const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');


const scrapePage = (message, args) => {
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
}

module.exports = scrapePage;