import { toplamrplistembed } from "../config/embedBuilder.js";
import ToplamRP from "../data/toplamrp_data.js";

export default {
  name: "toplamrplist",
  async execute(message, client, args) {
    if (message.channel.id == process.env.BOTKOMUT) {
      await message.guild.members.fetch();
      let siralama = await ToplamRP.find().sort({ toplamrp: -1 });
      let cumle = "";
      if (siralama.length >= 0) {
        toplamrplistembed(siralama, message);
      } else {
        message.reply("Henüz yeterli sayıda roleplay yapan yok");
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
