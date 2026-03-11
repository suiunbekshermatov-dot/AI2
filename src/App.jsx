import { Navigate, Route, Routes } from 'react-router-dom';
import TopNav from './components/TopNav';
import HomePage from './pages/HomePage';
import SurveyPage from './pages/SurveyPage';
import TeachersPage from './pages/TeachersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import ContactsPage from './pages/ContactsPage';
import TelegramPage from './pages/TelegramPage';

function App() {
  return (
    <div className="app-shell">
      <TopNav />
      <main className="content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/assistant" element={<AIAssistantPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/telegram" element={<TelegramPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
