import { dolarembed } from "../config/embedBuilder.js";
import Bakiye from "../data/bakiye_data.js";

export default {
  name: "zenginler",
  async execute(message, client, args) {
    if (message.channel.id == process.env.BANKA) {
      await message.guild.members.fetch();
      let siralama = await Bakiye.find().sort({ bakiye: -1 });
      let cumle = "";
      dolarembed(siralama, message);
      message
        .reply(cumle)
        .catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
