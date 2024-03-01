export default {
  name: "erkek",
  async execute(message, client, args) {
    if (
      message.channel.id == process.env.SUPPORT ||
      message.channel.id == process.env.KENDINITANIT
    ) {
      if (!args[0]) {
        message.reply("Birini etiketlemelisin");
        return;
      }
      //sırala yap
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
        let cezaliuserid = args[0].substr(2).slice(0, -1);
        let cezaliuser = message.guild.members.cache.find(
          (user) => user.id == cezaliuserid
        );
        let role = message.guild.roles.cache.find(
          (role) => role.id == process.env.ERKEK
        );
        cezaliuser.roles.add(role);

        let silinecek = await message.reply("Rol verildi !!!");
        try {
          setTimeout(async () => {
            await message.delete();
            await silinecek.delete();
          }, 5000);
        } catch (error) {
          const channel = message.guild.channels.cache.find(
            (channel) => channel.id == process.env.BOTHATALOG
          );
          channel.send("Kayıt mesajını yetkim yetersiz olduğu için silemedim");
        }
      } else {
        message.reply("Bu komut için yetkin yok.");
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
