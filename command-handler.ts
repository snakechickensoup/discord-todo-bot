import { CommandInteraction } from "discord.js";
import { IClient, IInteraction } from "./types";

const { InteractionResponseType } = require("discord-interactions");

async function handleCommand(interactionBody: IInteraction, client: IClient) {
	// check ready
	if (!client.isReady()) {
		await new Promise((resolve) => {
			client.once("ready", resolve);
		});
	}

	// command execute
	const command = client.commands.get(interactionBody.data.name);
	if (command) {
		try {
			const interaction = {
				...interactionBody,
				...CommandInteraction,
			};

			const response = await command.execute(interaction as any);

			return {
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: response,
			};
		} catch (err) {
			console.error("커맨드 실행 에러", err);

			return {
				statusCode: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				body: "커맨드 실행 실패 🥹",
			};
		}
	}

	return {
		type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		data: { content: "커맨드 알 수 없음" },
	};
}

module.exports = { handleCommand };
