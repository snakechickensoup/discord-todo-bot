type MessageType = "message" | "date";

module.exports = {
	convertMarkdownText: (type: MessageType, text: string) => {
		if (type === "message") {
			return `
      \`\`\`fix
- ${text} \`\`\``;
		}

		if (type === "date") {
			return `
      >>> #      ${text}
      `;
		}
	},
};
