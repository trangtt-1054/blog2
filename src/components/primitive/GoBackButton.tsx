import React from "react"
import goBackIcon from "../../assets/elements/go-back-icon.svg"
import styled from "styled-components"
import { Link } from "gatsby"

const GoBackButton = () => {
  return (
    <GoBackBtn to="/stories">
      <img src={goBackIcon} alt="back icon" />
      <p style={{ marginBottom: 5 }}>all posts</p>
    </GoBackBtn>
  )
}

export default GoBackButton

const GoBackBtn = styled(Link)`
  width: fit-content;
  height: 44px;
  border: 4px solid #33302b;
  background: transparent;
  font-weight: 800;
  border-radius: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  /* padding: 0 15px 6px 13px; */
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
`
