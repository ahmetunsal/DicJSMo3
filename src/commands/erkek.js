const Discord = require('discord.js');
const db = require('quick.db');
const mesconfig = require("../configs/mesconfig.json")
require('discord-reply')
module.exports = {
    conf: {
      aliases: ["erkek", "e"],
      name: "erkek",
      help: "erkek @Mes/ID İsim Yaş",
    },
  
    /**
     * @param { Client } client
     * @param { Message } message
     * @param { Array<String> } args
     */
    run: async(client, message, args) => {
        let embed2 = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 })).setTimestamp().setFooter(mesconfig.authortag);

        if (!message.member.roles.cache.has(mesconfig.registerian) && !message.member.hasPermission('ADMINISTRATOR')) {
            return message.lineReply("Bu komutu kullanmak için gerekli yetkiye sahip değilsin.").then(x => x.delete({timeout: 10000}));
        }
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Lütfen bir kullanıcı belirtip tekrar dene.").then(x => x.delete({timeout: 10000}))
      
        let name = args[1]
        if (!name) return message.channel.send("Lütfen komutu şu şekilde tekrar kullanın. \`.e @Mes/ID İsim Yaş\`")

        let age = args[2]
        if (!age) return message.channel.send("Lütfen komutu şu şekilde tekrar kullanın. \`.e @Mes/ID İsim Yaş\`")    

        if(message.guild.members.cache.get(member.id).roles.cache.has(mesconfig.roles.erkek)) return message.channel.send(`Bu kullanıcı daha önceden kayıtlı olduğu için kayıt işlemi iptal edildi.`)

        if (!["Lvbel","lvbel","^"].some(ss => member.user.username.toLowerCase().includes(ss)) && member.user.discriminator !== "1886" )  
        if(![mesconfig.roles.booster, mesconfig.roles.vip].some(role => member.roles.cache.get(role)) ) {
            return message.channel.send(embed2.setDescription(`${member} üyesinin sunucuya kayıt olabilmesi için;\n\n• Boost basması veya ekip tagımızı alması gerekiyor\n${member} üyesini vip olarak almak için : \`.vip @Mes/ID\``).setTimestamp().setFooter(mesconfig.authortag))
        }
        await member.setNickname(`${mesconfig.main.tag} ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${mesconfig.main.tag} ${name} | ${age}\` (<@&857673594602258453>)`); // erkek perm id
        db.set(`kayıt_${member.id}`, true)
        db.add(`erkek_${message.author.id}`, 1)
        db.add(`yetkili.${message.author.id}.erkek`, 1)
        db.add(`yetkili.${message.author.id}.toplam`, 1)
        let isimler = db.get(`isimler_${member.user.id}`)
        let isimgecmis = isimler.filter((i) => `${i + 1}`).length
        await member.roles.remove(mesconfig.roles.unregister)
        await member.roles.add(mesconfig.roles.erkek)
        client.channels.cache.get(mesconfig.channels.genelChat).send(`${member} adlı üye aramıza yeni katıldı bir hoş geldin diyelim ve senle birlikte topluluğumuz **${message.guild.memberCount}** kişi oldu!`).then(x => x.delete({timeout: 10000}))
        message.channel.send(embed2.setDescription(`${member} adlı üye başarılı bir şekilde Erkek olarak kaydedildi\n\nBu kullanıcının ${isimgecmis} adet isim geçmişi görüntülendi\n`+isimler.map((data, i) => `${data}`).join("\n") + `\n`)
        )
    }
}