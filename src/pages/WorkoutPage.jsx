import { useParams } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWorkout, deleteWorkout } from '@src/services/workoutService'
import ExerciseList from '@src/components/ExerciseList'
import Heading from '@src/components/Heading'

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
    <div className="w-2/3 h-screen bg-theme shadow-lg  rounded-lg p-4 mx-auto">
      <Heading text={workout?.date?.toDateString()} color={'white'} />
      {loading ? 'loading' : <ExerciseList exercises={workout.exercises} />}
      <button onClick={handleDelete} type="button" className="h-5 w-5 m-2">
        <TrashIcon className="stroke-white hover:stroke-gray-300" />
      </button>
    </div>
  )
}
