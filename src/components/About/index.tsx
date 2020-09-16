import React, { useContext, useState } from "react"
import styled from "styled-components"
import cat from "./img/cat.jpeg"
import trang from "./img/trang20.jpg"
import girl from "./img/girl.jpg"
import NextIcon from "../../assets/elements/triangle-next.svg"
import BackIcon from "../../assets/elements/triangle-back.svg"
import HeartIcon from "../../assets/elements/heart.svg"
import HeartFilledIcon from "../../assets/elements/heart_filled.svg"
import CommentIcon from "../../assets/elements/comment.svg"
import ShareIcon from "../../assets/elements/share.svg"
import BookmarkIcon from "../../assets/elements/bookmark.svg"
import BookmarkFilledIcon from "../../assets/elements/bookmark-filled.svg"
import {
  GlobalLikeContext,
  GlobalLikeDispatch,
} from "../../context/GlobalLikeProvider"

import { light, common } from "../../theme"
import { size } from "../../theme/size"

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel"
import "pure-react-carousel/dist/react-carousel.es.css"

const About = () => {
  const state = useContext(GlobalLikeContext)
  const dispatch = useContext(GlobalLikeDispatch)

  console.log(state)
  console.log("ahihi")

  return (
    <Root>
      <Left>
        <ImgWrapper>
          <ImgHeader>
            <HeaderIcon />
            <HeaderIcon />
            <HeaderIcon />
          </ImgHeader>
          <ImgSlider>
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={80}
              totalSlides={3}
              dragEnabled
            >
              <Slider>
                <Slide index={0}>
                  <img src={trang} alt="book" />
                </Slide>
                <Slide index={1}>
                  <img src={cat} alt="car" />
                </Slide>
                <Slide index={2}>
                  <img src={girl} alt="sakura" />
                </Slide>
              </Slider>
              <SlideButtonBack>
                <img src={BackIcon} />
              </SlideButtonBack>
              <SlideButtonNext>
                <img src={NextIcon} />
              </SlideButtonNext>
            </CarouselProvider>
          </ImgSlider>
          <ImgFooter>
            <Icons>
              <SocialIcons>
                <div
                  onClick={() => dispatch({ type: "LIKE" })}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={state.liked ? HeartFilledIcon : HeartIcon}
                    alt="heart"
                  />
                </div>
                <img src={CommentIcon} alt="" />
                <img src={ShareIcon} alt="heart" />
              </SocialIcons>
              <div
                onClick={() => dispatch({ type: "SAVE" })}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={state.saved ? BookmarkFilledIcon : BookmarkIcon}
                  alt="bookmark"
                />
              </div>
            </Icons>
            <Content>
              <Author>tranthutrang1702</Author>
              <Text>I don't usually smile. But sometimes I do. 😊💕😁</Text>
              <Time>Just now</Time>
            </Content>
          </ImgFooter>
        </ImgWrapper>
      </Left>
      <Right></Right>
    </Root>
  )
}

export default About

const Root = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  width: 100%;
  height: 100%;
`

const Left = styled.div`
  width: 100%;
  height: 100%;
`

const ImgWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 40px auto 180px;
`

const ImgHeader = styled.div`
  width: 100%;
  border: ${light.mainBorder};
  border-radius: 17px 17px 0 0;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background: #fff;
  overflow: hidden;
`

const HeaderIcon = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50px;
  border: ${light.subBorder};
  margin-right: 8px;
  &:first-of-type {
    cursor: pointer;
    &:hover {
      background: ${light.accentColor};
    }
  }
`

const ImgSlider = styled.div`
  width: 100%;
  border-left: ${light.mainBorder};
  border-right: ${light.mainBorder};
  overflow: hidden;
  position: relative;
  .carousel > div {
    overflow: visible;
  }

  img {
    height: 100%;
    width: 100%;
  }
  li > div {
    height: auto;
  }
`

const ButtonStyles = `
  width: 45px;
  height: 45px;
  border-radius: 50px;
  background: ${light.baseColor};
  border: ${light.subBorder};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 21px;
    margin-bottom: 0;
  }
  &:hover {
    background: ${light.accentColor}
  }

`

const SlideButtonNext = styled(ButtonNext)`
  ${ButtonStyles}
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 9px;
  right: 10px;
`
const SlideButtonBack = styled(ButtonBack)`
  ${ButtonStyles}
  top: 50%;
  transform: translateY(-50%);
  padding-right: 9px;
  left: 10px;
`

const ImgFooter = styled.div`
  width: 100%;
  border: ${light.mainBorder};
  border-radius: 0 0 17px 17px;
  padding: 13px;
  background: #fff;
  overflow: hidden;
`

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
`

const SocialIcons = styled.div`
  display: flex;
  height: 26px;
  img {
    margin-right: 8px;
    margin-bottom: 0;
  }
`

const Content = styled.div``

const Author = styled.div`
  font-weight: 700;
`

const Text = styled.div``

const Time = styled.div`
  color: #87837c;
  font-size: 15px;
  font-style: italic;
`

const Right = styled.div`
  width: 100%;
  height: 100%;
`
