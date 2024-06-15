import { SlashCommandBuilder } from "discord.js";
import { Interaction } from "../../types";
import Row = require("../builders/row");
const { todosEmbed } = require("../builders/embed");

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("create")
		.setDescription("Todo List 생성"),

	async execute(interaction: Interaction) {
		// ! embed
		const triggerRow = new Row().addTrigger();
		const components = [triggerRow];
		try {
			await interaction.reply({
				content: "Todo List를 생성하였습니다.",
				embeds: [todosEmbed],
				components,
			});
		} catch (e) {
			console.log(e);
			await interaction.editReply({
				content: "Confirmation not received within 1 minute, cancelling",
				components,
			});
		}
	},
};
