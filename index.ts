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
     commands?.create(
         {
         name: 'add',
         description: 'Adds two numbers',
         options: [{
             name: 'num1',
             description: 'The first number.',
             required: true,
             type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
         },
        {
            name: 'num2',
            description: 'The second number.',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }
        ]
     })

     commands?.create({
        name: 'multiply',
        description: 'multiply two numbers',
        options: [{
            name: 'num1',
            description: 'The first number.',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
       {
           name: 'num2',
           description: 'The second number.',
           required: true,
           type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
       }
       ]
     })
})


// listening for whenever /ping is ran or when any command is ran
client.on('interactionCreate' , async (interaction) => {
    if(!interaction.isCommand()){
        return
    }

    // using options or arguments within slash commands
    const { commandName, options } = interaction

    if(commandName == 'ping'){
        interaction.reply({
            content: 'pong',
        })
    }

    // listen for /add command
    else if (commandName === 'add'){
        const num1 = options.getNumber('num1')!   // num1 here is from above  commands?.create 
        const num2 = options.getNumber('num2')!   // ! at the end in typescript here means we know these are not gonna be null because mentioned as required above
        
        // giving bot time to think basically?
        await interaction.deferReply({
            ephemeral: true
        })       
        await new Promise(resolve => setTimeout(resolve,5000))    //5000 is 5 seconds

        await interaction.editReply({
            content: `The sum is ${num1 + num2}`,
        })
    }
})



client.on('messageCreate', function(message){
    if(message.content === 'ping'){
        message.reply({
            content: 'pong',
        })
    }
})

client.login(process.env.TOKEN);