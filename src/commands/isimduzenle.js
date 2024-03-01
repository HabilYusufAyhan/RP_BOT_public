import { isimembed } from "../config/embedBuilder.js";
import Bakiye from "../data/bakiye_data.js";

export default {
  name: "isimdüzenle",
  async execute(message, client, args) {
    if (
      message.channel.id == process.env.SUPPORT ||
      message.channel.id == process.env.KENDINITANIT
    ) {
      if (!args[0]) {
        message.reply("Birini etiketlemelisiniz");
        return;
      }
      await message.guild.roles.fetch();
      await message.guild.members.fetch();
      const messagemembercheck = message.guild.members.cache.get(
        message.author.id
      );
      const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

      if (
        userRoles.includes(process.env.DAMLA) ||
        userRoles.includes(process.env.YETKILI) ||
        userRoles.includes(process.env.UST_YETKILI)
      ) {
        let userid = args[0].substr(2).slice(0, -1);

        let user = message.guild.members.cache.find(
          (user) => user.id == userid
        );
        let newname = "";
        console.log(user);
        if (args.length - 1 >= 2) {
          for (let index = 0; index < args.length - 1; index++) {
            newname = newname + " " + args[index + 1];
          }
        } else {
          newname = args[1];
        }
        user.setNickname(newname);

        isimembed(args[0], newname, message);

        /* message.reply(
          `${args[0]} kullanıcısının ismi başarıyla \`${newname}\` olarak değiştirildi`
        );*/
      } else {
        message.reply("Bu komut için yetkin yok.");
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
