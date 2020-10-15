const fs = require('fs')
const path = require('path')

const membersCount = (client,message) => {
    let memcounts = {
        guildId: '',
        categoryId: '',
        total: '',
        members: '',
        bots: ''

    }
    
    message.guild.channels.create('Server Stats',{
        type: 'category'
    }).then(category => {
        memcounts.guildId = message.guild.id
        const categoryId = category.id
        memcounts.categoryId = categoryId
        message.guild.channels.create('Total Members:',{
            type: 'voice',
            parent: categoryId,
            permissionOverwrites: [{
                id: message.guild.id,
                 deny: ['CONNECT']
            }]
        }).then(channel => {
            memcounts.total = channel.id
            updateMembers(message.guild,channel.id,'Total Members: ',message.guild.memberCount.toLocaleString())
            message.guild.channels.create('Members:',{
                type: 'voice',
                parent: categoryId,
                permissionOverwrites: [{
                    id: message.guild.id,
                    deny: ['CONNECT']
               }]
            }).then(channel => {
                memcounts.members = channel.id
                updateMembers(message.guild,channel.id,'Members: ',message.guild.members.cache.filter(m => !m.user.bot).size)
                message.guild.channels.create('Bots:',{
                    type: 'voice',
                    parent: categoryId,
                    permissionOverwrites: [{
                        id: message.guild.id,
                        deny: ['CONNECT']
                   }]
                }).then(channel => {
                    memcounts.bots = channel.id
                    updateMembers(message.guild,channel.id,'Bots: ',message.guild.members.cache.filter(m => m.user.bot).size)
                    save()
                })
            })
        })
    
    })
    
    const updateMembers = (guild,channelid,channelName,memNumber) => {

            const channel = guild.channels.cache.get(channelid)
            channel.setName(channelName + memNumber)
        }
    
    const save = () => {
        
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'ids.json'
        )
        fs.readFile(p,(err,fileContent) => {
            let ids = []
            if(!err){
                ids = JSON.parse(fileContent)
            }
            ids.push(memcounts)
            fs.writeFile(p,JSON.stringify(ids),err => {
                if(!err){
                    console.log('Saved');
                }
            })
        })
    }
    
    
}
module.exports = membersCount