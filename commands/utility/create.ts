import { IInteraction } from "../../types";
const { SlashCommandBuilder } = require("discord.js");
const { todosEmbed } = require("../builders/embed");
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("create")
		.setDescription("Todo List 생성"),
	async execute(interaction: IInteraction) {
		await interaction
			.reply({ embeds: [todosEmbed] })
			.catch((err) => console.log(err));
	},
};
