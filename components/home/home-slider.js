import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import { gsap } from "gsap/dist/gsap";

import { motion, AnimatePresence } from 'framer-motion'

import Link from '../link'

import { useMediaQuery } from 'react-responsive';

import _ from 'lodash'

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}

import Image from '../image'


const Container = styled.div`
`

const InnerContainer = styled.div`
  position: fixed;
  height: calc(100vh - 185px);
  width: 100%;
  left: 0;
  top: 0;
  margin-top: 145px;
  padding: 0px 25px;
  overflow: hidden;
  z-index: 1;
  box-sizing: border-box;

  @media(max-width: 989px) {
    display: flex;
    align-items: center;
  }
`

const GridOne = styled(motion.div)`
  height: 100%;
  display: grid;
  grid-template-columns: 12.5% 6.25% 12.5% 12.5% 6.25% 12.5% 12.5% 12.5% 12.5%;
  grid-template-rows: repeat(3, 1fr);
`

const GridTwo = styled(motion.div)`
  height: 100%;
  display: grid;
  grid-template-columns: 12.5% 12.5% 12.5% 12.5% 6.25% 12.5% 12.5% 6.25% 12.5%;
  grid-template-rows: repeat(3, 1fr);
`

const GridThree = styled(motion.div)`
  height: 100%;
  display: grid;
  grid-template-columns: 12.5% 12.5% 6.25% 12.5% 12.5% 12.5% 6.25% 12.5% 12.5%;
  grid-template-rows: repeat(3, 1fr);
`



const Carousel = styled.div`
    position: relative;
    width: 100%;
    outline: none !important;
    overflow: hidden;

    .flickity-viewport {
        overflow: visible;
    }

    @media(min-width: 990px) {
      height: 100%;
    }
    
`

let Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100% !important;
  width: 100% !important;
  backdrop-filter: blur(10px);
  z-index: 1;
  transform: none !important;
  pointer-events: all;

  @media(max-width: 989px) {
    height: 0 !important;
    width: 0 !important;
  }
`

let Tile = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px 6px;
    box-sizing: border-box;
    overflow: hidden;

    > a {
        height: 100%;
        width: 100%;
        object-fit: cover;
        display: block;
        overflow: hidden;
    }

    > a > span {
        height: 100% !important;
        width: 100% !important;
        transition-duration: 0.7s;
    }

    img {
        object-fit: cover;
    }

    :hover > a > span {
        transform: scale(1.1);
    }
`
let Filters = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 35px;

    * {
        font-family: "Ciron";
        font-size: 0.75rem;
        text-transform: uppercase;
    }

    > div {
        margin: 0 30px;
    }
`

let GridDots = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
`

