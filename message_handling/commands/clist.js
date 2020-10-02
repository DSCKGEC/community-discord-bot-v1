const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');

const clist = (message, args, type, number = 1) => {

    message.channel.send(`Please wait while we fetch the data!`)

    request('https://clist.by/', (error, response, html) => {
        if(error){ 
            console.log(error);
            message.channel.send(`Error faced: ${err}`)
            return
        }

        else if(response.statusCode !== 200){
            message.channel.send(`The bot got unexpected responses from the site`)
            return
        }
        
        const $ = cheerio.load(html);
        
        let contests = [];

        $(`.row.contest.${type}`).each((i, el) => {
            

            // if($(el).hasClass('.subcontest')) return

            let contestName = $(el).find('.event > .contest_title > a').text()

            let contestURL = $(el).find('.event > .contest_title > a[title]').attr('href');

            let contestHost = $(el).find('.event > .resource > a > small').text();

            //the timings better extracted from the data-ace of calenders. They are well formatted
            let contestTimings = JSON.parse($(el).find('.event > a.data-ace').attr('data-ace')).time;

            let contestDuration = $(el).find('.duration').text()

            let contest = {
                name: contestName,
                url: contestURL,
                host: contestHost,
                timing: contestTimings,
                duration: contestDuration
            }

            contests.push(contest);
        })

        let sent = 0;

        contests.forEach(c => {
            if(sent >= number){
                return
            }
            const embed = 
            new Discord.MessageEmbed()
                       .setColor("#0099ff")
                       .addFields(
                           {
                            name: 'Event Name',
                            value: c.name
                           },
                           {
                            name: 'Event URL',
                            value: c.url
                           },
                           {
                            name: 'Event Host',
                            value: c.host
                           },
                           {
                            name: "Starts at",
                            value: c.timing.start
                           },
                           {
                            name: "Ends at",
                            value: c.timing.end
                           },
                           {
                            name: "Duration",
                            value: c.duration
                           }
                       )
            message.channel.send(embed).catch(err => {
                message.channel.send(`Error faced: ${err}`)
            })
            sent += 1;
        })
        message.channel.send("That's it")

    })
}


module.exports = clist;