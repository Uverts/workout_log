import PropTypes from 'prop-types'
import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/outline'
import { addWorkout } from '../services/workoutService'

export default function WorkoutForm({ date }) {
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '' }])
  const [workoutType, setWorkoutType] = useState('')

  const addExercise = (e) => {
    e.preventDefault()
    setExercises([...exercises, { name: '', sets: '', reps: '' }])
  }
  const deleteExercise = (e, idx) => {
    e.preventDefault()
    setExercises(exercises.filter((_, i) => i !== idx))
  }

  const updateExerciseField = (idx, field, updatedValue) => {
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
    // add validation
    await addWorkout(date, workoutType, { exercises })

    setExercises([{ name: '', sets: '', reps: '' }])
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
                onChange={(e) =>
                  updateExerciseField(idx, 'name', e.target.value)
                }
              />
              <input
                className="w-1/4 rounded-lg p-2 mr-2"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) =>
                  updateExerciseField(idx, 'sets', e.target.value)
                }
              />
              <input
                className="w-1/4 rounded-lg p-2"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) =>
                  updateExerciseField(idx, 'reps', e.target.value)
                }
              />
              <button
                onClick={(e) => deleteExercise(e, idx)}
                className="h-5 w-5 m-2"
              >
                <TrashIcon className="stroke-white" />
              </button>
            </div>
          </div>
        ))}

        <button onClick={addExercise} className="w-1/4 bg-white p-3 rounded-lg">
          Add exercise
        </button>
        <button
          onClick={handleSubmit}
          className="w-full bg-white p-3 mt-5 rounded-lg"
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
