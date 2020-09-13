import React, { useContext, useEffect, useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import GoBackButton from "../components/primitive/GoBackButton"
import TagItem from "../components/primitive/TagItem"
import calendar from "../assets/elements/calendar-icon-grey.svg"
import styled from "styled-components"
import { common, light } from "../theme"
import { size } from "../theme/size"

const PostTemplate = (props: any) => {
  const dispatch = useContext(GlobalDispatchContext)
  useEffect(() => dispatch({ type: "SET_ACTIVE_TAB", payload: "tab-1" }), [])

  const {
    data: {
      mdx: { frontmatter, body },
    },
  } = props

  return (
    <Layout location="/stories">
      <Wrapper>
        <MetaBar>
          <AllPostsButton />
          <Date>
            <img src={calendar} />
            {frontmatter.date}
          </Date>
          <CategoryList>
            {frontmatter.tags.map((tag: string) => (
              <TagItem key={tag} text={tag} />
            ))}
          </CategoryList>
        </MetaBar>
        <PostPage>
          <Banner>
            <Headline>
              <h2>{frontmatter.title}</h2>
            </Headline>
            <FeatureImage>
              <Img
                fluid={frontmatter.featureImage.childImageSharp.fluid}
                alt={frontmatter.title}
              ></Img>
            </FeatureImage>
          </Banner>
          <MDXProvider
            components={{
              h2: props => <h2 {...props} style={{ fontSize: 22 }} />,
              a: (props: any) => (
                <a
                  {...props}
                  style={{ textAlign: "center", display: "block" }}
                />
              ),
              span: (props: any) => (
                <span {...props} style={{ paddingBottom: 0 }} />
              ),
              img: props => (
                <img
                  {...props}
                  style={{
                    borderRadius: common.subRadius,
                    border: light.subBorder,
                    paddingBottom: 0,
                  }}
                />
              ),
            }}
          >
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </PostPage>
      </Wrapper>
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "MMMM DD, YY")
        slug
        title
        tags
        meta_title
        featureImage {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      id
      body
    }
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  height: 100%;
  overflow: auto;
  ${size("xs")} {
    display: block;
  }
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
`
const MetaBar = styled.div`
  grid-column: 1 / 2;
  ${size("xs")} {
    display: block;
    margin-bottom: 9px;
  }
`

const AllPostsButton = styled(GoBackButton)`
  ${size("xs")} {
    display: none;
  }
`

const Date = styled.div`
  margin-top: 30px;
  display: flex;
  font-size: 18px;
  font-weight: 300;
  align-items: center;
  text-transform: lowercase;
  color: #87837c;

  img {
    margin-bottom: 0;
    margin-right: 10px;
  }

  ${size("xs")} {
    margin-top: 0;
  }
`
const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  ${size("xs")} {
    margin-top: 10px;
  }
`

const PostPage = styled.div`
  height: 100%;
  overflow-y: scroll;
  grid-column: 2 / 3;
  padding-right: 40px;
  ${size("xs")} {
    overflow: visible;
    padding-right: 15px;
  }
`

const Banner = styled.div`
  display: grid;
  grid-template-rows: 54px 54px auto;
  grid-auto-columns: 0px auto 0px;
  margin-bottom: 30px;
  ${size("xs")} {
    grid-template-rows: minmax(40px, 50px) minmax(40px, 50px) auto;
  }
`

const Headline = styled.div`
  grid-row: 1 / span 2;
  grid-column: 2 / 3;
  text-align: center;
  background: white;
  border-radius: ${common.mainRadius};
  width: fit-content;
  margin: auto;
  height: 108px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border: ${light.subBorder};
  z-index: 10;
  max-width: 500px;
  h2 {
    margin: 0 auto 0;
  }
  ${size("xs")} {
    height: auto;
    border-radius: ${common.subRadius};
    width: 80%;
    padding: 10px;
    h2 {
      font-size: 21px;
    }
  }
`

const FeatureImage = styled.div`
  width: 70%;
  border-radius: ${common.subRadius};
  border: ${light.subBorder};
  overflow: hidden;
  text-align: center;
  margin: auto;
  grid-column: 2 / 3;
  grid-row: 2 / span 2;

  img {
    z-index: 1;
  }

  ${size("xs")} {
    width: 100%;
  }
`
