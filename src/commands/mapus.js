import { MessageEmbed } from "discord.js";

export default {
  name: "mapusagönder",
  async execute(message, client, args) {
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

    if (userRoles.includes(process.env.DAMLA)) {
      let cezaliuserid = args[0].substr(2).slice(0, -1);
      let cezaliuser = message.guild.members.cache.find(
        (user) => user.id == cezaliuserid
      );
      let role = message.guild.roles.cache.find(
        (role) => role.id == process.env.MAPUSTA
      );
      cezaliuser.roles.add(role);
      //https://cdn.discordapp.com/attachments/1191700684287000708/1193259248948359360/855097ca94172b4c72e120b4e7359d34.gif?ex=65ac1046&is=65999b46&hm=cf3b6a9642f74e3ed3f4468fa00636e8b9113fbd2180a64b6c0e9d728a0c5456&
      const response = new MessageEmbed()
        .setColor("#26ff00")
        .setImage(
          "https://cdn.discordapp.com/attachments/1191700684287000708/1193259248948359360/855097ca94172b4c72e120b4e7359d34.gif?ex=65ac1046&is=65999b46&hm=cf3b6a9642f74e3ed3f4468fa00636e8b9113fbd2180a64b6c0e9d728a0c5456&"
        );

      // .setImage("");

      message.reply({ embeds: [response] });
    } else {
      message.reply("Bu komut için yetkin yok.");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