let GridDot = styled.div`
  width: 7px;
  height: 7px;
  background: black;
  border-radius: 999px;
  margin: 10px 0;
  cursor: pointer;

  :hover {
    background: var(--blue);
  }

  &.active {
    background: var(--blue);
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

let hasScrolled = false;

export default function Component({ data, allProjects, activeTags }) {
  let [all, setAll] = useState([]);
  let [prevOpen, setPrevOpen] = useState(0);
  let [overlayOpen, setOverlayOpen] = useState(false);
  let [currentGridIndex, setCurrentGridIndex] = useState(0);
  let carouselRef = useRef();
  let gridDots = useRef();

  let allRef = useRef(all);

  const isDesktop = useMediaQuery({
    query: '(min-width: 990px)'
  })

  let scene = null;
  let flickity = null;


//   let initCarousel = () => {
//       if(flickity !== null) return

//       flickity = new Flickity(carouselRef.current, {
//           prevNextButtons: false,
//           pageDots: false,
//           selectedAttraction: 0.07,
//           friction: 0.42,
//           freeScroll: true,
//           cellAlign: "center",
//           percentPosition: true,
//           wrapAround: true,
//       })

//       flickity.on('staticClick', (event, pointer, cellElement, cellIndex) => {
//         toggleIsland(cellIndex)
//       })
//   }  

//   let destroyCarousel = () => {
//       if(flickity === null) return
//       flickity.destroy()
//       flickity = null
//   }  

let gridOneDisposition = [
    true, false, true, true, false, true, true, false, true,
    true, false, false, false, false, false, true, true, false,
    false, false, true, true, false, true, false, false, true
]

let gridTwoDisposition = [
  false, true, true, false, false, true, false, false, true,
  true, false, true, true, false, false, true, false, false,
  false, true, false, true, false, true, true, false, true
]

let gridThreeDisposition = [
  false, true, false, false, true, true, false, false, true,
  true, true, false, true, false, true, false, false, true,
  true, false, false, true, true, false, false, true, false
]

let allGridDispositions = [
  gridOneDisposition,
  gridTwoDisposition,
  gridThreeDisposition
]

let allGridArrays = []

let gridIndex = 0;
let gridArray = [];

  useEffect(() => {
    let allProjectsMultiply = [];

    for(let i = 0; i < 14; i++) {
        allProjectsMultiply.push(...allProjects)
    }
    

    allGridDispositions.forEach(itemOne => {
      gridIndex = 0;
      gridArray = [];

      itemOne.forEach(itemTwo => {
        if(itemTwo === true) {
          gridIndex += 1;
          gridArray.push(allProjectsMultiply[gridIndex])
        } else {
            gridArray.push(null)
        }
      })

      allGridArrays.push(gridArray)
    })

    setAll(allGridArrays)

    setTimeout(() => {
      selectDot();
    }, 0)

    // if(window.innerWidth < 990) {
    //   setTimeout(() => {
    //     initCarousel();
    //   }, 0)
    // } else {
    //   initParallax();
    // }

    // window.addEventListener("resize", () => {
    //   if(window.innerWidth > 989) {
    //       destroyCarousel();
    //       if(!parallaxInstance) {
    //         initParallax();
    //       } else {
    //         parallaxInstance?.enable()
    //       }
    //       // desktopResizeCount += 1
    //       // hasPositioned = false;
    //       // positionCards();
    //   } else {
    //       // desktopResizeCount = -1
    //       initCarousel();
    //       destroyParallax();
    //   }
    // })  


  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if(isDesktop) {
  //       parallaxInstance?.enable()
  //     } else {
  //       parallaxInstance?.disable()
  //     }
  //   }, 0)
  // }, [isDesktop])


//   useEffect(() => {

//     let openCount = 0;

//     all.forEach((item) => {

//       if(item.isOpen) {
//         openCount += 1;
//       }

//     })

//     if(openCount > 0) {

//       setOverlayOpen(true)

//     } else {
//       setOverlayOpen(false)

//       clearTimeout(parallaxTimeout)

//       parallaxInstance?.disable()
      
//       parallaxTimeout = setTimeout(() => {
//         parallaxInstance?.enable()
//       }, 1000)
//     }
//   },[all])

//   let clickIsland = (index) => {
//     if(window.innerWidth < 990) return
//       toggleIsland(index)
//   }

//   let toggleIsland = (index) => {
//     setPrevOpen(index);
//     let copyAll = JSON.parse(JSON.stringify(allRef.current))
//     copyAll[index].isOpen = true

//     setAll(copyAll)
//     allRef.current = copyAll
//   }

//   let closeAll = () => {
//     let copyAll = JSON.parse(JSON.stringify(all))

//     copyAll.forEach(item => item.isOpen = false)

//     setAll(copyAll)
//     allRef.current = copyAll
//   }


//   useEffect(() => {
    
//       let filteredProjectsArray = [];

//       let tags = activeTags.map(item => {
//         if(item.isActive === true) {
//           return item.label
//         }
//       })

//       tags = tags.filter(item => item !== undefined)

//       allProjects?.forEach(item => {
//         item.tags?.forEach(tag => {
//           tags.forEach(tagTwo => {
//             if(tag.trim().toLowerCase() === tagTwo.trim().toLowerCase()) {
//               filteredProjectsArray.push(item)
//             }
//           })
//         })
//       })

//       let copyProjects = []

//       copyProjects = JSON.parse(JSON.stringify(all))  
      
//       // Hide/Show Island ?

//       copyProjects.forEach(item => {
//         let show = 0;

//         item.projects?.forEach(itemTwo => {
//           filteredProjectsArray.forEach(itemThree => {
//             if(itemTwo.project?._ref === itemThree._id) {
//               show += 1;
//             }
//           })
//         })

//         if(show > 0) {
//           item.show = true
//         } else {
//           item.show = false
//         }
//       })

      
//       // Hide/Show Project ?

//       copyProjects.forEach(item => {

//         item.projects?.forEach(itemTwo => {
//           let show = 0;

//           filteredProjectsArray.forEach(itemThree => {
//             if(itemTwo.project?._ref === itemThree._id) {
//               show += 1;
//             }
//           })

//           if(show > 0) {
//             itemTwo.show = true
//           } else {
//             itemTwo.show = false
//           }          
//         })
//       })

//       if(tags.length === 0) {
//         copyProjects.forEach((item, index) => {
//           item.show = true

//           item.projects?.forEach(itemTwo => {
//               itemTwo.show = true
//           })
//         })
//       }
    
//       if(copyProjects.length === 0) return 

//       setAll(copyProjects)
//       allRef.current = copyProjects

//   }, [activeTags])


let TileWrapper = ({item}) => {
  return (
    <Tile>
      {item !== null &&
      <Link href={item.slug}>
          <Image data={item.thumbnail}/>
      </Link>}
    </Tile>
  )
}

let selectDot = () => {
  Array.from(gridDots.current.children).forEach(item => item.classList.remove("active"))

  Array.from(gridDots.current.children)[currentGridIndex]?.classList.add("active")
}

useEffect(() => {
  selectDot();
}, [currentGridIndex])

let toSlide = (index) => {
  setCurrentGridIndex(index)
}

let changeGridIndex = (e) => {

  if (hasScrolled) return

  if(e.deltaY > 0) {
    if(currentGridIndex < 2) {
      setCurrentGridIndex(currentGridIndex += 1)
    } else {
      setCurrentGridIndex(0)
    }
  } else {
    if(currentGridIndex === 0) {
      setCurrentGridIndex(2)
    } else {
      setCurrentGridIndex(currentGridIndex -= 1)
    }
  }

  hasScrolled = true

  setTimeout(() => {
    hasScrolled = false;
  }, 1500)
}

const modalVariants = {
  initial: {opacity: 0, transform: "scale(0.97)"},
  visible: { opacity: 1, transform: "scale(1)", transition: { duration: 0.7, delay: 0.7 } },
  hidden: { opacity: 0, transform: "scale(0.97)", transition: { duration: 0.7 } }
}

  return (
    <Container>
        <Filters>
                <div>All</div>
                <div>Documentaries</div>
                <div>Savoir-faire</div>
                <div>Digital Content</div>
        </Filters>
        <InnerContainer className='inner-container' onWheel={(e) => changeGridIndex(e)}>
          <AnimatePresence mode="wait">
          {
            all.map((itemOne, indexOne) => {
              if(indexOne === 0 && currentGridIndex === 0) {
                return (
                <GridOne key={0} initial="initial" animate="visible" exit="hidden" variants={modalVariants}>
                  {itemOne.map((itemTwo, indexTwo) => <TileWrapper item={itemTwo} />)}
                </GridOne>
                )}
              if(indexOne === 1 && currentGridIndex === 1) {
                return (
                <GridTwo key={1} initial="hidden" animate="visible" exit="hidden" variants={modalVariants}>
                  {itemOne.map((itemTwo, indexTwo) => <TileWrapper item={itemTwo} />)}
                </GridTwo>
                )} 
              if(indexOne === 2 && currentGridIndex === 2) {
                return (
                <GridThree key={2} initial="hidden" animate="visible" exit="hidden" variants={modalVariants}>
                  {itemOne.map((itemTwo, indexTwo) => <TileWrapper item={itemTwo} />)}
                </GridThree>
                )}                                  
              }
            )
          }
          </AnimatePresence>
        </InnerContainer>
        <GridDots ref={gridDots}>
          {all.map((item, index) => {
            return <GridDot onClick={() => toSlide(index)}></GridDot>
          })}
        </GridDots>
    </Container>
  )
}
