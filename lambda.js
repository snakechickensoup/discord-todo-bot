const { verifyKey } = require("discord-interactions");
const {
	InteractionType,
	InteractionResponseType,
	CommandInteractionOptionResolver,
} = require("discord.js");
const client = require("./index");

exports.handler = async (evt) => {
	const signature = evt.headers["x-signature-ed25519"];
	const timestamp = evt.headers["x-signature-timestamp"];
	const rawBody = evt.body;

	const isValidRequest = verifyKey(
		rawBody,
		signature,
		timestamp,
		process.env.PUBLIC_KEY
	);
	if (!isValidRequest) {
		return { statusCode: 401, body: JSON.stringify({ error: "잘못됨" }) };
	}

	const interactionBody = JSON.parse(rawBody);

	if (interactionBody.type === InteractionType.Ping) {
		return {
			statusCode: 200,
			body: JSON.stringify({ type: InteractionResponseType.Pong }),
		};
	} else if (interactionBody.type === InteractionType.ApplicationCommand) {
		// check ready
		if (!client.isReady()) {
			await new Promise((resolve) => {
				client.once("ready", resolve);
			});
		}

		// command execute
		const command = client.commands.get(interactionBody.data.name);
		// TODO : This interaction failed ㅠㅠ
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
							type: InteractionResponseType.ChannelMessageWithSource,
							data: { content, flags: ephemeral ? 64 : undefined },
						};
					},
				};

				await command.execute(interaction);

				// return 200...
			} catch (err) {
				console.error("커맨드 실행 에러", err);
				return {
					statusCode: 500,
					body: "커맨드 실행 실패 🥹",
				};
			}
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ status: "~ 성 공 ~" }),
	};
};
