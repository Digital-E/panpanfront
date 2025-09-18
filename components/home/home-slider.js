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
  opacity: 0;
  transition: opacity 1s;

  @media(max-width: 989px) {
    position: relative;
    height: 100%;

    ::before {
      content: "";
      position: absolute;
      left: 0px;
      top: 0px;
      height: 70px;
      width: 100%;
      background: linear-gradient(0deg, transparent 0%, var(--white) 100%);
      z-index: 2;
    }      
  }
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
    position: relative;
    overflow: scroll;
    height: 100%;
    margin-top: 0;
    padding: 0px 10px;
    padding-top: 60px;
  }
`

const GridOne = styled(motion.div)`
  height: 100%;
  display: grid;
  grid-template-columns: 12.5% 6.25% 12.5% 12.5% 6.25% 12.5% 12.5% 12.5% 12.5%;
  grid-template-rows: repeat(3, 1fr);

  @media(max-width: 989px) {
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
  }
`

const GridTwo = styled(motion.div)`
  height: 100%;
  display: grid;
  grid-template-columns: 12.5% 12.5% 12.5% 12.5% 6.25% 12.5% 12.5% 6.25% 12.5%;
  grid-template-rows: repeat(3, 1fr);

  @media(max-width: 989px) {
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
  }  
`

const GridThree = styled(motion.div)`
  height: 100%;
  display: grid;
  grid-template-columns: 12.5% 12.5% 6.25% 12.5% 12.5% 12.5% 6.25% 12.5% 12.5%;
  grid-template-rows: repeat(3, 1fr);

  @media(max-width: 989px) {
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
  }  
`

const GridMobile = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;

  > div:empty {
    display: none
  }

  @media(min-width: 990px) {
    display: none;
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

    // transition: filter 1s;
    transition: opacity 1s;

    &.hide-tile {
      // filter: blur(10px);
      // transition: filter 1s;
      opacity: 0.1;
      transition: opacity 1s;
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

    :hover > a {
      opacity: 1 !important;
    }


    @media(max-width: 989px) {
      flex-basis: 50%;
      height: calc(0.55 * 100vw);
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

    @media(max-width: 989px) {
      display: none;
    }
`

let GridDots = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  @media(max-width: 989px) {
    display: none;
  }
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

let FiltersMobile = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  width: fit-content;
  border: 1px solid black;
  padding: 2px;
  z-index: 2;
  // backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 999px;

  * {
    font-family: "Ciron";
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  > div:nth-child(1) {
    position: relative;
    transform: rotate(180deg);
    top: -1px;
    left: 2px;
  }

  > div:nth-child(2) {
    position: relative;
    top: 1.5px;
    width: 150px;
    text-align: center;
  }  

  > div:nth-child(3) {
    position: relative;
    top: 1.5px;
    right: 2px;
  }  

  @media(max-width: 989px) {
    display: flex;
  }
`

let Arrow = styled.div``

let GridsContainer = styled(motion.div)``


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
      {label: "craftsmanship", active: false},
      {label: "fashion & beauty", active: false},
      {label: "documentary", active: false}
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

let clickFilterMobile = (direction) => {
  let newFilters = [];
  newFilters = preFiltersArray;
  let currentFilterIndex = 0;

  newFilters.forEach((item, index) => {
    if(item.active === true) {
      currentFilterIndex = index
    }
  })

  newFilters.forEach(item => item.active = false);

  if(direction === "next") {
    if(currentFilterIndex < 3) {
      currentFilterIndex += 1
    } else {
      currentFilterIndex = 0
    }
  } else {
    if(currentFilterIndex === 0) {
      currentFilterIndex = 3
    } else {
      currentFilterIndex -= 1
    }
  }

  newFilters[currentFilterIndex].active = true;

  setFilters(JSON.parse(JSON.stringify(newFilters)));

}

let resize = () => {
  let headerHeight = document.querySelector("header").getBoundingClientRect().height;

  document.querySelector(".home-container").style.height = `calc(100% - ${headerHeight}px`
}  

useEffect(() => {
  resize();

  window.addEventListener('resize', resize)

  return () => {
      window.removeEventListener('resize', resize)
  }
}, []);


const modalVariants = {
  initial: {opacity: 0, transform: "scale(0.99)"},
  visible: { opacity: 1, transform: "scale(1)", transition: { duration: 0.6, delay: 0.6, ease: "easeInOut"} },
  hidden: { opacity: 0, transform: "scale(0.99)", transition: { duration: 0.6, ease: "easeOut"} }
}

  return (
    <Container className="home-container">
        <Filters>
          {filters.map((item, index) => (
            <div className={item.active && "active-filter"} onClick={() => clickFilter(index)}>{item.label}</div>
          ))}
        </Filters>
        <FiltersMobile>
          <Arrow onClick={() => clickFilterMobile("prev")}>
            <svg width="8.914" height="10.028" viewBox="0 0 8.914 10.028">
              <path id="Polygone_2" data-name="Polygone 2" d="M5.014,0l5.014,8.914H0Z" transform="translate(8.914) rotate(90)"/>
            </svg>            
          </Arrow>
          <div>
          {
            filters.map(item => {
              if(item.active) {
                return item.label
              }
            })
          }
          </div>
          <Arrow onClick={() => clickFilterMobile("next")}>
            <svg width="8.914" height="10.028" viewBox="0 0 8.914 10.028">
              <path id="Polygone_2" data-name="Polygone 2" d="M5.014,0l5.014,8.914H0Z" transform="translate(8.914) rotate(90)"/>
            </svg>            
          </Arrow>          
        </FiltersMobile>
        <InnerContainer className='inner-container' onWheel={(e) => changeGridIndex(e)}>
          <GridMobile>
            {
              all.map((itemOne, indexOne) => 
                itemOne.map(itemTwo => <TileWrapper item={itemTwo} currentFilter={currentFilter} />)
              )
            }
          </GridMobile>
          <AnimatePresence mode="wait">
          {
            all.map((itemOne, indexOne) => {
              
              if(isDesktop) {
                // Desktop
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

              } else {
                // Mobile
                return              
                // if(indexOne === 0) {
                //   return (
                //   <GridOne key={0} initial="initial" animate="visible" exit="hidden" variants={modalVariants}>
                //     {itemOne.map((itemTwo, indexTwo) => <TileWrapper item={itemTwo} currentFilter={currentFilter} />)}
                //   </GridOne>
                //   )}
                // if(indexOne === 1) {
                //   return (
                //   <GridTwo key={1} initial="hidden" animate="visible" exit="hidden" variants={modalVariants}>
                //     {itemOne.map((itemTwo, indexTwo) => <TileWrapper item={itemTwo} currentFilter={currentFilter} />)}
                //   </GridTwo>
                //   )} 
                // if(indexOne === 2) {
                //   return (
                //   <GridThree key={2} initial="hidden" animate="visible" exit="hidden" variants={modalVariants}>
                //     {itemOne.map((itemTwo, indexTwo) => <TileWrapper item={itemTwo} currentFilter={currentFilter} />)}
                //   </GridThree>
                //   )}     
                }
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
