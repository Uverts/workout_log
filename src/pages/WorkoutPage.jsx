import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { getWorkout } from '../services/workoutService'
import ExerciseList from '../components/ExerciseList'

export default function WorkoutPage() {
  const { workoutId } = useParams()
  const [workout, setWorkout] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchWorkout = useCallback(async (workoutId) => {
    setWorkout(await getWorkout(workoutId))
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchWorkout(workoutId)
  }, [fetchWorkout, workoutId])

  return (
    <div className="w-2/3 h-screen bg-red-400 shadow-lg  rounded-lg p-4 mx-auto">
      <h1 className="text-gray-50">{workout?.date?.toDateString()}</h1>
      {loading ? 'loading' : <ExerciseList exercises={workout.exercises} />}
    </div>
  )
}
