const fs = require('fs');

module.exports = {
	config: {
		name: "file",
		aliases: ["files"],
		version: "1.0",
		author: "Mahir Tahsan",
		countDown: 5,
		role: 0,
		shortDescription: "Send bot script",
		longDescription: "Send bot specified file ",
		category: "𝗢𝗪𝗡𝗘𝗥",
		guide: "{pn} file name. Ex: .{pn} filename"
	},

	onStart: async function ({ message, args, api, event }) {
		const permission = ["100089690164634",];
		if (!permission.includes(event.senderID)) {
			return api.sendMessage("𝗗é𝘀𝗼𝗹é 𝗦𝗮𝘂𝗳 𝗹𝗲 𝗕𝗼𝘀𝘀 ●▬▬▬▬๑۩۩๑▬▬▬▬▬● 𝗦𝗘𝗜𝗚𝗡𝗘𝗨𝗥 𝗠𝗔𝗗𝗔𝗥𝗔  ●▬▬▬▬๑۩۩๑▬▬▬▬▬●  𝗽𝗲𝘂𝘁 𝘂𝘁𝗶𝗹𝗶𝘀𝗲𝗿 𝗰𝗲𝘁𝘁𝗲 𝗖𝗠𝗗💀⁉️", event.threadID, event.messageID);
		}

		const fileName = args[0];
		if (!fileName) {
			return api.sendMessage("●▬▬▬▬๑۩۩๑▬▬▬▬▬●  𝗦𝗘𝗜𝗚𝗡𝗘𝗨𝗥 𝗠𝗔𝗗𝗔𝗥𝗔  ●▬▬▬▬๑۩۩๑▬▬▬▬▬●  𝗜𝗻𝗱𝗶𝗾𝘂𝗲𝘇 𝗹𝗲 𝗡𝗼𝗺 𝗱𝗲 𝗹𝗮 𝗖𝗠𝗗 𝗾𝘂𝗲 𝗷𝗲 𝗱𝗼𝗶𝘀 𝗹𝗶𝘃𝗿𝗲𝗿 💀⁉️", event.threadID, event.messageID);
		}

		const filePath = __dirname + `/${fileName}.js`;
		if (!fs.existsSync(filePath)) {
			return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
		}

		const fileContent = fs.readFileSync(filePath, 'utf8');
		api.sendMessage({ body: fileContent }, event.threadID);
	}
};
