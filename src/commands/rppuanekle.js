import ToplamRP from "../data/toplamrp_data.js";
import GuncelRP from "../data/guncelrp_data.js";
export default {
  name: "rppuanekle",
  async execute(message, client, args) {
    await message.guild.roles.fetch();
    await message.guild.members.fetch();
    const messagemembercheck = message.guild.members.cache.get(
      message.author.id
    );
    const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

    if (userRoles.includes(process.env.DAMLA)) {
      if (!args[1] || isNaN(args[1])) {
        message.reply("La puan gir la");
        return;
      }
      if (!args[0]) {
        message.reply("Kime gönderem kardeşim");
        return;
      }

      let alan = await ToplamRP.findOne({ id: args[0].substr(2).slice(0, -1) });
      let alan2 = await GuncelRP.findOne({
        id: args[0].substr(2).slice(0, -1),
      });

      if (!alan) {
        message.reply("Bu kişi kayıtlarda yok. DOLANDIRICILAR!!!");
        return;
      } else {
        alan.toplamrp = alan.toplamrp + Number(args[1]);
        alan2.guncelrp = alan2.guncelrp + Number(args[1]);
        await alan.save();
        await alan2.save();
        message.reply(
          `${args[0]} kullanıcısına ${args[1]} kadar puan gönderildi`
        );
      }
    } else {
      message.reply("Bu komut için yetkin yok.");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
