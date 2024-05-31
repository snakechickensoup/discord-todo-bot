const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder().setName("추가").setDescription("할 일 추가"),
	async execute(interaction) {
		await interaction.reply("command add");
	},
};
