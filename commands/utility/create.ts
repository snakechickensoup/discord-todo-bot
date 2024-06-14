import { SlashCommandBuilder } from "discord.js";
import { IInteraction } from "../../types";
import Row = require("../builders/row");
const { todosEmbed } = require("../builders/embed");
require("dotenv").config();
const channelId = process.env.CHANNEL_ID ?? "";

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("create")
		.setDescription("Todo List 생성"),

	async execute(interaction: IInteraction) {
		const channel = await interaction.client.channels.fetch(channelId);
		console.log("channel;", channel);

		// ! embed
		const triggerRow = new Row().addTrigger();
		const components = [triggerRow];
		const response = await interaction.reply({
			embeds: [todosEmbed],
			components,
		});

		const collectorFilter = (i: any) => {
			console.log(i);
			return i.user.id === interaction.user.id;
		};

		try {
			const confirm = await response.awaitMessageComponent({
				filter: collectorFilter,
				time: 60_000,
			});

			if (confirm.customId === "addTrigger") {
				await confirm.update({
					components,
				});
			}
		} catch (e) {
			await interaction.editReply({
				content: "Confirmation not received within 1 minute, cancelling",
				components,
			});
		}
	},
};
