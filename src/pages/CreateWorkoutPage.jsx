import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import WorkoutForm from '@src/components/WorkoutForm'
import Heading from '@src/components/Heading'

export default function CreateWorkoutPage() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="flex h-screen">
      <div className="flex flex-col basis-1/3 bg-theme p-4 items-center">
        <Heading text={'Select a Date To Add Workout on'} color={'white'} />
        <Calendar
          className="rounded-lg shadow-lg mt-10"
          value={date}
          onChange={(d) => setDate(d)}
        />
      </div>
      <div className="w-2/3 bg-white p-4 flex flex-col items-center">
        <WorkoutForm date={date} />
      </div>
    </div>
  )
}
