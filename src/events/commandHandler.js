
const system = require("../configs/system")
const Discord = require("discord.js");
const mesconf = require("../configs/mesconfig.json")
const client = global.client;
let sended = false;

setInterval(() => {
  client.cooldown.forEach((x, index) => {
    if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
  });
}, 5000);

/**
 * @param { Client } client
 * @param { Message } message
 */

module.exports = async (message) => {
  const prefix = system.prefix.find((x) => message.content.toLowerCase().startsWith(x));
  if (message.author.bot || !message.guild || !prefix) return;
  let args = message.content.substring(prefix.length).trim().split(" ");
  let commandName = args[0].toLowerCase();

  const mes = await client.users.fetch("854803239710359582"); 
  const embed = new Discord.MessageEmbed() 
  .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 })) 
  .setTimestamp() 
  .setFooter(mesconf.authortag);

  args = args.splice(1);
  const cmd = client.commands.get(commandName) || client.commands.array().find((x) => x.conf.aliases && x.conf.aliases.includes(commandName));
  if (!cmd || cmd.conf.owner && !system.staff.includes(message.author.id)) return;

  if (!system.Owners.includes(message.author.id)) {
    const cooldown = cmd.conf.cooldown || 3000;
    if (!client.cooldown.has(message.author.id)) client.cooldown.set(message.author.id, { cooldown, lastUsage: Date.now() });
    const cd = client.cooldown.get(message.author.id);
    const diff = Date.now() - cd.lastUsage;
    if (diff < cooldown) {
      if (!sended) {
        sended = true;
        return message.channel.send(embed.setDescription(`Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`)).then((x) => x.delete({timeout: (cooldown - diff)}));
      }
    }
  }
  cmd.run(client, message, args, embed, prefix);
};

module.exports.conf = {
  name: "message",
};