import { MessageEmbed } from "discord.js";
import GuncelRP from "../data/guncelrp_data.js";

export default {
  name: "sonrp",
  async execute(message, client, args) {
    if (message.channel.id == process.env.BOTKOMUT) {
      let userGuncel, userTam;
      const dateFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };
      if (!args[0]) {
        userGuncel = await GuncelRP.findOne({ id: message.author.id });
        let formattedUserSonRpZaman;
        if (userGuncel.sonrpzaman != null) {
          const userSonRpZaman = new Date(userGuncel.sonrpzaman);
          formattedUserSonRpZaman = userSonRpZaman.toLocaleString(
            "tr-TR",
            dateFormatOptions
          );
        } else {
          formattedUserSonRpZaman = "Daha önce RP yapılmamış";
          userGuncel.sonrpoda = "Daha önce RP yapılmamış";
        }
        if (userGuncel) {
          const response = new MessageEmbed()
            .setColor("#26ff00")
            .setTitle("Son RP")
            .setDescription(
              `Bu kullanıcı  ${formattedUserSonRpZaman} tarihinde <#${userGuncel.sonrpoda}> odasında RP yapmış.`
            );

          // .setImage("");

          message.reply({ embeds: [response] });
        } else {
          message.reply("Bu user'ı veri tabanımda bulamadım");
        }
      } else {
        userGuncel = await GuncelRP.findOne({
          id: args[0].substr(2).slice(0, -1),
        });
        const userSonRpZaman = new Date(userGuncel.sonrpzaman);
        const formattedUserSonRpZaman = userSonRpZaman.toLocaleString(
          "tr-TR",
          dateFormatOptions
        );
        if (userGuncel) {
          const response = new MessageEmbed()
            .setColor("#26ff00")
            .setTitle("Son RP")
            .setDescription(
              `Bu kullanıcı  ${formattedUserSonRpZaman} tarihinde <#${userGuncel.sonrpoda}> odasında RP yapmış.`
            );

          // .setImage("");

          message.reply({ embeds: [response] });
        } else {
          message.reply("Bu user'ı veri tabanımda bulamadım");
        }
      }
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
