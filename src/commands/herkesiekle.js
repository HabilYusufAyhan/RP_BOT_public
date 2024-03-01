import Bakiye from "../data/bakiye_data.js";
import GuncelRP from "../data/guncelrp_data.js";
import ToplamRP from "../data/toplamrp_data.js";

export default {
  name: "herkesiekle",
  async execute(message, client, args) {
    await message.guild.members.fetch();
    const allMembers = message.guild.members.cache;
    console.log(allMembers);

    allMembers.forEach(async (member) => {
      if (member.user.bot == false) {
        let kullanici = await Bakiye.findOne({ id: member.id });
        kullanici.son = "İşlem yok.";

        await kullanici.save();
      }
    });
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));

//
