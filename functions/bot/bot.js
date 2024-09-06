const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Welcome to your Telegram bot! Use /help to see available commands.');
});

bot.help((ctx) => {
    ctx.reply('Available commands:\n/newarticle - Create a new article');
});

bot.command('newarticle', (ctx) => {
    ctx.reply('Please enter the title of your article:');
    bot.on('text', async (ctx) => {
        const title = ctx.message.text;
        ctx.reply('Please enter the content of your article:');
        bot.on('text', async (ctx) => {
            const content = ctx.message.text;

            // Call a function to create the article using the title and content
            createArticle(ctx, title, content);
        });
    });
});

async function createArticle(ctx, title, content) {
    // Here you would make a request to the Telegraph API to create the article
    // For now, let's just log the title and content
    console.log('Title:', title);
    console.log('Content:', content);

    ctx.reply('Article created successfully!');
}

bot.launch();