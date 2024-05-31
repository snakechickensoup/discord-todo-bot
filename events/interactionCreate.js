const { Events, Collection } = require("discord.js");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) {
			console.error(`${interaction.commandName} 없음`);
			return;
		}

		// cooldowns
		const { cooldowns } = interaction.client;

		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timeStamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 3;
		const cooldownAmount =
			(command.cooldown ?? defaultCooldownDuration) * 1_000;

		if (timeStamps.has(interaction.user.id)) {
			const expirationTime =
				timeStamps.get(interaction.user.id) + cooldownAmount;
			const timeLeft = (expirationTime - now) / 1_000;

			if (now < expirationTime) {
				return interaction.reply({
					content: `잠시만요. ${timeLeft.toFixed(1)} 초만 기다려주세요.`,
					ephemeral: true,
				});
			}
		}

		timeStamps.set(interaction.user.id, now);

		setTimeout(() => timeStamps.delete(interaction.user.id), cooldownAmount);

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
