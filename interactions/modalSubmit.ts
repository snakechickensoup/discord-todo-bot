import { ModalSubmitInteraction } from "discord.js";
import Row from "../commands/builders/row";

module.exports = {
	execute: async (interaction: ModalSubmitInteraction) => {
		if (interaction.customId === "addTodoModal") {
			const message = interaction.fields.getTextInputValue("addTodoInput");
			try {
				const todoRow = new Row().todoRow(message);
				const addTrigger = new Row().addTrigger();
				interaction.reply({
					embeds: interaction.message?.embeds,
					components: [
						...interaction.message!.components.slice(0, -1),
						todoRow,
						addTrigger,
					],
				});
			} catch (e) {
				console.log("Error", e);
				console.log("모달 보여주기 실패..");
			}
		}
	},
};
