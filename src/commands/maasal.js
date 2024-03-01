import { maasalembed } from "../config/embedBuilder.js";
import islem from "../config/islem.js";
import Bakiye from "../data/bakiye_data.js";
import GuncelRP from "../data/guncelrp_data.js";
import maasalim from "../data/maasalim_data.js";

export default {
  name: "maaşal",
  async execute(message, client, args) {
    if (message.channel.id == process.env.BANKA) {
      let alinmismi = await maasalim.findOne({ id: message.author.id });

      if (alinmismi) {
        message.reply("Siz zaten maaşınızı almışsınız");
      } else {
        let bakiye = await Bakiye.findOne({ id: message.author.id });
        let puan = await GuncelRP.findOne({ id: message.author.id });
        console.log(bakiye, puan);

        if (!bakiye || !puan) {
          message.reply("Veri tabanı hatası lütfen yetkililere ulaşın");
          return;
        }
        let oldbakiye = bakiye.bakiye;
        if (puan.guncelrp >= 10000) {
          bakiye.bakiye = bakiye.bakiye + 1000;
          const newMaas = new maasalim({
            id: message.author.id,
          });
          await newMaas.save();
          await bakiye.save();
          maasalembed(oldbakiye, bakiye.bakiye, message);
          islem(bakiye.id, `Maaşını aldı`);
        } else {
          message.reply("Puanınız yetersiz");
        }
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
