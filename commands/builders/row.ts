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

	todoRow(todo: string) {
		const now = Date.now();
		const checkButton = new Button({
			id: `check-${now}`,
			label: "🤍",
			style: ButtonStyle.Secondary,
		}).button;
		const todoButton = new Button({
			id: `todo-${now}`,
			label: todo,
			style: ButtonStyle.Secondary,
		}).button;

		return new ActionRowBuilder<ButtonBuilder>().addComponents(
			checkButton,
			todoButton
		);
	}
}

export = Row;
