import { CacheType, Client, Collection, CommandInteraction } from "discord.js";

export type IClient = {
	commands: Collection<
		string,
		{ execute: (interaction: IInteraction) => Promise<void> }
	>;
	cooldowns: Collection<string, number>;
} & Client;

export interface IInteraction extends CommandInteraction<CacheType> {
	data: {
		name: string;
	};
	channel_id: string;
}
