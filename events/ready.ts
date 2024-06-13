import { IClient } from "../types";

const { Events } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client: IClient) {
		console.log(`${client.user?.tag} 로긘`);
	},
};
