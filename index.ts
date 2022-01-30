import DiscordJS, { Intents, Interaction, ReactionUserManager } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    // Intents are way to tell discord what your bot intents to use and what 
    // infomation it needs
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

// actually listen for whenever the client starts up or whenever you bot goes online
// basic event handling in node js
client.on('ready', () => {
    console.log('The bot is ready')

    // Guild-based slash command: used when developing slash commands
    // Global slash command: registered to every server your bot is in
    // Therefore use guild first
     const guildId = '937104761805762572'
     const guild = client.guilds.cache.get(guildId)
     // commands going to hold application command manager for either guild or entier application
     let commands

     if(guild){
         commands = guild.commands
     }
     else{
         commands = client.application?.commands
     }

     // have to actually listen (which will be added) when this command is ran
     commands?.create({
         name: 'ping',
         description: 'Replies with pong.',
     })
})

// listening for whenever /ping is ran
client.on('interactionCreate' , async (interaction) => {
    if(!interaction.isCommand()){
        return
    }

    const { commandName, options } = interaction

    if(commandName == 'ping'){
        interaction.reply({
            content: 'pong',
            // ephemeral is basically going to be if only the user that ran the command can see the command. For now commented out
            // ephemeral: true
        })
    }
})

// client.on('messageCreate', function(message){
//     if(message.content === 'ping'){
//         message.reply({
//             content: 'pong',
//         })
//     }
// })

client.login(process.env.TOKEN)