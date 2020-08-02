import React, { useContext } from "react"
import styled from "styled-components"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"

const ThemeToggler = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const handleThemeChange = () => {
    dispatch({ type: "TOGGLE_THEME" })
  }
  const { theme } = props

  return (
    <TogglerWrapper>
      <ThemeName theme={theme}>Princess Mode</ThemeName>
      <CheckBoxWrapper>
        <CheckBox
          id="checkbox"
          type="checkbox"
          onChange={handleThemeChange}
          checked={theme === "dark" ? true : false}
        />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
      <ThemeName theme={theme}>Developer Mode</ThemeName>
    </TogglerWrapper>
  )
}

const TogglerWrapper = styled.div`
  display: flex;
`
const ThemeName = styled.span`
  color: ${({ theme }) => (theme === "light" ? "#241663" : "#efbbcf")};
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
  background: #241663;
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
    background: #efbbcf;
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
