import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import Button = require("./button");

class Row {
	addTrigger() {
		const triggerButton = new Button({
			id: "addTrigger",
			label: "추가",
			style: ButtonStyle.Primary,
		}).button;

		return new ActionRowBuilder<ButtonBuilder>().addComponents(triggerButton);
	}
}

export = Row;
