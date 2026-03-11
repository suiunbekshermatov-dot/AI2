import { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import StatCard from '../components/StatCard';
import { calculateAnalytics } from '../utils/analytics';
import { getEvaluations, getUniqueValues } from '../utils/storage';

const pieColors = ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

function AnalyticsPage() {
  const allEvaluations = useMemo(() => getEvaluations(), []);
  const [filters, setFilters] = useState({ teacher: '', subject: '', course: '', semester: '' });

  const filtered = allEvaluations.filter((item) => {
    return (
      (!filters.teacher || item.teacher === filters.teacher) &&
      (!filters.subject || item.subject === filters.subject) &&
      (!filters.course || item.course === filters.course) &&
      (!filters.semester || item.semester === filters.semester)
    );
  });

  const analytics = calculateAnalytics(filtered);

  return (
    <section className="page-card">
      <h2>Teacher Analytics Dashboard</h2>
      <p>Monitor response volume, average ratings, score distribution and latest student comments.</p>

      <div className="filters-grid">
        <select onChange={(e) => setFilters({ ...filters, teacher: e.target.value })}>
          <option value="">All teachers</option>
          {getUniqueValues(allEvaluations, 'teacher').map((teacher) => (
            <option key={teacher} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>

        <select onChange={(e) => setFilters({ ...filters, subject: e.target.value })}>
          <option value="">All subjects</option>
          {getUniqueValues(allEvaluations, 'subject').map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select onChange={(e) => setFilters({ ...filters, course: e.target.value })}>
          <option value="">All courses</option>
          {getUniqueValues(allEvaluations, 'course').map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <select onChange={(e) => setFilters({ ...filters, semester: e.target.value })}>
          <option value="">All semesters</option>
          {getUniqueValues(allEvaluations, 'semester').map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </select>
      </div>

      <div className="stats-grid">
        <StatCard title="Total surveys" value={analytics.totalResponses} />
        <StatCard title="Average teacher rating" value={analytics.averageTeacherRating || 0} />
        <StatCard
          title="Top teacher"
          value={analytics.teacherStats[0] ? analytics.teacherStats[0].teacher : 'No data'}
        />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Average Teacher Rating (Bar)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analytics.teacherStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="teacher" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageScore" fill="#1E3A8A" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Rating Distribution (Pie)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={analytics.ratingDistribution} dataKey="value" nameKey="name" outerRadius={90}>
                {analytics.ratingDistribution.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card full-width">
          <h3>Average Scores by Question (Line)</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={analytics.questionAverages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="average" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3>Teacher Summary Table</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Teacher Name</th>
              <th>Subject</th>
              <th>Average Score</th>
              <th>Number of Responses</th>
            </tr>
          </thead>
          <tbody>
            {analytics.teacherStats.length === 0 ? (
              <tr>
                <td colSpan={4}>No analytics data yet.</td>
              </tr>
            ) : (
              analytics.teacherStats.map((item) => (
                <tr key={item.teacher}>
                  <td>{item.teacher}</td>
                  <td>{item.subject}</td>
                  <td>{item.averageScore}</td>
                  <td>{item.responses}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h3>Latest Student Feedback</h3>
      <div className="feedback-list">
        {analytics.recentFeedback.length === 0 ? (
          <p className="muted">No feedback messages available yet.</p>
        ) : (
          analytics.recentFeedback.map((entry) => (
            <article key={entry.createdAt} className="feedback-card">
              <strong>
                {entry.teacher} — {entry.subject}
              </strong>
              <p>
                <strong>Liked most:</strong> {entry.strengths || '—'}
              </p>
              <p>
                <strong>Can improve:</strong> {entry.improvements || '—'}
              </p>
              <p>
                <strong>Suggestions:</strong> {entry.suggestions || '—'}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default AnalyticsPage;
