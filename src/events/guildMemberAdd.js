const conf = require("../configs/mesconfig.json");
const client = global.client;
const moment = require("moment");
moment.locale("tr");
const bannedTag = require("../schemas/bannedTag");

/**
 * @param { Client } client
 * @param { GuildMember } member
 */

module.exports = async (member) => {
  if (member.user.bot) return;
  const karantina = member.guild.channels.cache.get(conf.channels.karantina);
  const channel = member.guild.channels.cache.get(conf.channels.registerchat);
  const data = await bannedTag.findOne({ guildID: member.guild.id });
  if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
    await member.setRoles(conf.jail.roles);
    channel.send(`${member.toString()} kullanıcısının hesabı 7 Gün'den önce açıldığı için karantinaya gönderildi.`);

  } else if (data && data.tags.length && data.tags.some((x) => member.user.username.includes(x.tag))) {
    member.setRoles(conf.roles.YasaklıTag ? conf.roles.YasaklıTag : conf.roles.karantina);
    member.guild.channels.cache.get(conf.roles.YasaklıTag ? conf.channels.YasaklıTag : conf.channels.karantina).wsend(`${member.toString()}, isminde yasaklı taglarımızdan birini taşıdığı için cezalıya atıldı.`);
    channel.send(`${member.toString()} üyesi sunucumuza katıldı fakat isminde yasaklı tag bulundurduğu için cezalıya atıldı.`);
  } else {
    if (member.manageable) await member.setNickname(`${conf.main.tag} İsim | Yaş`);
    await member.roles.add(conf.roles.unregister);
    channel.send(`**Lvbel #1886**'ya hoş geldin ${member.toString()} :tada:\n\nHesabın **${moment(member.user.createdAt).format("LLL")}** tarihinde (${moment(member.user.createdTimestamp).fromNow()}) önce oluşturulmuş.\n\nSunucu kurallarımız <#${conf.channels.rules}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.\n\nSeninle beraber **${member.guild.memberCount}** kişi olduk! Sol tarafta bulunan V. Confirmed odalarından birine girerek kayıt işlemini gerçekleştirebilirsin.`);
  }
  if (member.user.username.includes(conf.main.isimTag)) member.roles.add(conf.roles.taglı)
};

module.exports.conf = {
  name: "guildMemberAdd",
};