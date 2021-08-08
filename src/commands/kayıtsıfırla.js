const Discord = require('discord.js')//
const data = require('quick.db')//
const mesconfig = require("../configs/mesconfig.json")
require('discord-reply')
module.exports = {
    conf: {
      aliases: ["kayıtsıfırla","kayıt-sil","teyit-sil","kayıt-sıfırla"],
      name: "kayıt-sıfırla",
      help: "kayıt-sıfırla @Mes/ID",
    },
  
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { Array<String> } args
     */

    run: async(client, message, args) => {
if(!message.member.roles.cache.get(mesconfig.roles.üstyönetim) && !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Lütfen bir kullanıcı belirtip tekrar dene.`))
.then(x => x.delete({ timeout: 6500 }));


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir kullanıcı belirt.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));
if(!member.roles.highest.position >= message.member.roles.highest.position) message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.`)).then(x => x.delete({timeout: 5000}));

  
data.delete(`yetkili.${message.author.id}.erkek`)
data.delete(`yetkili.${message.author.id}.toplam`)  
data.delete(`yetkili.${message.author.id}.kadin`) 

message.react(mesconfig.emojis.tagemoji)

message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setColor("0x2f3136")
.setDescription(`${member} Adlı Kullanıcının kayıt verileri, <@${message.author.id}> Tarafından Sıfırlandı.`)
.setFooter(mesconfig.authortag)
.setTimestamp())


client.channels.cache.get(mesconfig.logs.kayıtsıfırla).send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`${member} Adlı Kullanıcının kayıt verileri, <@${message.author.id}> Tarafından Sıfırlandı.`)
.setFooter(mesconfig.authortag)
.setTimestamp())

}};