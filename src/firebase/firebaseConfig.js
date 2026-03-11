import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const collections = {
  evaluations: collection(db, 'evaluations'),
  teachers: collection(db, 'teachers'),
  admins: collection(db, 'admins'),
  users: collection(db, 'users')
};

export const evaluationDocumentShape = {
  course: '1',
  group: 'A-01',
  specialty: 'Computer Science',
  subject: 'Mathematics',
  teacher: 'Dr. Ivanov',
  semester: '1',
  academicYear: '2026-2027',
  answers: [5, 4, 5, 4, 5, 4, 5, 4, 4, 5],
  strengths: 'Explains difficult topics in simple language.',
  improvements: 'More practical examples would help.',
  suggestions: 'Add weekly mini-quizzes for feedback.',
  createdAt: new Date().toISOString()
};
