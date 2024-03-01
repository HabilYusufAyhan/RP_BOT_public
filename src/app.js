import { Client, Collection } from "discord.js";
import "dotenv/config";
import { readdirSync } from "fs";
const client = new Client({
  partials: ["CHANNEL"],
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_TYPING",
    "GUILD_VOICE_STATES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_INTEGRATIONS",
    "GUILD_PRESENCES",
  ],
  presence: {
    status: "online",
    activities: [
      {
        name: "Originals RP'yi",
        type: "WATCHING",
      },
    ],
  },
});
import mongoose from "mongoose";

mongoose
  .connect("your mongodb connection string", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("veritabanına bağlanıldı"))
  .catch((hata) => console.log(`veritabanı baglantı hatası ${hata}`));

readdirSync("./events").forEach(async (file) => {
  const event = await import(`./events/${file}`).then((m) => m.default);
  event(client);
});

/*readdirSync('./general').forEach(async (file) => {
  const general = await import(`./general/${file}`).then((m) => m.default);
  client.commands.set(general.name, general);
});*/

client.commands = new Collection();
readdirSync("./commands").forEach(async (category) => {
  const command = await import(`./commands/${category}`).then((c) => c.default);
  client.commands.set(command.name, command);
});

await client.login(process.env.TOKEN);
