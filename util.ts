type MessageType = "message" | "date";

export const convertMarkdownText = (type: MessageType, text: string) => {
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
};
