import { verifyKey } from "discord-interactions";
import { InteractionType, InteractionResponseType } from "discord.js";
import client from "./index";
import handleCommand from "./command-handler";
import { APIGatewayProxyEvent } from "aws-lambda";

exports.handler = async (evt: APIGatewayProxyEvent) => {
	const signature = evt.headers["x-signature-ed25519"] ?? "";
	const timestamp = evt.headers["x-signature-timestamp"] ?? "";
	const rawBody = evt.body ?? "";

	const isValidRequest = verifyKey(
		rawBody,
		signature,
		timestamp,
		process.env.PUBLIC_KEY || ""
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
