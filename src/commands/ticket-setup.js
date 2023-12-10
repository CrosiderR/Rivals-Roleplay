const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  args,
  slice,
  ActionRowBuilder,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticketkur")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Ticket'ı Kurar."),

  run: async (client, interaction, args, message) => {
    let sunucuiconurl = config.sunucuiconurl;
    let renk = config.renk;

    let destekemoji = config.destekemoji;
    let donatemoji = config.donatemoji;
    let oyuniçisorunemoji = config.oyuniçisorunemoji;
    let diğerkategorileremoji = config.diğerkategorileremoji;
    let kategorisifirlaemoji = config.kategorisifirlaemoji;

    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder("Ticket Açmak İçin Kategori Seçiniz.")
        .addOptions([
          {
            label: "Destek, Bug & Teknik Sorunlar",
            description: "Destek, Bug veya Teknik Sorun Almak İstiyorsanız.",
            value: "general",
            emoji: `${destekemoji}`,
          },
          {
            label: "Oyun içi Sorunlar & Rol Hataları",
            description: "Oyun içi Sorunlar & Rol Hataları",
            value: "staff",
            emoji: `${oyuniçisorunemoji}`,
          },
          {
            label: "Diğer Kategoriler",
            description:
              "Sebebiniz Eğer Burada Yoksa, Bu Kategoride Ticket Açın.",
            value: "other",
            emoji: `${diğerkategorileremoji}`,
          },
          {
            label: "Seçenek Sıfırla",
            description: "Seçenekleri Sıfırlamanıza Yarar.",
            value: "Sıfırla",
            emoji: `${kategorisifirlaemoji}`,
          },
        ])
    );

    if (
      interaction.user.id !== "484702013834133526" &&
      interaction.user.id !== "852682318795374635"
    ) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.guild.name}`,
          iconURL: `${sunucuiconurl}`,
        })
        .setFooter({
          text: `${interaction.guild.name}`,
          iconURL: `${sunucuiconurl}`,
        })
        .setDescription("**Komutu Kullanmak İçin Yetkin Yok :(**")
        .setTimestamp()
        .setColor(renk);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const ticket = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.guild.name}`,
        iconURL: `${sunucuiconurl}`,
      })
      .setDescription(
        "*Ticket Açmak İçin Aşağıdan Kategori Seçiniz. \n\n __Gereksiz Yere Ticket Açanlara İşlem Uygulanacaktır.__*"
      )
      .setThumbnail(`${sunucuiconurl}`);

    interaction.channel.send({
      embeds: [ticket],
      content: `**Ticket açmak için aşağıdan kategori seçiniz**`,
      components: [row],
    });

    console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
  },
};
