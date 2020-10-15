const util = require('util')
const fs = require('fs');
const path = require('path')
const Discord = require('discord.js')
const membersCount = (client) => {
    const p = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        'ids.json'
    )

    var count = {}
    
    const readFile = util.promisify(fs.readFile)
    const fetchOne =  async (member) => {
        
        return readFile(p)
    }
   
    const updateMembers = (guild) => {
            const totalmem = guild.channels.cache.get(count.total)
            const mem = guild.channels.cache.get(count.members)
            const botsmem = guild.channels.cache.get(count.bots)
            if(totalmem && mem && botsmem){
                totalmem.setName(`Total Members: ${guild.memberCount.toLocaleString()}`)
                mem.setName(`Members: ${guild.members.cache.filter(m => !m.user.bot).size}`)
                botsmem.setName(`Bots: ${guild.members.cache.filter(m => m.user.bot).size}`)
    
            }
        }
    
    client.on('guildMemberAdd', member => {

        fetchOne(member).then(result => {
            let ids = []
            let flag = 0
            ids = JSON.parse(result)
            for(let i = 0; i < ids.length; i++){
                if(ids[i].guildId == member.guild.id){
                    count = ids[i]
                    if(member.guild.channels.cache.get(ids[i].categoryId)){
                        flag = 1
                    }
                }
            }
            if(flag==1){
                updateMembers(member.guild)
            }
        }).catch(err => {
            console.log(err);
        })
        
    })
    client.on('guildMemberRemove', member => {
        fetchOne(member).then(result => {
            let ids = []
            let flag = 0
            ids = JSON.parse(result)
            for(let i = 0; i < ids.length; i++){
                if(ids[i].guildId == member.guild.id){
                    count = ids[i]
                    if(member.guild.channels.cache.get(ids[i].categoryId)){
                        flag = 1
                    }
                }
            }
            if(flag==1){
                updateMembers(member.guild)
            }
        }).catch(err => {
            console.log(err);
        })
    })
}

module.exports = membersCount