const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField, args, slice } = require("discord.js");
const { QuickDB } = require("quick.db");
const { banhammer } = require("../config.js");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kilitle")
        .setDMPermission(false)
        .setDescription("Kanalı Kilitler.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),





        run: async (client, interaction, args, message) => {

          let sunucuiconurl = config.sunucuiconurl
          let banhammer = config.banhammer
          let whitelistedrol = config.whitelistpermi
          let renk = config.renk
          
          
          const yetkinyok = new EmbedBuilder()
          .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${banhammer}> Rolün Yok!**`)
          .setColor(renk);
  
          if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });


            if (!interaction.channel.permissionsFor(whitelistedrol).has("SendMessages") && interaction.channel.permissionsFor(client.user.id).has("SendMessages")) {



     
                const ticket2 = new EmbedBuilder()
                .setColor(renk)
                .setTitle(`#${interaction.channel} Kanalı Zaten Kilitli Durumda!`)
                .setDescription(`Kilidi Kaldırmak İçin => \`/kilitaç\` Komudu Kullan!`)
                .setTimestamp()
                .setFooter({text: `${interaction.guild.name}`,iconURL: `${sunucuiconurl}`})
          

                interaction.reply({embeds: [ticket2]})

        
              }
        
              interaction.channel.permissionOverwrites.edit(whitelistedrol, {
                SendMessages: false,
              });
        
              interaction.channel.permissionOverwrites.edit(client.user.id, {
                SendMessages: true,
              });
        
              const ticket = new EmbedBuilder()
              .setColor(renk)
              .setTitle(`${interaction.channel} Kanalı Başaryıla Kilitlendi!`)
              .setDescription(`Kilidi Kaldırmak İçin => \`/kilitaç\` Komudu Kullan!`)
              .setTimestamp()
              .setFooter({text: `${interaction.guild.name}`,iconURL: `${sunucuiconurl}`})
        

              interaction.reply({embeds: [ticket]})
              console.log(`🧮 [C-Dev-Komut] Başarı İle Yüklendi!`); 
        }
         
    }
