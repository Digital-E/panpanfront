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
      <div><a href="https://www.instagram.com/" target="_blank">Instagram</a></div>      
    </Container>
  )
}
