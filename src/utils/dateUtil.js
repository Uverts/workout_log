export const getStartOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)

export const getEndOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0)

export const getWorkoutCounts = (workouts) => {
  const workoutCounts = new Map()

  workouts.forEach((workout) => {
    const date = workout.date.toDateString()
    workoutCounts.set(date, (workoutCounts.get(date) || 0) + 1)
  })
  return workoutCounts
}
