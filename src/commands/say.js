const { MessageEmbed } = require("discord.js");
const mesconfig = require("../configs/mesconfig.json")
module.exports = {
  conf: {
    aliases: [],
    name: "say",
    help: "say",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

    run: async(client, message, args) => {
  
        if(!message.member.roles.cache.get(mesconfig.roles.registerian) && !message.member.hasPermission('ADMINISTRATOR'))
  return message.react(mesconfig.emojis.no)

  let tag = mesconfig.main.isimTag
  let tag2 = mesconfig.main.isimTag2
  const etiket =  message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == mesconfig.main.etiketTag).size;
  const tagg = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size
  const tagg2 = message.guild.members.cache.filter(m => m.user.username.includes(tag2)).size
  const toplam = message.guild.memberCount
  const ses = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b) 
  const taglı = message.guild.members.cache.filter(x => x.roles.cache.has(mesconfig.roles.taglı)).size

  const sayy = new MessageEmbed()
  .setTimestamp()
  .setColor('BLACK')
  .setFooter(mesconfig.authortag)
  .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
  message.react(mesconfig.emojis.tagemoji)
  message.channel.send(sayy.setDescription(`• Sunucumuzda Toplam **${toplam}** üye bulunmakta.\n• Sunucumuzun etiket tagında **${etiket}** üye bulunmakta.\n• Toplam **${taglı}** taglı üye bulunmakta.\n• Ses kanallarında **${ses}** üye bulunmakta.`));

    }}