import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { getWorkouts } from '@src/services/workoutService'
import Heading from '@src/components/Heading'
import WorkoutList from '@src/components/WorkoutList'

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([])
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const startDate = dateRange[0]?.toDateString()
  const endDate = dateRange[1]?.toDateString()
  const headingText = `Workouts in ${startDate} - ${endDate}`

  useEffect(() => {
    const fetchWorkouts = async () => {
      setWorkouts(await getWorkouts(dateRange[0], dateRange[1]))
    }
    fetchWorkouts()
  }, [dateRange])

  return (
    <div className="flex h-screen">
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
