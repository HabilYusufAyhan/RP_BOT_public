export default {
  name: "test",
  execute(message, client, args) {
    const command = client.commands.get("sss");

    command.execute(message, client, args);
    message.channel
      .send(`test`)
      .catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
