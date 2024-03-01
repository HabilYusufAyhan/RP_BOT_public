import { MessageEmbed } from "discord.js";

export default {
  name: "dolar",
  execute(message, client, args) {
    if (
      message.channel.id == process.env.SUPPORT ||
      message.channel.id == process.env.BANKA
    ) {
      const response = new MessageEmbed()
        .setColor("#26ff00")
        .setTitle(
          "<:dolar:1156354034618355742> DOLAR <:dolar:1156354034618355742>"
        )
        .setDescription(
          `
      <a:maviok:1152758413227462749>Girişte hesabında 2500<:dolar:1156354034618355742> seni bekliyor.
      <a:maviok:1152758413227462749>Her haftanın sonunda 500<:dolar:1156354034618355742> kazanacaksın.
      <a:maviok:1152758413227462749>Haftanın sonunda rp listesinde ilk 5'e girersen bir sonraki hafta 2500<:dolar:1156354034618355742> kazanacaksın.
      <a:maviok:1152758413227462749>Bir hafta içerisinde 10000 rp puan kazanırsan !maaşal komutunu kullanarak 1000<:dolar:1156354034618355742> kazanabilirsin.
      <a:maviok:1152758413227462749>Yazdığın roller rol denetmenleri tarafından beğenilirse sana bir miktar para verebilirler.
      <a:maviok:1152758413227462749>Yazdığın rollerin toplam puanı belirli eşikleri geçtiğinde belirli miktarlarda para kazanabilirsin.
      <a:maviok:1152758413227462749>Sunucuya bastığınız 1 boost için 2000<:dolar:1156354034618355742>, 2 boost için 5000<:dolar:1156354034618355742> kazanırsınız. 2 boost sonrasın bastığınız her boost başına 3000<:dolar:1156354034618355742> kazanırsınız.(Örneğin 3 boost için 5000 + 3000<:dolar:1156354034618355742> kazanırsınız)
            `
        );

      // .setImage("");

      message
        .reply({ embeds: [response] })

        .catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
