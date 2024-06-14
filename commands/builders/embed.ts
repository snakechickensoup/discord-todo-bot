const { EmbedBuilder } = require("discord.js");
require("dotenv").config();

const iconURL = process.env.ICON_URL;

module.exports = {
	todosEmbed: new EmbedBuilder()
		.setColor("#FCE35E")
		.setTitle(new Date().toISOString().slice(0, 10))
		.setAuthor({
			name: "Todo List",
		})
		.setThumbnail(iconURL)
		.addFields({ name: " ", value: "📌 Embed 구현" })
		.addFields({ name: " ", value: "📌 tsconfig 수정" })
		.addFields({ name: " ", value: "📌 ButtonBuilder 구현" }),
};
