import { bakiyeembed } from "../config/embedBuilder.js";
import Bakiye from "../data/bakiye_data.js";

export default {
  name: "bakiye",
  async execute(message, client, args) {
    if (message.channel.id == process.env.BANKA) {
      try {
        let bakiye;
        let kullaniciid;
        if (args[0] == undefined) {
          kullaniciid = message.author.id;
          let kullanici = await Bakiye.findOne({ id: kullaniciid });
          console.log(kullanici);
          bakiye = kullanici.bakiye;
        } else {
          kullaniciid = args[0].substr(2).slice(0, -1);
          let kullanici = await Bakiye.findOne({ id: kullaniciid });
          bakiye = kullanici.bakiye;
        }
        console.log(message);

        bakiyeembed(kullaniciid, bakiye, message);
      } catch (error) {
        message.reply(
          "Veri tabanı hatası Lütfen <@1044633721745182741> a ulaşın"
        );
      }
    } else {
      message.reply("Bu komutu burada kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
