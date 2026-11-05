const { Telegraf } = require('telegraf');
const createTelegrafMiddleware = require('cfworker-middleware-telegraf');

export default {
  async fetch(request, env, ctx) {
    // Создаем бота с токеном из переменных окружения
    const bot = new Telegraf(env.BOT_TOKEN);

    // Твои команды
    bot.start((ctx) => {
      ctx.reply('🎾 Добро пожаловать в Tennis Support Chat!\n\nНапишите свой вопрос, и наша команда поддержки вам ответит.');
    });

    bot.on('text', (ctx) => {
      ctx.reply('📩 Ваше сообщение получено!\nСкоро 👨‍💻 вам свяжется оператор.');
    });

    // Обработка вебхука
    const webhook = createTelegrafMiddleware(bot);
    return webhook(request, env, ctx);
  }
};
