import PropTypes from 'prop-types'
import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/outline'
import { addWorkout } from '@src/services/workoutService'
import { useAuth } from '@src/context/AuthContext'

export default function WorkoutForm({ date }) {
  const { user } = useAuth()
  const [exercises, setExercises] = useState([
    { name: '', sets: '', reps: '', weight: '' },
    { name: '', sets: '', reps: '', weight: '' },
    { name: '', sets: '', reps: '', weight: '' },
  ])
  const [workoutType, setWorkoutType] = useState('')

  const handleAddExercise = () => {
    if (exercises.length < 15)
      setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }])
  }
  const handleDeleteExercise = (idx) => {
    setExercises(exercises.filter((_, i) => i !== idx))
  }

  const handleOnChange = (idx, field, updatedValue) => {
    setExercises(
      exercises.map((exercise, i) => {
        if (i === idx) {
          return { ...exercise, [field]: updatedValue }
        } else {
          return exercise
        }
      })
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addWorkout(user.uid, date, workoutType, { exercises })
      setExercises([{ name: '', sets: '', reps: '', weight: '' }])
    } catch (err) {
      console.error('adding failed', err)
    }
  }

  return (
    <div className="w-4/5 min-h-[30] bg-theme shadow-lg rounded-lg p-4 m-2">
      <h1 className="text-white">{date.toDateString()}</h1>
      <form className="m-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-lg p-2 mb-2"
          placeholder="Workout Type"
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
          required
        />
        {exercises.map((exercise, idx) => (
          <div key={idx} className="my-5">
            <div className="flex justify-between items-center">
              <input
                className="w-1/4 rounded-lg p-2 mr-2"
                placeholder="Exercise Name"
                value={exercise.name}
                onChange={(e) => handleOnChange(idx, 'name', e.target.value)}
                required
              />
              <input
                className="w-1/4 rounded-lg p-2 mr-2"
                type="number"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) => handleOnChange(idx, 'sets', e.target.value)}
                required
                min="1"
              />
              <input
                className="w-1/4 rounded-lg p-2 mr-2"
                type="number"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) => handleOnChange(idx, 'reps', e.target.value)}
                required
                min="1"
              />
              <input
                className="w-1/4 rounded-lg p-2"
                type="number"
                placeholder="Weight"
                value={exercise.weight}
                onChange={(e) => handleOnChange(idx, 'weight', e.target.value)}
                required
                min="0"
              />
              <button
                onClick={() => handleDeleteExercise(idx)}
                type="button"
                className="h-5 w-5 m-2"
              >
                <TrashIcon className="stroke-white hover:stroke-gray-300" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddExercise}
          type="button"
          className="w-1/4 bg-white hover:bg-gray-300 p-3 rounded-lg"
        >
          Add exercise
        </button>
        <button
          type="submit"
          className="w-full bg-white hover:bg-gray-300 p-3 mt-5 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

WorkoutForm.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}
