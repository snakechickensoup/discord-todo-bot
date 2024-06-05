const { InteractionResponseType } = require("discord-interactions");
const { CommandInteractionOptionResolver } = require("discord.js");

async function handleCommand(interactionBody, client) {
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
				client,
				data: interactionBody.data,
				channelId: interactionBody.channel_id,
				options: new CommandInteractionOptionResolver(
					client,
					interactionBody.data.options
				),
				reply: async ({ content, ephemeral }) => {
					return {
						type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
						data: { content, flags: ephemeral ? 64 : undefined },
					};
				},
			};

			const response = await command.execute(interaction);

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
