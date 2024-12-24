import { useParams } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWorkout, deleteWorkout } from '../services/workoutService'
import ExerciseList from '../components/ExerciseList'

export default function WorkoutPage() {
  const { workoutId } = useParams()
  const [workout, setWorkout] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchWorkout = async (workoutId) => {
      setWorkout(await getWorkout(workoutId))
      setLoading(false)
    }
    fetchWorkout(workoutId)
  }, [workoutId])

  const handleDelete = () => {
    navigate(-1)
    deleteWorkout(workoutId)
  }

  return (
    <div className="w-2/3 h-screen bg-red-400 shadow-lg  rounded-lg p-4 mx-auto">
      <h1 className="text-gray-50">{workout?.date?.toDateString()}</h1>
      {loading ? 'loading' : <ExerciseList exercises={workout.exercises} />}
      <button onClick={handleDelete} type="button" className="h-5 w-5 m-2">
        <TrashIcon className="stroke-white" />
      </button>
    </div>
  )
}
