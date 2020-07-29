import { useState } from "react"

const usePagination = ({ list, perPage }) => {
  const [pageIndex, setPageIndex] = useState(1)

  const hasNextPage = pageIndex * perPage < list.length ? true : false

  const loadNextPage = () => {
    if (!hasNextPage) {
      return
    }
    setPageIndex(currentPage => currentPage + 1)
  }

  const filtered = list.slice(0, pageIndex * perPage)

  return { filtered, hasNextPage, loadNextPage }
}

export default usePagination
