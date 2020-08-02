import React, { FC } from "react"

type Props = {}

const Footer: FC<Props> = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 50,
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <div>
        <p style={{ marginBottom: 0 }}>©2020 Tran Thu Trang Original Site</p>
      </div>
    </div>
  )
}

export default Footer
