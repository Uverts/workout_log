import PropTypes from 'prop-types'

export default function Heading({ text, color }) {
  return (
    <h1 className={`text-center mb-2 text-lg font-bold text-${color}`}>{text}</h1>
  )
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}
