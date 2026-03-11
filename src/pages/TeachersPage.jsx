import { useMemo } from 'react';
import { getEvaluations } from '../utils/storage';
import { calculateAnalytics } from '../utils/analytics';

function TeachersPage() {
  const analytics = useMemo(() => calculateAnalytics(getEvaluations()), []);

  return (
    <section className="page-card">
      <h2>Teachers</h2>
      <p>Current teacher overview based on submitted survey responses.</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Teacher Name</th>
              <th>Subject</th>
              <th>Average Score</th>
              <th>Responses</th>
            </tr>
          </thead>
          <tbody>
            {analytics.teacherStats.length === 0 ? (
              <tr>
                <td colSpan={4}>No data yet. Submit surveys to see results.</td>
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
    </section>
  );
}

export default TeachersPage;
