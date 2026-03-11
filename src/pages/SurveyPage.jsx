import { useState } from 'react';
import { ratingScale, surveyQuestions } from '../data/surveyQuestions';
import { saveEvaluation } from '../utils/storage';

const initialForm = {
  course: '1',
  group: '',
  specialty: '',
  subject: '',
  teacher: '',
  semester: '1',
  academicYear: ''
};

function SurveyPage() {
  const [form, setForm] = useState(initialForm);
  const [answers, setAnswers] = useState(Array(10).fill(3));
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    saveEvaluation({
      ...form,
      answers,
      strengths,
      improvements,
      suggestions,
      createdAt: new Date().toISOString()
    });

    setSubmitted(true);
    setForm(initialForm);
    setAnswers(Array(10).fill(3));
    setStrengths('');
    setImprovements('');
    setSuggestions('');
  };

  return (
    <section className="page-card">
      <h2>Teacher Evaluation Survey</h2>
      <p>Anonymous form for student feedback. Scale: 1 (Very Poor) to 5 (Excellent).</p>

      {submitted && <div className="success-box">Thank you for your feedback.</div>}

      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Course
          <select
            value={form.course}
            onChange={(event) => setForm({ ...form, course: event.target.value })}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>

        <label>
          Group
          <input
            value={form.group}
            onChange={(event) => setForm({ ...form, group: event.target.value })}
            required
          />
        </label>

        <label>
          Specialty / Department
          <input
            value={form.specialty}
            onChange={(event) => setForm({ ...form, specialty: event.target.value })}
            required
          />
        </label>

        <label>
          Subject
          <input
            value={form.subject}
            onChange={(event) => setForm({ ...form, subject: event.target.value })}
            required
          />
        </label>

        <label>
          Teacher Name
          <input
            value={form.teacher}
            onChange={(event) => setForm({ ...form, teacher: event.target.value })}
            required
          />
        </label>

        <label>
          Semester
          <select
            value={form.semester}
            onChange={(event) => setForm({ ...form, semester: event.target.value })}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>

        <label>
          Academic Year
          <input
            placeholder="2026-2027"
            value={form.academicYear}
            onChange={(event) => setForm({ ...form, academicYear: event.target.value })}
            required
          />
        </label>

        <div className="survey-questions">
          {surveyQuestions.map((question, index) => (
            <div key={question} className="question-row">
              <p>
                {index + 1}. {question}
              </p>
              <div className="rating-options">
                {[1, 2, 3, 4, 5].map((score) => (
                  <label key={score}>
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={score}
                      checked={answers[index] === score}
                      onChange={() => {
                        const updated = [...answers];
                        updated[index] = score;
                        setAnswers(updated);
                      }}
                    />
                    {score} - {ratingScale[score]}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <label>
          What do you like most about this teacher?
          <textarea value={strengths} onChange={(event) => setStrengths(event.target.value)} rows={3} />
        </label>

        <label>
          What can be improved?
          <textarea
            value={improvements}
            onChange={(event) => setImprovements(event.target.value)}
            rows={3}
          />
        </label>

        <label>
          Additional suggestions
          <textarea
            value={suggestions}
            onChange={(event) => setSuggestions(event.target.value)}
            rows={3}
          />
        </label>

        <button type="submit" className="primary-btn">
          Submit
        </button>
      </form>
    </section>
  );
}

export default SurveyPage;
