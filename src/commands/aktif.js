const {
  EmbedBuilder,
  PermissionsBitField,
  PermissionFlagsBits,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require("discord.js");
const Discord = require("discord.js");
const config = require("../config.js");
const { MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("aktif")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
    .setDescription("Fivem Bakım Mesajı Gönderir!"),

  run: async (client, interaction) => {
    let sunucuiconurl = config.sunucuiconurl;
    let sunucubanner = config.sunucubanner;
    let banhammer = config.banhammer;
    let renk = config.renk;
    let emoji = config.emoji;
    let fivemlink = config.fivemlink;
    let ts3link = config.ts3link;
    let sunucuip = config.sunucuip;
    let ts3ip = config.ts3ip;

    const yetkinyok = new EmbedBuilder()
      .setDescription(
        `**${interaction.member} Bu Komutu Kullanmak için <@&${banhammer}> Rolün Yok!**`
      )
      .setColor(renk);

    if (
      !interaction.member.roles.cache.get(banhammer) &&
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor(renk)
      .setAuthor({
        name: `${interaction.guild.name}`,
        iconURL: `${sunucuiconurl}`,
      })
      .setTitle("> Sunucuda  İyi Roller Dileriz.")
      .setDescription(
        "`Ufak Sorunlar İçin Ticket Açabilirsiniz.` \n \n * **Voice-Chat** : <#1177735668462522418>\n \n * Sunucu İp : `F8: connect 213.238.177.214`  \n *     Voice-Chat : `Voice Chat Kurulum`"
      )
      .setImage(
        `https://media.discordapp.net/attachments/1129876315911233646/1183491614669275197/77d2cc173415379.64903b83be614.gif?ex=65888775&is=65761275&hm=0cf2e044f91202e2362f8caf85447a7996e3515490bbdc2be0b82a315f63acdf&=&width=400&height=224`
      )
      .setFooter({
        text: `${interaction.guild.name}`,
        iconURL: `${sunucuiconurl}`,
      })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Sunucuya Bağlan")
        .setURL(fivemlink)
        .setEmoji(emoji)
        .setStyle(ButtonStyle.Link)
    );

    const embed3 = new EmbedBuilder()
      .setColor(renk)
      .setDescription("> **Başarıyla Aktif Mesajını Gönderdim!**")
      .setFooter({
        text: `${interaction.guild.name}`,
        iconURL: `${sunucuiconurl}`,
      })
      .setTimestamp();

    interaction.reply({ embeds: [embed3], ephemeral: true });
    interaction.channel.send({
      content: "**||@everyone|| & ||@here||**",
      embeds: [embed],
      components: [row],
    });
    console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
  },
};
