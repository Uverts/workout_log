export default function WorkoutList({ data }) {
    return(
      <div className="w-full">
        <ul>
          {data.map( (workout) => (
            <a href={workout.id} >
              <li key={workout.id} className="w-3/4 bg-red-400 shadow-lg rounded-lg mx-auto text-center p-4 m-2">
                <p className="font-bold">{workout.type}</p>
                <p>{workout.date}</p>
              </li>
            </a>
          ))}
        </ul>
      </div>
    )
}