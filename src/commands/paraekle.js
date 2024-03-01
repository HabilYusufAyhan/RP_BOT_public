import { paraekleembed } from "../config/embedBuilder.js";
import islem from "../config/islem.js";
import Bakiye from "../data/bakiye_data.js";

export default {
  name: "paraekle",
  async execute(message, client, args) {
    await message.guild.roles.fetch();
    await message.guild.members.fetch();
    const messagemembercheck = message.guild.members.cache.get(
      message.author.id
    );
    const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

    if (userRoles.includes(process.env.DAMLA)) {
      if (!args[1] || isNaN(args[1])) {
        message.reply("La para gir la");
        return;
      }
      if (!args[0]) {
        message.reply("Kime gönderem kardeşim");
        return;
      }

      let alan = await Bakiye.findOne({ id: args[0].substr(2).slice(0, -1) });

      if (!alan) {
        message.reply("Bu kişi kayıtlarda yok. DOLANDIRICILAR!!!");
        return;
      } else {
        let oldbakiye = alan.bakiye;
        alan.bakiye = alan.bakiye + Number(args[1]);
        if (alan.bakiye < 0) {
          message.reply(
            `Kullanıcının mevcut dolarından daha fazla dolar azaltmaya çalışıyorsun!`
          );
          return;
        }
        await alan.save();
        paraekleembed(oldbakiye, alan.bakiye, message, args[0]);
        islem(
          alan.id,
          `Bakiyesine ${message.member.displayName} tarafından ${args[1]} tutarında ekleme yapıldı`
        );
      }
    } else {
      message.reply("Bu komut için yetkin yok.");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
