import React, { FC, useContext } from "react"
import styled from "styled-components"
import { GlobalDispatchContext } from "../../context/GlobalContextProvider"
import { light } from "../../theme"
import { size } from "../../theme/size"

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
  ${size("lg")} {
    padding-right: 40px;
    padding-top: 10px;
  }
  ${size("xs")} {
    display: none;
  }
`
const ThemeName = styled.span`
  color: ${({ theme }) => (theme === "light" ? "#241663" : "#efbbcf")};
  font-size: 20px;
  color: #33302b;
  font-weight: 800;
  padding-bottom: 17px;
  ${size("lg")} {
    display: none;
  }
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
  background: ${light.baseColor};
  border: ${light.mainBorder};
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
    border: ${light.mainBorder};
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
    background: ${light.accentColor};
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
