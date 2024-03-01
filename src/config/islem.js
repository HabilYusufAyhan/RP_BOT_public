import Islem from "../data/sonislem.js";

async function islem(userid, islemmesaj) {
  const islem = await Islem.findOne({ id: userid });
  if (islem) {
    islem.islem = islemmesaj;
    await islem.save();
  } else {
    const newUser = new Islem({
      id: userid,
      islem: islemmesaj,
    });
    await newUser.save();
  }
}
export default islem;
