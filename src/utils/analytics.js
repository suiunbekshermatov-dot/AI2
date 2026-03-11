import { surveyQuestions } from '../data/surveyQuestions';

const round = (value) => Number(value.toFixed(2));

export function calculateAnalytics(evaluations) {
  if (!evaluations.length) {
    return {
      totalResponses: 0,
      averageTeacherRating: 0,
      teacherStats: [],
      questionAverages: surveyQuestions.map((question) => ({ question, average: 0 })),
      ratingDistribution: [1, 2, 3, 4, 5].map((rating) => ({ name: String(rating), value: 0 })),
      recentFeedback: []
    };
  }

  const teacherMap = new Map();
  const questionTotals = Array(surveyQuestions.length).fill(0);
  const questionCounts = Array(surveyQuestions.length).fill(0);
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  evaluations.forEach((entry) => {
    const avg = entry.answers.reduce((sum, val) => sum + val, 0) / entry.answers.length;

    if (!teacherMap.has(entry.teacher)) {
      teacherMap.set(entry.teacher, {
        teacher: entry.teacher,
        subject: entry.subject,
        totalScore: 0,
        responses: 0
      });
    }

    const teacherItem = teacherMap.get(entry.teacher);
    teacherItem.totalScore += avg;
    teacherItem.responses += 1;

    entry.answers.forEach((score, index) => {
      questionTotals[index] += score;
      questionCounts[index] += 1;
      distribution[score] += 1;
    });
  });

  const teacherStats = [...teacherMap.values()]
    .map((item) => ({
      ...item,
      averageScore: round(item.totalScore / item.responses)
    }))
    .sort((a, b) => b.averageScore - a.averageScore);

  const averageTeacherRating =
    teacherStats.reduce((sum, item) => sum + item.averageScore, 0) / teacherStats.length;

  const questionAverages = surveyQuestions.map((question, index) => ({
    question: `Q${index + 1}`,
    fullQuestion: question,
    average: questionCounts[index] ? round(questionTotals[index] / questionCounts[index]) : 0
  }));

  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    name: String(rating),
    value: distribution[rating]
  }));

  const recentFeedback = [...evaluations]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return {
    totalResponses: evaluations.length,
    averageTeacherRating: round(averageTeacherRating),
    teacherStats,
    questionAverages,
    ratingDistribution,
    recentFeedback
  };
}
