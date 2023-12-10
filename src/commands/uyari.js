const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");
const config = require("../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uyarı")
    .setDMPermission(false)
    .setDescription("Kişiyi Uyarır.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
    .addUserOption((option) =>
      option
        .setName("üye")
        .setDescription("Uyarmak İstediğiniz Üye")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("seviye")
        .setDescription("Uyarı Seviyesi (1-5 arası)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("sebep")
        .setDescription("Uyarı Sebebini Yazınız.")
        .setRequired(true)
    ),

  run: async (client, interaction) => {
    let renk = config.renk;
    let uyarılogu = config.uyarılogu;
    let uyarıhammer = config.uyarıhammer; // Eklenen satır

    const { options } = interaction;

    const user = options.getUser("üye");
    const level = options.getInteger("seviye");
    const reason = options.getString("sebep") || "Sebep Belirtilmedi!";

    try {
      const member = await interaction.guild.members.fetch(user.id);

      const errEmbed = new EmbedBuilder()
        .setDescription(
          `> **${user} Senden Daha Yüksek Bir Role Sahip veya Benim Yetkim Yetmiyor.**`
        )
        .setColor(renk);

      const yetkinyok = new EmbedBuilder()
        .setDescription(
          `> **${interaction.member} Bu Komutu Kullanmak için <@&${uyarıhammer}> Rolün Yok!**`
        )
        .setColor(renk);

      if (
        !interaction.member.roles.cache.get(uyarıhammer) &&
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      )
        return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

      const botRole = interaction.guild.members.cache.get(
        interaction.client.user.id
      ).roles.highest;

      if (member.roles.highest.comparePositionTo(botRole) >= 0) {
        const embed88 = new EmbedBuilder()
          .setDescription(
            `> **${user} Adlı Kişiyi Uyarmaya Benim Yetkim Yetmiyor!**`
          )
          .setColor(`ffffff`)
          .setAuthor({
            name: `${interaction.guild.name}`,
            iconURL: `${interaction.guild.iconURL()}`,
          });

        return await interaction.reply({ embeds: [embed88], ephemeral: true });
      }

      if (
        member.roles.highest.position >=
        interaction.member.roles.highest.position
      )
        return interaction.reply({ embeds: [errEmbed], ephemeral: true });

      // Uyarı verme işlemi burada gerçekleşecek
      const uyarıRolIDler = [
        "1177735057167884419",
        "1177735055494352948",
        "1177735053896319117",
        "1177735052327649443",
        "1177735051753046066",
      ];

      const uyarıRolID = uyarıRolIDler[level - 1];

      if (!uyarıRolID) {
        return interaction.reply(
          `Belirttiğiniz uyarı seviyesine karşılık gelen bir rol bulunamadı.`
        );
      }

      const uyarıRol = interaction.guild.roles.cache.get(uyarıRolID);

      if (!uyarıRol) {
        return interaction.reply(
          `Belirttiğiniz uyarı seviyesine karşılık gelen bir rol bulunamadı.`
        );
      }

      await member.roles.add(uyarıRol);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.guild.name}`,
          iconURL: `${interaction.guild.iconURL()}`,
        })
        .setDescription(
          `**Üye Uyarı Aldı!** ${user} \n\n **Uyaran Kişi:** ${interaction.member} \n\n**Uyarı Seviyesi:** ${level}\n\n**Uyarı Sebebi:** ${reason}`
        )
        .setThumbnail(`${user.displayAvatarURL()}`)
        .setColor(renk)
        .setTimestamp()
        .setFooter({
          text: `${interaction.guild.name}`,
          iconURL: `${interaction.guild.iconURL()}`,
        });

      await interaction.reply({
        embeds: [embed],
      });

      const uyarıla = new EmbedBuilder()
        .setColor(renk)
        .setThumbnail(user.avatarURL({ dynamic: true, size: 256 }))
        .setDescription(
          `:shield: ・ **ʏᴇᴛᴋɪʟɪ:** ${interaction.member}\n\n:mag_right: ・ **ᴏʏᴜɴᴄᴜ:** ${user}\n\n:gear: ・ **ᴜʏᴀʀı:** ${level}\n\n:no_entry: ・ **ꜱᴇʙᴇᴘ:** ${reason}`
        )
        .setTimestamp();

      await client.channels.cache.get(uyarılogu).send({ embeds: [uyarıla] });
    } catch (err) {
      const errEmbed2 = new EmbedBuilder()
        .setDescription(`**Kişi Galiba Sunucuda Yok veya Bir Sorun Oluştu!**`)
        .setColor(renk);

      interaction.reply({ embeds: [errEmbed2], ephemeral: true });
      console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
    }
  },
};
