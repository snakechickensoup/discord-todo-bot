import { ButtonBuilder } from "discord.js";
import { ButtonInfo } from "../../types";

class Button {
	button: ButtonBuilder;
	constructor({ id, label, style }: ButtonInfo) {
		this.button = new ButtonBuilder()
			.setCustomId(id)
			.setLabel(label)
			.setStyle(style);
	}
}

export = Button;
