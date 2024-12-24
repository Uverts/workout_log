import PropTypes from 'prop-types'
import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/outline'
import { addWorkout } from '@src/services/workoutService'

export default function WorkoutForm({ date }) {
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '' }])
  const [workoutType, setWorkoutType] = useState('')
  const [error, setError] = useState(false)

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '' }])
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
    const emptyFields = exercises.some(
      (exercise) =>
        exercise.name.trim() === '' ||
        exercise.sets.trim() === '' ||
        exercise.reps.trim() === ''
    )
    if (emptyFields) {
      setError(true)
    } else {
      setError(false)
      await addWorkout(date, workoutType, { exercises })
      setExercises([{ name: '', sets: '', reps: '' }])
    }
  }

  return (
    <div className="w-4/5 flex-1 bg-red-400 shadow-lg rounded-lg p-4 m-2">
      <h1 className="text-gray-50">{date.toDateString()}</h1>
      <form className="m-4">
        <input
          className="w-full rounded-lg p-2 mb-5"
          placeholder="Workout Type"
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
        />
        {exercises.map((exercise, idx) => (
          <div key={idx} className="my-5">
            <div className="flex justify-between items-center">
              <input
                className="w-2/4 rounded-lg p-2 mr-2"
                placeholder="Exercise Name"
                value={exercise.name}
                onChange={(e) => handleOnChange(idx, 'name', e.target.value)}
              />
              <input
                className="w-1/4 rounded-lg p-2 mr-2"
                type="number"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) => handleOnChange(idx, 'sets', e.target.value)}
              />
              <input
                className="w-1/4 rounded-lg p-2"
                type="number"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) => handleOnChange(idx, 'reps', e.target.value)}
              />
              <button
                onClick={() => handleDeleteExercise(idx)}
                type="button"
                className="h-5 w-5 m-2"
              >
                <TrashIcon className="stroke-white" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddExercise}
          type="button"
          className="w-1/4 bg-white p-3 rounded-lg"
        >
          Add exercise
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-white p-3 mt-5 rounded-lg"
        >
          Submit
        </button>
      </form>
      {error && (
        <div className="bg-white text-red-500 mb-4 p-1">Invalid input</div>
      )}
    </div>
  )
}

WorkoutForm.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}
