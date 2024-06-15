import { ButtonInteraction } from "discord.js";
import Modal from "../commands/builders/modal";

module.exports = {
	execute: async (interaction: ButtonInteraction) => {
		if (interaction.customId === "addTrigger") {
			const modal = new Modal().addModal();
			try {
				await interaction.showModal(modal);
			} catch (e) {
				console.log("Error", e);
				console.log("모달 보여주기 실패..");
			}
		}
	},
};
