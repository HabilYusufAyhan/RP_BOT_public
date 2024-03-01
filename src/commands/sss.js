export default {
  name: "sss",
  execute(message, client, args) {
    if (message.channel.id == process.env.SUPPORT) {
      message.channel
        .send(
          `
<a:1152768200380006431:1188105244387835954>  Destek kanalını kullanırken merak ettikleriniz ve bilmeniz gerekenler <a:1152768200380006431:1188105244387835954>

<a:yildizlar1:1152764026594537554> İsminizi seçerken Vampire Diaries, Originals ve Legacies serilerinde geçen karakterlerin tam isimlerini ve soyisimlerini alamazsınız. Aynı zamanda ünlü bir şahsın veya kurgusal karakterin de tam ismini alamazsınız.

<a:yildizlar1:1152764026594537554> Eğer yeni bir üyeyseniz ilk isminiz ücretsiz olacaktır ancak dikkatli bir seçim yapın. İkinci bir değişimde 1500 dolar ödemelisiniz.

<a:yildizlar1:1152764026594537554> Aile seçiminizi dikkatli yapınız. Herhangi bir aileye girişiniz ücretsiz olacaktır ancak çıkış yapmak isterseniz 1500 dolar ödemelisiniz.

<a:yildizlar1:1152764026594537554> Kendi ailenizi ücretsiz kurabilirsiniz. Kayıtlı bir aile olmak istiyorsanız aileniz en az 2 üyeden oluşmalıdır. Detaylı bilgi için ⁠<#1149744369704910979> kanalına bakabilirsiniz.

<a:yildizlar1:1152764026594537554> Destek kanalında lütfen ısrarcı ve sabırsız olmayın. Yetkili kişiler sık sık bu kanalı kontrol ediyor. Sadece sorununuzu veya merak ettiklerinizi açık bir dille yazmanız yeterli olacaktır. Yetkilileri etiketlemekten kaçının.

<a:yildizlar1:1152764026594537554> İsminizi seçmeden karakter tanıtımı yazamazsınız.

<a:yildizlar1:1152764026594537554> Karakter tanıtımlarınızın en kısa sürede onaylanacaktır. Tüm tanıtımlar Rol Denetmeni permindeki yetkililer tarafından en kısa sürede okunuyor. İsminizi aldıktan ve tanıtımınız onaylandıktan sonra roleplay yapmaya başlayabilirsiniz. Eğer isminiz ve karakter tanıtımınız onaylanmadan roleplay yaparsanız Rol Cezalı alırsınız.

<a:yildizlar1:1152764026594537554> Rol yapmaya başlayacağınız yer Mystic Falls ise ⁠<#1149748226107375758> kanalından, New Orleans ise ⁠<#1149749827391991940> kanalından ve Grove Hill ise ⁠<#1149860205857869864> kanalından başlayabilirsiniz. Uluslararası ve Kıtalar kategorisinde böyle bir kısıtlama yok.
    `
        )
        .catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
    } else {
      message.reply("Bu komutu bu kanalda kullanamazsın!!!");
    }
  },
};

//.catch((error) => console.error(`Mesaj gönderilemedi: ${error}`));
