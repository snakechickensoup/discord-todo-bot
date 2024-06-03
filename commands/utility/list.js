const { SlashCommandBuilder } = require("discord.js");
const { convertMarkdownText } = require("../../util");
require("dotenv").config();
const channelId = process.env.CHANNEL_ID;

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("list")
		.setDescription("할 일 목록")
		.addSubcommand((sub) =>
			sub.setName("create").setDescription("할 일 목록 생성")
		)
		.addSubcommand((sub) =>
			sub
				.setName("delete")
				.setDescription("할 일 목록 삭제")
				.addStringOption((option) =>
					option
						.setName("date")
						.setDescription("삭제할 목록의 날짜")
						.setRequired(true)
				)
		)
		.addSubcommand((sub) =>
			sub
				.setName("view")
				.setDescription("할 일 목록 보기")
				.addStringOption((option) =>
					option
						.setName("date")
						.setDescription("볼 목록의 날짜")
						.setRequired(true)
				)
		),
	async execute(interaction) {
		const subCommand = interaction.options.getSubcommand();
		const channelData = await interaction.client.channels.fetch(channelId);
		const messages = await channelData.messages.fetch({ limit: 50 });

		const checkDate = (date) =>
			messages.find(
				(list) =>
					list.content?.split("\n")[0]?.trim() ===
					convertMarkdownText("date", date).trim()
			);

		// 생성하기 -----
		if (subCommand === "create") {
			const today = new Date().toISOString().slice(0, 10);

			// 이미 오늘 날짜의 할 일 목록을 만들었는지 확인
			if (checkDate(today)) {
				await interaction.reply(
					convertMarkdownText("message", "이미 오늘의 목록을 생성했어요.")
				);
				return;
			}

			await channelData.send(convertMarkdownText("date", today));
			await interaction.reply(
				convertMarkdownText("message", "오늘의 할 일 목록 생성")
			);
		}

		// 삭제하기 -----
		if (subCommand === "delete") {
			let date = interaction.options.getString("date");
			if (date === "today") {
				date = new Date().toISOString().slice(0, 10);
			}
			const deleteList = checkDate(date);

			if (deleteList) {
				await deleteList.delete();
				await interaction.reply(
					convertMarkdownText(
						"message",
						`${date}의 할 일 목록이 삭제되었습니다.`
					)
				);
			} else {
				await interaction.reply(
					convertMarkdownText(
						"message",
						`${date}의 할 일 목록이 존재하지 않습니다.`
					)
				);
			}
		}

		// 보기 -----
		if (subCommand === "view") {
			let date = interaction.options.getString("date");
			if (date === "today") {
				date = new Date().toISOString().slice(0, 10);
			}
			const viewList = checkDate(date);

			if (viewList) {
				await interaction.reply(viewList.content);
			} else {
				await interaction.reply(
					convertMarkdownText(
						"message",
						`${date}의 할 일 목록이 존재하지 않습니다.`
					)
				);
			}
		}
	},
};
