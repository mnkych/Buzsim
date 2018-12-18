import styled, { keyframes } from 'styled-components';
import { 
    tada,
    pulse,
    bounceIn,
    zoomIn,
    fadeIn
} from 'react-animations';
import {
    Card
} from 'semantic-ui-react';

const tadaAnimation = keyframes`${tada}`;
const pulseAnimation = keyframes`${pulse}`
const bounceInAmination = keyframes`${bounceIn}`
const zoomInAnimate = keyframes`${zoomIn}`
const fadeInAnimate = keyframes`${fadeIn}`


export const TadaAnimate = styled.div`
    animation: 1.5s ${tadaAnimation};
`
export const PulseAnimate = styled.div`
    animation: 1.5s ${pulseAnimation};
`
export const BounceInAminate = styled.div`
    animation: 1.5s ${bounceInAmination};
`
export const ZoomInAnimate = styled.div`
    animation: 1.5s ${zoomInAnimate};
`

export const ZoomInAnimateCard = styled(Card.Group)`
    animation: 1.5s ${zoomInAnimate};
`
export const BounceInAminateCard = styled(Card.Group)`
    animation:1.5s ${bounceInAmination};
`
export const FadeInAnimate = styled.div`
    animation:1.5s ${fadeInAnimate};
`