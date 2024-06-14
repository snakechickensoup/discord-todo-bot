import { ActionRowBuilder, APIActionRowComponentTypes } from "discord.js";

class Row {
	row: ActionRowBuilder;

	constructor(component: APIActionRowComponentTypes) {
		this.row = new ActionRowBuilder(component);
	}
}

module.exports = {
	Row,
};
