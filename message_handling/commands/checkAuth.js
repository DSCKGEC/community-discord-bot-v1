const checkAuth = (message, args) => {
    if (message.member.roles.cache.find(r => r.name === "Core Member"))
    message.channel.send('Authorized')
    else 
    message.channel.send('Unauthorized')
}

module.exports = checkAuth;