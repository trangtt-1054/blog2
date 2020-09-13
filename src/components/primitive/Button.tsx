import React, { FC } from "react"
import styled from "styled-components"
import { light, common } from "../../theme"
import { size } from "../../theme/size"

type Props = {
  text: string
  onClick(): void
  size: "main" | "sub"
}

const Button: FC<Props> = ({ text, onClick, size }) => {
  return (
    <Wrapper size={size} onClick={onClick}>
      {text}
    </Wrapper>
  )
}

export default Button

const Wrapper = styled.button<{ size: string }>`
  width: fit-content;
  border: ${light.mainBorder};
  background: transparent;
  border-radius: ${common.subRadius};
  height: 44px;
  font-size: ${common.title1};
  padding: 0 15px 6px;
  font-weight: ${({ size }) => (size === "main" ? "800" : "700")};
  &:hover {
    background: ${light.accentColor};
  }
  ${size("xs")} {
    border: ${light.subBorder};
    border-radius: ${common.subRadius2};
    height: 37px;
    font-size: 18px;
    padding: 0 15px 4px;
    font-weight: 700;
  }
`
