const { verifyKey } = require("discord-interactions");
const { InteractionType, InteractionResponseType } = require("discord.js");
const client = require("./index");
const { handleCommand } = require("./command-handler");

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
		const response = await handleCommand(interactionBody, client);

		return {
			statusCode: 200,
			body: JSON.stringify(response),
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ status: "~ 성 공 ~" }),
	};
};
