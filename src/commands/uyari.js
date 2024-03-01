import uyari from "../data/uyari_data.js";

export default {
  name: "uyarı",
  async execute(message, client, args) {
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
      if (!args[0]) {
        message.reply("Birini etiketlemelisiniz");
        return;
      }
      let cezaliuserid = args[0].substr(2).slice(0, -1);

      let cezaliuser = message.guild.members.cache.find(
        (user) => user.id == cezaliuserid
      );
      let role1 = message.guild.roles.cache.find(
        (role) => role.id == process.env.UYARI1
      );
      let role2 = message.guild.roles.cache.find(
        (role) => role.id == process.env.UYARI2
      );
      await message.guild.members.fetch();
      const userRoles = cezaliuser.roles.cache.map((role) => role.id);
      console.log(userRoles);
      if (userRoles.includes(process.env.UYARI1)) {
        cezaliuser.roles.add(role2);
        cezaliuser.roles.remove(role1);
        await uyari.findOneAndDelete({ id: cezaliuserid });

        const newUyari = new uyari({
          id: cezaliuserid,
          sure: 432000 + Date.now(),
          uyari: 2,
        });
        await newUyari.save();
        message.reply(`${args[0]} kullanıcısına uyarı2 rolü verildi`);
      } else {
        cezaliuser.roles.add(role1);
        const newUyari = new uyari({
          id: cezaliuserid,
          sure: 259200 + Date.now(),
          uyari: 1,
        });
        await newUyari.save();
        message.reply(`${args[0]} kullanıcısına uyarı1 rolü verildi`);
      }
    } else {
      message.reply("Bu komut için yetkin yok.");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
