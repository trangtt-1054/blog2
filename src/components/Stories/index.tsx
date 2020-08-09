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

  const handleClearSearch = () => {
    setPostSource(posts)
    dispatch({ type: "SEARCH", payload: "" })
  }

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
    //dispatch({ type: "PAGE_CHANGE", payload: 1 })
    setPostSource(getSearchedPosts(e.target.value))
  }

  const myList = postSource.slice(0, state.pageIndex * perPage)

  return (
    <PageWrapper>
      <SideBar>
        {state.searchTerm && "terms exist"}
        <SearchArea>
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
          <ClearSearch onClick={handleClearSearch}>clear</ClearSearch>
        </SearchArea>
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

const SearchArea = styled.div`
  display: flex;
`

const SearchWrapper = styled.div`
  display: flex;
  border: 4px solid #33302b;
  height: 44px;
  width: 215px;
  border-radius: 10px;
  padding-left: 10px;
  margin-right: 10px;
`
const StyledInput = styled.input`
  border: 0;
  background: transparent;
  &:focus {
    outline: none;
  }
  font-style: italic;
  color: #87837c;
  font-weight: 600;
  width: 100%;
`

const SearchIcon = styled.img`
  height: 100%;
  padding: 4px 6px;
`

const ClearSearch = styled.button`
  height: 44px;
  width: 90px;
  border: 4px solid #33302b;
  background: transparent;
  font-weight: 800;
  border-radius: 10px;
  font-size: 20px;
  color: #33302b;
  padding-bottom: 6px;
  &:focus {
    outline: 0;
  }
  &:hover {
    background: #f5d7d4;
  }
`

const PostListContainer = styled(PostList)`
  grid-column: 2;
`
