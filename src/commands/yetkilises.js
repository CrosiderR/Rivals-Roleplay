const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");
const { renk, yetkiliekibi } = require("../config.js");
const config = require("../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yetkilises")
    .setDMPermission(false)
    .setDescription("Yetkililerin Seste Olup Olmadığını Gösterir."),
  run: async (client, interaction) => {
    let yetkiliekibi = config.yetkiliekibi;
    let renk = config.renk;
    let sunucuiconurl = config.sunucuiconurl;

    const yetkinyok = new EmbedBuilder()
      .setDescription(
        `**${interaction.member} Bu Komutu Kullanmak için <@&${yetkiliekibi}> Rolün Yok!**`
      )
      .setColor(renk);

    if (
      !interaction.member.roles.cache.get(yetkiliekibi) &&
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

    let bedrp = "**Sesli Kanalda Olan Yetkililer:**\n";
    let bedrp2 = "**Sesli Kanalda Olmayan Yetkililer:**\n";
    interaction.guild.roles.cache.get(yetkiliekibi).members.map((r) => {
      bedrp += r.voice.channel ? "•  <@" + r.user.id + ">\n" : "";
      bedrp2 += !r.voice.channel ? "•  <@" + r.user.id + ">\n" : "";
    });

    const bedrpembed = new EmbedBuilder()
      .setColor(renk)
      .setTimestamp()
      .setAuthor({
        name: `${interaction.guild.name}`,
        iconURL: `${sunucuiconurl}`,
      })
      .setFooter({
        text: `${interaction.guild.name}`,
        iconURL: `${sunucuiconurl}`,
      })
      .setDescription("" + bedrp + "" + bedrp2 + "");
    interaction.reply({ embeds: [bedrpembed], ephemeral: false });
    console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
  },
};
