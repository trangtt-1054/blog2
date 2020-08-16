import React, { useContext, useEffect, useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import TagList from "../components/TagList"
import { GlobalDispatchContext } from "../context/GlobalContextProvider"
import GoBackButton from "../components/primitive/GoBackButton"
import calendar from "../assets/elements/calendar-icon-grey.svg"
import styled from "styled-components"
import { common, light } from "../theme"

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
          <GoBackButton />
          <Date>
            <img src={calendar} />
            {frontmatter.date}
          </Date>
        </MetaBar>
        <PostPage>
          <Banner>
            <Headline>
              <h2>{frontmatter.title}</h2>
            </Headline>
            {/* <p>{frontmatter.meta_title}</p>
        <TagList tags={frontmatter.tags} /> */}
            <FeatureImage>
              <Img
                fluid={frontmatter.featureImage.childImageSharp.fluid}
                alt={frontmatter.title}
              ></Img>
            </FeatureImage>
          </Banner>
          <MDXRenderer>{body}</MDXRenderer>
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
`
const MetaBar = styled.div`
  grid-column: 1 / 2;
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
`

const PostPage = styled.div`
  height: 100%;
  overflow-y: scroll;
  grid-column: 2 / 3;
  padding-right: 40px;
`

const Banner = styled.div`
  display: grid;
  grid-template-rows: 54px 54px auto;
  grid-auto-columns: 60px auto 60px;
  margin-bottom: 30px;
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
    margin-bottom: 0;
  }
`

const FeatureImage = styled.div`
  width: 80%;
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
`
