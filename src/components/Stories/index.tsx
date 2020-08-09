import React, { FC, useContext, useState } from "react"
import PostList from "./PostList"
import styled from "styled-components"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"
import searchIcon from "../../assets/elements/search-icon.svg"

type Props = {
  posts: any
}

const perPage = 3

const PostPageContainer: FC<Props> = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const { posts } = props

  const getSearchedPosts = (keyword: string) => {
    const allPosts = [...posts]
    const regex = new RegExp(keyword, "gi")
    const searchResults = allPosts.reduce((acc, post) => {
      if (post.node.frontmatter.title.match(regex)) {
        acc.push(post)
      }
      return acc
    }, [])
    return searchResults
  }

  const initialSource = state.searchTerm
    ? getSearchedPosts(state.searchTerm)
    : posts
  const [postSource, setPostSource] = useState(initialSource)
  const hasMore = state.pageIndex * perPage < postSource.length ? true : false

  const seeMore = () => {
    if (!hasMore) {
      return
    }
    dispatch({ type: "PAGE_CHANGE", payload: state.pageIndex + 1 })
  }

  const handleChange = (e: any) => {
    dispatch({ type: "SEARCH", payload: e.target.value })
    dispatch({ type: "PAGE_CHANGE", payload: 1 })
    setPostSource(getSearchedPosts(e.target.value))
  }

  const myList = postSource.slice(0, state.pageIndex * perPage)

  return (
    <PageWrapper>
      <SideBar>
        {state.searchTerm && "terms exist"}
        <SearchWrapper>
          <StyledInput
            name="search"
            type=""
            id="search"
            placeholder="search posts..."
            onChange={handleChange}
            value={state.searchTerm}
          />
          <SearchIcon src={searchIcon} alt="search icon" />
        </SearchWrapper>
      </SideBar>
      <PostListContainer myList={myList} hasMore={hasMore} seeMore={seeMore} />
    </PageWrapper>
  )
}

export default PostPageContainer

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
`

const SideBar = styled.div`
  grid-column: 1 / 2;
  overflow: hidden;
`

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: 4px solid #33302b;
  height: 44px;
  width: 230px;
  border-radius: 10px;
  padding-left: 10px;
`
const StyledInput = styled.input`
  border: 0;
  background: transparent;
  &:focus {
    outline: none;
  }
`

const SearchIcon = styled.img`
  height: 100%;
  padding: 4px 6px;
`

const PostListContainer = styled(PostList)`
  grid-column: 2;
`
