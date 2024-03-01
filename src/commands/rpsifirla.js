import { MessageEmbed } from "discord.js";
import { rplistembed } from "../config/embedBuilder.js";
import Bakiye from "../data/bakiye_data.js";
import GuncelRP from "../data/guncelrp_data.js";
import maasalim from "../data/maasalim_data.js";
import islem from "../config/islem.js";

export default {
  name: "rpsıfırla",
  async execute(message, client, args) {
    //sırala yap
    await message.guild.roles.fetch();
    await message.guild.members.fetch();
    const messagemembercheck = message.guild.members.cache.get(
      message.author.id
    );
    const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

    if (userRoles.includes(process.env.DAMLA)) {
      let kullanicilar = await GuncelRP.find().sort({ guncelrp: -1 });

      await message.guild.roles.fetch();
      await message.guild.members.fetch();
      const role = message.guild.roles.cache.get(process.env.RPMASTER);

      const membersWithRole = role.members.map((member) => member.id);
      // console.log(`Rol "${role.name}" sahip üyelerin ID'leri:`, membersWithRole);

      for (let index = 0; index < membersWithRole.length; index++) {
        //  let verilecekkisi = await Bakiye.findOne({ id: membersWithRole[index] })
        let user = await message.guild.members.cache.get(
          membersWithRole[index]
        );
        let bakiyeadd = await Bakiye.findOne({ id: membersWithRole[index] });
        bakiyeadd.bakiye = bakiyeadd.bakiye + 2500;
        await bakiyeadd.save();
        islem(
          bakiyeadd.id,
          `RP sıfırlanma esnasında 2500 tutarında para kazandı`
        );
        user.roles.remove(role);
      }
      let cumle2 = "";
      for (let index = 0; index < 5; index++) {
        console.log(kullanicilar[index]);
        if (kullanicilar[index] != undefined) {
          cumle2 += `<@${kullanicilar[index].id}>\n`;
          let newuser = await message.guild.members.cache.get(
            kullanicilar[index].id
          );
          newuser.roles.add(role);
        }
      }
      //////  sıralanmış rpleri göster sonra rpleri sıfırla
      rplistembed(kullanicilar, message);
      const response = new MessageEmbed()
        .setColor("#26ff00")
        .setTitle("RP Sıfırla")
        .setDescription(`**<@&${process.env.RPMASTER}> Listesi**\n${cumle2}`);

      // .setImage("");

      message.reply({ embeds: [response] });
      for (let index = 0; index < kullanicilar.length; index++) {
        let kullanici = await GuncelRP.findOne({ id: kullanicilar[index].id });
        kullanici.guncelrp = 0;
        await kullanici.save();
      }
      await maasalim.deleteMany({});
    } else {
      message.reply("Bu komut için yetkin yok.");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
