const { getStreamFromURL } = require("fb-watchman");

module.exports = {
  config: {
    name: "stats",
    aliases: ["ping","upt","time"],
    version: "1.0",
    author: "OtinXSandip",
    role: 0,
    shortDescription: {
      en: "stats",
    },
    longDescription: {
      en: "shows stats of bot.",
    },
    category: "system",
    guide: {
      en: "Use {p}stats to see stats of bot.",
    },
  },

  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();

      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const uptimeString = `${hours}Hrs ${minutes}min ${seconds}sec`;

      const currentDate = new Date();
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = currentDate.toLocaleDateString("en-US", options);
      const time = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kathmandu",
        hour12: true,
      });

      const timeStart = Date.now();
      await api.sendMessage({
        body: " ๑۩| 𝗥é𝗰𝘂𝗽é𝗿𝗮𝘁𝗶𝗼𝗻 𝗲𝗻 𝗰𝗼𝘂𝗿𝘀",
      }, event.threadID);

      const ping = Date.now() - timeStart;

      let pingStatus = "𝐒𝐄𝐔𝐋 𝐋𝐄 𝐁𝐋𝐀𝐂𝐊 𝐌𝐀𝐅𝐈𝐀 𝐅𝐀𝐌𝐈𝐋𝐘 𝐌𝐄𝐑𝐈𝐓𝐄 𝐃-𝐄𝐓𝐑𝐄 𝐇𝐎𝐍𝐎𝐑𝐄𝐑 𝐒𝐔𝐑 𝐂𝐄𝐓𝐓𝐄 𝐓𝐄𝐑𝐑𝐄....😪🥃🚬 ";
      if (ping < 400) {
        pingStatus = "Smooth like your tiny pussy";
      }

      // Assuming global.utils.getStreamFromURL(img) is correctly defined
      const imgURL= "https://i.ibb.co/Q9F9yKp/image.jpg";
      const attachment = await global.utils.getStreamFromURL(imgURL);

      api.sendMessage({
        body: `●۩۩ஜ♦🄱🄻🄰🄲🄺♦ஜ۩۩●\n●⚜️✿🄵🄰🄼🄸🄻🄻🅈✿⚜️●\n〉●▬▬▬▬๑۩۩๑▬▬▬▬▬●   𝗟𝗲 𝗕𝗼𝘁 𝗲𝘀𝘁 𝗔𝗰𝘁𝗶𝗳 𝗱𝗲 𝗽𝘂𝗶𝘀\n ➤${uptimeString}\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●\n﹝📅 | 𝗗𝗔𝗧𝗘﹞: ${date}\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●\n⏰| 𝗧𝗲𝗺𝗽 : ${time}\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●\n﹝💀 |  𝗧𝗼𝘁𝗮𝗹 𝗗𝗲𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻﹞\n➤ ${allUsers.length}\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●\n﹝🔱| 𝗚𝗲𝘀𝘁𝗶𝗼𝗻 𝗱𝗲 𝗗𝗶𝘃𝗶𝘀𝗶𝗼𝗻﹞\n➤${allThreads.length}\n\n﹝🎴 | 𝗔𝗶𝗻𝗲 ﹞: ${ping}ms\n●▬▬▬▬๑۩۩๑▬▬▬▬▬●\n𝗠𝗼𝘁𝗶𝘃𝗮𝘁𝗶𝗼𝗻: ${pingStatus}`,
        attachment: attachment,
      }, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
