const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require("discord.js");
const config = require("../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yetkilibasvuru")
    .setDMPermission(false)
    .setDescription("Yetkili Başvuru Formu")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  run: async (client, interaction, Guild) => {
    let sunucuiconurl = config.sunucuiconurl;
    let sunucubanner = config.sunucubanner;
    let renk = config.renk;

    if (interaction.user.id !== "484702013834133526")
      return interaction.reply({
        content: `Bu komudu kullanmak için yetkin yok`,
        ephemeral: false,
      });

    const menu = new EmbedBuilder()
      .setColor(renk)
      .setAuthor({
        name: `${interaction.guild.name}`,
        iconURL: `${sunucuiconurl}`,
      })
      .setImage(`${sunucubanner}`)
      .setDescription(
        "**```Yetkili Başvurusu İçin Aşağıdaki Butona Basınız.```**"
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("bot-başvuru")
        .setLabel("Staff Başvurusu Göndermek İçin Butona Tıkla!")
        .setEmoji("📗")
        .setStyle(ButtonStyle.Success)
    );
    interaction.channel.send({
      content: "||@everyone|| **/** ||@here||",
      embeds: [menu],
      components: [row],
    });
  },
};
