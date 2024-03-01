import islem from "../config/islem.js";
import Bakiye from "../data/bakiye_data.js";

export default {
  name: "maaşyatır",
  async execute(message, client, args) {
    //1179839589364543534
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
        message.reply("Hangi role gönderem kardeşim");
        return;
      }
      if (Number(args[1]) < 0) {
        message.reply("para mı alam ondan karşim - li değer girme");
        return;
      }
      console.log(args[0]);
      let gonderilen = args[0].substr(3).slice(0, -1);
      let miktar = Number(args[1]);
      await message.guild.roles.fetch();
      await message.guild.members.fetch();
      const role = message.guild.roles.cache.get(gonderilen);
      if (!role) {
        console.error(`Rol bulunamadı: ${role}`);
        return;
      }

      console.log(role.members);
      const membersWithRole = role.members.map((member) => member.id);
      // console.log(`Rol "${role.name}" sahip üyelerin ID'leri:`, membersWithRole);

      for (let index = 0; index < membersWithRole.length; index++) {
        let verilecekkisi = await Bakiye.findOne({
          id: membersWithRole[index],
        });
        verilecekkisi.bakiye = verilecekkisi.bakiye + miktar;
        await verilecekkisi.save();
        islem(
          verilecekkisi.id,
          `${message.member.displayName} kişisi tarafından ${role.name} rolünden ${args[1]} kadar rol maaşı aldı`
        );
      }
      message.reply(
        `${role.name} rolüne sahip kullanıcılara ${args[1]} kadar bakiye gönderildi`
      );
    } else {
      message.reply("Bu komutu kullanmak için yetkin yok");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
