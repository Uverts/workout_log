import { SearchIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import { getWorkouts } from '@src/services/workoutService'
import Heading from '@src/components/Heading'
import BarChart from '@src/components/charts/BarChart'
import PieChart from '@src/components/charts/PieChart'
import LineChart from '@src/components/charts/LineChart'
import { getStartOfMonth, getEndOfMonth } from '@src/utils/dateUtil'
import { useAuth } from '@src/context/AuthContext'
import {
  getWorkoutCountsByWeek,
  getWorkoutCountsByType,
  getExerciseWeightTS,
} from '@src/utils/dataUtil'

export default function DashboardPage() {
  const { user } = useAuth()
  const [workouts, setWorkouts] = useState([])
  const [exercise, setExercise] = useState('')
  const [loading, setLoading] = useState(true)
  const monthFirst = getStartOfMonth(new Date())
  const monthEnd = getEndOfMonth(new Date())
  const headingText = `Statistics from ${monthFirst.toDateString()} - ${monthEnd.toDateString()}`

  useEffect(() => {
    const fetchData = async () => {
      const workoutsThisMonth = await getWorkouts(
        user.uid,
        monthFirst,
        monthEnd
      )
      setWorkouts(workoutsThisMonth)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-col p-12 bg-theme">
      <Heading text={headingText} color={'black'} />
      <div className="grid grid-cols-2 gap-4">
        <div className=" bg-white">
          {loading ? (
            'loading'
          ) : (
            <BarChart data={getWorkoutCountsByWeek(workouts)} />
          )}
        </div>
        <div className=" bg-white row-span-2">
          {loading ? (
            'loading'
          ) : (
            <PieChart data={getWorkoutCountsByType(workouts)} />
          )}
        </div>
        <div className="bg-white flex flex-col">
          <div>
            {loading ? (
              'loading'
            ) : (
              <LineChart data={getExerciseWeightTS(workouts, exercise)} />
            )}
          </div>
          <div className="flex">
            <SearchIcon className="h-6 w-3 bg-white" />
            <input
              placeholder="search for exercise"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="bg-white px-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
