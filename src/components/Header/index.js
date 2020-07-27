import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { Link } from "gatsby"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 8

const getTabItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  borderRadius: 10,
  background: isDragging ? "#96bb7c" : "#eebb4d",
  ...draggableStyle,
  textTransform: "uppercase",
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#fccbcb" : "#8fcfd1",
  display: "flex",
  padding: grid,
  overflow: "auto",
})

const Header = () => {
  const [tabs, setTabs] = useState([
    { id: "tab-0", path: "/", content: "Home" },
    { id: "tab-1", path: "/stories", content: "Stories" },
    { id: "tab-2", path: "/portfolio", content: "Portfolio" },
    { id: "tab-3", path: "/about", content: "Bout" },
  ])

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const newTabsOrder = reorder(
      tabs,
      result.source.index,
      result.destination.index
    )

    setTabs(newTabsOrder)
  }

  return (
    <div>
      <h2>I don't usually smile, but sometimes I do.</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {tabs.map((tab, index) => (
                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getTabItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Link
                        style={{ textDecoration: "none", width: "100%" }}
                        to={tab.path}
                      >
                        {tab.content}
                      </Link>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Header
