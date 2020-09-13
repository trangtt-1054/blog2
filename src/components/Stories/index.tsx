import React, { FC, useContext, useState } from "react"
import PostList from "./PostList"
import styled from "styled-components"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContextProvider"
import searchIcon from "../../assets/elements/search-icon.svg"
import GoBackButton from "../../components/primitive/GoBackButton"
import Button from "../../components/primitive/Button"
import TagItem from "../primitive/TagItem"
import { light, common } from "../../theme"
import { size } from "../../theme/size"

type Props = {
  posts: any
  pathContext?: string
}

const perPage = 3

const PostPageContainer: FC<Props> = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const { posts, pathContext } = props
  const tagList: string[] = []

  posts.forEach((post: any) =>
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
          <Button text="clear" size="main" onClick={handleClearSearch} />
        </SearchArea>
        <div>
          {state.searchTerm && `Search results for "${state.searchTerm}"`}
        </div>
        <Category>
          {pathContext ? (
            <div>
              <p>Rubbish stuff about {`"${pathContext}"`}</p>
              <GoBackButton />
            </div>
          ) : (
            <CategoryList>
              {tagList.map(tag => (
                <TagItem key={tag} text={tag} />
              ))}
            </CategoryList>
          )}
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
  grid-template-columns: 2fr 6fr;
  height: 100%;
  grid-column-gap: 10px;
  ${size("md")} {
    grid-template-columns: 3fr 4fr;
  }
  ${size("xs")} {
    display: block;
    overflow: auto;

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #f5d7d4;
      border-radius: 10px;
      border: none;
    }
  }
`

const SideBar = styled.div`
  grid-column: 1 / 2;
  overflow: hidden;
  ${size("xs")} {
  }
`

const SearchArea = styled.div`
  display: flex;
  margin-bottom: 100px;
  ${size("xl")} {
    flex-direction: column;
  }
  ${size("xs")} {
    flex-direction: row;
    margin-bottom: 0;
    justify-content: space-between;
    padding-right: 10px;
  }
`

const SearchWrapper = styled.div`
  display: flex;
  border: ${light.mainBorder};
  height: 44px;
  border-radius: ${common.subRadius};
  padding-left: 10px;
  margin-right: 10px;
  margin-bottom: 16px;
  ${size("xs")} {
    border: ${light.subBorder};
    border-radius: ${common.subRadius2};
    width: 100%;
    height: 37px;
    margin-bottom: 10px;
  }
`
const StyledInput = styled.input`
  outline: none;
  border: 0;
  background: transparent;
  font-style: italic;
  color: #87837c;
  font-weight: 600;
  width: 100%;
`

const SearchIcon = styled.img`
  height: 100%;
  padding: 4px 6px;
`

const Category = styled.div``

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${size("xs")} {
    padding-bottom: 9px;
  }
`

const PostsArea = styled.div`
  grid-column: 2;
  overflow-y: scroll;
  padding-right: 20px;
  ${size("xs")} {
    display: block;
    width: 100%;
    padding-right: 10px;
    overflow-y: auto;
  }
`
