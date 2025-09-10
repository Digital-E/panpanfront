import 'reset-css';

import '../styles/index.css'

import "../styles/flickity.css";

import { useEffect, useState } from 'react'

import { StateProvider } from "../store"

import { motion, AnimatePresence } from 'framer-motion'

import styled from "styled-components"

import Lottie from "lottie-react";
import animation from "../public/lottieanimation/data.json";

import Body from "../components/body"
import CookieConsent from "react-cookie-consent"


import Header from '../components/header'

import HomeSlider from '../components/home/home-slider'
import Loader from '../components/loader'


let Footer = styled.footer`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  padding: 15px 25px;
  box-sizing: border-box;
  z-index: 1;
  pointer-events: none;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: all;
  }


  * {
    font-family: Ciron;
    font-size: 0.875rem;
    text-transform: uppercase;
  }

  svg {
    position: relative;
    top: -1px;
    margin-right: 5px;
  }

  @media(max-width: 989px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 25px 15px;

    > div:first-child {
      margin-bottom: 10px;
    }
  }
`


let Wrapper = styled.div`
  background-color: var(--background);
  height: 100vh;

  @media(max-width: 989px) {
      position: fixed;
      height: 100%;

      > footer::before {
        content: "";
        position: absolute;
        left: 0px;
        top: 0px;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg, transparent 0%, var(--white) 80%);
        z-index: -1;      
      }
  }
`

let LottieWrapper = styled.div`
  svg {
    top: 5px;
    left: 0px;
    position: fixed;
    height: auto !important;
    transition: width 1s;
  }

  &&.no-transition-duration svg {
    transition: 0s;
  }

  @media(min-width: 990px) {
    &&.reduce-size > div > svg {
      width: 23% !important;
    }
  }


  @media(max-width: 989px) {
    svg {
      top: 35px;
    }
  }
`

let IntroVideoContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  width: fit-content;
  left: 50%;
  top: ${props => props.top}px;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  max-width: 100%;
  transform: translateX(-50%);
  z-index: 2;

  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media(max-width: 989px) {
    // height: ${props => props.height - 100}px;
    > div:nth-child(2) {
      display: none;
    }
  }
`

let IntroVideo = styled.div`
    margin: 0 10px;

    @media(max-width: 989px) {
      margin: 0 20px
    }
