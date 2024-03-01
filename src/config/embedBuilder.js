import { MessageEmbed } from "discord.js";
import Bakiye from "../data/bakiye_data.js";
import GuncelRP from "../data/guncelrp_data.js";
import ToplamRP from "../data/toplamrp_data.js";
import sayiyiAyirVeBirlestir from "./basamak.js";
import Islem from "../data/sonislem.js";
const bakiyeembed = async function (user, bakiye, message) {
  await message.guild.members.fetch();
  const messagemembercheck = message.guild.members.cache.get(user);

  const bakiyesirasi = await Bakiye.find().sort({ bakiye: -1 });
  let bakiyesira;
  for (let index = 0; index < bakiyesirasi.length; index++) {
    if (bakiyesirasi[index].id == user) {
      bakiyesira = index + 1;
    }
  }
  const islem = await Islem.findOne({ id: user });
  let islemmesaj = "Geçmiş işlem bulunamadı";
  if (islem) {
    islemmesaj = islem.islem;
  }
  let description = `
**KASA BİLGİLERİ**\n. Kasa Sahibi: **<@${user}>**\n**--------------------**\n\nDolar Serveti: ${sayiyiAyirVeBirlestir(
    bakiye
  )}\nZenginlik Sıralaması: \`${bakiyesira}\`\n\n**Son Ekonomik İşlem**:\n\n`;
  const container = `\`\`\`ansi
[2;34m[2;34m${islemmesaj}[0m[2;34m[0m[2;34m[0m
\`\`\``;
  const response = new MessageEmbed()
    .setColor("#26ff00")
    .setAuthor("Originals Roleplay Bankasına Hoşgeldiniz")
    .setDescription(description + container)
    .setThumbnail(
      messagemembercheck.displayAvatarURL({ format: "png", dynamic: true })
    )
    .setImage(
      `https://cdn.discordapp.com/attachments/1180151467957559326/1194236818116321362/d9eedu7-aa27e9f9-3a1b-4cbd-921c-7acd4f4705ab.png?ex=65af9eb5&is=659d29b5&hm=8d294f55690fc5c1a813cae78012be795af20806a73c5d7333f125b7f5bd5d8c&`
    )
    .setFooter(message.author.username)
    .setTimestamp();
  // .setImage("");

  message.reply({ embeds: [response] });
};

const bakiyeduzenleembed = function (user, bakiye, message) {
  const response = new MessageEmbed()
    .setColor("#26ff00")
    .setAuthor("Originals Roleplay Bankası")
    .setDescription(`<@${user}> \n Dolar Serveti \`${bakiye}\` -> 2500`);

  // .setImage("");

  message.reply({ embeds: [response] });
};

const hayvanrolleriembed = function (user, roles, message, bakiye) {
  const response = new MessageEmbed()
    .setColor("#26ff00")

    .setDescription(
      `**<@&${roles}> | Rolü Satın Alındı**\n\n500 Dolar karşılığında <@&${roles}> rolünü satın aldınız`
    )
    .setFooter(`Kalan Bakiyeniz: ${bakiye}`);

  // .setImage("");

  message.reply({ embeds: [response] });
};

