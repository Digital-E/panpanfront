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


  * {
    font-family: Ciron;
    font-size: 0.875rem;
    text-transform: uppercase;
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




function MyApp({ Component, pageProps, router }) {

  let [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("body").style.opacity = 1
    }, 500)

    return () => {
      // window.scrollTo(0, 100)
    }
  },[])


  let desktopVariants = {
    pageInitial: {
      opacity: 0
    },
    pageAnimate: {
      opacity: 1,
      transition: {
        duration: 0
      }
    },
    pageExit: {
      opacity: 0,
      // filter: "blur(20px)",
      transition: {
        opacity: {
          duration: 0,
          delay: 0.5
        },
        filter: {
          duration: 0.5,
        }
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
              <div><a href="https://www.instagram.com/" target="_blank">Instagram</a></div>
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
      {/* <Lottie animationData={animation} loop={true} /> */}
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
