function TelegramPage() {
  return (
    <section className="page-card">
      <h2>Telegram Bot</h2>
      <p>
        Telegram bot helps students quickly open survey, analytics and AI assistant modules from chat.
      </p>
      <ul className="command-list">
        <li>/start — welcome message</li>
        <li>/survey — link to survey form</li>
        <li>/ratings — link to analytics page</li>
        <li>/help — list of available commands</li>
        <li>/assistant — info about AI assistant</li>
      </ul>
      <p>
        Bot source code is available in <code>bot/telegramBot.js</code>. Configure token in
        environment variables before launch.
      </p>
    </section>
  );
}

export default TelegramPage;
