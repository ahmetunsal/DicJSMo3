const Discord = require('discord.js');
const mesconfig = require("../configs/mesconfig.json")
const db = require('quick.db');
require("discord-reply");
module.exports = {
    conf: {
      aliases: ["kadın", "k","kız"],
      name: "kadın",
      help: "kız @Mes/ID İsim Yaş",
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

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let embed = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 })).setTimestamp().setFooter(mesconfig.authortag);
        if (!member) return message.channel.send("Lütfen bir kullanıcı belirtip tekrar dene.").then(x => x.delete({timeout: 10000}))

        let name = args[1]
        if (!name) return message.channel.send("Lütfen komutu şu şekilde tekrar kullanın. \`.k @Mes/ID İsim Yaş\`")

        let age = args[2]
        if (!age) return message.channel.send("Lütfen komutu şu şekilde tekrar kullanın. \`.k @Mes/ID İsim Yaş\`")

        if (!["Lvbel","lvbel","^"].some(ss => member.user.username.toLowerCase().includes(ss)) && member.user.discriminator !== "1886" )  
        if(![mesconfig.roles.booster, mesconfig.roles.vip].some(role => member.roles.cache.get(role)) ) {
            return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription("Sunucumuz ekip sunucusu olduğu için tagsız kayıt yapılamaz\n\nKullanıcıyı vip olarak kaydetmek için;\n\`.vip @Mes/ID\`").setTimestamp().setFooter(mesconfig.authortag))
        }
        await member.setNickname(`${mesconfig.main.tag} ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${mesconfig.main.tag} ${name} | ${age}\` (<@&857673591986192425>)`);// kadın permi id
        db.set(`kayıt_${member.id}`, true)
        db.add(`kız_${message.author.id}`, 1)
        db.add(`yetkili.${message.author.id}.kadin`, 1)
        db.add(`yetkili.${message.author.id}.toplam`, 1)
        let isimler = db.get(`isimler_${member.user.id}`)
        let isimgecmis = isimler.filter((i) => `${i + 1}`).length
        await member.roles.add(mesconfig.roles.kadın)
        await member.roles.remove(mesconfig.roles.unregister)
        client.channels.cache.get(mesconfig.channels.genelChat).send(`${member} adlı üye aramıza yeni katıldı bir hoş geldin diyelim ve senle birlikte topluluğumuz **${message.guild.memberCount}** kişi oldu!`).then(x => x.delete({timeout: 10000}))
        message.channel.send(embed.setDescription(`${member} adlı üye başarılı bir şekilde Kadın olarak kaydedildi\n\nBu kullanıcının ${isimgecmis} adet isim geçmişi görüntülendi\n`+isimler.map((data, i) => `${data}`).join("\n") + `\n`)

        )
    }
}
