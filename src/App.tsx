import React, { Suspense } from 'react';
import CoursesTabs from './components/CoursesTabs';

const App = () => {
  return (
    <Suspense fallback={<div />}>
      <CoursesTabs />
    </Suspense>
  );
};

export default App;
