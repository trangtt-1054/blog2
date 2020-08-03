// import { useState, useContext, useEffect, useCallback, useMemo } from "react"
// import {
//   GlobalDispatchContext,
//   GlobalStateContext,
// } from "../context/GlobalContextProvider"

// const usePagination = ({ list, perPage }) => {
//   const dispatch = useContext(GlobalDispatchContext)
//   const state = useContext(GlobalStateContext)
//   const [pageIndex, setPageIndex] = useState(1)

//   const hasNextPage = pageIndex * perPage < list.length ? true : false

//   const loadNextPage = () => {
//     if (!hasNextPage) {
//       return
//     }
//     setPageIndex(currentPage => currentPage + 1)
//   }

//   const filtered = list.slice(0, pageIndex * perPage)
//   //console.log(filtered)

//   return { filtered, hasNextPage, loadNextPage }
// }

// export default usePagination
