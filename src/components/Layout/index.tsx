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
  height: 100vh;
  padding: 50px 200px;
`

const Container = styled.div`
  max-height: 750px;
  position: relative;
`

const Page = styled.div`
  background: #ffebe5;
  border: 2px solid #676767;
  height: 700px;
  border-radius: 15px;
  overflow: scroll;
`
const PageContent = styled.div``
