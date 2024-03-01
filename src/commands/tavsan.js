import Bakiye from "../data/bakiye_data.js";
import { hayvanrolleriembed } from "../config/embedBuilder.js";
import islem from "../config/islem.js";

export default {
  name: "tavşan",
  async execute(message, client, args) {
    if (message.channel.id == process.env.BANKA) {
      let kullanici = await Bakiye.findOne({ id: message.author.id });
      if (kullanici.bakiye >= 500) {
        await message.guild.roles.fetch();
        await message.guild.members.fetch();

        let role = message.guild.roles.cache.find(
          (role) => role.id == process.env.TAVSAN
        );
        message.member.roles.add(role);

        kullanici.bakiye = kullanici.bakiye - 500;
        await kullanici.save();
        islem(kullanici.id, "Tavşan rolü satın aldı");
        hayvanrolleriembed(kullanici.id, role.id, message, kullanici.bakiye);
      } else {
        message.reply("Yeterli bakiyen yok");
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
