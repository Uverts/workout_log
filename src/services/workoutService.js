import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@src/firebase/firebase.js'

export const getWorkouts = async (startDate, endDate) => {
  const q = query(
    collection(db, 'workouts'),
    where('date', '>=', Timestamp.fromDate(startDate)),
    where('date', '<=', Timestamp.fromDate(endDate))
  )
  const querySnapshot = await getDocs(q)
  const workouts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    date: doc.data().date.toDate(),
    id: doc.id,
  }))

  return workouts
}

export const getWorkout = async (workoutId) => {
  const workoutRef = doc(db, 'workouts', workoutId)
  const workoutDoc = await getDoc(workoutRef)
  const workout = workoutDoc.data()
  return { ...workout, date: workout.date.toDate() }
}

export const addWorkout = async (date, workoutType, { exercises }) => {
  await addDoc(collection(db, 'workouts'), {
    date: Timestamp.fromDate(date),
    workoutType,
    exercises,
  })
}
