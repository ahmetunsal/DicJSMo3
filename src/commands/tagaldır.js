const Discord = require('discord.js')
const db = require('quick.db')
const data = require('quick.db')
const tdb = new data.table('tag')
const mesconfig = require("../configs/mesconfig.json")
module.exports = {
  conf: {
    aliases: ["tagaldır", "tag-aldır","tag-aldır"],
    name: "tag-aldır",
    help: "kayıtsız @Mes/ID",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */
  run: async(client, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let embed = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 })).setTimestamp().setFooter(mesconfig.authortag);
  
    if(!message.member.roles.cache.get(mesconfig.roles.registerian) && !message.member.hasPermission('ADMINISTRATOR')) { return message.react(mesconfig.emojis.no)

} else { if(!member) return message.channel.send(`Lütfen bir kullanıcı belirtip tekrar dene`).then(x => x.delete({timeout: 10000}));

let data = tdb.fetch(`tagverdi.${member.id}`)

    if(data) return message.channel.send(`Bu kullanıcı daha önceden tag aldığı için işlem iptal edildi.`).then(x => x.delete({timeout: 10000}));
        const filter = (reaction, user) => { return ["✅"].includes(reaction.emoji.name) && user.id === member.id }
        message.channel.send(embed.setDescription(`${member}, ${message.author} kişisi sana tag aldırmak istiyor. Kabul ediyor musun?`)).then(x => {
 x.react("✅")
            x.awaitReactions(filter, { max: 1, time: 15000, error: ['time']}).then(messex => { let mesxd = messex.first()
                if (mesxd) { db.add(`tsayi.${message.author.id}.toplam`, 1) && db.add(`puan.${message.author.id}.tagaldir`, 1)
    
            message.channel.send(`${message.author}, ${member} kullanıcısına başarıyla tag aldırdınız.`).then(x => x.delete({timeout: 15000}));
          };
        })}
  )};
}};