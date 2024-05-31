const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName("수정").setDescription("할 일 수정"),
	async execute(interaction) {
		await interaction.reply("command edit");
	},
};
