const conf = require("../configs/mesconfig.json");

/**
 * @param { Client } client
 * @param { Message } message
 */

module.exports = async (message) => {
  if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === "!tag" || message.content.toLowerCase() === ".tag") {
    await message.lineReply(conf.main.isimTag + conf.main.isimTag2 + conf.main.etiketTag); // düzenle reis işte
  }
};

module.exports.conf = {
  name: "message"
};