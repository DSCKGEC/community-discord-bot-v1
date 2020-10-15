/*------------------- Setup for heroku--------------------- */
// Main program for the bot starts from line 18.
var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});



/* ----------------- Importing Configurations ---------------- */
const { prefix, token } = require('./config.json');

// import packages
const Discord = require('discord.js');
const messageHandler = require('./message_handling/index');
const memCount = require('./server_stats/membersCount')

// create a new Discord Bot client
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


// Global Variables
let announcementChannel;

// this event will only trigger one time after logging in
client.once('ready', (message) => {
	console.log('Ready!');
	memCount(client) //This will update the member count 
	announcementChannel = client.channels.cache.get('756097508719067247');
	announcementChannel = client.channels.cache.get('755165871793635480');
});


async function dmprompt(channel, msg, member) {
    const filter = (response) => response.author.id === member.id;
    channel.send(msg)
    return channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const content = collected.first().content;
            if (content.toLowerCase() === "cancel") return "cancel"
            return content;
        })
        .catch(_ => {
            console.log(_)
            return channel.send("You ran out of time! (1m). Please contact an admin to verify again.")
        });
}

/* --- Display welcome message whenever new user joins -- */
client.on("guildMemberAdd", async (member) => {
	let guild = member.guild; // Reading property `guild` of guildmember object.
	
	if(guild.systemChannel){ // Checking if it's not null
		guild.systemChannel.send('Welcome ' + `${member}` + " to the Official DSC KGEC Discord Server!\nHead over the " + guild.channels.cache.get('755165862297731173').toString() +  " channel to get started.\n--------------------");
	}
	if (member) {
		let KGrole = member.guild.roles.cache.find(r => r.id === "760660088582438967");
		member.createDM().then(async channel => {
			let name = await dmprompt(channel, "Welcome to the Official DSC KGEC Discord Server! What's your name?", member)
			// uncomment if logs
			// if (name > 2048) return message.channel.send("Please shorten your name to 2048 characters or shorter.")
			let college = await dmprompt(channel, `Alright **${name}**, what college or ininstitution do you belong to?`, member)
			// if (college > 2048) return message.channel.send("Please shorten your college to 2048 characters or shorter.")
			if (college === "KGEC" || college === "Kalyani Government Engineering College") member.roles.add(KGrole)
			channel.send(`Welcome and enjoy your stay!`)
		// uncomment if you want logs
		// 	let logEmbed = new Discord.MessageEmbed()
		// 	.setTitle("New Member!")
		// 	.setDescription(`${member.user.tag} - ${member.id}`)
		// 	.addField("Name", name)
		// 	.addField("College", college)
		// 	.setColor("#00ff04")
		// client.channels.cache.get("logChannelID").send({embed: logEmbed})
		})

		
	}
});



/* --------------- User message responses --------------- */
client.on('message', message => {
	 messageHandler(message, announcementChannel, client)
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
