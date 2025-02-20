import React, { FC, useContext } from "react"
import Header from "../Header"
//import { GlobalStateContext } from "../../context/GlobalContextProvider"
import { common, light } from "../../theme"
import { size } from "../../theme/size"
import styled from "styled-components"

type Props = {
  location: string
}

const Layout: FC<Props> = props => {
  // const state = useContext(GlobalStateContext)
  // const { location } = props
  //const activeTab = state.tabs.find(tab => tab.path === location)
  return (
    <PageLayout>
      <Container>
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
  padding-top: 30px;
  --stripe: #fbf5e6;
  --bg: #f5d7d4;
  background: linear-gradient(135deg, var(--bg) 25%, transparent 25%) -50px 0,
    linear-gradient(225deg, var(--bg) 25%, transparent 25%) -50px 0,
    linear-gradient(315deg, var(--bg) 25%, transparent 25%),
    linear-gradient(45deg, var(--bg) 25%, transparent 25%);
  background-size: 100px 100px;
  background-color: var(--stripe);
  height: 100vh;
  ${size("xs", "md")} {
    min-width: 750px;
  }
  ${size("xs")} {
    padding-top: 15px;
  }
`

const Container = styled.div`
  margin: auto;
  max-width: 85%;
  position: relative;

  ${size("xl")} {
    max-width: 90%;
  }
  ${size("xs", "md")} {
    max-width: 95%;
    min-width: 700px;
  }
  ${size("xs")} {
    max-width: 95%;
  }
`

const Page = styled.div`
  background: #fbf5e6;
  border: ${light.mainBorder};
  height: 87vh;
  border-radius: ${common.mainRadius};
  overflow: hidden;
  padding: 30px 25px 30px 30px;
  ${size("xs")} {
    border: ${light.subBorder};
    border-radius: ${common.subRadius};
    height: 91vh;
    padding: 15px 10px 15px 15px;
  }
`
const PageContent = styled.div`
  /* overflow-y: scroll; */
  height: 100%;
`
