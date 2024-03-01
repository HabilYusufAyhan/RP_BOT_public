import {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  TextInputComponent,
  GuildMember,
} from "discord.js";
import { Modal } from "discord.js";
import newmember from "../config/addnewmember.js";
import rpsayac from "../config/rpsayac.js";
import RPOda from "../data/rpoda_data.js";
import GuncelRP from "../data/guncelrp_data.js";
import ToplamRP from "../data/toplamrp_data.js";
export default async (client) => {
  const prefix = process.env.PREFIX;
  console.log(prefix);

  client.on("messageCreate", async (message) => {
    try {
      if (message.author.bot) return;
      if (
        message.content.startsWith(prefix) == true ||
        message.content.startsWith(prefix.toUpperCase()) == true
      ) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        var commandName = args.shift().toLowerCase();
        if (commandName == "b") {
          commandName = "bakiye";
        } else if (commandName == "pv") {
          commandName = "paraver";
        } else if (commandName == "rö") {
          commandName = "rolödül";
        } else if (commandName == "pe") {
          commandName = "paraekle";
        }
        const command = client.commands.get(commandName);

        if (command == undefined) {
          message.reply("Böyle bir komut yok: " + message.content);
          return;
        }
        if (message.channel.id == process.env.BANKA) {
          const channel = message.guild.channels.cache.find(
            (channel) => channel.id == process.env.PARALOG
          );
          channel.send(
            `<@${message.author.id}> bir banka komutu kullandı: ${message.content}`
          );
        }
        try {
          await message.guild.roles.fetch();
          await message.guild.members.fetch();
          const messagemembercheck = message.guild.members.cache.get(
            message.author.id
          );
          const userRoles = messagemembercheck.roles.cache.map(
            (role) => role.id
          );
          if (!userRoles.includes(process.env.MISAFIR)) {
            command.execute(message, client, args);
          } else {
            message.reply("Misafirler bu botu kullanmaya izni yoktur");
          }
        } catch (error) {
          console.log(error);
          message.reply("Bu komut şu anda hatalı lütfen developer a ulaşın");
        }
      } else {
        if (message.channel.id == process.env.KARAKTERTANITIM) {
          await message.react("<:1152763715012264017:1188104958709612635>"); //tick
          await message.react("<:1152763717939900420:1188104961628844132>"); //çarpı

          //1188103295374458961
        } else if (message.channel.id == "1149060811764027413") {
          await message.react("<:1152763715012264017:1188104958709612635>"); //tick
          await message.react("<:1152763717939900420:1188104961628844132>"); //çarpı
        } else {
          rpsayac(message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  client.on("messageDelete", async (message) => {
    try {
      await message.guild.roles.fetch();
      await message.guild.members.fetch();
      const messagemembercheck = message.guild.members.cache.get(
        message.author.id
      );
      const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

      if (!userRoles.includes(process.env.MISAFIR)) {
        let roomcontrol = await RPOda.findOne({ id: message.channel.id });
        if (roomcontrol) {
          let rphesaplama = message.content;

          let result = rphesaplama.split(" ");

          let puan = 0;
          for (let index = 0; index < result.length; index++) {
            puan += result[index].length;
          }

          let user = await GuncelRP.findOne({ id: message.author.id });
          let oncekiguncel = user.guncelrp;
          user.guncelrp = user.guncelrp - puan;
          user.sonrpoda = message.channel.id;
          user.sonrpzaman = Date.now();
          let usertoplamrp = await ToplamRP.findOne({ id: message.author.id });
          let oncekitoplam = usertoplamrp.toplamrp;
          usertoplamrp.toplamrp = usertoplamrp.toplamrp - puan;
          const channel2 = message.guild.channels.cache.find(
            (channel) => channel.id == process.env.RPLOG
          );
          channel2.send(`
       <@${message.author.id}>, <#${message.channel.id}> kanalında bir rp sildi
       Guncel RP Puanı : ${oncekiguncel} **->** ${user.guncelrp}
       Toplam RP Puanı : ${oncekitoplam} **->** ${usertoplamrp.toplamrp}
  
      `);
          user.save();
          usertoplamrp.save();
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    try {
      await oldMessage.guild.roles.fetch();
      await oldMessage.guild.members.fetch();
      const messagemembercheck = oldMessage.guild.members.cache.get(
        oldMessage.author.id
      );
      const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

      if (!userRoles.includes(process.env.MISAFIR)) {
        let roomcontrol = await RPOda.findOne({ id: oldMessage.channel.id });
        if (roomcontrol) {
          let rphesaplama = oldMessage.content;
          let rphesaplama2 = newMessage.content;
          let result = rphesaplama.split(" ");
          let result2 = rphesaplama2.split(" ");
          let puan = 0;
          let puan2 = 0;
          for (let index = 0; index < result.length; index++) {
            puan += result[index].length;
          }
          for (let index = 0; index < result2.length; index++) {
            puan2 += result2[index].length;
          }
          let tampuan;

          tampuan = puan2 - puan;

          let user = await GuncelRP.findOne({ id: oldMessage.author.id });
          let oncekiguncel = user.guncelrp;
          user.guncelrp = user.guncelrp + tampuan;
          user.sonrpoda = oldMessage.channel.id;
          user.sonrpzaman = Date.now();
          let usertoplamrp = await ToplamRP.findOne({
            id: oldMessage.author.id,
          });
          let oncekitoplam = usertoplamrp.toplamrp;
          usertoplamrp.toplamrp = usertoplamrp.toplamrp + tampuan;
          const channel2 = oldMessage.guild.channels.cache.find(
            (channel) => channel.id == process.env.RPLOG
          );
          channel2.send(`
       <@${oldMessage.author.id}>, <#${oldMessage.channel.id}> kanalında bir rp Güncelledi
       Guncel RP Puanı : ${oncekiguncel} **->** ${user.guncelrp}
       Toplam RP Puanı : ${oncekitoplam} **->** ${usertoplamrp.toplamrp}
  
      `);
          user.save();
          usertoplamrp.save();
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  client.on("guildMemberAdd", async (member) => {
    newmember(member);
  });
  client.on("messageReactionAdd", async (reaction, user) => {
    try {
      const { message, emoji } = reaction;

      await message.guild.roles.fetch();
      await message.guild.members.fetch();
      const messagemembercheck = message.guild.members.cache.get(user.id);
      const userRoles = messagemembercheck.roles.cache.map((role) => role.id);

      console.log(message.channelId);
      if (
        process.env.KARAKTERTANITIM == message.channelId &&
        user.id != "1178600751245819914" &&
        userRoles.includes(process.env.ROL_DENETMENI)
      ) {
        // Sadece belirli bir mesaj ve tepki için işlem yapmak istiyorsanız bir koşul ekleyebilirsiniz
        if (emoji.id === "1188104958709612635") {
          //tick

          // Kullanıcıya rolü ver
          try {
            await message.author.send(
              "Yazdığınız karakter tanıtımı onaylanmıştır. RP yapmaya başlayabilirsiniz."
            );
          } catch (error) {
            console.error("Rol verme hatası:", error);
          }
        } else if (emoji.id === "1188104961628844132") {
          //çarpı

          // Kullanıcıya rolü ver
          try {
            await message.author.send(
              "Yazdığınız karakter tanıtımı reddedilmiştir. Lütfen karakter tanıtımınız ile ilgilenen rol denetmeni ile iletişime geçiniz."
            );
          } catch (error) {
            console.error("Rol verme hatası:", error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};
