import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function WorkoutList({ data }) {
  return (
    <div className="w-full">
      <ul>
        {data.map((workout) => (
          <li
            key={workout.id}
            className="w-3/4 bg-red-400 shadow-lg rounded-lg mx-auto text-center p-4 m-2"
          >
            <Link to={workout.id}>
              <p className="font-bold">{workout.type}</p>
              <p>{workout.date?.toDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

WorkoutList.propTypes = {
  data: PropTypes.array.isRequired,
}
