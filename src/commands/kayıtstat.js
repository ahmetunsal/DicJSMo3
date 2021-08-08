const Discord = require('discord.js')//
const db = require('quick.db')//
const mesconfig = require("../configs/mesconfig.json")
require('discord-reply')
module.exports = {
  conf: {
    aliases: ["kayıtstat", "kstat","kayıtlarım","kayıt-bilgi"],
    name: "kayıt-bilgi",
    help: "kayıtlarım , .kayıt-bilgi @Mes/ID",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

    run: async(client, message, args) => {
    if(!message.member.roles.cache.has(mesconfig.roles.registerian) && (!message.member.hasPermission("ADMINISTRATOR")))
    return message.lineReply("Bu komutu kullanmak için gerekli yetkiye sahip değilsin.").then(x => x.delete({timeout: 10000}));
 
 let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
 
if(!kullanıcı) {

let erkek = db.fetch(`yetkili.${message.author.id}.erkek`);
let kadın = db.fetch(`yetkili.${message.author.id}.kadin`);
let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`); 
let tagli = db.fetch(`puan.${message.author.id}.tagaldir`)
if(erkek === null) erkek = "0"  
if(erkek === undefined) erkek = "0"
if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"
if(kayıtlar === null) kayıtlar = "0"
if(kayıtlar === undefined) kayıtlar = "0"
if(tagli === null) tagli = "0"
if(tagli === undefined) tagli = "0"
  
const sorgu1 = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL({ dynamic: true}))
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setFooter(mesconfig.authortag)
.setTimestamp()
.setDescription(`${message.author} kullanıcısının kayıt bilgileri listelenmiştir.\n\nToplam yapılan kayıt : **${kayıtlar}**\nToplam yapılan erkek kayıt : **${erkek}**\nToplam yapılan kadın kayıt : **${kadın}**\nToplam çekilen taglı üye : **${tagli}**`)
 return message.channel.send(sorgu1)
};
  
if(kullanıcı) {  
let erkek1 = db.fetch(`yetkili.${kullanıcı.id}.erkek`);
let kadın1 = db.fetch(`yetkili.${kullanıcı.id}.kadin`);
let kayıtlar1 = db.fetch(`yetkili.${kullanıcı.id}.toplam`);
let tagli1 = db.fetch(`puan.${message.author.id}.tagaldir`)
if(erkek1 === null) erkek1 = "0"  
if(erkek1 === undefined) erkek1 = "0"
if(kadın1 === null) kadın1 = "0"
if(kadın1 === undefined) kadın1 = "0"
if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
if(tagli1 === null) tagli = "0"
if(tagli1 === undefined) tagli = "0"
  
const sorgu2 = new Discord.MessageEmbed()
.setAuthor(kullanıcı.user.username, kullanıcı.user.avatarURL({ dynamic: true}))
.setFooter(mesconfig.authortag)
.setTimestamp()
.setThumbnail(kullanıcı.user.avatarURL({ dynamic: true})) 
.setDescription(`${kullanıcı.user.username} kullanıcısının kayıt bilgileri listelenmiştir.\n\nToplam yapılan kayıt : **${kayıtlar1}**\nToplam yapılan erkek kayıt : **${erkek1}**\nToplam yapılan kadın kayıt : **${kadın1}**\nToplam çekilen taglı üye : **${tagli1}**`)
 return message.channel.send(sorgu2)
  
};
  
  }};