require('dotenv').config();
const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    console.error('Ошибка: Token не найден!');
    process.exit(1);
}

// Создаем бота без всяких прокси
const bot = new Telegraf(BOT_TOKEN);

// Приветствие
bot.start((ctx) => {
    ctx.reply(
        '🎾 Добро пожаловать в Tennis Support Chat!\n\n' +
        'Напишите свой вопрос, и наша команда поддержки вам ответит.'
    );
});

// Приём сообщений
bot.on('text', (ctx) => {
    ctx.reply(
        '📩 Ваше сообщение получено!\n' +
        'Скоро 👨‍💻 вам свяжется оператор.'
    );
});

// Запуск
bot.launch();
console.log('🎾 Tennis Support Chat запущен!');