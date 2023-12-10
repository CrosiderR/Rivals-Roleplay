const { EmbedBuilder, InteractionType, ChannelType, ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name: 'interactionCreate',
  execute: async (interaction) => {
    let client = interaction.client;
    if (interaction.type == InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return;

      if (!interaction) return interaction.reply(`**Crosider'a Söyle Bir Sorun Oluştu!**`)

      if (interaction.channel.type === 1) {

        return interaction.reply({
          embeds: [new Discord.EmbedBuilder()
            .setAuthor({ name: `Rivals Roleplay`, iconURL: `https://media.discordapp.net/attachments/1129876315911233646/1183486785284751361/51b366173415379.64903a1f23805.png?ex=658882f5&is=65760df5&hm=c60ff95509a7f3b9faefb2a5292d336b3b6fb88ccdbb4e8ede0390aa86306c52&=&format=webp&quality=lossless&width=525&height=525` })
            .setColor("#0090ff")
            .setDescription(`> **Slash Komutlarımı DM Üzerinden Kullanamazsın :)**`)
            .setTimestamp()
            .setFooter({ text: `Rivals Roleplay`, iconURL: `https://media.discordapp.net/attachments/1129876315911233646/1183486785284751361/51b366173415379.64903a1f23805.png?ex=658882f5&is=65760df5&hm=c60ff95509a7f3b9faefb2a5292d336b3b6fb88ccdbb4e8ede0390aa86306c52&=&format=webp&quality=lossless&width=525&height=525` })

          ],
          ephemeral: true
        })
      }


      readdirSync('./src/commands').forEach(file => {
        const command = require(`../../src/commands/${file}`);
        if (interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
          command.run(client, interaction)
        }
      })
    }
  }
}
