const { SlashCommandBuilder } = require('discord.js');
const { channelId } = require('../../config.json');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('할 일 목록')
    .addSubcommand((sub) =>
      sub.setName('create').setDescription('할 일 목록 생성')
    )
    .addSubcommand((sub) =>
      sub
        .setName('delete')
        .setDescription('할 일 목록 삭제')
        .addStringOption((option) =>
          option
            .setName('date')
            .setDescription('삭제할 목록의 날짜')
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName('view')
        .setDescription('할 일 목록 보기')
        .addStringOption((option) =>
          option
            .setName('date')
            .setDescription('볼 목록의 날짜')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const subCommand = interaction.options.getSubcommand();
    const channelData = await interaction.client.channels.fetch(channelId);
    const messages = await channelData.messages.fetch({ limit: 100 });

    // 생성하기 -----
    if (subCommand === 'create') {
      const today = new Date().toISOString().slice(0, 10);

      // 이미 오늘 날짜의 할 일 목록을 만들었는지 확인
      const existingList = messages.find((list) =>
        list.content.includes(today)
      );
      if (existingList) {
        await interaction.reply(`이미 ${today}의 목록을 생성했어요.`);
        return;
      }

      await channelData.send(today);
      await interaction.reply(`${today}의 할 일 목록 생성`);
    }

    // 삭제하기 -----
    if (subCommand === 'delete') {
      const date = interaction.options.getString('date');
      const deleteList = messages.filter((msg) => msg.content.startsWith(date));

      await Promise.all(deleteList.map((msg) => msg.delete()));
      await interaction.reply(`${date}의 할 일 목록이 삭제되었습니다.`);
    }

    // 보기 -----
    if (subCommand === 'view') {
      const date = interaction.options.getString('date');
      const viewList = messages.find((msg) => msg.content.startsWith(date));

      if (viewList.length) {
        await interaction.reply(viewList);
      } else {
        await interaction.reply(`${date}의 할 일 목록이 존재하지 않습니다.`);
      }
    }
  },
};
