import { MessageEmbed } from "discord.js";
import Bakiye from "../data/bakiye_data.js";
import GuncelRP from "../data/guncelrp_data.js";
import ToplamRP from "../data/toplamrp_data.js";

async function newmember(member) {
  let uservarmi = await Bakiye.findOne({ id: member.id });
  const channel = member.guild.channels.cache.find(
    (channel) => channel.id == process.env.HOSGELDIN
  );
  if (channel == undefined || channel == false || channel == null) {
    return;
  }
  await member.guild.roles.fetch();

  let role = member.guild.roles.cache.find(
    (role) => role.id == process.env.YENIUYE
  );
  member.roles.add(role);
  let content = `<@${member.id}>`;
  const response = new MessageEmbed()
    .setColor("#26ff00")
    .setTitle("ORIGINALS ROLEPLAY")
    .setDescription(
      `Sunucumuza hoş geldin <@${member.id}>! ⁠<#1149059452708851765> kanalında, bilgilendirme mesajına uygun bir şekilde kendini tanıtarak kaydolabilir, herhangi bir sorunun varsa bize <#1149059452708851765> kanalından ulaşabilirsin. İyi eğlenceler dileriz!`
    );

  channel.send({ content, embeds: [response] });
  if (!uservarmi) {
    const newUser = new Bakiye({
      id: member.id,
      bakiye: 2500,
    });
    const newGuncelRP = new GuncelRP({
      id: member.id,
      guncelrp: 0,
    });
    const newToplamRP = new ToplamRP({
      id: member.id,
      toplamrp: 0,
    });
    await newUser.save();
    await newGuncelRP.save();
    await newToplamRP.save();
  }
}
export default newmember;
