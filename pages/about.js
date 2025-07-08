import { useEffect, useRef, useState, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { homeQuery, previewHomeQuery, aboutQuery, previewAboutQuery, allProjectsQuery, previewAllProjectsQuery,menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import { store } from "../store"

import { useMediaQuery } from 'react-responsive';

import { motion } from 'framer-motion'

import styled from 'styled-components'

import Body from "../components/body"

import Header from "../components/header"

const Container = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    z-index: 999;
    pointer-events: none;

    a {
      text-decoration: none;
    }

    @media(max-width: 989px) {
      position: fixed;
    }    
`

const ContainerInner = styled(motion.div)`
    position: absolute;
    background: var(--blue);
    pointer-events: all;

    @media(max-width: 989px) {
      height: 100%;
    }
`


const Columns = styled(motion.div)`
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    text-align: center;
    color: var(--white);
    width: 75%;
    margin: 50px auto 0 auto;

    > div:nth-child(2) {
        margin-top: 140px;
        margin-bottom: 30px;
    }

    * {
      font-size: 1.5rem;
      line-height: 2rem;
    }

    @media(max-width: 989px) {
      position: absolute;
      overflow: scroll;
      height: 100%;
      width: 100%;
      padding: 0 15px;
      margin: 0px auto 0 auto;

      > div:first-child {
        margin-top: 45px;
      }


      > div:nth-child(2) {
          margin-bottom: 70px;
      }

      * {
        font-size: 1.125rem;
        line-height: 1.5rem;
      } 
    }
`;

const CloseButton = styled.div`
    position: fixed;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.2s;
    z-index: 999;


    @media(max-width: 989px) {
        left: 50%;
        right: auto;
        transform: translateY(-50%);
        top: auto;
        bottom: 15px;
    }
`

let Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  height: 100% !important;
  width: 100vw !important;
  z-index: 1;
  transform: none !important;
  pointer-events: all;
  // backdrop-filter: blur(2px);

  @media(min-width: 990px) {
    // backdrop-filter: blur(20px);
  }
`

let ColumnsWrapper = styled.div`
    position: relative;
    height: 100%;

    @media(max-width: 989px) {
      ::before {
        content: "";
        position: absolute;
        left: 0px;
        top: 0px;
        height: 30px;
        width: 100%;
        background: linear-gradient(0deg, transparent 0%, var(--blue) 80%);
        z-index: 2;
      } 

      ::after {
        content: "";
        position: absolute;
        left: 0px;
        bottom: 0;
        height: 70px;
        width: 100%;
        background: linear-gradient(-180deg, transparent 0%, var(--blue) 90%);
        z-index: 2;
      }      
    }   
`



export default function About({ data = {}, preview }) {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context;    

  const isDesktop = useMediaQuery({
    query: '(min-width: 990px)'
  })
  

  const router = useRouter()

  let containerRef = useRef();

  let columnsWrapperRef = useRef();

  let [reveal, setReveal] = useState(false);
  


  const slug = data?.aboutData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }


  let resize = () => {
    let headerHeight = document.querySelector("header").getBoundingClientRect().height;

    columnsWrapperRef.current.style.height = `calc(100% - ${headerHeight}px`
  }  

  useEffect(() => {
    // setTimeout(() => {
      resize();
    // }, 300)

    window.addEventListener('resize', resize)

    return () => {
        window.removeEventListener('resize', resize)
    }
  }, []);

  useEffect(() => {
    // document.querySelector("header").classList.add("gray-scheme");
  }, []);

  let hasClicked = () => {
    router.push("/")
  } 
  
  let overlayVariants = {
    pageAnimate: {
      opacity: 1,
      display: "block",
      transition: {
        duration: 0.3
      },
    },
    pageExit: {
      opacity: 0,
      transition: {
        duration: 1
      },
      // transitionEnd: {
      //   display: "none",
      // },
    }
  }  

  // let variants = {
  //     open: {
  //       opacity: 1,
  //       display: 'flex',
  //       transition: {
  //           duration: 1
  //       }
  //     },
  //     closed: {
  //       opacity: 0,
  //       transition: {
  //           duration: 0.3
  //       },
  //     }
  // }  

  let variants = {
      pageInitial: {
        y: "-100%",
        transition: {
            duration: 0
        },        
      },
      pageAnimate: {
        y: 0,
        transition: {
            duration: 0.5,
            // ease: "easeInOut"
            // delay: 0.5
        }
      },
      pageExit: {
        y: "-100%",
        transition: {
            duration: 0.5,
            // ease: "easeInOut"
        },
      }
  }   
  
  let innervariants = {
    pageInitial: {
      opacity: 0,
      transition: {
          duration: 0
      },        
    },
    pageAnimate: {
      opacity: 1,
      transition: {
          duration: 1,
          delay: 0.1
      }
    },
    pageExit: {
      opacity: 0,
      transition: {
          duration: 0.2
      },
    }
  }  

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.aboutData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.aboutData?.content}
          />
        </Head>
        <Container ref={containerRef} 
        // initial="closed" animate={reveal ? "open" : "closed"} variants={variants}
        >
            <ContainerInner
              variants={variants}
            >
              <Header data={data?.menuData} colorSchemeGray={true} />
              <CloseButton onClick={() => hasClicked()}>
                  <svg width="19.414" height="19.414" viewBox="0 0 19.414 19.414">
                  <g id="Groupe_2" data-name="Groupe 2" transform="translate(-1320.293 -413.293)">
                      <g id="Groupe_1" data-name="Groupe 1" transform="translate(1321 414)">
                      <line id="Ligne_1" data-name="Ligne 1" y1="18" x2="18" fill="none" stroke="#fff" stroke-width="2"/>
                      <line id="Ligne_2" data-name="Ligne 2" x1="18" y1="18" fill="none" stroke="#fff" stroke-width="2"/>
                      </g>
                  </g>
                  </svg>                    
              </CloseButton> 
              <ColumnsWrapper ref={columnsWrapperRef}>         
                <Columns 
                // variants={innervariants}
                >
                  <div>
                    <div>
                      <Body content={data?.aboutData?.textcolumnone} />
                    </div>
                  </div>
                  <div>
                    <div><Body content={data?.aboutData?.textcolumntwo} /></div>
                  </div>
                </Columns>
              </ColumnsWrapper>    
            </ContainerInner>
        </Container>
        <Overlay variants={overlayVariants} onClick={() => hasClicked()}/>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let slug = `about`

  let homeData = await getClient(preview).fetch(homeQuery)

  let aboutData = await getClient(preview).fetch(aboutQuery, {
    slug: slug,
  })

  let allProjectsData = await getClient(preview).fetch(allProjectsQuery)

  if(preview) {
    homeData = await getClient(preview).fetch(previewHomeQuery) 

    aboutData = await getClient(preview).fetch(previewAboutQuery, {
      slug: slug,
    })

    allProjectsData = await getClient(preview).fetch(previewAllProjectsQuery)
  }

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  const footerData = await getClient(preview).fetch(footerQuery);

  return {
    props: {
      preview,
      data: {
        homeData,
        aboutData,
        allProjectsData,
        menuData,
        footerData
      }
    }
  }
}
