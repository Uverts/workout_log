import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@src/firebase/firebase.js'

export const getWorkouts = async (startDate, endDate) => {
  try {
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
  } catch (err) {
    console.error('Failed to retrieve workouts from database', err)
  }
}

export const getWorkout = async (workoutId) => {
  try {
    const workoutRef = doc(db, 'workouts', workoutId)
    const workoutDoc = await getDoc(workoutRef)
    const workout = workoutDoc.data()
    return { ...workout, date: workout.date.toDate() }
  } catch (err) {
    console.error(`Failed to retrieve workout ${workoutId} from database.`, err)
  }
}

export const addWorkout = async (date, workoutType, { exercises }) => {
  try {
    await addDoc(collection(db, 'workouts'), {
      date: Timestamp.fromDate(date),
      workoutType,
      exercises,
    })
  } catch (err) {
    console.error('Failed to add workout to database.', err)
  }
}

export const deleteWorkout = async (workoutId) => {
  try {
    await deleteDoc(doc(db, 'workouts', workoutId))
  } catch (err) {
    console.error(`Failed to delete workout ${workoutId} from database`, err)
  }
}
