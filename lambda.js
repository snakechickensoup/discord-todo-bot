const { verifyKey } = require("discord-interactions");
const { InteractionType, InteractionResponseType } = require("discord.js");
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

	const body = JSON.parse(rawBody);

	if (body.type === InteractionType.Ping) {
		return {
			statusCode: 200,
			body: JSON.stringify({ type: InteractionResponseType.Pong }),
		};
	} else if (body.type === InteractionType.ApplicationCommand) {
		// TODO : command 실행 x ㅠㅠ ...
		const command = client.commands.get(body.data.name);
		return await command.execute(body);
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ status: "~ 성 공 ~" }),
	};
};
