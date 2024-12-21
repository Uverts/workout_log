import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Heading from '../components/Heading'
import WorkoutList from '../components/WorkoutList'

export default function WorkoutsPage() {
    const placeHolderData = [
        {id: 1, date: '2024-12-18', type: 'Leg'},
        {id: 2, date: '2024-12-19', type: 'Push'},
        {id: 3, date: '2024-12-20', type: 'Pull'},
        {id: 4, date: '2024-12-21', type: 'Legs'},
    ]
    return (
        <div className="flex min-h-screen">
            <div className="w-1/3 bg-red-400 p-4">
                <Calendar />
            </div>
            <div className="w-2/3 bg-white p-4 flex flex-col items-center">
              <Heading text="Workouts:" />
              <br />
              <WorkoutList data={placeHolderData} />
            </div>
        </div>
    )
}


