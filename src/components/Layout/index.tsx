import React, { FC, useContext } from "react"
import Header from "../Header"
import { GlobalStateContext } from "../../context/GlobalContextProvider"
//import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd"
import styled from "styled-components"

type Props = {
  location: string
}

const Layout: FC<Props> = props => {
  const handleDragEnd = (result: any) => {
    console.log(result)
  }
  const state = useContext(GlobalStateContext)
  const { location } = props
  const activeTab = state.tabs.find(tab => tab.path === location)
  return (
    <PageLayout>
      {/* <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable key="key" draggableId="id" index={0}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  > */}
      <Container color={activeTab.color}>
        <Header />
        {props.children}
        {/* <Footer /> */}
      </Container>
      {/* </div>
                )}
              </Draggable>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> */}
    </PageLayout>
  )
}

export default Layout

const PageLayout = styled.div`
  height: 100vh;

  padding: 50px 200px;
`

const Container = styled.div`
  background: ${props => props.color};
  height: 750px;
  overflow: auto;
  position: relative;
`
