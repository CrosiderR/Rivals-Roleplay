const { SlashCommandBuilder, messageLink, PermissionFlagsBits, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { rename } = require('fs');
const config = require("../config.js");
const Kayit = require('../models/kayit');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {

  data: new SlashCommandBuilder()
    .setName("wl-ver")
    .setDMPermission(false)
    .setDescription("Kişiyi Sunucuya Kaydeder.")
    .addUserOption((option) =>
      option
        .setName("üye")
        .setDescription("Sunucuya Kaydetmek İstediğiniz Üye")
        .setRequired(true)

    ),
  run: async (client, interaction) => {

    let sunucuiconurl = config.sunucuiconurl
    let yetkiliekibi = config.yetkiliekibi
    let whitelistedrol = config.whitelistpermi
    let kayıtsızrol = config.kayıtsızüyepermi
    let kaydetlogu = config.kayıtlogu
    let renk = config.renk

    const user = interaction.options.getUser("üye");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply(`> **Bir Yöneticiyi Kaydedemem > ${user}**`)



    const yetkinyok = new EmbedBuilder()
      .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${yetkiliekibi}> Rolün Yok!**`)
      .setColor(renk);

    if (!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.roles.cache.get(`1171174226015825982`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

    const botRole = interaction.guild.members.cache.get(interaction.client.user.id).roles.highest;

    if (member.roles.highest.comparePositionTo(botRole) > 0) {

      const embed4 = new EmbedBuilder()
        .setDescription(`> **${user} Adlı Kişiyi Kaydetmeye Yetkim Yetmiyor!**`)
        .setColor(`ffffff`)
        .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` })

      return await interaction.reply({ embeds: [embed4], ephemeral: true })
    }


    let userID = interaction.member.id
    const puan = 1;

    let kayit = await Kayit.findOne({ userID });

    if (!kayit) {
      kayit = new Kayit({ userID, kayits: puan });
    } else {
      kayit.kayits += puan;
    }

    await kayit.save();


    const KAYITLI = new EmbedBuilder()


      .setColor(renk)
      .setThumbnail(user.avatarURL({ dynamic: true, size: 256 }))
      .setDescription(`**Kişiyi Sunucuya Kaydeden:** ${interaction.member} Yetkilimiz,\n\n **Sunucuya Kaydedilen Kişi: ${user}** \n\n **__Baktığı Kayıt Sayısı:__** __${kayit.kayits}__`)
      .setThumbnail(`${user.displayAvatarURL()}`)
      .setTimestamp()
      .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}` })

    await member.setNickname("IC ISIM")
    await member.roles.add(whitelistedrol)
    await member.roles.remove(kayıtsızrol)




    interaction.reply(
      { embeds: [KAYITLI], ephemeral: true }
    )
    await client.channels.cache.get(kaydetlogu).send(
      { embeds: [KAYITLI] }
    )
    console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
  }









}