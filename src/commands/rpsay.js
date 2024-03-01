import RPOda from "../data/rpoda_data.js";

export default {
  name: "rpsay",
  async execute(message, client, args) {
    await message.guild.roles.fetch();
    await message.guild.members.fetch();
    const messagemembercheck = message.guild.members.cache.get(
      message.author.id
    );
    const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

    if (userRoles.includes(process.env.DAMLA)) {
      let oda = await RPOda.findOne({ id: message.channel.id });

      if (!oda) {
        const NewRoom = new RPOda({
          id: message.channel.id,
        });
        await NewRoom.save();
        message.reply(`<#${message.channel.id}> adlı oda RP ye açıldı`);
      } else {
        await RPOda.deleteOne(oda);
        message.reply(`<#${message.channel.id}> adlı oda RP ye kapatıldı`);
      }
    } else {
      message.reply("Bu komutu kullanmak için yetkin yok");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
