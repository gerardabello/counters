import React from 'react'
import styled from 'styled-components'
import { textSizes } from './variables'
import variables from './variables'

const InputField = styled.input`
  display: block;
  width: ${p => (p.fullWidth ? '100%' : '200px')};
  font-family: inherit;
  color: ${props => props.color};
  border-radius: 0;
  border: none;
  background-color: ${variables.colors.gray};
  ${props => textSizes[props.size]};
  padding: 4px 10px;
  text-align: ${p => p.textAlign};
  outline: none;
  border: none;
`

class Input extends React.Component {
  render () {
    const {
      inputId,
      getRef,
      maxLength,
      onBlur,
      onFocus,
      onClick,
      onInput,
      onKeyDown,
      onKeyPress,
      placeholder,
      value,
      color,
      onChange,
      fullWidth,
      fontSize,
      textAlign,
      ...rest
    } = this.props

    return (
      <InputField
        {...rest}
        color={color}
        value={value}
        id={inputId}
        maxLength={maxLength}
        onBlur={onBlur}
        onFocus={onFocus}
        onInput={onInput}
        onClick={onClick}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        textAlign={textAlign}
        innerRef={getRef}
        fullWidth={fullWidth}
        type='text'
        size={fontSize}
      />
    )
  }
}

export default Input
