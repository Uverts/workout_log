import PropTypes from 'prop-types'

export default function ExerciseList({ exercises }) {
  return (
    <div className='my-10'>
      {exercises.map((exercise, idx) => (
        <div key={idx} className="flex my-2">
          <div className="w-2/4 bg-white p-2 mr-2">{exercise.name}</div>
          <div className="w-1/4 bg-white p-2 mr-2">{exercise.sets}</div>
          <div className="w-1/4 bg-white p-2">{exercise.reps}</div>
        </div>
      ))}
    </div>
  )
}

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
}
