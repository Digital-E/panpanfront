import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import styled from "styled-components"

import { store } from '../../store'

import { motion } from 'framer-motion'

import Link  from '../link'

// import Plyr from 'plyr';

import Video from '../video';


const Container = styled(motion.div)`
    position: fixed;
    height: 100%;
    width: 100%;
    right: 0;
    z-index: 999;
    background: transparent;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;


    // @media(max-width: 989px) {
    //     height: fit-content;
    //     width: fit-content;
    //     background: transparent;
    // }
`

const CloseButton = styled.div`
    position: fixed;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.2s;
    z-index: 999;

    // :hover {
    //     transform: scale(1.1);
    // }


    @media(max-width: 989px) {
        left: 50%;
        transform: translateY(-50%);
        top: auto;
        bottom: 10px;
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
  background: rgba(0, 0, 0, 0.8);
`

let ContainerInner = styled.div`
    display: flex;
    background: transparent;
    width: 75%;

    > div > h1 {
        padding-right: 50px;
    }

    > div {
        width: 100%;
    }

    // @media(max-width: 989px) {
    //     position: fixed;
    //     height: calc(100% - 230px) !important;
    //     width: calc(100% - 60px) !important;
    //     top: 90px !important;
    //     left: 50% !important;
    //     transform: translateX(-50%)!important;
    //     z-index: 999;
    //     box-sizing: border-box;
    //     pointer-events: all; 
    //     border-radius: 20px;
    //     flex-direction: column;

    //     > div {
    //         flex-basis: 100%;
    //         padding: 30px 10px;
    //     }
    // }
`

let BottomBar = styled.div`
    // position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 25px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    a {
        color: white;
        text-decoration: none;
        text-transform: uppercase;
    }

    > div:nth-child(2) {
        text-align: right;
    }
`

let Logo = styled.div`
    // position: fixed;
    top: 0;
    left: 0;
    padding: 25px;

    display: flex;
    align-self: flex-start;
    align-items: baseline;

    svg {
        fill: white;
        height: 50px;
    }

    @media(max-width: 989px) {
        padding: 15px;
        width: 100%;
        box-sizing: border-box;
        flex-direction: column;
        align-items: flex-start;

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
    color: white;
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


export default ({ preview, data }) => {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
    })

    let router = useRouter();

    let containerRef = useRef();

    let [reveal, setReveal] = useState(false);

    useEffect(() => {
        setReveal(true)

        document.querySelector(".loader").classList.remove("show-loader")


        //Plyr Code

        const Plyr = require('plyr');

        setTimeout(() => {
            const players = Plyr.setup('.player');
        }, 0)

    }, [])

    let resize = () => {
        if(window.innerWidth > 989) {
            setTimeout(() => {

    
            }, 10)
        }
    }

    useEffect(() => {
        resize();

        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    let hasClicked = () => {
        setReveal(false)

        setTimeout(() => {
            router.push("/")
        }, 300)
    }

    let variants = {
        open: {
            // right: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        },
        closed: {
            // right: isDesktop ? "-100%" : 0,
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    }

    return (
        <>
            <Container ref={containerRef} initial="closed" animate={reveal ? "open" : "closed"} variants={variants}>
                <Logo>
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
                <ContainerInner>
                    <Video data={data} />
                </ContainerInner>                
                <BottomBar>
                    <div><Link>Previous <br/> Project</Link></div>
                    <div><Link>Next <br/> Project</Link></div>
                </BottomBar>
            </Container>
            <Overlay animate={reveal ? "visible" : "hidden"} variants={overlayVariants} onClick={() => hasClicked()}/>
        </>
    )
}