`

let loadedVideosCount = 0;

let stopLogoAnimation = false;

let loopAmount = true;

let frameCount = 0;

function MyApp({ Component, pageProps, router }) {

  let [activeTags, setActiveTags] = useState([]);
  let [displayIntroVideo, setDisplayIntroVideo] = useState("initial");
  let [lottieWrapperHeight, setLottieWrapperHeight] = useState(0)
  let [introVideosHeight, setIntroVideosHeight] = useState(0);
  let [introVideosWidth, setIntroVideosWidth] = useState(0);
  // let [loopAmount, setLoopAmount] = useState(true);
  // let [stopLogoAnimation, setStopLogoAnimation] = useState(false);


  let showHeaderFooter = () => {
    document.querySelector("header").style.transition = "opacity 1s"
    document.querySelector("header").style.opacity = 1
    document.querySelector("footer").style.transition = "opacity 1s"
    document.querySelector("footer").style.opacity = 1
  }

  let displayGrid = () => {
    stopLogoAnimation = true;
    document.querySelector(".lottie-wrapper").classList.add("reduce-size")
    setTimeout(() => {
      document.querySelector(".lottie-wrapper").classList.add("no-transition-duration")
    }, 750);
    setDisplayIntroVideo("exit")

    setTimeout(() => {
      document.querySelector(".home-container").style.opacity = 1
    }, 500)
  }

  let resize = () => {
    let lottieWrapperHeight = 
    document.querySelector('.lottie-wrapper').children[0].children[0].getBoundingClientRect().height + 5 
    + 
    document.querySelector('.lottie-wrapper').children[0].children[0].getBoundingClientRect().top

    setLottieWrapperHeight(lottieWrapperHeight)
    setIntroVideosHeight(window.innerHeight - lottieWrapperHeight - document.querySelector("footer").getBoundingClientRect().height)

    if(window.innerWidth > 989) {
      setIntroVideosWidth((window.innerHeight - lottieWrapperHeight - document.querySelector("footer").getBoundingClientRect().height) * 1.2)
    } else {
      setIntroVideosWidth((window.innerHeight - lottieWrapperHeight - document.querySelector("footer").getBoundingClientRect().height) * 0.6)
    }
  }  

  useEffect(() => {
    // setTimeout(() => {
    //   document.querySelector("body").style.opacity = 1
    //   document.querySelector("header").style.opacity = 0
    //   document.querySelector("footer").style.opacity = 0
    //   document.querySelector(".home-button").style.opacity = 0
    // }, 0)

    resize();


    setTimeout(() => {
      setDisplayIntroVideo("animate")
      showHeaderFooter();
    }, 3000)

    window.addEventListener("click", displayGrid)

    window.addEventListener("wheel", displayGrid)

    window.addEventListener('resize', resize)

    return () => {
        window.removeEventListener('resize', resize)
    }
  },[])


  let hasLoadedFunc = (e) => {
    // hasLoadedVar = true;
    // setHasLoaded(true)
    loadedVideosCount += 1;

    if(window.innerWidth < 990 && loadedVideosCount === 1) {
    }
    

    if(loadedVideosCount === 2 || (window.innerWidth < 990 && loadedVideosCount === 1)) {
      document.querySelector("body").style.opacity = 1
      document.querySelector("header").style.opacity = 0
      document.querySelector("footer").style.opacity = 0
      document.querySelector(".home-button").style.opacity = 0  
    }  
  }

  let checkIfStopLogoAnimation = () => {

    if((frameCount % 1 === 0) && stopLogoAnimation) {
      // setLoopAmount(false);
      loopAmount = false;
    }

    frameCount += 1;
  }


  let desktopVariants = {
    pageInitial: {
      // opacity: 0,
      // opacity: 1
    },
    pageAnimate: {
      // opacity: 1,
      // transition: {
      //   duration: 0,
      //   delay: 0
      // }
    },
    pageExit: {
      // opacity: 0,
      // opacity: 1,
      // filter: "blur(20px)",
      // transition: {
      //   opacity: {
      //     duration: 0,
          // delay: 0.5
        //   delay: 0
        // },
        // filter: {
        //   duration: 0.5,
        // }
      // }
    }
  }  

  let introVideoVariants = {
    initial: {
      opacity: 0,
      x: "-50%",
      y: "20%"
    },
    animate: {
      opacity: 1,
      x: "-50%",
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      x: "-50%",
      y: "-20%",
      opacity: 0,
      // filter: "blur(20px)",
      transition: {
        transition: {
          duration: 1
        }
        // opacity: {
        //   duration: 1,
        // },
        // filter: {
        //   duration: 0.5,
        // }
      },
      transitionEnd: {
        display: "none"
      }
    }
  }  

  return (
    <StateProvider>
      {
        pageProps.data?.homeData !== undefined ?
        (
          <Wrapper>
            <Header data={pageProps.data?.menuData} positionFixed={false} />
            {/* <MobileHeaderSpacer>
              <Header data={pageProps.data?.menuData} />
            </MobileHeaderSpacer> */}
            <HomeSlider allProjects={pageProps.data?.allProjectsData} />
            <Footer>
              <div>Creative Production Company</div>
              <div>
                <a href="https://www.instagram.com/" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <g id="Groupe_116" data-name="Groupe 116" transform="translate(-1241 -740)">
                    <path id="Rectangle_13" data-name="Rectangle 13" d="M4,1.2A2.8,2.8,0,0,0,1.2,4v8A2.8,2.8,0,0,0,4,14.8h8A2.8,2.8,0,0,0,14.8,12V4A2.8,2.8,0,0,0,12,1.2H4M4,0h8a4,4,0,0,1,4,4v8a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z" transform="translate(1241 740)"/>
                    <path id="Rectangle_14" data-name="Rectangle 14" d="M4,1.2A2.8,2.8,0,1,0,6.8,4,2.8,2.8,0,0,0,4,1.2M4,0A4,4,0,1,1,0,4,4,4,0,0,1,4,0Z" transform="translate(1245 745)"/>
                    <path id="Rectangle_15" data-name="Rectangle 15" d="M1,0A1,1,0,1,1,0,1,1,1,0,0,1,1,0Z" transform="translate(1252 743)"/>
                  </g>
                </svg>                
                Instagram
                </a>
              </div>
            </Footer>
            <Loader />
          </Wrapper>
        )
        :
        null
      }
      {/* <CookieConsent
        buttonText={pageProps.data?.menuData.cookieaccept}
        declineButtonText={pageProps.data?.menuData.cookierefuse}
        enableDeclineButton
        cookieName={"ContrechampsCHCookieConsent"}
        onAccept={() => {
          // gtag('consent', 'update', {
          //   'analytics_storage': 'granted'
          // });
        }}
        onDecline={() => {}}
        >
        <Body content={pageProps.data?.menuData.cookietext} />
      </CookieConsent> */}              
      {/* <Component {...pageProps} /> */}
      <IntroVideoContainer variants={introVideoVariants} initial={"initial"} animate={displayIntroVideo} top={lottieWrapperHeight} height={introVideosHeight} width={introVideosWidth}>
        <IntroVideo>
        <video
            // ref={videoRef}
            preload="auto"
            id='video-intro'
            playsInline
            autoPlay 
            muted
            loop
            // onProgress={(e) => console.log(e)}
            // onCanPlayThrough={() => console.log('loaded')}
            // src={videoId}
            src={`https://player.vimeo.com/progressive_redirect/playback/1094423995/rendition/540p/file.mp4?loc=external&log_user=0&signature=95c743461e52cfe450e28c9b355114ae53f6176e4beed39f368696dcee4282b0`}
            onLoadedData={hasLoadedFunc}
            onPlay={hasLoadedFunc}
            // data-poster="/path/to/poster.jpg"
        />
        </IntroVideo>
        <IntroVideo>
        <video
            // ref={videoRef}
            preload="auto"
            id='video-intro'
            playsInline
            autoPlay 
            muted
            loop
            // onProgress={(e) => console.log(e)}
            // onCanPlayThrough={() => console.log('loaded')}
            // src={videoId}
            src={`https://player.vimeo.com/progressive_redirect/playback/1094404837/rendition/540p/file.mp4?loc=external&log_user=0&signature=5a51b40b84fd1e87d372b31337e5713884ba6217b2869d3ed2efbac4184da6aa`}
            onLoadedData={hasLoadedFunc}
            onPlay={hasLoadedFunc}
            // data-poster="/path/to/poster.jpg"
        />
        </IntroVideo>   
      </IntroVideoContainer>
      <LottieWrapper className='lottie-wrapper'>
        <Lottie animationData={animation} loop={loopAmount} onComplete={() => showHeaderFooter()} onEnterFrame={() => checkIfStopLogoAnimation()}/>
      </LottieWrapper>
      <AnimatePresence 
        mode='wait' 
        // onExitComplete={() => { window.scrollTo(0,0) }}
        >   
        <motion.div key={router.asPath} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={desktopVariants}> 
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      {/* <Footer data={pageProps.data?.footerData}/> */}
    </StateProvider>
  )
}

export default MyApp
