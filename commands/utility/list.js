const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName("목록").setDescription("할 일 목록"),
	async execute(interaction) {
		await interaction.reply("command list");
	},
};
