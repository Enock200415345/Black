const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.7",
		author: "Enock",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			welcomeMessage: "Cảm ơn bạn đã mời tôi vào nhóm!\nPrefix bot: %1\nĐể xem danh sách lệnh hãy nhập: %1help",
			multiple1: "bạn",
			multiple2: "các bạn",
			defaultWelcomeMessage: "Xin chào {userName}.\nChào mừng bạn đến với {boxName}.\nChúc bạn có buổi {session} vui vẻ!"
		},
		en: {
			session1: "𝑳𝒆 𝑴𝒂𝒕𝒊𝒏",
			session2: "𝑳𝒂 𝑵𝒖𝒊𝒔",
			session3: "𝑳𝒆 𝑺𝒐𝒊𝒓",
			session4: "𝑳𝒂 𝑱𝒐𝒖𝒓𝒏𝒆́𝒆",
			welcomeMessage: "𝑷𝒂𝒓𝒇𝒂𝒊𝒕 ! 𝑴𝒆𝒓𝒄𝒊 𝒑𝒐𝒖𝒓 𝒍'𝑨𝒋𝒐𝒖𝒕 ! \n𝑺𝒚𝒎𝒃𝒐𝒍𝒆 𝒐𝒖 𝑷𝒓𝒆𝒇𝒊𝒙 : [%1\n].  𝑱𝒆 𝒗𝒊𝒆𝒏𝒔 𝒅𝒆𝒑𝒖𝒊𝒔 𝒍𝒆 𝑮𝑿𝑵𝑮             💀𝐁𝐋𝐀𝐂𝐊 𝐌𝐀𝐅𝐈𝐀            ⚜️𝐅𝐀𝐌𝐈𝐋𝐘🎴                   𝑳𝑬 𝑩𝑶𝑺𝑺 𝑫𝑼 𝑮𝑿𝑵𝑮 :        [https://www.facebook.com/profile.php?id=100089690164634]              𝑬𝒕 𝒑𝒐𝒖𝒓 𝒗𝒐𝒊𝒓 𝒎𝒆𝒔 𝑪𝒐𝒎𝒑é𝒕𝒆𝒏𝒄𝒆𝒔 𝑻𝒂𝒑𝒆!: %1help",
			multiple1: "𝒂̀ 𝒕𝒐𝒊",
			multiple2: "you guys",
			defaultWelcomeMessage: `●▬▬▬▬๑۩۩๑▬▬▬▬▬●    𝒀𝒐  {userName}.\n𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒖𝒆 {multiple} 𝒅𝒂𝒏𝒔  : {boxName}\n𝑫é𝒔𝒐𝒓𝒎𝒂𝒊𝒔 𝒕𝒖 𝒆𝒔𝒕 𝒖𝒏(𝒆) 𝒅𝒆 𝒏𝒐𝒕𝒓𝒆 𝑨𝒑𝒑𝒓ê𝒕 𝒕𝒐𝒊 à 𝒅𝒆𝒔 𝒕𝒂𝒔 𝒅𝒆 𝒎𝒊𝒔𝒔𝒊𝒐𝒏𝒔  {session} ●▬▬▬▬๑۩۩๑▬▬▬▬▬●`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
				const { threadID } = event;
				const { nickNameBot } = global.GoatBot.config;
				const prefix = global.utils.getPrefix(threadID);
				const dataAddedParticipants = event.logMessageData.addedParticipants;
				// if new member is bot
				if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
					if (nickNameBot)
						api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
					return message.send(getLang("welcomeMessage", prefix));
				}
				// if new member:
				if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
					};

				// push new member to array
				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				// if timeout is set, clear it
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

				// set new timeout
				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const threadData = await threadsData.get(threadID);
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const dataBanned = threadData.data.banned_ban || [];
					const threadName = threadData.threadName;
					const userName = [],
						mentions = [];
					let multiple = false;

					if (dataAddedParticipants.length > 1)
						multiple = true;

					for (const user of dataAddedParticipants) {
						if (dataBanned.some((item) => item.id == user.userFbId))
							continue;
						userName.push(user.fullName);
						mentions.push({
							tag: user.fullName,
							id: user.userFbId
						});
					}
					// {userName}:   name of new member
					// {multiple}:
					// {boxName}:    name of group
					// {threadName}: name of group
					// {session}:    session of day
					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } =
						threadData.data;
					const form = {
						mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
					};
					welcomeMessage = welcomeMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
						.replace(/\{boxName\}|\{threadName\}/g, threadName)
						.replace(
							/\{multiple\}/g,
							multiple ? getLang("multiple2") : getLang("multiple1")
						)
						.replace(
							/\{session\}/g,
							hours <= 10
								? getLang("session1")
								: hours <= 12
									? getLang("session2")
									: hours <= 18
										? getLang("session3")
										: getLang("session4")
						);

					form.body = welcomeMessage;

					if (threadData.data.welcomeAttachment) {
						const files = threadData.data.welcomeAttachment;
						const attachments = files.reduce((acc, file) => {
							acc.push(drive.getFile(file, "stream"));
							return acc;
						}, []);
						form.attachment = (await Promise.allSettled(attachments))
							.filter(({ status }) => status == "fulfilled")
							.map(({ value }) => value);
					}
					message.send(form);
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};
