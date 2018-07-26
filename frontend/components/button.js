import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Text from './text'

import variables from './variables'

const buttonSizes = {
  icon: `
      height: 70px;
      width: 70px;
      @media (max-width: 550px) {
          height: 55px;
          width: 55px;
      }
    `,
  small: `
    height: 55px;
    padding: 0 18px;
    `,
  large: `
    height: 70px;
    padding: 0 24px;
    @media (max-width: 550px) {
        height: 55px;
    }
    `
}

const textButtonSizes = {
  small: 'size0',
  medium: 'size1',
  large: 'size2'
}

const ButtonWrapper = styled.button`
  background-color: ${p =>
    p.black ? variables.colors.body : variables.colors.gray};
  position: relative;
  font-family: inherit;
  border: none;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  white-space: nowrap;
  ${props => props.fontFamily && `font-family: ${props.fontFamily}`};
  ${props => props.disabled && `pointer-events: none`};
  ${props => buttonSizes[props.size]};
`

const ButtonTtextWrapper = styled.span`
  transition: 0.2s;
  ${props => props.hasSpinner && 'opacity: 0'};
`

const Button = ({
  color,
  contextBackgroundColor,
  transparent,
  size,
  children,
  iconSvg,
  onClick,
  oldContrast,
  openBorder,
  disabled,
  fontFamily,
  hasSpinner,
  black,
  ...rest
}) => {
  const bgColor = transparent ? contextBackgroundColor : color
  return (
    <ButtonWrapper
      color={bgColor}
      size={size}
      onClick={onClick}
      disabled={disabled}
      fontFamily={fontFamily}
      black={black}
    >
      <ButtonTtextWrapper hasSpinner={hasSpinner}>
        <Text
          size={textButtonSizes[size]}
          color={black ? variables.colors.background : variables.colors.primary}
        >
          {children}
        </Text>
      </ButtonTtextWrapper>
    </ButtonWrapper>
  )
}

Button.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  color: '#777',
  size: 'medium',
  visible: true
}

export default Button
