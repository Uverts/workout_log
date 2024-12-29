import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function BarChart({ data }) {
  const backgroundColors = [
    'pink',
    'cyan',
    'magenta',
    'lime',
    'teal',
    'gold',
    'brown',
    'violet',
    'indigo',
    'maroon',
    'turquoise',
    'silver',
    'navy',
  ]
  const barChartData = {
    labels: data?.keys()?.toArray(),
    datasets: [
      {
        data: data?.values()?.toArray(),
        label: 'Number of workouts by week',
        backgroundColor: backgroundColors,
      },
    ],
  }
  return <Bar data={barChartData} />
}

BarChart.propTypes = {
  data: PropTypes.instanceOf(Map).isRequired,
}
