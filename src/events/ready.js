//const liste = ['Sunucuyu', 'ms kurulum', 'üyeyi'];

import uyari from "../data/uyari_data.js";

export default (client) => {
  client.once("ready", async () => {
    console.log("acik");
    const targetGuild = client.guilds.cache.get(process.env.SUNUCUID);

    setInterval(async () => {
      let cezaliuserlar = await uyari.find();

      cezaliuserlar.forEach(async (element) => {
        if (element.sure <= Date.now()) {
          await uyari.deleteOne({ id: element.id });
          await targetGuild.roles.fetch();
          await targetGuild.members.fetch();
          let role;
          let user = targetGuild.members.cache.get(element.id);
          if (element.uyari == 1) {
            role = targetGuild.roles.cache.get(process.env.UYARI1);
          } else {
            role = targetGuild.roles.cache.get(process.env.UYARI2);
          }
          user.roles.remove(role);
          console.log("sildim");
        }
      });
    }, 10000);
  });
};
