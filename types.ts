import { Client, Collection, CommandInteraction } from "discord.js";

// Client Type
export interface IClient extends Client {
	commands: Collection<string, (interaction: CommandInteraction) => void>;
	cooldowns: Collection<string, number>;
}
