import { IInteraction } from "../../types";
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const iconURL = process.env.ICON_URL;

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("create")
		.setDescription("Todo List 생성"),
	async execute(interaction: IInteraction) {
		const Today = new Date().toISOString().slice(0, 10);

		const embed = new EmbedBuilder()
			.setColor("#FCE35E")
			.setTitle(Today)
			.setAuthor({
				name: "Todo List",
			})
			.setThumbnail(iconURL)
			.addFields({ name: " ", value: "📌 Embed 구현" })
			.addFields({ name: " ", value: "📌 tsconfig 수정" })
			.addFields({ name: " ", value: "📌 ButtonBuilder 구현" });

		await interaction.reply({ embeds: [embed] });
	},
};
