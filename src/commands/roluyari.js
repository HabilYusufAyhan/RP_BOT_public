import Bakiye from "../data/bakiye_data.js";

export default {
  name: "roluyarı",
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
      let cezaliuserid = args[0].substr(2).slice(0, -1);
      let cezaliuser = message.guild.members.cache.find(
        (user) => user.id == cezaliuserid
      );
      let role = message.guild.roles.cache.find(
        (role) => role.id == process.env.ROL_UYARI
      );
      cezaliuser.roles.add(role);
      message.reply(`${args[0]} kullanıcısına roluyarı rolü verildi`);
    } else {
      message.reply("Bu komut için yetkin yok.");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
