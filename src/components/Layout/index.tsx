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
        <Page>
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
  background: #ffebe5;
  border: 2px solid #676767;
  height: 82vh;
  border-radius: 15px;
  overflow: hidden;
  padding: 30px 30px;
`
const PageContent = styled.div`
  overflow-y: scroll;
  background: white;
  height: 100%;
`
