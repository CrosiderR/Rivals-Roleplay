const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js")
const config = require("../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ip")
    .setDMPermission(false)
    .setDescription("Sunucu İp Bilgilerini Gösterir."),

  run: async (client, interaction) => {
    let sunucuiconurl = config.sunucuiconurl
    let sunucubanner = config.sunucubanner
    let renk = config.renk
    let emoji = config.emoji
    let fivemlink = config.fivemlink
    let ts3link = config.ts3link
    let sunucuip = config.sunucuip
    let ts3ip = config.ts3ip

    const embed = new EmbedBuilder()
      .setColor(renk)
      .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` })
      .setTitle(`> ${interaction.guild.name} Server IP Bilgi:`)
      .setDescription(`\`\`\`Server IP : ${sunucuip}\n VOICE-CHAT: ${ts3ip}\`\`\``)
      .setImage(`${sunucubanner}`)
      .setTimestamp()
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Sunucuya Bağlan')
          .setURL(fivemlink)
          .setEmoji(emoji)
          .setStyle(ButtonStyle.Link)
          .setDisabled(false),

      );
    interaction.reply({
      embeds: [embed], components: [row], ephemeral: true
    });
    console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
  }
};
