import { Interaction } from "../types";
import { Events } from "discord.js";
const buttonInteraction = require("../interactions/button");
const modalSubmitInteraction = require("../interactions/modalSubmit");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction: Interaction) {
		if (interaction.isButton()) {
			buttonInteraction.execute(interaction);
			return;
		}
		if (interaction.isModalSubmit()) {
			modalSubmitInteraction.execute(interaction);
			return;
		}

		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`${interaction.commandName} 없음`);
			return;
		}

		try {
			command.execute(interaction);
		} catch (err) {
			console.error(err);

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: "명령을 실행하는 동안 오류가 생김",
					ephemeral: true,
				});
			} else {
				await interaction.reply({
					content: "명령을 실행하는 동안 오류가 생김",
					ephemeral: true,
				});
			}
		}
	},
};
