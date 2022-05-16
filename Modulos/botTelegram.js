const {Telegraf} = require("telegraf")
const bot = new Telegraf("5266318938:AAFjBL-k0iElUymJmahMXifyZ1F0tC-3HOA"); 

//mensaje que se mostrara al inicializar el bot
bot.start((ctx) =>{
    /* nuestra el mensaje mas El nombre del Perfil de Telegram */
    ctx.reply(`Bienvenido a mi primer BOT de Telegram ${ctx.from.first_name}`);
})

//comando personalizado del bot
bot.command('saludar',(ctx) =>{
    ctx.reply("Comando personalizado");
} )

bot.on('sticker',(ctx) =>{
    ctx.reply("Has enviado un sticker: 😎😎 ");
} )


//iniciar el bot
bot.launch();