const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const config = require("../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dmduyuru")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Yetkililere DM Duyuru Mami Gönderir!"),
  run: async (client, interaction) => {
    let yetkiliekibi = config.yetkiliekibi
    let renk = config.renk
    let sunucuiconurl = config.sunucuiconurl

    const yetkinyok = new EmbedBuilder()
      .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${yetkiliekibi}> Rolün Yok!**`)
      .setColor(renk);

    if (!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });



    try {
      interaction.guild.members.cache.filter(member => member.roles.cache.has(yetkiliekibi)).forEach(member => {
        const bedrpembed = new EmbedBuilder()
          .setColor(renk)
          .setTimestamp()
          .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` })
          .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` })
          .setThumbnail(`${member.displayAvatarURL()}`)
          .setDescription(`> **Bütün Yetkili arkadaşalar Ses kanalında Toplanabilirmiyiz Lütfen Toplantı Yapılacaktır <#1172266218498031637>**`)

        member.send({ embeds: [bedrpembed], content: `**Merhaba! ${member}**` });

      });
    } catch (error) {

    }
    interaction.reply({ content: `> **Başarıyla Herkese DM Gönderdim.**`, ephemeral: true });
    console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
  }

}