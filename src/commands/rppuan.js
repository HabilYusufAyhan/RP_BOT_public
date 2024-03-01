import { rppuanembed } from "../config/embedBuilder.js";
import Bakiye from "../data/bakiye_data.js";
import GuncelRP from "../data/guncelrp_data.js";
import ToplamRP from "../data/toplamrp_data.js";

export default {
  name: "rppuan",
  async execute(message, client, args) {
    if (message.channel.id == process.env.BOTKOMUT) {
      let Guncelpuan, Toplampuan;
      if (args[0] == undefined) {
        Guncelpuan = await GuncelRP.findOne({ id: message.author.id });
        Toplampuan = await ToplamRP.findOne({ id: message.author.id });
      } else {
        let kullaniciid = args[0].substr(2).slice(0, -1);
        Guncelpuan = await GuncelRP.findOne({ id: kullaniciid });
        Toplampuan = await ToplamRP.findOne({ id: kullaniciid });
      }
      if (!Guncelpuan || !Toplampuan) {
        message.reply("Veri tabanı hatası lütfen yetkililere ulaşın");
        return;
      }
      rppuanembed(Guncelpuan, Toplampuan, message);
      /*.reply(
        `Kullanıcının güncel puanı: ${Guncelpuan.guncelrp}
Kullanıcının toplam puanı: ${Toplampuan.toplamrp}`
      )
      .catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));*/
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
