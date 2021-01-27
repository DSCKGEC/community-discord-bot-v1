const { DiscordAPIError } = require("discord.js")
const Discord = require('discord.js')
const dp = 'https://cdn.discordapp.com/avatars/755452647456243793/6b2cfc78d852df984b27f0968dc79718.png?size=256'
const genericHelpMessage = new Discord.MessageEmbed()
.setColor('#0099ff')
    .setURL('https://github.com/dsckgec/community-discord-bot')
    .setDescription('Hello, This is Chumly_ :wave: \nI am the official bot of the DSC KGEC Community server!\n\nYou can find the community building me up here - https://github.com/dsckgec/community-discord-bot \nI would be really happy if you contribute a PR and help me grow 🤗 \n\nYou can find the list of commands I currently support below!')
    .setThumbnail(dp)
    .addFields(
        { name: '!ping', value: 'Check whether our bot is alive or not!' },
        { name: '!welcome @user', value: 'Send a welcome message for mentioned user on the default channel they landed on.'},
        { name: '!boost @user', value: `This command is for appreciating members for their valuable contributions to the community by rewarding them with a special role ⚡` },
        { name: '!submit-idea', value: 'If you have any project or event ideas, drop them in using this command!' },
        { name: '!scrape', value: 'Currently scrapes latest news and events from DSC official website' },
        { name: '!clist-up', value: 'Get a list of upcomng CP contests, passing an optional parameter for the limit.' },
        { name: '!clist-live', value: 'Get a list of already going contests, passing an optional parameter for the limit.' },
        { name: '!report', value: 'Have any issue or complaint? Use this command to send a secret report to the server admins' },
        { name: '!add-event', value: 'If you are a server Admin, you can announce about latest event!' },
        { name: 'New user joins', value: 'DM the user asking for IRL name and college. and setting their nicknames and roles accordingly' },
        { name: 'Adding domain badge to any user', value: 'There is a #🔖-get-roles channel wherein, a user can select his/her domain of interest by clicking on an emote and I automatically add the domain\'s badge to his/her profile so that others are able to know each other\'s interests!' },
    )
    .setFooter('I like Linux users a lot 🐧', dp);

const helpHandler = (message, args) => {
    if(args.length === 0){
        message.channel.send(genericHelpMessage);
    }
    else{
        let commandEnquired = args[0].toLowerCase();
        switch(commandEnquired){
            case "ping": 
                message.channel.send(`\`ping\`: Check whether our bot is alive or not!`)
                break;
            
            case "welcome": 
                message.channel.send(`\`welcome @user\`: Send a welcome message to a sppecific user on the channel they landed on.`)
                break;
            
            case "auth": 
                message.channel.send(`\`auth\`: To check if you are an admin of the server or not.`)
                break;

            case "scrape": 
                message.channel.send(`\`scrape\`: Currently scrapes latest news from DSC official website.`)
                break;

            case "ping": 
                message.channel.send(`\`ping\`: Check whether our bot is alive or not!`)
                break;
            
            case "add-event": 
                message.channel.send(`\`add-event [ADMIN only]\`: If you are a server Admin, you can announce about latest event!`)
                break;
            
            case "help":
                const randomJokes = [
                    "HelpCeption!",
                    "Calling 911",
                    "I'm a bot, not a helper"
                ]

                message.channel.send(randomJokes[Math.floor(Math.random() * 3)])

            case "clist-live":
                message.channel.send(`\`clist-live [optional- number of contests you want to see, default 1]\`: Get a list of already going contests`)
                break;

            case "clist-up":
                message.channel.send(`\`clist-up [optional- number of contests you want to see, default 1]\`: Get a list of upcoming contests`)
                break;

        }
    }
}

module.exports = helpHandler