const rplistembed = function (siralama, message) {
  let cumle = `**Güncel Roleplay Puan Sıralaması**\n\n--------------------\n`;
  let toplamrp = 0;
  let kisi = 0;
  for (let index = 0; index < siralama.length; index++) {
    toplamrp += siralama[index].guncelrp;
    if (siralama[index].guncelrp > 0) {
      kisi++;
    }
    if (index < 15) {
      cumle += `\`#${index + 1}\` <@${
        siralama[index].id
      }>   **->**  ${sayiyiAyirVeBirlestir(siralama[index].guncelrp)} puan
            `;
    }
  }
  const response = new MessageEmbed()
    .setColor("#26ff00")
    .setAuthor({
      name: message.guild.name,
      iconURL: message.guild.iconURL({ dynamic: true, size: 4096 }),
    })
    .setDescription(
      cumle +
        `\nToplamda ${kisi} kişi rp yapmış\n Toplam ${sayiyiAyirVeBirlestir(
          toplamrp
        )} puan rp yapılmış`
    );

  // .setImage("");

  message.reply({ embeds: [response] });
};
const isimembed = async function (oldname, newname, message) {
  const response = new MessageEmbed()
    .setColor("#26ff00")
    .setTitle("İSİM")
    .setDescription(
      `${oldname} kullanıcısının ismi başarıyla \`${newname}\` olarak değiştirildi`
    )
    .setFooter("Değiştiren: " + message.author.username);
  // .setImage("");

  let silinecek = await message.reply({ embeds: [response] });

  if (message.channel.id == process.env.KENDINITANIT) {
    try {
      setTimeout(async () => {
        await message.delete();
        await silinecek.delete();
      }, 5000);
    } catch (error) {
      const channel = message.guild.channels.cache.find(
        (channel) => channel.id == process.env.BOTHATALOG
      );
      channel.send("Kayıt mesajını yetkim yetersiz olduğu için silemedim");
    }
  }
};
const maasalembed = function (oldbakiye, newbakiye, message) {
  const response = new MessageEmbed()
    .setAuthor({
      name: message.author.username,
      iconURL: message.author.displayAvatarURL({
        format: "png",
        dynamic: true,
      }),
    })
    .setColor("#26ff00")

    .setDescription(
      `\`RP Maaşı\` maaşını aldın | **+1000**<:dolar:1156354034618355742>\n\n**Dolar Serveti ->** ${oldbakiye} **->** ${newbakiye}`
    )
    .setImage(
      `https://cdn.discordapp.com/attachments/1180151467957559326/1194236818116321362/d9eedu7-aa27e9f9-3a1b-4cbd-921c-7acd4f4705ab.png?ex=65af9eb5&is=659d29b5&hm=8d294f55690fc5c1a813cae78012be795af20806a73c5d7333f125b7f5bd5d8c&`
    );
  // .setImage("");

  message.reply({ embeds: [response] });
};
const paraekleembed = function (oldbakiye, newbakiye, message, user) {
  const messagemembercheck = message.guild.members.cache.get(
    user.substr(2).slice(0, -1)
  );

  const response = new MessageEmbed()
    .setAuthor({
      name: "Originals RP Banka İşlemleri",
      iconURL: message.guild.iconURL({ dynamic: true, size: 4096 }),
    })
    .setColor("#26ff00")
    .setThumbnail(
      messagemembercheck.displayAvatarURL({ format: "png", dynamic: true })
    )
    .setDescription(
      `${user}\nDolar Serveti: *${oldbakiye}* **-> ${newbakiye}**<:dolar:1156354034618355742>`
    )
    .setImage(
      `https://cdn.discordapp.com/attachments/1180151467957559326/1194236818116321362/d9eedu7-aa27e9f9-3a1b-4cbd-921c-7acd4f4705ab.png?ex=65af9eb5&is=659d29b5&hm=8d294f55690fc5c1a813cae78012be795af20806a73c5d7333f125b7f5bd5d8c&`
    );
  // .setImage("");

  message.reply({ embeds: [response] });
};
const paraverembed = function (
  gonderen,
  alan,
  gonderenonceki,
  alanonceki,
  gonderensonraki,
  alansonraki,
  message
) {
  const messagemembercheck = message.guild.members.cache.get(
    alan.substr(2).slice(0, -1)
  );

  const response = new MessageEmbed()
    .setAuthor({
      name: "Originals RP Banka İşlemleri",
      iconURL: message.guild.iconURL({ dynamic: true, size: 4096 }),
    })
    .setColor("#26ff00")
    .setThumbnail(
      message.author.displayAvatarURL({
        format: "png",
        dynamic: true,
      })
    )
    .setDescription(
      `<@${gonderen}>\nDolar Serveti: *${gonderenonceki}* **-> ${gonderensonraki}**<:dolar:1156354034618355742>\n**------------**\n${alan}\nDolar Serveti: *${alanonceki}* **-> ${alansonraki}**<:dolar:1156354034618355742>`
    )
    .setImage(
      `https://cdn.discordapp.com/attachments/1180151467957559326/1194236818116321362/d9eedu7-aa27e9f9-3a1b-4cbd-921c-7acd4f4705ab.png?ex=65af9eb5&is=659d29b5&hm=8d294f55690fc5c1a813cae78012be795af20806a73c5d7333f125b7f5bd5d8c&`
    );
  // .setImage("");

  message.reply({ embeds: [response] });
};
const rppuanembed = async function (guncel, toplam, message) {
  const messagemembercheck = message.guild.members.cache.get(guncel.id);
  const bakiyesirasi = await GuncelRP.find().sort({ guncelrp: -1 });
  let bakiyesira;
  for (let index = 0; index < bakiyesirasi.length; index++) {
    if (bakiyesirasi[index].id == guncel.id) {
      bakiyesira = index + 1;
    }
  }

  let toplamsira;
  let toplamsirasi = await ToplamRP.find().sort({ toplamrp: -1 });
  for (let index = 0; index < toplamsirasi.length; index++) {
    if (toplamsirasi[index].id == toplam.id) {
      toplamsira = index + 1;
    }
  }
  const response = new MessageEmbed()
    .setAuthor({
      name: messagemembercheck.user.username,
      iconURL: message.guild.iconURL({ dynamic: true, size: 4096 }),
    })
    .setColor("#26ff00")
    .setThumbnail(
      messagemembercheck.displayAvatarURL({
        format: "png",
        dynamic: true,
      })
    )
    .setDescription(
      `\n**Roleplay İstatistikleri**\n\nGüncel Roleplay Puanı:**${sayiyiAyirVeBirlestir(
        guncel.guncelrp
      )}**\nGüncel Roleplay Sırası:${bakiyesira}/${
        bakiyesirasi.length
      }\n**---------------**\nToplam Roleplay Puanı:**${sayiyiAyirVeBirlestir(
        toplam.toplamrp
      )}**\nToplam Roleplay Sırası:${toplamsira}/${toplamsirasi.length}`
    )
    .setImage(
      `https://cdn.discordapp.com/attachments/1180151467957559326/1194236818116321362/d9eedu7-aa27e9f9-3a1b-4cbd-921c-7acd4f4705ab.png?ex=65af9eb5&is=659d29b5&hm=8d294f55690fc5c1a813cae78012be795af20806a73c5d7333f125b7f5bd5d8c&`
    );
  // .setImage("");

  message.reply({ embeds: [response] });
};
const toplamrplistembed = function (siralama, message) {
  let cumle = `**Toplam Roleplay Puan Sıralaması**\n\n--------------------\n`;
  let toplamrp = 0;

  for (let index = 0; index < siralama.length; index++) {
    if (index < 15) {
      cumle += `\`#${index + 1}\` <@${
        siralama[index].id
      }>   **->**  ${sayiyiAyirVeBirlestir(siralama[index].toplamrp)} puan
            `;
    }
  }
  const response = new MessageEmbed()
    .setColor("#26ff00")
    .setAuthor({
      name: message.guild.name,
      iconURL: message.guild.iconURL({ dynamic: true, size: 4096 }),
    })
    .setDescription(cumle);

  // .setImage("");

  message.reply({ embeds: [response] });
};
const dolarembed = function (siralama, message) {
  let cumle = `**Toplam Bakiye Sıralaması**\n\n--------------------\n`;

  for (let index = 0; index < siralama.length; index++) {
    if (index < 15) {
      cumle += `\`#${index + 1}\` <@${
        siralama[index].id
      }>   **->**  ${sayiyiAyirVeBirlestir(
        siralama[index].bakiye
      )} <:dolar:1156354034618355742>
            `;
    }
  }
  const response = new MessageEmbed()
    .setColor("#26ff00")
    .setAuthor({
      name: message.guild.name,
      iconURL: message.guild.iconURL({ dynamic: true, size: 4096 }),
    })
    .setDescription(cumle);

  // .setImage("");

  message.reply({ embeds: [response] });
};
export {
  bakiyeembed,
  bakiyeduzenleembed,
  hayvanrolleriembed,
  rplistembed,
  isimembed,
  maasalembed,
  paraekleembed,
  paraverembed,
  rppuanembed,
  toplamrplistembed,
  dolarembed,
};
