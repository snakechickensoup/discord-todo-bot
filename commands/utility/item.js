const { SlashCommandBuilder } = require("discord.js");
const { convertMarkdownText } = require("../../util");
require("dotenv").config();
const channelId = process.env.CHANNEL_ID;

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("todo")
		.setDescription("할 일")
		.addSubcommand((sub) =>
			sub
				.setName("add")
				.setDescription("할 일 추가")
				.addStringOption((option) =>
					option
						.setName("todo")
						.setDescription("추가할 할 일")
						.setRequired(true)
				)
		)
		.addSubcommand((sub) =>
			sub
				.setName("edit")
				.setDescription("할 일 수정")
				.addStringOption((option) =>
					option
						.setName("id")
						.setDescription("수정할 할 일의 id")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("todo")
						.setDescription("수정할 할 일")
						.setRequired(true)
				)
		)
		.addSubcommand((sub) =>
			sub
				.setName("delete")
				.setDescription("할 일 삭제")
				.addStringOption((option) =>
					option
						.setName("id")
						.setDescription("삭제할 할 일의 id")
						.setRequired(true)
				)
		)
		.addSubcommand((sub) =>
			sub
				.setName("check")
				.setDescription("할 일 체크")
				.addStringOption((option) =>
					option
						.setName("id")
						.setDescription("완료한 할 일의 id")
						.setRequired(true)
				)
		),

	async execute(interaction) {
		const subCommand = interaction.options.getSubcommand();
		const channelData = await interaction.client.channels.fetch(channelId);
		const messages = await channelData.messages.fetch({ limit: 10 });

		const today = convertMarkdownText(
			"date",
			new Date().toISOString().slice(0, 10)
		);

		const todayList = messages.find(
			(list) => list.content.split("\n")[0].trim() === today.trim()
		);

		// 아직 목록이 없을 경우
		if (!todayList) {
			await interaction.reply(
				convertMarkdownText("message", "오늘의 할 일 목록을 먼저 생성해주세요")
			);
		}

		// 날짜 제외 목록만
		const [date, ...todos] = todayList.content.split("\n");

		// 추가
		if (subCommand === "add") {
			const todo = interaction.options.getString("todo");
			const id = Math.floor(todos.length / 2);
			const addTodo = [date, ...todos, `\n📌 ${id}. ${todo}`].join("\n");
			await todayList.edit(addTodo);
			await interaction.reply(
				convertMarkdownText("message", "할 일을 추가했습니다.")
			);
		}

		// 수정
		if (subCommand === "edit") {
			// todo : 입력한 id의 todo가 없는 경우

			const id = interaction.options.getString("id");
			const todo = interaction.options.getString("todo");
			const targetIndex = todos.findIndex((item) => item.includes(` ${id}. `));
			const editItem = `${todos[targetIndex].slice(0, 5)} ${todo}`;
			const editTodos = [
				...todos.slice(0, targetIndex),
				editItem,
				...todos.slice(targetIndex + 1),
			];
			await todayList.edit([date, ...editTodos].join("\n"));
			await interaction.reply(
				convertMarkdownText("message", `할 일#${id} 수정 완료`)
			);
		}

		// check
		if (subCommand === "check") {
			// todo : 입력한 id의 todo가 없는 경우

			const id = interaction.options.getString("id");
			const targetIndex = todos.findIndex((item) => item.includes(` ${id}. `));
			const [emoji, todo] = todos[targetIndex].split(` ${id}. `);
			const editItem =
				emoji === "📌" ? `✅ ${id}. ~~${todo}~~` : `📌 ${id}. ${todo}`;
			const editTodos = [
				...todos.slice(0, targetIndex),
				editItem,
				...todos.slice(targetIndex + 1),
			];
			await todayList.edit([date, ...editTodos].join("\n"));
			await interaction.reply(
				convertMarkdownText("message", `할 일#${id} 체크 완료`)
			);
		}

		// 삭제
		if (subCommand === "delete") {
			// todo : 입력한 id의 todo가 없는 경우

			const id = interaction.options.getString("id");
			const targetIndex = todos.findIndex((item) => item.includes(` ${id}. `));
			const editItems = todos.slice(targetIndex + 1).map((todo) => {
				if (todo) {
					const [emoji, id] = todo.slice(0, 5).split(" ");
					const convertId = +id.trim().slice(0, -1) - 1;
					return `${emoji} ${convertId}. ${todo.slice(5).trim()}`;
				}
				return "";
			});

			await todayList.edit(
				[date, ...todos.slice(0, targetIndex), ...editItems].join("\n")
			);
			await interaction.reply(
				convertMarkdownText("message", `할 일#${id} 삭제 완료`)
			);
		}
	},
};
