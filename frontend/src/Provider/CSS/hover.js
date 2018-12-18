import styled from 'styled-components';
import {
    Icon
} from 'semantic-ui-react';

export const Btn_float_shadow_start = styled.button`
    outline:none !important;
    border-radius:25px;
    padding:1.5%;
    padding-left:5%;
    padding-right:3%;
    font-size:80%;
    color:#FFFFFF;
    border-style:none;
    background-color:#00B5AD;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
        &:before {
            pointer-events:none;
            position:absolute;
            z-index: -1;
            content: '';
            top:100%;
            left:5%;
            height:10px;
            width:90%;
            opacity:0;
            background:-webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0% , rgba(0, 0, 0, 0) 80%);
            background:radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
            -webkit-transition-property: transform, opacity;
            transition-property: transform, opacity;
        } 
        &:hover,&:focus,&:active {
            -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
        }
        &:hover:before,&:focus:before,&:active:before {
            opacity: 1;
            -webkit-transform: translateY(5px);
            transform: translateY(5px);
        }
`
export const Btn_float_shadow_classroom = styled.button`
    border-radius:25px;
    outline:none !important;
    border-color:#00B5AD;
    padding:1.5%;
    padding-left:5%;
    padding-right:3%;
    font-size:80%;
    color:#00B5AD;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
        &:before {
            pointer-events:none;
            position:absolute;
            z-index: -1;
            content: '';
            top:100%;
            left:5%;
            height:10px;
            width:90%;
            opacity:0;
            background:-webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0% , rgba(0, 0, 0, 0) 80%);
            background:radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
            -webkit-transition-property: transform, opacity;
            transition-property: transform, opacity;
        } 
        &:hover,:focus,:active {
            -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
        }
        &:hover:before,:focus:before,:active:before {
            opacity: 1;
            -webkit-transform: translateY(5px);
            transform: translateY(5px);
        }
`

export const Content_grow = styled.div`
    /* display: inline-block; */
    /* vertical-align: middle; */
    outline:none !important;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
    &:hover,&:focus,&:active{
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

`

export const Content_shadow = styled.div`
    outline:none !important;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: box-shadow;
    transition-property: box-shadow;
    &:hover,&:focus,&:active{
        box-shadow: 0 3px 15px rgba(0, 0, 0, 0.4);
    }
`

export const Back_hv = styled(Icon)`
    display: inline-block;
    vertical-align:middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
    
    &:hover,&:focus,&:active{
        -webkit-transform: scale(1.1);
        transform:scale(1.1);
    }
`