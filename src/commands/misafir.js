import Bakiye from "../data/bakiye_data.js";
import GuncelRP from "../data/guncelrp_data.js";
import ToplamRP from "../data/toplamrp_data.js";

export default {
  name: "misafir",
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
        userRoles.includes(process.env.UST_YETKILI) ||
        userRoles.includes(process.env.YETKILI)
      ) {
        let userid = args[0].substr(2).slice(0, -1);

        let user = message.guild.members.cache.find(
          (user) => user.id == userid
        );
        const userRoles = user.roles.cache.map((role) => role.id);
        console.log(userRoles);
        for (let index = 0; index < userRoles.length; index++) {
          await message.guild.roles.fetch();

          if (userRoles[index] != process.env.EVERYONE) {
            let role = message.guild.roles.cache.find(
              (role) => role.id == userRoles[index]
            );
            user.roles.remove(role);
          }
        }
        let role = message.guild.roles.cache.find(
          (role) => role.id == process.env.MISAFIR
        );
        await Bakiye.deleteOne({ id: userid });
        await GuncelRP.deleteOne({ id: userid });
        await ToplamRP.deleteOne({ id: userid });

        user.roles.add(role);
        message.delete();
      } else {
        message.reply("Bu komut için yetkin yok.");
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
