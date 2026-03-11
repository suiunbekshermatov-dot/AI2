import SectionCard from '../components/SectionCard';

const sections = [
  {
    title: 'Опрос преподавателей',
    description: 'Анонимная оценка качества преподавания и учебного процесса.',
    to: '/survey'
  },
  {
    title: 'Преподаватели',
    description: 'Список преподавателей и краткий обзор их рейтингов.',
    to: '/teachers'
  },
  {
    title: 'Аналитика',
    description: 'Графики и рейтинг преподавателей на основе ответов студентов.',
    to: '/analytics'
  },
  {
    title: 'AI-ассистент',
    description: 'Чат-помощник для навигации по порталу и колледжу.',
    to: '/assistant'
  },
  {
    title: 'Контакты',
    description: 'Контактная информация администрации и сервисных отделов.',
    to: '/contacts'
  },
  {
    title: 'Telegram-бот',
    description: 'Быстрый доступ к разделам портала через Telegram.',
    to: '/telegram'
  }
];

function HomePage() {
  return (
    <section>
      <div className="hero">
        <h1>College Digital System</h1>
        <p>
          Единый современный цифровой портал колледжа: опросы, аналитика, AI-помощник и сервисы
          для студентов.
        </p>
      </div>
      <div className="section-grid">
        {sections.map((section) => (
          <SectionCard key={section.title} {...section} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
