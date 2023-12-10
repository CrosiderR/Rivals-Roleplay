const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, args, slice } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("yaz")
        .setDMPermission(false)
        .setDescription("Yazdığınız Mesajı Bot Yazar!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("metin")
                .setDescription("Yazılması İstenen Mesajı Yazınız.")
                .setRequired(true)
        ).addStringOption(option =>
            option
            .setName("resimlink")
            .setDescription("Resim linki")
            .setRequired(true)
            
    
        ),





        run: async (client, interaction, args, message) => {
            let sunucuiconurl = config.sunucuiconurl
            let renk = config.renk


            let metin = interaction.options.getString("metin");
            let resim = interaction.options.getString("resimlink");
            if (metin.length < 1) return interaction.reply({ content: "Mesaj Bu Kadar Kısa Olamaz!", ephemeral: true });
            const gonderildi = new EmbedBuilder()
                .setDescription(`**Başarıyla Mesajını Yazdım!**`)
                .setColor(renk);


            const anamesaj = new EmbedBuilder()
            .setDescription(`${metin}`)
            .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
            .setColor(renk)
            .setImage(`${resim}`);

                interaction.reply({ embeds: [gonderildi], ephemeral: true });
                interaction.channel.send({embeds: [anamesaj]});

            
            
                console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`);
    }
}