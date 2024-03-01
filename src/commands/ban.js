import { MessageEmbed } from "discord.js";

export default {
  name: "ban",
  async execute(message, client, args) {
    await message.guild.roles.fetch();
    await message.guild.members.fetch();
    const messagemembercheck = message.guild.members.cache.get(
      message.author.id
    );
    const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

    if (userRoles.includes(process.env.DAMLA)) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.members.cache.get(user.id);
        if (member) {
          member
            .ban({ reason: "Kurallara uymadığı için banlandı." })
            .then(() => {
              const response = new MessageEmbed()
                .setColor("#26ff00")
                .setImage(
                  "https://cdn.discordapp.com/attachments/1194239036303360031/1195745252250763304/ezgif.com-gif-maker.gif?ex=65b51b8c&is=65a2a68c&hm=f00ed6c06edaee5cbefa34c004fd706262e1386bf1cff6178f3f30256e700499&"
                );

              // .setImage("");

              message.reply({ embeds: [response] });
              //
            })
            .catch((err) => {
              message.reply("Kullanıcı banlanırken bir hata oluştu!");
              console.error(err);
            });
        } else {
          message.reply("Bahsedilen kullanıcı sunucuda değil!");
        }
      } else {
        message.reply("Banlamak istediğin kullanıcıyı etiketlemelisin!");
      }
    } else {
      message.reply("Yetkin yok!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
