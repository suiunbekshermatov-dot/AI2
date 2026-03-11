import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables.');
}

const bot = new TelegramBot(token, { polling: true });
const baseUrl = process.env.COLLEGE_PORTAL_URL || 'https://<your-github-username>.github.io/teachers/';

// /start command: welcome and main navigation hints
bot.onText(/^\/start$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Welcome to College Digital System Bot!\n\nUse /help to see all available commands.`
  );
});

// /survey command: direct link to survey form
bot.onText(/^\/survey$/, (msg) => {
  bot.sendMessage(msg.chat.id, `Submit anonymous teacher feedback here: ${baseUrl}survey`);
});

// /ratings command: direct link to analytics dashboard
bot.onText(/^\/ratings$/, (msg) => {
  bot.sendMessage(msg.chat.id, `Open teacher ratings and analytics here: ${baseUrl}analytics`);
});

// /help command: list bot commands
bot.onText(/^\/help$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    ['/start - Welcome message', '/survey - Open survey form', '/ratings - Open analytics dashboard', '/assistant - AI assistant info', '/help - Show this list'].join('\n')
  );
});

// /assistant command: explain AI assistant availability
bot.onText(/^\/assistant$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `AI Assistant is available on the website: ${baseUrl}assistant\nAsk about system usage, ratings, and college contacts.`
  );
});

console.log('Telegram bot is running...');
