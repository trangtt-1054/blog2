import React, { FC, useContext, useState } from "react"
import PostList from "./PostList"
import styled from "styled-components"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"
import searchIcon from "../../assets/elements/search-icon.svg"
import { Link } from "gatsby"

type Props = {
  posts: any
}

const perPage = 3

const PostPageContainer: FC<Props> = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const { posts } = props
  const tagList: string[] = []

  posts.forEach(post =>
    post.node.frontmatter.tags.forEach(
      (tag: string) => !tagList.includes(tag) && tagList.push(tag)
    )
  )

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
        <div>
          {state.searchTerm && `Search results for "${state.searchTerm}"`}
        </div>
        <Category>
          categories
          <CategoryList>
            {tagList.map(tag => (
              <Tag>
                <Link to={`/stories/tags/${tag}`}>#{tag}</Link>
              </Tag>
            ))}
          </CategoryList>
        </Category>
      </SideBar>
      <PostsArea>
        <PostList myList={myList} hasMore={hasMore} seeMore={seeMore} />
      </PostsArea>
    </PageWrapper>
  )
}

export default PostPageContainer

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  height: 100%;
`

const SideBar = styled.div`
  grid-column: 1 / 2;
  overflow: hidden;
`

const SearchArea = styled.div`
  display: flex;
  margin-bottom: 100px;
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
  border: 4px solid #33302b;
  background: transparent;
  font-weight: 800;
  border-radius: 10px;
  font-size: 20px;
  color: #33302b;
  padding: 0 15px 6px;
  &:focus {
    outline: 0;
  }
  &:hover {
    background: #f5d7d4;
  }
`

const Category = styled.div``

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.div`
  border-radius: 7px;
  border: 3px solid #33302b;
  font-weight: 700;
  padding: 1px 12px 5px;
  margin-right: 6px;
  margin-bottom: 6px;
`

const PostsArea = styled.div`
  grid-column: 2;
  overflow-y: scroll;
`
