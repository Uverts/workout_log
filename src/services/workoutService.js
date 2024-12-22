import {
  collection,
  query,
  where,
  getDocs,
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
