import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { HeartIcon } from '@heroicons/react/outline'
import { getWorkouts } from '@src/services/workoutService'
import Heading from '@src/components/Heading'
import WorkoutList from '@src/components/WorkoutList'
import {
  getStartOfMonth,
  getEndOfMonth,
  getWorkoutCounts,
} from '@src/utils/dateUtil'

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([])
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [workoutCounts, setWorkoutCounts] = useState(new Map())
  const [activeDates, setActiveDates] = useState([
    getStartOfMonth(new Date()),
    getEndOfMonth(new Date()),
  ])
  const startDate = dateRange[0]?.toDateString()
  const endDate = dateRange[1]?.toDateString()
  const headingText = `Workouts in ${startDate} - ${endDate}`

  useEffect(() => {
    const fetchSelectedWorkouts = async () => {
      setWorkouts(await getWorkouts(dateRange[0], dateRange[1]))
    }
    fetchSelectedWorkouts()
  }, [dateRange])

  useEffect(() => {
    const fetchCalendarWorkouts = async () => {
      setWorkoutCounts(
        getWorkoutCounts(await getWorkouts(activeDates[0], activeDates[1]))
      )
    }
    fetchCalendarWorkouts()
  }, [activeDates])

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-red-400 p-4">
        <Calendar
          selectRange={true}
          value={dateRange}
          onChange={(d) => setDateRange(d)}
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveDates([activeStartDate, getEndOfMonth(activeStartDate)])
          }
          tileContent={({ date }) => (
            <>
              {workoutCounts.has(date.toDateString()) && (
                <HeartIcon className="stroke-red-400 w-3 h-3 mx-auto" />
              )}
            </>
          )}
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
