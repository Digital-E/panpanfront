import 'reset-css';

import '../styles/index.css'

import "../styles/flickity.css";

import { useEffect, useState } from 'react'

import { StateProvider } from "../store"

import { motion, AnimatePresence } from 'framer-motion'

import Lottie from "lottie-react";
import animation from "../public/lottieanimation/data.json";

import Body from "../components/body"
import CookieConsent from "react-cookie-consent"


import Header from '../components/header'
import Footer from '../components/footer'


import Grid from '../components/home/grid'
import Filter from '../components/home/filter'
import Islands from '../components/home/islands'
import Ticker from '../components/ticker'
import HomeSlider from '../components/home/home-slider'
import Loader from '../components/loader'


function MyApp({ Component, pageProps, router }) {

  let [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1
    }, 250)
  },[])


  let desktopVariants = {
    pageInitial: {
      opacity: 0
    },
    pageAnimate: {
      opacity: 1,
      transition: {
        duration: 1
      }
    },
    pageExit: {
      opacity: 0,
      // filter: "blur(20px)",
      transition: {
        opacity: {
          duration: 0.5
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
          <>
          <Header data={pageProps.data?.menuData} />
          {/* <Ticker data={pageProps.data?.footerData} />
          <Filter data={pageProps.data?.homeData?.filters} setActiveTags={(data) => setActiveTags(data)}/>
          <Grid />
          <Islands data={pageProps.data?.homeData} allProjects={pageProps.data?.allProjectsData} activeTags={activeTags}/> */}
          <HomeSlider allProjects={pageProps.data?.allProjectsData} />
          <Loader />
          </>
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
      <Lottie animationData={animation} loop={true} />
      <AnimatePresence mode='wait' onExitComplete={() => { window.scrollTo(0,0) }}>   
        <motion.div key={router.asPath} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={desktopVariants}> 
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      {/* <Footer data={pageProps.data?.footerData}/> */}
    </StateProvider>
  )
}

export default MyApp
