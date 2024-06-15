import {
	ActionRowBuilder,
	ModalActionRowComponentBuilder,
	ModalBuilder,
	TextInputStyle,
} from "discord.js";
import Input from "./input";

class Modal {
	addModal = () => {
		const modal = new ModalBuilder()
			.setCustomId("addTodoModal")
			.setTitle("할 일 추가");

		const todoInput = new Input({
			id: "addTodoInput",
			label: "할 일을 입력해주세요.",
			style: TextInputStyle.Short,
		}).input;

		const row =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				todoInput
			);
		return modal.addComponents(row);
	};
}

export = Modal;
