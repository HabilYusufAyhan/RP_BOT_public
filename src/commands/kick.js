export default {
  name: "kick",
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
            .kick("Kurallara uymadığı için kicklendi.")
            .then(() => {
              message.reply(`${user.tag} Tekmeyi yedin!!`);
            })
            .catch((err) => {
              message.reply("Kullanıcı kicklenirken bir hata oluştu!");
              console.error(err);
            });
        } else {
          message.reply("Bahsedilen kullanıcı sunucuda değil!");
        }
      } else {
        message.reply("Kicklemek istediğin kullanıcıyı etiketlemelisin!");
      }
    } else {
      message.reply("Yetkin yok!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
