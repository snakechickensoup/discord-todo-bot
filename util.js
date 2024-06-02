module.exports = {
  convertMarkdownText: (type, text) => {
    if (type === 'message') {
      return `
      \`\`\`fix
- ${text} \`\`\``;
    }

    if (type === 'date') {
      return `
      > # ${text}
      `;
    }
  },
};
