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
const Canvas = require('canvas');
const messageHandler = require('./message_handling/index');

// create a new Discord Bot client
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


// Global Variables
let announcementChannel;

// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
	announcementChannel = client.channels.cache.get('756097508719067247');
	// announcementChannel = client.channels.cache.get('755165871793635480');
});






//++++++++++++++++++++helper functions+++++++++++++++++++++++++++++++++++++++++
let isMember = (response) => response.author.id === member.id;

async function dmprompt(channel, msg, member) {
    channel.send(msg)
    return channel.awaitMessages(isMember, { max: 1, time: 600000, errors: ['time'] })
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
//++++++++++++++++++++helper function+++++++++++++++++++++++++++++++++++++++++






/* --- Display welcome message whenever new user joins -- */
client.on("guildMemberAdd", async (member) => {
	let guild = member.guild;
	if(guild.systemChannel){ 
		const channel = guild.systemChannel;
		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');

		const background = await Canvas.loadImage('./background.png');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = '#74037b';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);

		// Slightly smaller text placed above the member's display name
		ctx.font = '28px sans-serif';
		ctx.fillStyle = '#ffffff';
		ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

		// Add an exclamation point here and below
		ctx.font = applyText(canvas, `${member.displayName}!`);
		ctx.fillStyle = '#ffffff';
		ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

		ctx.beginPath();
		ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
		ctx.drawImage(avatar, 25, 25, 200, 200);

		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

		channel.send(`A new member, ${member} joined the server!`, attachment);
	}
	if (member) {
		let KGrole = member.guild.roles.cache.find(r => r.id === "760660088582438967");
		member.createDM().then(async channel => {
			let name = await dmprompt(channel, "Welcome to the Official DSC KGEC Discord Server!\n\nThis is Dino, the official bot of the server. We are glad that you joined us! 🤗\nPlease enter you name", member)
			if (name !== "You ran out of time! (1m). Please contact an admin to verify again.") {
				let college = await dmprompt(channel, `Alright **${name}**!\nWhat college or institution are you from 🧐?`, member)
				if (college === "KGEC" || college === "Kalyani Government Engineering College") member.roles.add(KGrole)
				member.setNickname(name);
				channel.send(`Welcome and enjoy your stay!\n\nTo get started, head on to the 🔖get-roles channel and pick up your domains of interest and do not forget to drop a **Hi** in the general chat channel!`)
			} else {

			}
		})

		
	}
});



/* --------------- User message responses --------------- */
client.on('message', message => messageHandler(message, announcementChannel));


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

// Pass the entire Canvas object because you'll need to access its width, as well its context
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

// login to Discord with the app's token
client.login(token);