import {
	Client,
	Collection,
	ButtonStyle,
	TextInputStyle,
	ChatInputCommandInteraction,
} from "discord.js";

export type IClient = {
	commands: Collection<string, { execute: (i: Interaction) => Promise<void> }>;
	cooldowns: Collection<string, number>;
} & Client;

export type Interaction = {
	data: {
		name: string;
	};
	channel_id: string;
	client: IClient;
} & ChatInputCommandInteraction;

export type ButtonInfo = {
	id: string;
	label: string;
	style: ButtonStyle;
};

export type InputInfo = {
	id: string;
	label: string;
	style: TextInputStyle;
};

export type ModalInfo = {
	id: string;
	title: string;
};
