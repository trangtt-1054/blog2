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
import inactiveTab from "../../assets/elements/inactive-tab.svg"
import activeTab from "../../assets/elements/active-tab.svg"

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
  display: "flex",
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

  const getTabIconColor = (active: boolean, path: string) => {
    console.log(active, path)
    if (active) {
      if (path === "/") return "#FF9B0C"
      if (path === "/portfolio") return "#E544FF"
      if (path === "/stories") return "#26F0F5"
      if (path === "/about") return "#42EB5D"
    } else if (!active) {
      if (path === "/") return "#EEBD7F"
      if (path === "/portfolio") return "#D184DD"
      if (path === "/stories") return "#75C9CB"
      if (path === "/about") return "#9AD4A3"
    }
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
                        active={tab.active}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={tab.active ? activeTab : inactiveTab}
                          alt="Tab background"
                        />
                        <TabTitle>
                          <TabIcon
                            color={getTabIconColor(tab.active, tab.path)}
                          ></TabIcon>
                          <MyLink to={tab.path}>{tab.content}</MyLink>
                        </TabTitle>
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
  overflow: ${({ active }) => (active ? "visible" : "hidden")};
  font-size: 22px;
  font-weight: 800;
`

const TabTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
`

const TabIcon = styled.div`
  width: 16px;
  height: 16px;
  border: 4px solid #33302b;
  background: #eebd7f;
  border-radius: 30px;
  margin-right: 6px;
  background: ${({ color }) => color};
`

const MyLink = styled(Link)`
  text-decoration: none;
  color: #33302b;
  padding-bottom: 3px;
`

export default Header
