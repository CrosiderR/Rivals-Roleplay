const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const config = require("../config.js");
const ban = require("./ban.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("banaç")
        .setDMPermission(false)
        .setDescription("ID'sini Yazdığınız Kişinin Banını Kaldırır.")
        .addStringOption(option =>
            option.setName("üyeid")
                .setDescription("Yazdığınız ID'ye Sahip Kişinin Banını Kaldırır.")
                .setRequired(true)
        ),

        run: async (client, interaction) => {
        const { channel, options } = interaction;
        let sunucuiconurl = config.sunucuiconurl
        let sunucubanner = config.sunucubanner
        let banhammer = config.banhammer
        let renk = config.renk
        let unbanlog = config.unbanlog

        const userId = options.getString("üyeid");

        const yetkinyok = new EmbedBuilder()
        .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${banhammer}> Rolün Yok!**`)
        .setColor(renk);

        if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
            .setDescription(`**Başarıyla <@${userId}> Kullanıcısının Banını Kaldırdım!**`)
                .setColor(renk)
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
            })
            const unban = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`**Kişinin Banını Kaldıran:**\n ${interaction.member} Yetkilimiz,\n\n **Banı Kaldırılan Kişi:** <@${userId}> Sunucudan Banı Kaldırıldı! \n\n **Kişinin ID'si:** ${userId}`)
            .setImage(`${sunucubanner}`)
            .setTimestamp()
   
            await client.channels.cache.get(unbanlog).send(
               { embeds: [unban] }
               ) ;
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`**Bana Lütfen Geçerli Bir Discord ID Gir.**`)
                .setColor(renk);

            interaction.reply({ embeds: [errEmbed], ephemeral: true })
            console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
            

        }
    }
}