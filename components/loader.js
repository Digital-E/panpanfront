import styled from 'styled-components'

const Container = styled.div`
// position: fixed;
// height: 100%;
// width: 100%;
// top: 0;
// left: 0;
// display: flex;
// align-items: center;
// justify-content: center;
// // opacity: 0;
// pointer-events: none;
// transition: opacity 0.3s;
// z-index: -1;

// &.show-loader {
//     opacity: 1;
//     transition: opacity 0.3s;
// }

// .lds-ring {
//     position: absolute;
//     width: 80px;
//     height: 80px;
//   }
//   .lds-ring div {
//     box-sizing: border-box;
//     display: block;
//     position: absolute;
//     width: 64px;
//     height: 64px;
//     margin: 4px;
//     border: 4px solid black;
//     border-radius: 50%;
//     animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
//     border-color: white transparent transparent transparent;
//   }
//   .lds-ring div:nth-child(1) {
//     animation-delay: -0.45s;
//   }
//   .lds-ring div:nth-child(2) {
//     animation-delay: -0.3s;
//   }
//   .lds-ring div:nth-child(3) {
//     animation-delay: -0.15s;
//   }
//   @keyframes lds-ring {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }

.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid white;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}

@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}
   
@keyframes l20-2{ 
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}
`

export default () => {
    return (
        // <Container className="loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></Container>
        <Container>
          <div className="loader"></div>
        </Container>
    )
}