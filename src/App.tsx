import React, { Suspense } from 'react';
import CoursesTabs from './components/CoursesTabs';

export default function App() {
  return (
    <Suspense fallback={<div />}>
      <CoursesTabs />
    </Suspense>
  );
}
