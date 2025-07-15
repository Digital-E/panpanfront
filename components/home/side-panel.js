import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import styled from "styled-components"

import { store } from '../../store'

import { motion } from 'framer-motion'

import Link  from '../link'

// import Plyr from 'plyr';

import Video from '../video-no-embed';


const Container = styled(motion.div)`
    position: fixed;
    height: 100vh;
    width: 100vw;
    right: 0;
    z-index: 999;
    background: transparent;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media(max-width: 989px) {
        height: 100%;
        justify-content: flex-start;
    }
`

const CloseButton = styled.div`
    position: fixed;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.2s;
    z-index: 2;


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
  height: 100vh !important;
  width: 100vw !important;
  z-index: 1;
  transform: none !important;
  pointer-events: all;
  background: rgba(0, 0, 0, 0.9);
`

let ContainerInner = styled.div`
    display: flex;
    background: transparent;
    width: 100%;
    transition: opacity 1s;

    > div > h1 {
        padding-right: 50px;
    }

    > div {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .plyr {
        height: 100%;
        min-width: 0;
        opacity: 0;
        transition: opacity 1s;
        // width: 100%;
    }

    .plyr__video-wrapper {
        // opacity: 0;
        // display: none;
    }

    @media(max-width: 989px) {
        box-sizing: border-box;
        padding: 0 15px;
        margin-top: 80px;
    }
`

let BottomBar = styled.div`
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px 25px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    > div {
        cursor: pointer;
    }

    a {
        color: var(--white);
        text-decoration: none;
        text-transform: uppercase;
        pointer-events: none;
    }

    > div:nth-child(2) {
        text-align: right;
    }

    @media(max-width: 989px) {
        padding: 25px 15px;
        margin-top: auto;
    }
`

let Logo = styled.div`
    top: 0;
    left: 0;
    padding: 15px 25px;

    display: flex;
    align-self: flex-start;
    align-items: baseline;

    svg {
        fill: var(--white);
        height: 50px;
        opacity: 1;
    }

    @media(max-width: 989px) {
        padding: 20px 15px 0 15px;
        width: 100%;
        box-sizing: border-box;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 30px;

        > div {
            width: 100%;
        }

        svg {
            height: auto;
            width: 100%;
        }
    }
`

let Title = styled.p`
    position: relative;
    bottom: 11px;
    text-transform: uppercase;
    color: var(--white);
    margin: 0 0 0 10px;

    @media(max-width: 989px) {
        bottom: 0;
        margin: 20px 0 0 0;
    }
`



let overlayVariants = {
    "visible": {
      opacity: 1,
      display: "block",
    },
    "hidden": {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    }
  }

let aspectRatioInitial = 0;

