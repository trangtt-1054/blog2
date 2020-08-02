import React from "react"
import styled from "styled-components"

const ThemeToggler = () => {
  return (
    <TogglerWrapper>
      Princess Mode
      <CheckBoxWrapper>
        <CheckBox id="checkbox" type="checkbox" />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
      Developer Mode
    </TogglerWrapper>
  )
}

const TogglerWrapper = styled.div`
  display: flex;
`

const CheckBoxWrapper = styled.div`
  position: relative;
  margin: 0 10px;
`
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #efbbcf;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: 3px;
    background: beige;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #318fb5;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      margin-left: 19.3px;
      transition: 0.2s;
    }
  }
`

export default ThemeToggler
