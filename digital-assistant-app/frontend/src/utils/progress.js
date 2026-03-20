// LOCAL STORAGE PROGRESS SYSTEM

// Get full progress object
export const getLocalProgress = () => {
  const data = localStorage.getItem("progress");
  return data ? JSON.parse(data) : {};
};

// Mark lesson as completed
export const markLessonCompleteLocal = (lessonId) => {
  const progress = getLocalProgress();
  progress[lessonId] = true;
  localStorage.setItem("progress", JSON.stringify(progress));
};

// Count completed lessons
export const getCompletedCountLocal = () => {
  const progress = getLocalProgress();
  return Object.keys(progress).length;
};