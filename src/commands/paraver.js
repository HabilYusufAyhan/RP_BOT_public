import { paraverembed } from "../config/embedBuilder.js";
import islem from "../config/islem.js";
import Bakiye from "../data/bakiye_data.js";

export default {
  name: "paraver",
  async execute(message, client, args) {
    if (
      message.channel.id == process.env.BANKA ||
      message.channel.id == process.env.SUPPORT
    ) {
      if (!args[1] || isNaN(args[1])) {
        message.reply("La para gir la");
        return;
      }
      if (!args[0]) {
        message.reply("Kime gönderem kardeşim");
        return;
      }

      if (Number(args[1]) < 0) {
        message.reply("para mı alam ondan karşim - li değer girme");
        return;
      }
      let gonderen = await Bakiye.findOne({ id: message.author.id });
      let alan = await Bakiye.findOne({ id: args[0].substr(2).slice(0, -1) });

      if (!alan || !gonderen) {
        message.reply("İkinizden biri kayıtlarımda yok. DOLANDIRICILAR!!!");
        return;
      } else {
        if (gonderen.bakiye < Number(args[1])) {
          message.reply("Yazdığın miktar sende mevcut değil");
          return;
        }
        let gonderenonceki = gonderen.bakiye;
        let alanonceki = alan.bakiye;
        gonderen.bakiye = gonderen.bakiye - Number(args[1]);
        alan.bakiye = alan.bakiye + Number(args[1]);
        await gonderen.save();
        await alan.save();
        paraverembed(
          message.author.id,
          args[0],
          gonderenonceki,
          alanonceki,
          gonderen.bakiye,
          alan.bakiye,
          message
        );
        islem(alan.id, `${args[1]} tutarında bakiye gönderildi`);
        islem(gonderen.id, `${args[1]} tutarında bakiye gönderdi`);
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
