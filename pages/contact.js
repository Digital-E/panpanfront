import { useEffect, useRef, useState, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { homeQuery, previewHomeQuery, contactQuery, previewContactQuery, allProjectsQuery, previewAllProjectsQuery,menuQuery, footerQuery } from '../lib/queries'
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
      color: var(--white);
    }

    @media(max-width: 989px) {
      position: fixed;
    }
`

const ContainerInner = styled(motion.div)`
    position: absolute;
    background: var(--blue);
    pointer-events: all;
    width: 100%;

    @media(max-width: 989px) {
      height: 100%;

      > header {
        padding-bottom: 0;
      }
    }
`


const Columns = styled(motion.div)`
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    text-align: center;
    color: var(--white);
    margin: 0 auto;

    > div:nth-child(1) {
        width: 75%;
        margin-top: 50px;
        margin-left: auto;
        margin-right: auto;
    }

    > div:nth-child(2) {
        margin-top: 140px;
        margin-bottom: 35px;
    }

    * {
      font-size: 1.5rem;
    }

    > div:nth-child(2) {
      line-height: 2rem;
    }

    @media(max-width: 989px) {
      position: absolute;
      overflow: scroll;
      width: 100%;
      height: 100%;
      padding: 0 15px;

      > div:first-child {
        margin: 0;
        width: 100%;
        margin-top: 45px;
        line-height: 1.5rem;
      } 
      
      > div:nth-child(2) {
        margin-top: 45px;
      }     

      * {
        font-size: 1.125rem;
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
  height: 100vh !important;
  width: 100vw !important;
  z-index: 1;
  transform: none !important;
  pointer-events: all;
  // backdrop-filter: blur(2px);

  @media(min-width: 990px) {
    // backdrop-filter: blur(20px);
  }
`

let TextItems= styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 25px;

  @media(max-width: 989px) {
    flex-direction: column;
    margin: 0;
  }
`

let TextItemColumn = styled.div`
  margin: 0 35px 0px 35px;

  @media(max-width: 989px) {
    margin: 0 0 35px 0;
  }
`

let TextItemColumnTitle = styled.div`
  margin-bottom: 10px;

  p {
    font-size: 1rem;
  }

  @media(max-width: 989px) {
    margin-bottom: 0;
  }
`

let TextItemColumnText = styled.div`
  * {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  @media(max-width: 989px) {
    * {
      font-size: 0.8125rem;
      line-height: 1.125rem;
    }
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
        bottom: 0px;
        height: 70px;
        width: 100%;
        background: linear-gradient(-180deg, transparent 0%, var(--blue) 90%);
        z-index: 2;
      }      
    }   
`


export default function Contact({ data = {}, preview }) {
  //Context
  const context = useContext(store);
  const { state, dispatch } = context;  

  const isDesktop = useMediaQuery({
    query: '(min-width: 990px)'
  })

  const router = useRouter()

  let containerRef = useRef();

  let [reveal, setReveal] = useState(false);


  const slug = data?.contactData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }


  let resize = () => {
    let headerHeight = document.querySelector("header").getBoundingClientRect().height;

    document.querySelector(".columns-wrapper").style.height = `calc(100% - ${headerHeight}px`
  }  

  useEffect(() => {
    resize();

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
            // delay: 0.5
        }
      },
      pageExit: {
        y: "-100%",
        transition: {
            duration: 0.5,
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
          <title>{data?.contactData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.contactData?.content}
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
              <ColumnsWrapper className="columns-wrapper">                 
                <Columns 
                // variants={innervariants}
                >
                    <div>
                      <Body content={data?.contactData?.textcolumnone} />
                    </div>
                    <TextItems>
                      {
                        data?.contactData?.textItems?.map(item => 
                        <TextItemColumn>
                          <TextItemColumnTitle><p>{item.title}</p></TextItemColumnTitle>
                          <TextItemColumnText><Body content={item?.textItem} /></TextItemColumnText>
                        </TextItemColumn>)
                      }
                    </TextItems>
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

  let slug = `contact`

  let homeData = await getClient(preview).fetch(homeQuery)

  let contactData = await getClient(preview).fetch(contactQuery, {
    slug: slug,
  })

  let allProjectsData = await getClient(preview).fetch(allProjectsQuery)

  if(preview) {
    homeData = await getClient(preview).fetch(previewHomeQuery) 

    contactData = await getClient(preview).fetch(previewContactQuery, {
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
        contactData,
        allProjectsData,
        menuData,
        footerData
      }
    }
  }
}
