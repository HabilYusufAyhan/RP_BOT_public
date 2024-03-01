import Bakiye from "../data/bakiye_data.js";
import { bakiyeduzenleembed } from "../config/embedBuilder.js";
import islem from "../config/islem.js";
export default {
  name: "bakiyedüzenle",
  async execute(message, client, args) {
    if (message.channel.id == process.env.BANKA) {
      try {
        if (!args[0]) {
          message.reply("Birini etiketlemelisiniz");
          return;
        }
        //1179839589364543534
        await message.guild.roles.fetch();
        await message.guild.members.fetch();
        const messagemembercheck = message.guild.members.cache.get(
          message.author.id
        );
        const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

        if (
          userRoles.includes(process.env.DAMLA) ||
          userRoles.includes(process.env.UST_YETKILI) ||
          userRoles.includes(process.env.YETKILI)
        ) {
          let user = await Bakiye.findOne({
            id: args[0].substr(2).slice(0, -1),
          });
          let oncekibakiye = user.bakiye;
          user.bakiye = 2500;
          await user.save();

          bakiyeduzenleembed(user.id, oncekibakiye, message);
          islem(
            user.id,
            `Bakiyesi ${message.member.displayName} tarafından düzenlendi`
          );
        } else {
          message.reply("Bu komutu kullanmak için yetkin yok");
        }
      } catch (error) {
        message.reply(
          "Veri tabanı hatası Lütfen <@1044633721745182741> a ulaşın"
        );
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
