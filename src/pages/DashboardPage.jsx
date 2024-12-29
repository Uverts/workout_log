import { SearchIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import { getWorkouts } from '@src/services/workoutService'
import Heading from '@src/components/Heading'
import BarChart from '@src/components/BarChart'
import PieChart from '@src/components/PieChart'
import LineChart from '@src/components/LineChart'
import { getStartOfMonth, getEndOfMonth } from '@src/utils/dateUtil'
import {
  getWorkoutCountsByWeek,
  getWorkoutCountsByType,
  getExerciseWeightTS,
} from '@src/utils/dataUtil'

export default function DashboardPage() {
  const [workouts, setWorkouts] = useState([])
  const [exercise, setExercise] = useState('')
  const [loading, setLoading] = useState(true)
  const monthFirst = getStartOfMonth(new Date())
  const monthEnd = getEndOfMonth(new Date())
  const headingText = `Statistics from ${monthFirst.toDateString()} - ${monthEnd.toDateString()}`

  useEffect(() => {
    const fetchData = async () => {
      const workoutsThisMonth = await getWorkouts(monthFirst, monthEnd)
      setWorkouts(workoutsThisMonth)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="bg-red-400 p-12 h-screen">
      <Heading text={headingText} />
      <div className="flex flex-col flex-wrap h-full">
        <div className="w-1/2 h-1/2 bg-white">
          {loading ? (
            'loading'
          ) : (
            <BarChart data={getWorkoutCountsByWeek(workouts)} />
          )}
        </div>
        <div className="w-1/2 h-1/2 bg-white flex flex-col">
          <div className="h-[17rem]">
            {loading ? (
              'loading'
            ) : (
              <LineChart data={getExerciseWeightTS(workouts, exercise)} />
            )}
          </div>
          <div className="w-full flex">
            <SearchIcon className="h-6 w-3 bg-gray-100" />
            <input
              placeholder="search for exercise"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="bg-gray-100 px-1"
            />
          </div>
        </div>
        <div className="h-full bg-white">
          {loading ? (
            'loading'
          ) : (
            <PieChart data={getWorkoutCountsByType(workouts)} />
          )}
        </div>
      </div>
    </div>
  )
}
