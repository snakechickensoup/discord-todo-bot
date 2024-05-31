const { Events } = require("discord.js");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
		console.log(interaction);

		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) {
			console.error(`${interaction.commandName} 없음`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: "명령을 실행하는 동안 오류가 생김",
					ephemeral: true,
				});
			} else {
				await interaction.reply({
					content: "명령을 실행하는 동안 오류가 생김",
					ephemeral: true,
				});
			}
		}
	},
};
