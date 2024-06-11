import { Client, Collection, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";
import env from "dotenv";
import { IClient } from "./types";
env.config();
const token = process.env.TOKEN;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.MessageContent,
	],
}) as IClient;

client.cooldowns = new Collection();
client.commands = new Collection();

// commands
const foldersPath: string = path.join(__dirname, "commands");
const commandFolders: string[] = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPaths = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPaths)
		.filter((file: string) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPaths, file);
		const command = require(filePath);

		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`${filePath} 에 'data'나 'execute'가 없음!`);
		}
	}
}

// events
const eventsPath: string = path.join(__dirname, "events");
const eventFiles: string[] = fs
	.readdirSync(eventsPath)
	.filter((file: string) => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// login
client
	.login(token)
	.then(() => {
		console.log("Todolicious 로긘 완");
	})
	.catch(console.error);

export default client;
