const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName("추가").setDescription("할 일 추가"),
	async execute(interaction) {
		await interaction.reply("command add");
	},
};
