import { useState } from "react";
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    // background-color: #b2b2b2;
    
    .show-video {
        opacity: 1 !important;
        transition-duration: 0.2s;
    }

    video {
        // position: absolute;
        // height: 100%;
        // width: 100%;
        // pointer-events: none !important;
    }

    .plyr {
        // position: absolute;
        // height: 100%;
        // width: 100%;
        // opacity: 0;
    }    
`


export default function Component({ data, id }) {
    let [hasLoaded, setHasLoaded] = useState(false);

    if(data.videoId === null) return null;

    let videoId = data.videoId;
    

    return (
        <>
            <Container>
                <video className={`player-${id}`}
                playsInline
                loop
                >
                    <source src={videoId} type="video/mp4" />
                </video>
            </Container>
        </>
    )
}

