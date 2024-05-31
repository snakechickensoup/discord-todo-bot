const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName("완료").setDescription("할 일 완료"),
	async execute(interaction) {
		await interaction.reply("command check");
	},
};
