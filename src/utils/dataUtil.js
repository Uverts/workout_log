import { getWeekNumber } from './dateUtil'

export const getWorkoutCounts = (workouts) => {
  if (!Array.isArray(workouts)) {
    return new Map()
  }
  const workoutCounts = new Map()

  workouts?.forEach((workout) => {
    const date = workout.date.toDateString()
    workoutCounts.set(date, (workoutCounts.get(date) || 0) + 1)
  })
  return workoutCounts
}

export const getWorkoutCountsByWeek = (workouts) => {
  if (!Array.isArray(workouts)) {
    return new Map()
  }
  const groupedByWeek = Map.groupBy(workouts, (workout) =>
    getWeekNumber(workout.date)
  )
  groupedByWeek.forEach((value, key, groupedByWeek) =>
    groupedByWeek.set(key, value.length)
  )
  return groupedByWeek
}

export const getWorkoutCountsByType = (workouts) => {
  if (!Array.isArray(workouts)) {
    return new Map()
  }
  const groupedByType = Map.groupBy(workouts, (workout) => workout.workoutType)
  groupedByType.forEach((value, key, groupedByType) =>
    groupedByType.set(key, value.length)
  )
  return groupedByType
}

export const getExerciseWeightTS = (workouts, exerciseName) => {
  if (!Array.isArray(workouts)) {
    return []
  }
  const workoutsWithExercise = workouts?.filter((workout) =>
    workout.exercises.some((ex) => ex.name === exerciseName)
  )
  const dateWeight = workoutsWithExercise?.map((workout) => ({
    date: workout.date,
    weight: workout.exercises.find((ex) => ex.name === exerciseName).weight,
  }))
  return dateWeight
}
