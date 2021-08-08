const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const system = require("./src/configs/system")
const mesconf = require("./src/configs/mesconfig.json")
const Discord = require("discord.js")
client.commands = new Collection();
client.cooldown = new Map();
require("./src/handlers/commandHandler"); // elleşme
require("./src/handlers/eventHandler"); // elleşme
require("./src/handlers/mongoHandler"); // elleşme
require("./src/handlers/functionHandler")(client); // elleşme
require("./src/events/autoReply"); // elleşme

//
client.on('ready', () => {
  client.user.setPresence({ activity: { name: "XX ❤️ Més." }, status: 'online' }) // botun oynuyor kısmı
  client.channels.cache.get(mesconf.main.botVoice).join() // botu sese sokma
  .catch(e => console.log(e))
    })

// End

client
  .login(system.token)
  .then(() => console.log("[BOT] Bot connected!"))
  .catch(() => console.log("[BOT] Bot can't connected!"));

  client.on("userUpdate", async function(oldUser, newUser) { // kodu çaldım çaktırma, config'e 3 tag ekledim isterseniz silersiniz size kalmış editlemesi kolay ztn xd
    const guildID = mesconf.main.guild
    const roleID = mesconf.roles.taglı
    const tag = mesconf.main.isimTag
    const chat = mesconf.channels.genelChat
    const log2 = mesconf.logs.taglog
    const tag2 = mesconf.main.isimTag2
    const tag3 = mesconf.main.isimTag3
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter(mesconf.authortag);
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`${newUser} adlı kullanıcı tagı salarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`${newUser} isimli kullanıcı tag alarak ailemize katıldı!`)
            client.channels.cache.get(log2).send(embed.setDescription(`${newUser} isimli kullanıcı tag alarak ailemize katıldı!`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "1886" && newUser.discriminator !== "1886") {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`${newUser} isimli kullanıcı tag alarak ailemize katıldı!`))
        } else if (oldUser.discriminator !== "1886" && newUser.discriminator == "1886") {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`${newUser} adlı kullanıcı tag alarak ailemize katıldı!`))
            client.channels.cache.get(chat).send(`${newUser} isimli kullanıcı tag alarak ailemize katıldı!`)
        }
   }

  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag2) && !newUser.username.includes(tag2)) {
        member.roles.remove(roleID)
        client.channels.cache.get(log2).send(embed.setDescription(`${newUser} adlı kullanıcı tagı salarak ailemizden ayrıldı!`))
    } else if (!oldUser.username.includes(tag2) && newUser.username.includes(tag2)) {
        member.roles.add(roleID)
        client.channels.cache.get(chat).send(`${newUser} isimli kullanıcı tag alarak ailemize katıldı!`)
        client.channels.cache.get(log2).send(embed.setDescription(`${newUser} isimli kullanıcı tag alarak ailemize katıldı!`))
    }
}


if (newUser.username !== oldUser.username) {
  if (oldUser.username.includes(tag3) && !newUser.username.includes(tag3)) {
      member.roles.remove(roleID)
      client.channels.cache.get(log2).send(embed.setDescription(`${newUser} adlı kullanıcı tagı salarak ailemizden ayrıldı!`))
  } else if (!oldUser.username.includes(tag3) && newUser.username.includes(tag3)) {
      member.roles.add(roleID)
      client.channels.cache.get(chat).send(`${newUser} isimli kullanıcı tag alarak ailemize katıldı!`)
      client.channels.cache.get(log2).send(embed.setDescription(`${newUser} isimli kullanıcı tag alarak ailemize katıldı!`))
  }
}  })
