import PropTypes from 'prop-types'
import styled from 'styled-components'

const Spacer = styled.div`
  ${props => (props.top ? 'margin-top: ' + props.top * 8 + 'px' : '')};
  ${props => (props.right ? 'margin-right: ' + props.right * 8 + 'px' : '')};
  ${props => (props.bottom ? 'margin-bottom: ' + props.bottom * 8 + 'px' : '')};
  ${props => (props.left ? 'margin-left: ' + props.left * 8 + 'px' : '')};
  ${props => (props.inline ? 'display: inline-block' : '')};
`
Spacer.displayName = 'Spacer'

Spacer.propTypes = {
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  inline: PropTypes.bool
}

Spacer.defaultProps = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  inline: false
}

export default Spacer
