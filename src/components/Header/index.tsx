import React, { FC, useContext } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { Link } from "gatsby"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"
import ThemeToggler from "./themeToggler"
import styled from "styled-components"
import { TabInfo } from "../../types/TabInfo"
import { DropResult } from "react-beautiful-dnd"
import svg from "../../assets/elements/inactive-tab.svg"

const reorder = (list: TabInfo[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const grid = 8

const getTabItemStyle = (
  isDragging: boolean,
  draggableStyle: any,
  index: number
) => ({
  userSelect: "none",

  //background: isDragging ? "#96bb7c" : "#eebb4d",
  //background: colors[index % colors.length],
  ...draggableStyle,
  textTransform: "uppercase",
  fontWeight: 600,
})

const getListStyle = (isDraggingOver: boolean) => ({
  //background: "beige",
  display: "flex",
  // overflow: "auto",
})

type Props = {}

const Header: FC<Props> = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const newTabsOrder = reorder(
      state.tabs,
      result.source.index,
      result.destination.index
    )
    dispatch({ type: "DRAG_TAB", payload: newTabsOrder })
  }

  return (
    <HeaderWrapper theme={state.theme}>
      <TabsWrapper style={{ display: "flex" }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {state.tabs.map((tab, index) => (
                  <Draggable key={tab.id} draggableId={tab.id} index={index}>
                    {(provided, snapshot) => (
                      <TabDiv
                        color={tab.color}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img src={svg} alt="Tab background" />
                        <MyLink to={tab.path}>{tab.content}</MyLink>
                      </TabDiv>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </TabsWrapper>
      <ThemeToggler theme={state.theme} />
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => (theme === "light" ? "white" : "#241663")};
  align-items: center;
`

const TabsWrapper = styled.div`
  display: flex;
  padding-left: 50px;
`

const TabDiv = styled.div`
  width: 155px;
  height: 50px;
  text-align: center;
  position: relative;
  overflow: hidden;
`
const MyLink = styled(Link)`
  text-decoration: none;
  color: #676767;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Header
