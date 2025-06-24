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

    transition: filter 1s;

    &.hide-tile {
      filter: blur(10px);
      transition: filter 1s;
      pointer-events: none;
    }

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

    .active-filter {
      text-decoration: underline;
    }

    > div {
      cursor: pointer;
    }

    > div:hover {
      text-decoration: underline;
    }

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

let preFiltersArray = [];

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

let TileWrapper = ({item, currentFilter}) => {

  let hasCurrentFilter = false;


  if(currentFilter === "all") {
    hasCurrentFilter = true;
  } else {
    item?.tags.forEach(item => {
      if(item !== currentFilter) {
        hasCurrentFilter = true
      }
    })
  }


  return (
    <Tile className={!hasCurrentFilter && "hide-tile"}>
      {item !== null &&
      <Link href={item.slug}>
          <Image data={item.thumbnail}/>
      </Link>}
    </Tile>
  )
}

export default function Component({ data, allProjects, activeTags }) {
  let [all, setAll] = useState([]);
  let [currentGridIndex, setCurrentGridIndex] = useState(0);
  let [filters, setFilters] = useState([]);
  let [currentFilter, setCurrentFilter] = useState("");
  let gridDots = useRef();

  const isDesktop = useMediaQuery({
    query: '(min-width: 990px)'
  })


let allGridArrays = [];

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


    //Filters

    preFiltersArray = [
      {label: "all", active: true},
      {label: "documentaries", active: false},
      {label: "savoir-faire", active: false},
      {label: "digital-content", active: false}
    ];
  
    setFilters(preFiltersArray)

  }, []);

  let clickFilter = (index) => {
    let newFilters = [];
    newFilters = preFiltersArray;
    newFilters.forEach(item => item.active = false);
  
    newFilters[index].active = true;
  
    setFilters(JSON.parse(JSON.stringify(newFilters)));

  }


  useEffect(() => {
    let currentFilterLabel = filters.filter(item => item.active === true)
    currentFilterLabel = currentFilterLabel[0]?.label

    setCurrentFilter(currentFilterLabel)
  }, [filters])

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
  initial: {opacity: 0, transform: "scale(0.99)"},
  visible: { opacity: 1, transform: "scale(1)", transition: { duration: 0.6, delay: 0.6, ease: "easeInOut"} },
  hidden: { opacity: 0, transform: "scale(0.99)", transition: { duration: 0.6, ease: "easeOut"} }
}

  return (
    <Container>
        <Filters>
          {filters.map((item, index) => (
            <div className={item.active && "active-filter"} onClick={() => clickFilter(index)}>{item.label}</div>
          ))}
        </Filters>
        <InnerContainer className='inner-container' onWheel={(e) => changeGridIndex(e)}>
          <AnimatePresence mode="wait">
          {
            all.map((itemOne, indexOne) => {
              if(indexOne === 0 && currentGridIndex === 0) {
                return (
                <GridOne key={0} initial="initial" animate="visible" exit="hidden" variants={modalVariants}>
                  {itemOne.map((itemTwo, indexTwo) => <TileWrapper item={itemTwo} currentFilter={currentFilter} />)}
                </GridOne>
                )}
              if(indexOne === 1 && currentGridIndex === 1) {
                return (
                <GridTwo key={1} initial="hidden" animate="visible" exit="hidden" variants={modalVariants}>
                  {itemOne.map((itemTwo, indexTwo) => <TileWrapper item={itemTwo} currentFilter={currentFilter} />)}
                </GridTwo>
                )} 
              if(indexOne === 2 && currentGridIndex === 2) {
                return (
                <GridThree key={2} initial="hidden" animate="visible" exit="hidden" variants={modalVariants}>
                  {itemOne.map((itemTwo, indexTwo) => <TileWrapper item={itemTwo} currentFilter={currentFilter} />)}
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
