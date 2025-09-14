import PropTypes from 'prop-types'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
)

export default function LineChart({ data }) {
  const linehartData = {
    labels: data?.map((item) => item.date.toDateString()),
    datasets: [
      {
        data: data?.map((item) => item.weight),
        label: 'Weight',
        borderColor: 'dark',
      },
    ],
  }
  return <Line data={linehartData} />
}

LineChart.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
}
