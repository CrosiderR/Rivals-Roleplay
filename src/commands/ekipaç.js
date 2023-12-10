const {
  SlashCommandBuilder,
  messageLink,
  ChannelType,
  PermissionFlagsBits,
  GuildMember,
} = require("discord.js");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ekipaç")
    .setDMPermission(false)
    .setDescription("Bir Ekip Permi Açmanızı Sağlar.")
    .addStringOption((option) =>
      option
        .setName("ekipismi")
        .setDescription("Ekip Adı Ne Olucak Lütfen Onu Girin!")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("renk")
        .setDescription("Rolün rengini belirtin")
        .setRequired(true)
        .addChoices(
          { name: "Kırmızı", value: "Kırmızı" },
          { name: "Beyaz", value: "Beyaz" },
          { name: "Mavi", value: "Mavi" },
          { name: "Gri", value: "Gri" },
          { name: "Mor", value: "Mor" },
          { name: "Sarı", value: "Sarı" }
        )
    ),

  run: async (client, interaction) => {
    let sunucubanner = config.sunucubanner;
    let sunucuiconurl = config.sunucuiconurl;
    let kayıtlogu = config.kayıtlogu;
    let yetkiliekibi = config.yetkiliekibi;
    let banhammer = config.banhammer;
    let renk = config.renk;
    let rollog = config.rollogu;
    const guild = interaction.guild;

    let Ekipİsmi = interaction.options.getString("ekipismi");
    const roleColor = interaction.options.getString("renk");

    let colorValue;
    switch (roleColor) {
      case "Kırmızı":
        colorValue = "FF0000";
        break;
      case "Beyaz":
        colorValue = "FFFFFF";
        break;
      case "Mavi":
        colorValue = "0000FF";
        break;
      case "Gri":
        colorValue = "808080";
        break;
      case "Sarı":
        colorValue = "ffc300";
        break;
      case "Mor":
        colorValue = "800080";
        break;
      default:
        colorValue = "FFFFFF";
    }

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

    try {
      interaction.reply({
        content: `**Ekip Oluşturma Talebin Başarıyla Oluşturuldu!**`,
        ephemeral: true,
      });

      const role = await guild.roles.create({
        name: Ekipİsmi,
        color: colorValue,
      });
      await role.setPermissions([]);
      await role.setHoist(true);
      await role.setMentionable(true);
      const ekiplogu = "1183493154058539008";
      if (!ekiplogu) return console.log(`Ekip Logu Bulunamadı!`);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.guild.name}`,
          iconURL: `${sunucuiconurl}`,
        })
        .setFooter({
          text: `${interaction.guild.name}`,
          iconURL: `${sunucuiconurl}`,
        })
        .setColor(renk)
        .setDescription(
          `> \`${role.name}\` **İsimli Rol Başarıyla Oluşturuldu. Ve Aile Oluşum Sırasına Taşındı.**\n\n> **Oluşturan Kişi: ${interaction.member} / ${interaction.member.id}**\n\n> **Ayarlanan Renk: ${role} / ${roleColor}**`
        )
        .setTimestamp();

      await client.channels.cache
        .get(ekiplogu)
        .send({ embeds: [embed], content: `@everyone` });
      await interaction.guild.channels
        .create({
          type: ChannelType.GuildText,
          name: `${role.name}`,
          topic: `${interaction.user.id}`,
          parent: `1174012947685707788`,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.AttachFiles,
                PermissionsBitField.Flags.SendMessages,
              ],
            },
            {
              id: yetkiliekibi,
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.AttachFiles,
                PermissionsBitField.Flags.SendMessages,
              ],
            },
            {
              id: role,
              allow: [
                PermissionsBitField.Flags.ViewChannel,
                PermissionsBitField.Flags.SendMessages,
              ],
            },
          ],
        })
        .then((c) => {
          const plainte = new EmbedBuilder()
            .setTitle(`Bir Ekip İçin Ticket Oluşturuldu!`)
            .setDescription(
              `${interaction.member} / **Tarafından Oluşturuldu! Lütfen Bekleme Kalın!**`
            )
            .setFooter({
              text: `${interaction.guild.name}`,
              iconURL: `${sunucuiconurl}`,
            });
          c.send({
            embeds: [plainte],
            content: `${role} **/** <@&${yetkiliekibi}>`,
          });
        });
    } catch (error) {
      console.log(error);
      return;
    }
    console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
  },
};
