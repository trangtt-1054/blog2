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
      <Container>
        <Header />
        <Page active={activeTab.active}>
          <PageContent>{props.children}</PageContent>
        </Page>
      </Container>
    </PageLayout>
  )
}

export default Layout

const PageLayout = styled.div`
  /* padding: 50px 200px; */
`

const Container = styled.div`
  /* max-height: 75vh; */
  max-width: 80%;
  margin: 6vh auto;
  position: relative;
`

const Page = styled.div`
  background: #fbf5e6;
  border: 4px solid #33302b;
  height: 82vh;
  border-radius: 17px;
  overflow: hidden;
  padding: 30px 30px;
`
const PageContent = styled.div`
  overflow-y: scroll;
  background: white;
  height: 100%;
`
