import React, { FC } from "react"
import goBackIcon from "../../assets/elements/go-back-icon.svg"
import styled from "styled-components"
import { Link } from "gatsby"
import { light, common } from "../../theme"
import { size } from "../../theme/size"

type Props = {
  className?: string
}

const GoBackButton: FC<Props> = ({ className }) => {
  return (
    <GoBackBtn to="/stories" className={className}>
      <img src={goBackIcon} alt="back icon" />
      <p style={{ marginBottom: 5 }}>all posts</p>
    </GoBackBtn>
  )
}

export default GoBackButton

const GoBackBtn = styled(Link)`
  width: fit-content;
  height: 44px;
  border: ${light.mainBorder};
  background: transparent;
  font-weight: 800;
  border-radius: ${common.subRadius};
  font-size: 20px;
  display: flex;
  align-items: center;
  padding: 0 15px;

  img {
    margin-right: 21px;
    margin-bottom: 0;
    height: 20px;
  }
  &:focus {
    outline: 0;
  }
  &:hover {
    background: #f5d7d4;
  }

  ${size("xs")} {
    height: 37px;
    border: ${light.subBorder};
    font-size: 18px;
    font-weight: 700;
    border-radius: ${common.subRadius2};
    margin-bottom: 15px;
    img {
      height: 15px;
      margin-right: 15px;
    }
  }
`
