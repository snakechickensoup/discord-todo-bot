import { ButtonBuilder, ButtonStyle } from "discord.js";
import { ButtonType, IInteraction } from "../../types";

// class Button {
// 	interaction: IInteraction;
// 	addTrigger: ButtonBuilder;

// 	constructor(interaction: IInteraction) {
// 		this.interaction = interaction;
// 		this.addTrigger = new ButtonBuilder();
// 	}
// }

const createButton = ({ customId, label, style }: ButtonType) =>
	new ButtonBuilder().setCustomId(customId).setLabel(label).setStyle(style);

const addTrigger = createButton({
	customId: "addTrigger",
	label: "추가",
	style: ButtonStyle.Primary,
	s,
});
module.exports = { Button };

class Button {
	button: ButtonBuilder;

	constructor({ customId, label, style }: ButtonType) {
		this.button = new ButtonBuilder()
			.setCustomId(customId)
			.setLabel(label)
			.setStyle(style);
	}

	async addTrigger(interaction: IInteraction) {
		const response = await interaction.reply({
			content: `Are you sure you want to ban ${target.username} for reason: ${reason}?`,
			components: [row],
		});

		const collectorFilter = (i) => i.user.id === interaction.user.id;
		try {
			const confirmation = await response.awaitMessageComponent({
				filter: collectorFilter,
				time: 60_000,
			});

			if (confirmation.customId === "confirm") {
				await interaction.guild.members.ban(target);
				await confirmation.update({
					content: `${target.username} has been banned for reason: ${reason}`,
					components: [],
				});
			} else if (confirmation.customId === "cancel") {
				await confirmation.update({
					content: "Action cancelled",
					components: [],
				});
			}
		} catch (e) {
			await interaction.editReply({
				content: "Confirmation not received within 1 minute, cancelling",
				components: [],
			});
		}
	}
}
