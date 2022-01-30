import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    // Intents are way to tell discord what your bot intents to use and what 
    // infomation it needs
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

// actually listen for whenever the client starts up or whenever you bot goes online
// basic event handling in node js
client.on('ready', () => {
    console.log('The bot is ready');
})

client.on('messageCreate', function(message){
    if(message.content === 'ping'){
        message.reply({
            content: 'pong',
        })
    }
})

client.login(process.env.TOKEN);