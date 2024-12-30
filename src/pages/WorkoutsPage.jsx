import { useAuth } from '@src/context/AuthContext'
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { HeartIcon } from '@heroicons/react/outline'
import { getWorkouts } from '@src/services/workoutService'
import Heading from '@src/components/Heading'
import WorkoutList from '@src/components/WorkoutList'
import { getWorkoutCounts } from '@src/utils/dataUtil'
import { getStartOfMonth, getEndOfMonth } from '@src/utils/dateUtil'

export default function WorkoutsPage() {
  const { user } = useAuth()
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
      setWorkouts(await getWorkouts(user.uid, dateRange[0], dateRange[1]))
    }
    fetchSelectedWorkouts()
  }, [dateRange, user.uid])

  useEffect(() => {
    const fetchCalendarWorkouts = async () => {
      setWorkoutCounts(
        getWorkoutCounts(
          await getWorkouts(user.uid, activeDates[0], activeDates[1])
        )
      )
    }
    fetchCalendarWorkouts()
  }, [activeDates, user.uid])

  return (
    <div className="flex h-screen">
      <div className="flex flex-col basis-1/3 bg-theme p-4 items-center">
        <Heading
          text={'Select a Date Range to View Your Workouts'}
          color={'white'}
        />
        <Calendar
          className="rounded-lg shadow-lg mt-10"
          selectRange={true}
          value={dateRange}
          onChange={(d) => setDateRange(d)}
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveDates([activeStartDate, getEndOfMonth(activeStartDate)])
          }
          tileContent={({ date }) => (
            <>
              {workoutCounts.has(date.toDateString()) && (
                <HeartIcon className="stroke-theme w-3 h-3 mx-auto" />
              )}
            </>
          )}
        />
      </div>
      <div className="w-2/3 bg-white p-4 flex flex-col items-center">
        <Heading text={headingText} color={'black'} />
        <br />
        <WorkoutList data={workouts} />
      </div>
    </div>
  )
}
