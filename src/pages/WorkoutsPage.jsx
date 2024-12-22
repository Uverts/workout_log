import { useState, useEffect, useCallback } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { getWorkouts } from '../services/workoutService'
import Heading from '../components/Heading'
import WorkoutList from '../components/WorkoutList'

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([])
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const startDate = dateRange[0]?.toDateString()
  const endDate = dateRange[1]?.toDateString()
  const headingText = `Workouts in ${startDate} - ${endDate}`

  const fetchWorkouts = useCallback(async () => {
    setWorkouts(await getWorkouts(dateRange[0], dateRange[1]))
  }, [dateRange])

  useEffect(() => {
    fetchWorkouts()
  }, [fetchWorkouts])

  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 bg-red-400 p-4">
        <Calendar
          selectRange={true}
          value={dateRange}
          onChange={(d) => setDateRange(d)}
        />
      </div>
      <div className="w-2/3 bg-white p-4 flex flex-col items-center">
        <Heading text={headingText} />
        <br />
        <WorkoutList data={workouts} />
      </div>
    </div>
  )
}
