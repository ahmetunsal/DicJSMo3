const Discord = require('discord.js');
const db = require('quick.db');
const mesconfig = require("../configs/mesconfig.json")
require('discord-reply')
module.exports = {
    conf: {
      aliases: ["isim", "nick"],
      name: "isim",
      help: "isim @Mes/ID İsim Yaş",
    },
  
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { Array<String> } args
     */
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()

        if (!message.member.roles.cache.has(mesconfig.roles.registerian) && !message.member.hasPermission('ADMINISTRATOR'))  {
            return message.channel.send(embed.setDescription("Bu komutu kullanmak için gerekli yetkiye sahip değilsin."))
        }
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Lütfen bir kullanıcı belirtip tekrar dene.").then(x => x.delete({timeout: 10000}))
      
        let name = args[1]
        if (!name) return message.channel.send("Lütfen komutu şu şekilde tekrar kullanın. \`.isim @Mes/ID İsim Yaş\`").then(x => x.delete({timeout: 10000}))

        let age = args[2]
        if (!age) return message.channel.send("Lütfen komutu şu şekilde tekrar kullanın. \`.isim @Mes/ID İsim Yaş\`").then(x => x.delete({timeout: 10000}))

        message.guild.members.cache.get(member.id).setNickname(`${mesconfig.main.tag} ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${mesconfig.main.tag} ${name} | ${age}\` (İsim Değiştirme)`);
        message.channel.send(embed.setDescription(`${member} kişisinin ismi başarıyla '${mesconfig.main.tag} ${name} | ${age}' olarak değiştirildi.`).setFooter(mesconfig.authortag)

        )
    }
}
