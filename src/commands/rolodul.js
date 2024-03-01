import { paraekleembed } from "../config/embedBuilder.js";
import islem from "../config/islem.js";
import Bakiye from "../data/bakiye_data.js";

export default {
  name: "rolödül",
  async execute(message, client, args) {
    if (message.channel.id == process.env.BANKA) {
      //1179839589364543534

      const messagemembercheck = message.guild.members.cache.get(
        message.author.id
      );
      const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

      console.log(userRoles);
      if (
        userRoles.includes(process.env.DAMLA) ||
        userRoles.includes(process.env.ROL_DENETMENI)
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
        let gonderilen = args[0];
        let miktar = Number(args[1]);
        if (miktar > 500) {
          message.reply("500 dolardan fazla para gönderemezsin");
          return;
        }
        let gonderilendata = await Bakiye.findOne({
          id: gonderilen.substr(2).slice(0, -1),
        });
        if (!gonderilendata) {
          message.reply("Bu kullanıcı kayıtlarımda yok");
          return;
        }
        let oldbakiye = gonderilendata.bakiye;
        gonderilendata.bakiye = gonderilendata.bakiye + miktar;
        await gonderilendata.save();
        paraekleembed(oldbakiye, gonderilendata.bakiye, message, args[0]);
        islem(
          gonderilendata.id,
          `${message.member.displayName} tarafından ${miktar} tutarında ödül verildi`
        );
      } else {
        message.reply("Bu komutu kullanmak için yetkin yok");
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
