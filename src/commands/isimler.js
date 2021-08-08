const db = require('quick.db');
const mesconfig = require("../configs/mesconfig.json")
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
require('discord-reply')
module.exports = {
    conf: {
      aliases: ["isimler"],
      name: "isimler",
      help: "isimler @Mes/ID",
    },
  
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { Array<String> } args
     */

    run: async(client, message, args) => {
        let embed2 = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 })).setTimestamp().setFooter(mesconfig.authortag);
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Lütfen bir kullanıcı belirtip tekrar dene.").then(x => x.delete({timeout: 10000}));
        let isimler = db.get(`isimler_${member.user.id}`)
        if (!isimler) return message.channel.send(embed2.setDescription(`${member} üyesinin isim geçmişi bulunamadı`))
        const embed = new MessageEmbed()
            .setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${member} kişisinin isim kayıtları görüntülenmiştir\n\n` + isimler.map((data, i) => `${data}`).join("\n") + `\n`)
            .setFooter(mesconfig.authortag)
            .setTimestamp()
        message.channel.send(embed)
    }
}