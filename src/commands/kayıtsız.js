const db = require('quick.db');
const Discord = require('discord.js');
const mesconfig = require("../configs/mesconfig.json")
require('discord-reply')
module.exports = {
    conf: {
      aliases: ["kayıtsız", "unregister","unreg"],
      name: "kayıtsız",
      help: "kayıtsız @Mes/ID",
    },
  
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { Array<String> } args
     */

    run: async(client, message, args) => {

        if (!message.member.roles.cache.has(mesconfig.roles.registerian) && !message.member.hasPermission('ADMINISTRATOR'))  {
            return message.lineReply("Bu komutu kullanmak için gerekli yetkiye sahip değilsin.").then(x => x.delete({timeout: 10000}));
        }
        let embed = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 })).setTimestamp().setFooter(mesconfig.authortag);
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send("Lütfen bir kullanıcı belirtip tekrar dene").then(x => x.delete({timeout: 10000}))
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!")).then(x => x.delete({timeout: 10000}))
        }
        if (member.premiumSinceTimestamp > 0 ) return message.channel.send(embed.setDescription("Sunucudaki booster üyeleri kayıtsıza atamazsın")).then(x => x.delete({timeout: 10000}))
        member.roles.set([mesconfig.roles.unregister])
        message.guild.members.cache.get(member.id).setNickname(`${mesconfig.main.tag} İsim | Yaş`)
        message.react(mesconfig.emojis.yes)
        db.delete(`kayıt_${member.id}`)
    }
}