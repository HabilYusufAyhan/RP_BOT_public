import Bakiye from "../data/bakiye_data.js";

export default {
  name: "rol",
  async execute(message, client, args) {
    if (!args[0]) {
      message.reply("Birini etiketlemelisiniz");
      return;
    }
    if (!args[1]) {
      message.reply("Rolü yazmalısınız");
      return;
    }
    let rol = "";
    for (let index = 1; index < args.length; index++) {
      rol += args[index] + " ";
    }
    await message.guild.roles.fetch();
    await message.guild.members.fetch();
    const messagemembercheck = message.guild.members.cache.get(
      message.author.id
    );
    const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

    if (
      userRoles.includes(process.env.DAMLA) ||
      userRoles.includes(process.env.UST_YETKILI)
    ) {
      console.log(rol.toLocaleLowerCase());
      let role = message.guild.roles.cache.find(
        (role) =>
          role.name.toLocaleLowerCase() == rol.toLocaleLowerCase().trim()
      );
      let user = message.guild.members.cache.get(
        args[0].substr(2).slice(0, -1)
      );
      if (!role) {
        message.reply("Belirtilen rolü bulamadım");
        return;
      }
      user.roles.add(role);

      message.reply(`${args[0]} kullanıcısına ${rol} rolü verildi`);
    } else {
      message.reply("Bu komut için yetkin yok.");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
