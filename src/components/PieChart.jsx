import PropTypes from 'prop-types'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart({ data }) {
  const backgroundColors = [
    'purple',
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
  ]
  const pieChartData = {
    labels: data?.keys()?.toArray(),
    datasets: [
      {
        data: data?.values()?.toArray(),
        label: 'Workout types',
        backgroundColor: backgroundColors,
      },
    ],
  }
  return <Pie data={pieChartData} />
}

PieChart.propTypes = {
  data: PropTypes.instanceOf(Map).isRequired,
}
