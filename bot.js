require('dotenv').config();
const { Telegraf } = require('telegraf');
const { HttpsProxyAgent } = require('https-proxy-agent'); // Используем HTTP-агент

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    console.error('Ошибка: Token не найден!');
    process.exit(1);
}

// Пробуем подключиться через HTTP
const proxyUrl = 'http://127.0.0.1:1080'; 
const agent = new HttpsProxyAgent(proxyUrl);

const bot = new Telegraf(BOT_TOKEN, {
    telegram: { agent: agent }
});

// ПРОВЕРКА СВЯЗИ (выведет ошибку, если прокси не работает)
bot.telegram.getMe().then((botInfo) => {
    console.log('✅ ПРОКСИ РАБОТАЕТ! Бот подключен:', botInfo.username);
    
    // Если связь есть, запускаем бота
    bot.start((ctx) => {
        ctx.reply('🎾 Добро пожаловать в Tennis Support Chat!\n\n' +
                  'Напишите свой вопрос, и наша команда поддержки вам ответит.');
    });

    bot.on('text', (ctx) => {
        ctx.reply('📩 Ваше сообщение получено!\nСкоро 👨‍💻 вам свяжется оператор.');
    });

    bot.launch();
    console.log('🎾 Tennis Support Chat запущен!');
}).catch((err) => {
    console.error('❌ ОШИБКА СВЯЗИ С TELEGRAM:', err.message);
    console.log('Проверь: 1. Включен ли ByeByeDPI? 2. Правильный ли порт указан в коде?');