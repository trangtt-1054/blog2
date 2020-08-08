import React, { FC, useContext } from "react"
import styled from "styled-components"
import { GlobalDispatchContext } from "../../context/GlobalContextProvider"

type Props = {
  theme: string
}

const ThemeToggler: FC<Props> = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const handleThemeChange = () => {
    dispatch({ type: "TOGGLE_THEME" })
  }
  const { theme } = props

  return (
    <TogglerWrapper>
      <ThemeName theme={theme}>princess mode</ThemeName>
      <CheckBoxWrapper>
        <CheckBox
          id="checkbox"
          type="checkbox"
          onChange={handleThemeChange}
          checked={theme === "dark" ? true : false}
        />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
      <ThemeName theme={theme}>developer mode</ThemeName>
    </TogglerWrapper>
  )
}

const TogglerWrapper = styled.div`
  display: flex;
  align-items: center;
`
const ThemeName = styled.span`
  color: ${({ theme }) => (theme === "light" ? "#241663" : "#efbbcf")};
  font-size: 20px;
  color: #33302b;
  font-weight: 800;
  padding-bottom: 17px;
`

const CheckBoxWrapper = styled.div`
  position: relative;
  margin: 0 12px;
`
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 20px;
  border-radius: 15px;
  background: #fbf5e6;
  border: 4px solid #33302b;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    margin: -8px;
    margin-left: -5px;
    background: #f5d7d4;
    border: 4px solid #33302b;
    /* box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2); */
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
      width: 28px;
      height: 28px;
      margin-left: 19.3px;
      transition: 0.2s;
    }
  }
`

export default ThemeToggler
