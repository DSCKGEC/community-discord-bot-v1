/* ----------------- Importing Configurations ---------------- */
const { prefix, token} = require('./config.json');
//var meta = JSON.parse('../config.json')

var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});


// import discord.js package
const Discord = require('discord.js');

// create a new Discord Bot client
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


// Global Variables
var announcement_channel;
var event_name, event_description, event_date, event_image, event_url
var dp = 'https://scontent.fccu2-1.fna.fbcdn.net/v/t1.0-1/cp0/p50x50/119198593_364554184914631_1560249641923198238_n.jpg?_nc_cat=100&_nc_sid=dbb9e7&_nc_ohc=9gMAtcvSQtAAX81I9L7&_nc_ht=scontent.fccu2-1.fna&oh=d0f5665e001be1eb3075636741c0bc76&oe=5F889F50';


// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
	announcement_channel = client.channels.cache.get('755165871793635480');
});



/* --- Display welcome message whenever new user joins -- */
client.on("guildMemberAdd", (member) => {
	let guild = member.guild; // Reading property `guild` of guildmember object.
	if(guild.systemChannel){ // Checking if it's not null
		guild.systemChannel.send('Welcome ' + `${member}` + " to the Official DSC KGEC Discord Server!\nHead over the " + guild.channels.cache.get('755165862297731173').toString() +  " channel to get started.\n--------------------");
	}
});



/* --------------- User message responses --------------- */
client.on('message', message => {


	/* -------- Store message and tagged user, if any ------- */
	// Unused yet
	if (!message.content.toLowerCase().startsWith(prefix)) return;
	const withoutPrefix = message.content.slice(prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0].toLowerCase();
	const args = split.slice(1);


	/* ------------------ Commands & Responses ----------------- */

    
    // Command 0: Default Welcome
    if (command === `welcome`) {
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

	// Command 1: Ping - to test whether the bot is live
	else if (message.content.toLowerCase() === `${prefix}ping`) {
		message.channel.send('Willy here, live.');
	} 
	
	
	// Command 2: Add-Event - to display a new event input by an admin
	else if (message.content.toLowerCase() === `${prefix}add-event`) {
		if (message.member.roles.cache.find(r => r.name === "Core Member")) {
			message.channel.send('Please enter the event name').then(() => {
				message.channel
				.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 3000000, errors: ['time'] })
				.then(names => {
					auth = 'by: ' + message.author.username;
					auth_image = message.author.avatarURL;
					event_name = names.first().content;
					names.first().react('👍');
					message.channel.send('Please enter a short description').then(() => {
					message.channel
					.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 3000000, errors: ['time'] })
					.then(descriptions => {
						event_description = descriptions.first().content;
						descriptions.first().react('👍');
						message.channel.send('Please enter a date or time for the event').then(() => {
						message.channel
						.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 3000000, errors: ['time'] })
						.then(times => {
							times.first().react('👍');
							event_date = times.first().content;
							message.channel.send('Please enter an event link').then(() => {
							message.channel
							.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 3000000, errors: ['time'] })
							.then(links => {
								event_url = links.first().content;
								links.first().react('👍');
								message.channel.send('Please attach an event banner').then(() => {
								message.channel
								.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 3000000, errors: ['time'] })
								.then(images => {
									event_image = images.first().attachments.array()[0].url
									images.first().react('👍');
									/*
									console.log(
										event_date,
										event_description,
										event_image,
										event_url,
										event_name
									);
									*/
									const exampleEmbed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle(event_name)
									.setURL(event_url)
									.setAuthor(auth, auth_image, dp)
									.setDescription('')
									.setThumbnail(dp)
									.addFields(
										{ name: 'What?', value: event_description },
										{ name: 'When?', value: event_date},
										{ name: 'Where?', value: event_url, inline: true },
									)
									.setImage(event_image)
									.setTimestamp()
									.setFooter('Hope you have a great learning time!', dp);
									announcement_channel.send(exampleEmbed).catch(err => {
										message.channel.send(`Error faced: ${err}`)
									})
								})
								.catch(error => {
									message.channel.send('Error: ' + error);
								});
								})
							})
							.catch(error => {
								message.channel.send('Error: ' + error);
							});
							})
						})
						.catch(error => {
							message.channel.send('Error: ' + error);
						});
						})
					})
					.catch(error => {
						message.channel.send('Error: ' + error);
					});
					})
						
				});
			})	
		} else {
			message.channel.send('Sorry, you need to be a Core Member to run this command.');
		}
	} 
	

	// Command 3: Auth - to check for administrative permissions
	else if (message.content.toLowerCase() === `${prefix}auth`) {
		if (message.member.roles.cache.find(r => r.name === "Core Member"))
		message.channel.send('Authorized')
		else 
		message.channel.send('Unauthorized')
	} 	


	else {
		message.channel.send(`I haven't been programmed for that command yet.\n\n> We encourage you to add more commands and contribute to the development of the bot. It would really be a fun learning experience this pandemic. \n\nSend a PR with your contributions to our repository:\nhttps://github.com/DSCKGEC/community-discord-bot`)
	}

});


// Add Role Handler
client.on("messageReactionAdd", async (reaction, user) => {
	var role
	var msg = reaction.message

	// Check if the message is from the #get-role channel
	if (msg.id == '755800896478117968') {

		// App
		if (reaction.emoji.name == '🟢') {
			role = msg.guild.roles.cache.get('755168990728552578')
		} 

		// Frontend
		else if (reaction.emoji.name == '🔵') {
			role = msg.guild.roles.cache.get('755168752542285865')
		} 
		
		// Backend
		else if (reaction.emoji.name == '🟡') {
			role = msg.guild.roles.cache.get('755169357121978422')
		} 
		
		//ML
		else if (reaction.emoji.name == '🟣') {
			role = msg.guild.roles.cache.get('755821836771786752')
		} 
		
		// Data Science
		else if (reaction.emoji.name == '⚪') {
			role = msg.guild.roles.cache.get('755821973308702770')
		} 
		
		// DevOps 
		else if (reaction.emoji.id == '755819651342139592') {
			role = msg.guild.roles.cache.get('755822515305185331')
		} 
		
		// UX / UI
		else if (reaction.emoji.name == '🎨') {
			role = msg.guild.roles.cache.get('755822631520829582')
		} 
		
		// AR-VR
		else if (reaction.emoji.name == '🔴') {
			role = msg.guild.roles.cache.get('755822092926189578')
		} 
		
		// Cyber Security
		else if (reaction.emoji.name == '🟤') {
			role = msg.guild.roles.cache.get('755822360514527262')
		} 

		// CP
		else if (reaction.emoji.name == '📊') {
			role = msg.guild.roles.cache.get('755825613511589918')
		} 

		else {
			role = msg.guild.roles.cache.get('755165819188674680')
		}
		
		// Fetch reacting user from the server
		let member = client.guilds.cache.get('743836403552747633').members.cache.get(user.id);

		// Toggle the role.
		if (member.roles.cache.find(r => r.id === role.id))
		member.roles.remove(role)
		else {
		member.roles.add(role)
		}

	} else {
		// Do nothing
	}
})



// Unused Function to extract user menioned.
function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEperson.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}

// login to Discord with the app's token
client.login(token);
