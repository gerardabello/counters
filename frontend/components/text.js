import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { textSizes, fontSans, fontWeights } from './variables'

export const availableTextSizes = ['unset', 'size3', 'size2', 'size1', 'size0']

const Text = ({
  children,
  htmlTag,
  inline,
  size,
  color,
  useDefaultFont,
  fontWeight,
  uppercase,
  loose,
  dimmed,
  ellipsis,
  italic,
  align,
  font,
  dataQa,
  ...rest
}) => {
  const TextWrapper = styled(htmlTag)`
    ${props => props.inline && 'display: inline;'}
    ${props => props.size};
    ${props => props.color && `color: ${props.color};`}
    ${props => props.useDefaultFont && `font-family: ${fontSans};`}
    font-weight: ${props =>
    props.fontWeight ? `${fontWeights[props.fontWeight]}` : 'unset'};
    ${props => props.uppercase && `text-transform: uppercase;`}
    ${props => props.loose && `letter-spacing: .1em;`}
    ${props => props.dimmed && `opacity: 0.7;`};
    ${props =>
    props.ellipsis &&
      `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`}
    ${props => (props.italic ? 'font-style: italic;' : '')}
    ${props => props.align && `text-align: ${props.align};`}
    ${props => props.font && `font-family: ${props.font};`};
    margin: 0;
    ${props => (props.break ? 'word-break: break-word;hyphens: auto;' : '')}
  `

  return (
    <TextWrapper
      children={children}
      htmlTag={htmlTag}
      inline={inline}
      size={textSizes[size]}
      color={color}
      useDefaultFont={useDefaultFont}
      fontWeight={fontWeight}
      uppercase={uppercase}
      loose={loose}
      dimmed={dimmed}
      ellipsis={ellipsis}
      italic={italic}
      align={align}
      font={font}
      data-qa={dataQa}
      {...rest}
    >
      {children}
    </TextWrapper>
  )
}

export const availableHtmlTags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'span',
  'div'
]

Text.propTypes = {
  htmlTag: PropTypes.oneOf(availableHtmlTags),
  dataQa: PropTypes.string,
  size: PropTypes.oneOf(availableTextSizes)
}

Text.defaultProps = {
  htmlTag: 'div',
  size: 'size0'
}

export default Text
