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
import activeTabDragging from "../../assets/elements/active-tab-dragging.svg"
import inactiveDragging from "../../assets/elements/inactive-tab-dragging.svg"
import activeTabSp from "../../assets/elements/active-tab-sp.svg"
import inactiveTabSp from "../../assets/elements/inactive-tab-sp.svg"
import { light } from "../../theme"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { size } from "../../theme/size"

type TabProps = {
  active: boolean
  isDragging: boolean
}

const reorder = (list: TabInfo[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const getListStyle = (isDraggingOver: boolean) => ({
  display: "flex",
})

type Props = {}

const Header: FC<Props> = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const isMobile = useMediaQuery(size("xs"))
  console.log(isMobile)

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

  const getTabImg = (active: boolean, isDragging: boolean) => {
    if (active) {
      if (isMobile) return activeTabSp
      return isDragging ? activeTabDragging : activeTab
    } else {
      if (isMobile) return inactiveTabSp
      return isDragging ? inactiveDragging : inactiveTab
    }
  }

  const getTabIconColor = (active: boolean, path: string) => {
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
                        isDragging={snapshot.isDragging}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          //src={tab.active ? activeTab : inactiveTab}
                          src={getTabImg(tab.active, snapshot.isDragging)}
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
  background: ${({ theme }) => (theme === "light" ? "transparent" : "#241663")};
  align-items: center;
  ${size("xs")} {
    justify-content: center;
  }
  ${size("xs", "md")} {
    min-width: 700px;
  }
`

const TabsWrapper = styled.div`
  display: flex;
  padding-left: 50px;
  ${size("xs")} {
    padding: 0;
  }
`

const TabDiv = styled.div<TabProps>`
  width: 135px;
  height: 46px;
  text-align: center;
  position: relative;
  overflow: ${({ active, isDragging }) =>
    active || isDragging ? "visible" : "hidden"};
  font-size: 22px;
  font-weight: 800;
  ${size("xs")} {
    width: 78px;
    height: 31px;
  }
`

const TabTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  ${size("xs")} {
    font-size: 17px;
  }
`

const TabIcon = styled.div`
  width: 16px;
  height: 16px;
  border: ${light.mainBorder};
  border-radius: 30px;
  margin-right: 6px;
  background: ${({ color }) => color};
  ${size("xs")} {
    /* width: 10px;
    height: 10px;
    border: ${light.subBorder}; */
    display: none;
  }
`

const MyLink = styled(Link)`
  color: #33302b;
  padding-bottom: 3px;
`

export default Header
