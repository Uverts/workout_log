import PropTypes from 'prop-types'

export default function ExerciseList({ exercises }) {
  return (
    <div className="my-10">
      <div className="flex my-2">
        <div className="text-white w-1/4 p-2 mr-2">{'Name'}</div>
        <div className="text-white w-1/4 p-2 mr-2">{'Sets'}</div>
        <div className="text-white w-1/4 p-2 mr-2">{'Reps'}</div>
        <div className="text-white w-1/4 p-2">{'Weight'}</div>
      </div>
      {exercises.map((exercise, idx) => (
        <div key={idx} className="flex my-2">
          <div className="w-1/4 bg-white p-2 mr-2">{exercise.name}</div>
          <div className="w-1/4 bg-white p-2 mr-2">{exercise.sets}</div>
          <div className="w-1/4 bg-white p-2 mr-2">{exercise.reps}</div>
          <div className="w-1/4 bg-white p-2">{exercise.weight}</div>
        </div>
      ))}
    </div>
  )
}

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
}
