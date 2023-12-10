const { SlashCommandBuilder, MessageEmbed, EmbedBuilder, PermissionsBitField } = require('discord.js');
const moment = require('moment');
require('moment/locale/tr'); // Türkçe dil desteği
const config = require("../config.js");

const VoiceStatModel = require('../models/VoiceStatModel.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sestop')
    .setDMPermission(false)
    .setDescription('En yüksek ses verilerine göre sıralama yapar.'),
  run: async (client, interaction) => {
    let yetkiliekibi = config.yetkiliekibi
    let renk = config.renk
    let sunucuiconurl = config.sunucuiconurl
    let sunucubanner = config.sunucubanner

    const yetkinyok = new EmbedBuilder()
    .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${yetkiliekibi}> Rolün Yok!**`)
    .setColor(renk);

    if(!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });


    const voiceStats = await VoiceStatModel.find({})
      .sort({ duration: -1 })
      .limit(10);

    const embed = new EmbedBuilder()
      .setColor(renk)
      .setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
      .setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
      .setImage(`${sunucubanner}`)
      .setTitle('En Yüksek Ses Verileri');
      
      moment.locale('tr'); // Türkçe dilini kullan

    voiceStats.forEach((stat, index) => {
      const user = interaction.guild.members.cache.get(stat.userId);
      if (user) {
        const durationHours = Math.floor(stat.duration / 3600);
        const durationMinutes = Math.floor((stat.duration % 3600) / 60);
        const durationSeconds = stat.duration % 60;
        const durationText = `__${durationHours}__ Saat __${durationMinutes}__ Dakika __${durationSeconds}__ Saniye`;        
        embed.addFields(
            { name: `${index + 1}. ${user.user.tag}`, value: `> **Ses Süresi:** ${durationText}` },
        );
      }
    });
    console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
    interaction.reply({ embeds: [embed] });
  },
};
