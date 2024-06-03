const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

const commands = [];
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPaths = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPaths)
		.filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPaths, file);
		const command = require(filePath);

		if ("data" in command && "execute" in command) {
			console.log(command.data);
			commands.push(command.data.toJSON());
		} else {
			console.log(`${filePath} 에 'data'나 'execute'가 없음!`);
		}
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`refresh ${commands.length}commands`);

		const data = await rest.put(Routes.applicationCommands(clientId), {
			body: commands,
		});

		console.log(`${data.length}개의 명령 로드 성공!`);
	} catch (err) {
		console.error(err);
	}
})();
