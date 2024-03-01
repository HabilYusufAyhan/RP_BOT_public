function sayiyiAyirVeBirlestir(sayi) {
  // Sayıyı stringe çevir
  sayi = sayi.toString();

  // Sayının ondalık kısmını ve tam kısmını ayır
  let kisimlar = sayi.split(".");
  let tamKisim = kisimlar[0];
  let ondalikKisim = kisimlar[1] || "";

  // Tam kısmı basamaklarına ayır
  let tamKisimAyirilmis = "";
  for (let i = 0; i < tamKisim.length; i++) {
    if (i > 0 && i % 3 === tamKisim.length % 3) {
      tamKisimAyirilmis += ".";
    }
    tamKisimAyirilmis += tamKisim[i];
  }

  // Ondalık kısmı birleştir
  let sonuc =
    tamKisimAyirilmis + (ondalikKisim.length > 0 ? "." + ondalikKisim : "");

  return sonuc;
}

export default sayiyiAyirVeBirlestir;
