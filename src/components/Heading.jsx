import PropTypes from 'prop-types'

export default function Heading({ text }) {
  return <h1 className="bg-blue mb-4 text-lg font-bold">{text}</h1>
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
}
