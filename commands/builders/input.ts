import { TextInputBuilder } from "discord.js";
import { InputInfo } from "../../types";

class Input {
	input: TextInputBuilder;
	constructor({ id, label, style }: InputInfo) {
		this.input = new TextInputBuilder()
			.setCustomId(id)
			.setLabel(label)
			.setStyle(style);
	}
}

export = Input;
