import React, { FC } from "react"
import styled from "styled-components"
import { light, common } from "../../theme"
import { Link } from "gatsby"

type Props = {
  text: string
}

const SmallButton: FC<Props> = ({ text }) => {
  return (
    <Wrapper>
      <Link to={`/stories/tags/${text}`}>#{text}</Link>
    </Wrapper>
  )
}

export default SmallButton

const Wrapper = styled.div`
  border-radius: ${common.subRadius2};
  border: ${light.subBorder};
  font-weight: 700;
  padding: 1px 12px 5px;
  margin-right: 6px;
  margin-bottom: 6px;
`
