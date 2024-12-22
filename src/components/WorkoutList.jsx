import PropTypes from 'prop-types'

export default function WorkoutList({ data }) {
  return (
    <div className="w-full">
      <ul>
        {data.map((workout) => (
          <li
            key={workout.id}
            className="w-3/4 bg-red-400 shadow-lg rounded-lg mx-auto text-center p-4 m-2"
          >
            <a href={workout.id}>
              <p className="font-bold">{workout.type}</p>
              <p>{workout.date?.toDateString()}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

WorkoutList.propTypes = {
  data: PropTypes.array.isRequired,
}
