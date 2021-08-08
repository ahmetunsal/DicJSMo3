const Discord = require('discord.js')
const conf = require("../configs/mesconfig.json")
const settings = require("../configs/settings.json")
const yes = conf.emojis.yes
const no = conf.emojis.no
require('discord-reply')
module.exports = {
  conf: {
    aliases: ["vip", "yetenek","special"],
    name: "vip",
    help: "vip @Mes/ID",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 })).setTimestamp().setFooter(conf.authortag);
    if(!message.member.roles.cache.has(conf.roles.registerian) && !message.member.roles.cache.has(settings.owners) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
    message.react(red)
    message.lineReply(`Bu komutu kullanmak için gerekli yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    return }
    let array = [
        {rol: conf.roles.vip , no: "1"}
        ]
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) {
          message.react(no)
          message.lineReply(`Lütfen bir kullanıcı belirtip tekrar dene`).then(x => x.delete({timeout: 5000}));
        return }
        message.channel.send(embed.setDescription(`${member} - (\`${member.id}\`) üyesine verilecek rolün numarasını yazmalısınız.\n
        ${array.map(a => `\`${a["no"]}\` ` + message.guild.roles.cache.get(a["rol"]).name).join("\n")}`)).then(async mesaj => {
        
        const filter = m => m !== null && m.author.id == message.author.id;
        message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
        .then(collected => {
            array.forEach(a => {
                Object.keys(a).forEach(b => {
                    if(b == "no" && a[b] == collected.first().content) {
                         member.roles.add(a["rol"])
                         message.react(yes)
                         message.channel.send(embed.setDescription(`${member} üyesine <@&${a["rol"]}> rolü başarıyla verildi.`)).then(x => x.delete({timeout: 5000}))
                         mesaj.delete({timeout: 2000})
                       }
                   })
                })
             }) 
        .catch(c => message.channel.send(`${no} İşlem iptal edildi.`).then(x => x.delete({timeout: 5000})))
        })
      }}