import React, { FC, useContext } from "react"
import Header from "../Header"
import { GlobalStateContext } from "../../context/GlobalContextProvider"
import styled from "styled-components"

type Props = {
  location: string
}

const Layout: FC<Props> = props => {
  const state = useContext(GlobalStateContext)
  const { location } = props
  const activeTab = state.tabs.find(tab => tab.path === location)
  return (
    <PageLayout>
      <Container color={activeTab.color}>
        <Header />
        {props.children}
        {/* <Footer /> */}
      </Container>
    </PageLayout>
  )
}

export default Layout

const PageLayout = styled.div`
  height: 100vh;
  background: beige;
  padding: 50px 200px;
`

const Container = styled.div`
  background: ${props => props.color};
  height: 750px;
  overflow: auto;
`