export default ({ preview, data }) => {
    let containerInnerRef = useRef();
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
    })

    let router = useRouter();

    let containerRef = useRef();

    let [reveal, setReveal] = useState(false);

    let player = null;


    useEffect(() => {

        // setReveal(true)

        document.querySelector(".loader").classList.remove("show-loader")


        //Plyr Code

        const Plyr = require('plyr');

        setTimeout(() => {
            player = Plyr.setup(`.player-${data._id}`, 
                {controls: ['play', 'progress', 'current-time', 'fullscreen'],
                fullscreen: { enabled: true, fallback: true, iosNative: true, container: null },
                });

            player[0].muted = true
            player[0].play()
            player[0].pause()
            player[0].muted = false
    
            player[0].on('canplay', (event) => {
                setTimeout(() => {
                    resize();
                }, 50)
                setTimeout(() => {
                    containerInnerRef.current.children[0].children[0].style.opacity = 1;
                }, 100)
            });

            if(document.querySelector(".plyr")) {
                // resize();
                // document.querySelector(".plyr").style.opacity = 1;
            }
        }, 0)


        // Get video dimensions
        // $.getJSON( "https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + vimeoVideoID, { format: "json" }, function (data) { console.log(data.width); console.log(data.height); } );

        async function getData() {
            // const url = "https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + data.videoId;
            // const url = "https://vimeo.com/api/oembed.json?url=" + data.videoId;
            const url = `https://api.vimeo.com/videos/${data.videoId.split('playback/')[1].split('/')[0]}`;
            
            
            try {
              const response = await fetch(url, {
                method:'GET',
                headers: {
                    'Authorization': 'bearer 465eb0e3546a402e0016059a6c8320d1',
                    'Accept' : 'application/vnd.vimeo.*+json;version=3.4'
                }
              });
              if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
              }
          
              const json = await response.json();

              let aspectRatio = json.width / json.height;

              aspectRatioInitial = json.width / json.height;

              resize();
              

            } catch (error) {
              console.error(error.message);
            }
          }

          getData();

          window.addEventListener('resize', resize)

          setTimeout(() => {
            dispatch({type: 'project transition type', value: 0})
          }, 1000)

          return () => {
              window.removeEventListener('resize', resize)
              player[0].destroy()
              player[0] = null
          }

    }, [])

    let resize = () => {
        if(document.querySelector(".plyr")) {

        let aspectRatio = aspectRatioInitial

        let headerHeight = document.querySelector(".side-panel-logo").getBoundingClientRect().height;
        let footerHeight = document.querySelector(".bottom-bar").getBoundingClientRect().height;
        
        document.querySelector(".plyr").style.maxHeight = `${window.innerHeight - (headerHeight + footerHeight)}px`
        document.querySelector(".plyr").style.maxWidth = `${(window.innerHeight - (headerHeight + footerHeight)) * aspectRatio}px`

        if(aspectRatio < 0.6) {
            // document.querySelector('.container-inner').style.width = "30%";
            document.querySelector('.container-inner').style.marginTop = 0;

            if(window.innerWidth < 990) {
                document.querySelector('.container-inner').style.width = "100%";
                document.querySelector('.container-inner').style.marginTop = "30px";
                document.querySelector(".plyr").style.maxHeight = `${window.innerHeight - (headerHeight + footerHeight) - 60}px`
                document.querySelector(".plyr").style.maxWidth = `${(window.innerHeight - (headerHeight + footerHeight)) * aspectRatio - 35}px`
            }
        } else {
            if(window.innerWidth < 990) {
                document.querySelector('.container-inner').style.width = "100%";
                document.querySelector(".plyr").style.maxHeight = `${window.innerHeight - (headerHeight + footerHeight - 60)}px`
                document.querySelector(".plyr").style.maxWidth = `${(window.innerHeight - (headerHeight + footerHeight)) * aspectRatio - 35}px`
            } else {
                document.querySelector('.container-inner').style.width = "75%";
            }
        }

        // if(window.innerWidth < 990) {
        //     document.querySelector(".plyr").style.maxWidth = `${(window.innerHeight - 270) * aspectRatio}px`
        // }
        }

        // if(window.innerWidth > 989) {
        //     setTimeout(() => {

    
        //     }, 10)
        // }
    }

    let hasClicked = () => {
        // setReveal(false)

        setTimeout(() => {
            router.push("/")
        }, 0)
    }

    let variants = {
        pageInitial: {
            opacity: 0
        },
        pageAnimate: {
            opacity: 1,
            transition: {
                duration: 0.3,
                delay: 0.3
                // duration: 0,
                // delay: 0               
            }
        },
        pageExit: {
            opacity: 0,
            transition: {
                duration: 0.3
                // duration: 0
            }
        }
    }

    let variantsTwo = {
        pageInitial: {
            opacity: 1
        },
        pageAnimate: {
            opacity: 1,
            transition: {
                duration: 0,
                delay: 0
            }
        },
        pageExit: {
            opacity: 0,
            transition: {
                duration: 0
            }
        }
    }   
    
    let pageTransitionVariants = [variants, variantsTwo]

    let clickNextProject = (e, url) => {
        // setReveal(false)

        dispatch({type: 'project transition type', value: 1})

        setTimeout(() => {
            router.push(url)
        }, 0)
    }
    

    return (
        <>
            <Container ref={containerRef} variants={pageTransitionVariants[state.projectTransitionType]}>
                <Logo className="side-panel-logo">
                    <div onClick={() => hasClicked()}>
                        <svg viewBox="0 0 936 153">
                        <path class="st0" d="M378,0h0c-39.76,0-72,32.24-72,72h0v44.15c0,.47.38.85.85.85h62.5c.47,0,.85-.38.85-.85v-51.82c0-3.97,2.82-7.52,6.75-8.08,4.9-.7,9.09,3.08,9.09,7.84v52.07c0,.47.38.85.85.85h62.26c.47,0,.85-.38.85-.85v-44.15h0C450,32.24,417.76,0,378,0Z"/>
                        <path class="st0" d="M72,0h0C32.24,0,0,32.24,0,72h0v80.15c0,.47.38.85.85.85h62.25c.47,0,.85-.38.85-.85v-35.15h79.2c.47,0,.85-.38.85-.85v-44.15h0C144,32.24,111.76,0,72,0ZM79.92,72h-15.84v-7.65c0-4.22,3.18-7.9,7.39-8.17,4.61-.3,8.45,3.35,8.45,7.9v7.92Z"/>
                        <path class="st0" d="M225,0h0C185.24,0,153,32.24,153,72h0v44.15c0,.47.38.85.85.85h62.41c.47,0,.85-.38.85-.85v-20.1c0-4.22,3.18-7.9,7.39-8.17,4.61-.3,8.45,3.35,8.45,7.9v20.37c0,.47.38.85.85.85h62.35c.47,0,.85-.38.85-.85v-44.15h0C297,32.24,264.76,0,225,0ZM232.94,64.76c-.02.22-.05.44-.08.65-.01.09-.02.17-.03.26,0,.04-.03.09-.04.13-.06.26-.13.52-.21.78-.06.17-.12.34-.19.51-.05.13-.11.25-.16.37-.14.3-.3.59-.47.87-.06.1-.12.2-.18.29-.11.16-.23.32-.36.48-.07.09-.15.18-.23.27-.22.25-.45.48-.7.7-.09.08-.17.16-.27.23-.15.12-.31.24-.48.36-.09.07-.19.12-.29.18-.28.17-.57.33-.87.47-.12.06-.24.11-.37.16-.17.07-.33.13-.51.19-.25.08-.51.15-.77.21-.05,0-.09.03-.13.04-.09.02-.17.02-.26.03-.21.04-.43.06-.65.08-.11,0-.22.01-.32.02-.11,0-.21.02-.32.02s-.2-.01-.31-.02c-.11,0-.22,0-.32-.02-.22-.02-.44-.05-.65-.08-.08-.01-.16-.02-.24-.04-.29-.06-.58-.13-.86-.22-.05-.02-.1-.04-.15-.06-.23-.08-.45-.16-.67-.26-.09-.04-.18-.08-.26-.13-.18-.09-.35-.18-.52-.28-.09-.05-.18-.1-.26-.16-.17-.11-.33-.22-.49-.34-.07-.05-.15-.11-.22-.16-.45-.36-.85-.77-1.21-1.21-.06-.07-.11-.14-.16-.22-.12-.16-.24-.32-.34-.49-.06-.09-.11-.17-.16-.26-.1-.17-.19-.34-.28-.52-.04-.09-.09-.17-.13-.26-.1-.22-.18-.44-.26-.67-.02-.05-.04-.1-.06-.15-.09-.28-.16-.57-.22-.86-.02-.08-.02-.16-.04-.24-.04-.22-.06-.43-.08-.65,0-.11-.01-.21-.02-.32,0-.1-.02-.2-.02-.31s.01-.21.02-.32c0-.11,0-.22.02-.32.02-.22.05-.44.08-.65.01-.09.02-.17.03-.26,0-.05.03-.09.04-.13.06-.26.13-.52.21-.78.06-.17.12-.34.19-.51.05-.12.11-.25.16-.37.14-.3.3-.59.47-.87.06-.1.12-.19.18-.29.11-.16.23-.32.36-.48.07-.09.15-.18.23-.27.22-.25.45-.48.7-.7.09-.08.17-.16.27-.23.15-.12.31-.24.48-.36.09-.07.19-.12.29-.18.28-.17.57-.33.87-.47.12-.06.24-.11.37-.16.17-.07.33-.13.51-.19.25-.08.51-.15.77-.21.05,0,.09-.03.13-.04.09-.02.17-.02.26-.03.21-.04.43-.06.65-.08.11,0,.22-.01.32-.02.11,0,.21-.02.32-.02s.2.01.31.02c.11,0,.22,0,.32.02.22.02.44.05.65.08.08.01.16.02.24.04.29.06.58.13.86.22.05.02.1.04.16.06.23.08.45.16.66.26.09.04.18.08.26.13.18.09.35.18.52.28.09.05.18.1.26.16.17.11.33.22.49.34.07.05.15.11.22.16.22.18.44.37.64.57,0,0,0,0,0,0,.2.2.39.42.57.64.06.07.11.14.16.22.12.16.23.32.34.49.06.09.11.17.16.26.1.17.19.34.28.52.04.09.09.17.13.26.1.22.18.44.26.66.02.05.04.1.06.16.09.28.16.57.22.86.02.08.02.16.04.24.04.22.06.43.08.65,0,.11.01.21.02.32,0,.1.02.2.02.31s-.01.21-.02.32c0,.11,0,.21-.02.32Z"/>
                        <path class="st0" d="M864,0h0c-39.76,0-72,32.24-72,72h0v44.15c0,.47.38.85.85.85h62.5c.47,0,.85-.38.85-.85v-51.82c0-3.97,2.82-7.52,6.75-8.08,4.9-.7,9.09,3.08,9.09,7.84v52.07c0,.47.38.85.85.85h62.26c.47,0,.85-.38.85-.85v-44.15h0C936,32.24,903.76,0,864,0Z"/>
                        <path class="st0" d="M558,0h0c-39.76,0-72,32.24-72,72h0v80.15c0,.47.38.85.85.85h62.25c.47,0,.85-.38.85-.85v-35.15h79.2c.47,0,.85-.38.85-.85v-44.15h0C630,32.24,597.76,0,558,0ZM565.92,72h-15.84v-7.65c0-4.22,3.18-7.9,7.39-8.17,4.61-.3,8.45,3.35,8.45,7.9v7.92Z"/>
                        <path class="st0" d="M711,0h0C671.24,0,639,32.24,639,72h0v44.15c0,.47.38.85.85.85h62.41c.47,0,.85-.38.85-.85v-20.1c0-4.22,3.18-7.9,7.39-8.17,4.61-.3,8.45,3.35,8.45,7.9v20.37c0,.47.38.85.85.85h62.35c.47,0,.85-.38.85-.85v-44.15h0C783,32.24,750.76,0,711,0ZM718.94,64.76c-.02.22-.05.44-.08.65-.01.09-.02.17-.03.26,0,.04-.03.09-.04.13-.06.26-.13.52-.21.78-.06.17-.12.34-.19.51-.05.13-.11.25-.16.37-.14.3-.3.59-.47.87-.06.1-.12.2-.18.29-.11.16-.23.32-.36.48-.07.09-.15.18-.23.27-.22.25-.45.48-.7.7-.09.08-.17.16-.27.23-.15.12-.31.24-.48.36-.09.07-.19.12-.29.18-.28.17-.57.33-.87.47-.12.06-.24.11-.37.16-.17.07-.33.13-.51.19-.25.08-.51.15-.77.21-.05,0-.09.03-.13.04-.09.02-.17.02-.26.03-.21.04-.43.06-.65.08-.11,0-.22.01-.32.02-.11,0-.21.02-.32.02s-.2-.01-.31-.02c-.11,0-.22,0-.32-.02-.22-.02-.44-.05-.65-.08-.08-.01-.16-.02-.24-.04-.29-.06-.58-.13-.86-.22-.05-.02-.1-.04-.15-.06-.23-.08-.45-.16-.67-.26-.09-.04-.18-.08-.26-.13-.18-.09-.35-.18-.52-.28-.09-.05-.18-.1-.26-.16-.17-.11-.33-.22-.49-.34-.07-.05-.15-.11-.22-.16-.45-.36-.85-.77-1.21-1.21-.06-.07-.11-.14-.16-.22-.12-.16-.24-.32-.34-.49-.06-.09-.11-.17-.16-.26-.1-.17-.19-.34-.28-.52-.04-.09-.09-.17-.13-.26-.1-.22-.18-.44-.26-.67-.02-.05-.04-.1-.06-.15-.09-.28-.16-.57-.22-.86-.02-.08-.02-.16-.04-.24-.04-.22-.06-.43-.08-.65,0-.11-.01-.21-.02-.32,0-.1-.02-.2-.02-.31s.01-.21.02-.32c0-.11,0-.22.02-.32.02-.22.05-.44.08-.65.01-.09.02-.17.03-.26,0-.05.03-.09.04-.13.06-.26.13-.52.21-.78.06-.17.12-.34.19-.51.05-.12.11-.25.16-.37.14-.3.3-.59.47-.87.06-.1.12-.19.18-.29.11-.16.23-.32.36-.48.07-.09.15-.18.23-.27.22-.25.45-.48.7-.7.09-.08.17-.16.27-.23.15-.12.31-.24.48-.36.09-.07.19-.12.29-.18.28-.17.57-.33.87-.47.12-.06.24-.11.37-.16.17-.07.33-.13.51-.19.25-.08.51-.15.77-.21.05,0,.09-.03.13-.04.09-.02.17-.02.26-.03.21-.04.43-.06.65-.08.11,0,.22-.01.32-.02.11,0,.21-.02.32-.02s.2.01.31.02c.11,0,.22,0,.32.02.22.02.44.05.65.08.08.01.16.02.24.04.29.06.58.13.86.22.05.02.1.04.16.06.23.08.45.16.66.26.09.04.18.08.26.13.18.09.35.18.52.28.09.05.18.1.26.16.17.11.33.22.49.34.07.05.15.11.22.16.22.18.44.37.64.57,0,0,0,0,0,0,.2.2.39.42.57.64.06.07.11.14.16.22.12.16.23.32.34.49.06.09.11.17.16.26.1.17.19.34.28.52.04.09.09.17.13.26.1.22.18.44.26.66.02.05.04.1.06.16.09.28.16.57.22.86.02.08.02.16.04.24.04.22.06.43.08.65,0,.11.01.21.02.32,0,.1.02.2.02.31s-.01.21-.02.32c0,.11,0,.21-.02.32Z"/>
                        </svg> 
                    </div>
                    <Title>
                        /{data.title}
                    </Title>                        
                </Logo>
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
                <ContainerInner ref={containerInnerRef} className="container-inner">
                    <Video data={data} id={data._id}/>
                </ContainerInner>                
                <BottomBar className='bottom-bar'>
                    <div onClick={(e) => clickNextProject(e, "/projects/dior-parfums-tatiana")}><Link href={"/projects/dior-parfums-tatiana"}>Previous <br/> Project</Link></div>
                    <div onClick={(e) => clickNextProject(e, "/projects/dior-men-trailer-max-richter")}><Link href={"/projects/dior-men-trailer-max-richter"}>Next <br/> Project</Link></div>
                </BottomBar>
            </Container>
            <Overlay variants={pageTransitionVariants[state.projectTransitionType]} onClick={() => hasClicked()}/>
        </>
    )
}