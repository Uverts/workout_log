import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import WorkoutForm from '../components/WorkoutForm'

export default function CreateWorkoutPage() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 bg-red-400 p-4">
        <Calendar value={date} onChange={(d) => setDate(d)} />
      </div>
      <div className="w-2/3 bg-white p-4 flex flex-col items-center">
        <WorkoutForm date={date} />
      </div>
    </div>
  )
}
