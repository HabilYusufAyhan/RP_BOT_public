import Bakiye from "../data/bakiye_data.js";
import GuncelRP from "../data/guncelrp_data.js";
import RPOda from "../data/rpoda_data.js";
import ToplamRP from "../data/toplamrp_data.js";

async function rpsayac(message) {
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
    user.guncelrp = user.guncelrp + puan;
    user.sonrpoda = message.channel.id;
    user.sonrpzaman = Date.now();
    let usertoplamrp = await ToplamRP.findOne({ id: message.author.id });
    let oncekitoplam = usertoplamrp.toplamrp;
    usertoplamrp.toplamrp = usertoplamrp.toplamrp + puan;
    const channel2 = message.guild.channels.cache.find(
      (channel) => channel.id == process.env.RPLOG
    );
    channel2.send(`
     <@${message.author.id}>, <#${message.channel.id}> kanalında bir rp yaptı
     Guncel RP Puanı : ${oncekiguncel} **->** ${user.guncelrp}
     Toplam RP Puanı : ${oncekitoplam} **->** ${usertoplamrp.toplamrp}

    `);
    user.save();
    usertoplamrp.save();
  }
}
export default rpsayac;
