import styled from "styled-components"


let Container = styled.div`
  width: 100%;
  display: none;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  padding: 0px 25px;
  box-sizing: border-box;
  z-index: 1;
  pointer-events: none;
  margin-bottom: 70px;

  a {
    display: flex;
    justify-content: center;
    pointer-events: all;
    text-decoration: underline !important;
  }


  * {
    font-family: Ciron;
    font-size: 0.875rem !important;
    line-height: 1 !important;
    text-transform: uppercase;
    color: white;
  }

  svg {
    position: relative;
    top: -1px;
    margin-right: 5px;
    fill: white;
  }

  @media(max-width: 989px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 0px 15px;

    > div:first-child {
      margin-bottom: 10px;
    }
  }
`



export default function Header({ data }) {


  return (
    <Container>
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
    </Container>
  )
}
