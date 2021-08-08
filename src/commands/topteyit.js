const dc = require('discord.js')//
const db = require('quick.db')//
const moment = require('moment')//
const mesconfig = require("../configs/mesconfig.json")
require('discord-reply')
module.exports = {
    conf: {
      aliases: ["topteyit", "topkayıt","top-teyit"],
      name: "topteyit",
      help: "topteyit",
    },
  
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { Array<String> } args
     */
    run: async(client, message, args) => {

if(!message.member.roles.cache.get(mesconfig.roles.registerian) && !message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission("VIEW_AUDIT_LOG"))
return message.lineReply("Bu komutu kullanmak için gerekli yetkiye sahip değilsin.").then(x => x.delete({timeout: 10000}));

//
let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}.toplam`);
let member = message.mentions.members.first() || message.author;
//

let top = message.guild.members.cache.filter(uye => db.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2.id}.toplam`))-Number(db.get(`yetkili.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> üyesi **" + db.get(`yetkili.${uye.id}.toplam`) +"** kayıta sahip.").join('\n');
message.channel.send(new dc.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setTimestamp().setColor("WHITE").setFooter(mesconfig.authortag).setDescription(`${`**${message.guild.name}** sunucusunda toplam **3** kayıt yapılmış, Aşağıda topteyit listesi görüntülenmiştir.\n\n`+top || "Teyit verisi bulunamadı!"}`));
  
}};
