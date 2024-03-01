export default {
  name: "tür",
  async execute(message, client, args) {
    if (
      message.channel.id == process.env.KENDINITANIT ||
      message.channel.id == process.env.SUPPORT
    ) {
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
        if (!args[0]) {
          message.reply("Birini etiketlemelisin");
          return;
        }
        if (!args[1]) {
          message.reply("Hangi rolü vereceğimi belirtmelisin");
          return;
        }
        //sırala yap
        await message.guild.roles.fetch();
        await message.guild.members.fetch();
        const messagemembercheck = message.guild.members.cache.get(
          message.author.id
        );
        const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

        let cezaliuserid = args[0].substr(2).slice(0, -1);
        let cezaliuser = message.guild.members.cache.find(
          (user) => user.id == cezaliuserid
        );
        let role;
        if (args[1].toLocaleLowerCase() == "cadı") {
          role = message.guild.roles.cache.find(
            (role) => role.id == process.env.CADI
          );
        } else if (args[1].toLocaleLowerCase() == "vampir") {
          role = message.guild.roles.cache.find(
            (role) => role.id == process.env.VAMPIR
          );
        } else if (args[1].toLocaleLowerCase() == "kurtadam") {
          role = message.guild.roles.cache.find(
            (role) => role.id == process.env.KURTADAM
          );
        } else if (args[1].toLocaleLowerCase() == "gezgin") {
          role = message.guild.roles.cache.find(
            (role) => role.id == process.env.GEZGIN
          );
        } else if (args[1].toLocaleLowerCase() == "insan") {
          role = message.guild.roles.cache.find(
            (role) => role.id == process.env.INSAN
          );
        } else {
          message.reply("Belirtilen rolü bulamadım");
          return;
        }

        cezaliuser.roles.add(role);

        const silinecek = await message.reply("Rol verildi !!!");
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
        message.reply("Yetkin yetersiz");
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
