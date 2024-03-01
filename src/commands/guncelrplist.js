import { rplistembed } from "../config/embedBuilder.js";
import GuncelRP from "../data/guncelrp_data.js";

export default {
  name: "rplist",
  async execute(message, client, args) {
    if (message.channel.id == process.env.BOTKOMUT) {
      //sırala yap

      await message.guild.members.fetch();
      let siralama = await GuncelRP.find().sort({ guncelrp: -1 });
      let cumle = "";
      if (siralama.length >= 0) {
        rplistembed(siralama, message);
        /* for (let index = 0; index < siralama.length; index++) {
            if (index < 15) {
              cumle += `${index + 1} : <@${siralama[index].id}>   -----  ${
                siralama[index].guncelrp
              }
                    `;
            }
          }
          message
            .reply(cumle)
            .catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
        */
      } else {
        message.reply("Henüz yeterli sayıda roleplay yapan yok");
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
