const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.BOT_TOKEN)

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

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async event => {
    try {
        await bot.handleUpdate(JSON.parse(event.body))
        return { statusCode: 200, body: "" }
    } catch (e) {
        console.error("error in handler:", e)
        return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
    }
}