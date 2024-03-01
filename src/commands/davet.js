export default {
  name: "davet",
  execute(message, client, args) {
    if (
      message.channel.id == process.env.SUPPORT ||
      message.channel.id == process.env.CHAT ||
      message.channel.id == process.env.BOTKOMUT
    ) {
      message.channel
        .send(`https://discord.gg/originalsrp`)
        .catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
