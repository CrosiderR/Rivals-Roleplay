const { SlashCommandBuilder, messageLink, PermissionFlagsBits, GuildMember } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolal")
    .setDMPermission(false)
    .setDescription("Kişiden Seçtiğiniz Rolü Alır.")
    .addUserOption((option) =>
      option
        .setName("üye")
        .setDescription("Rolü Alıcağınız Kişiyi Seçiniz.")
        .setRequired(true)
    )
    .addRoleOption(option =>
      option
        .setName("rol")
        .setDescription("Almak İstediğiniz Rolü Seçiniz.")
        .setRequired(true)
    ),
  run: async (client, interaction) => {

    let sunucubanner = config.sunucubanner
    let yetkiliekibi = config.yetkiliekibi
    let renk = config.renk
    let rollog = config.rollogu


    const user = interaction.options.getUser("üye");
    const rol = interaction.options.getRole("rol")
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply(`**Bir Yöneticiden Rol Alamazsın, Rol Alınmaya Çalışılan Kişi: ${member}**`)


    const rolvar = new EmbedBuilder()
      .setDescription(`**${user} Kişisinde Zaten ${rol} Rolü Yok!**`)
      .setColor(renk);
    if (!member.roles.cache.has(rol.id)) return interaction.reply({ embeds: [rolvar], ephemeral: true })

    const errEmbed = new EmbedBuilder()
      .setDescription(`**${user} Senden Daha Yüksek Bir Role Sahip veya Benim Bu Rolü Vermeye Yetkim Yetmiyor.**`)
      .setColor(renk);

    const bot = interaction.guild.members.cache.get(client.user.id);
    const botrole = bot.roles.highest;

    if (botrole <= member.roles.highest)
      return interaction.reply({ embeds: [errEmbed], ephemeral: true });

    const yetkinyok = new EmbedBuilder()
      .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${yetkiliekibi}> Rolün Yok!**`)
      .setColor(renk);
    if (!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

    member.roles.remove(rol.id)

    const verdim2 = new EmbedBuilder()
      .setDescription(`**Başarıyla ${user} Kişisinden ${rol} Rolünü Aldım!**`)
      .setColor(renk);

    await interaction.reply({
      embeds: [verdim2]
    });

    const banla = new EmbedBuilder()
      .setColor(renk)
      .setThumbnail(user.avatarURL({ dynamic: true, size: 256 }))
      .setDescription(`**Kişiden Rolü Alan:** ${interaction.member} Yetkilimiz,\n\n **Rolü Alınan Kişi:** ${user} __${rol}__ Alındı!`)
      .setTimestamp()

    await client.channels.cache.get(rollog).send(
      { embeds: [banla] }
    )
    console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
  },
};