import styled from 'styled-components';
import {
    Button,
    Modal,
    Menu,
    Header,
    Grid,
    Table,
    Checkbox,
    Container,
    Dropdown
} from 'semantic-ui-react';
import Sticky from 'react-sticky-el';
import { Link } from "react-router-dom";

import bg2 from '../../Static/img/bg2.png';
import bg_cover from '../../Static/img/bg_cover.svg';
import bg_title from '../../Static/img/bg_title.svg'

export const Bg_cover = styled(Container)`
    background:url(${bg_cover});
    height:100vh;
    padding:3.5%;
    background-repeat: no-repeat;
    background-size:cover;
`
export const Bg_title_wrap = styled.div`
    background:url(${bg_title}) no-repeat right;
    /* background-repeat:no-repeat;*/
    background-size:cover;
    /* background-size:fixed; */
    background-color:#FFFFFF; 
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
    height:100%;
`
export const Header_title = styled(Header)`
    font-size:5vh !important;
`
export const Margin_left = styled(Header)`
    margin-left:9% !important;
`
export const Grid_height_top = styled(Grid.Row)`
    margin-top:5%;
`
export const Link_cls = styled(Link)`
    color:#00B5AD !important;
    &:hover {
        opacity:0.6;
        text-decoration:none !important;
    }
`
export const Link_ins = styled(Link)`
    color:#FFFFFF !important;
    &:hover {
        opacity:0.8;
        text-decoration:none !important;
    }
`
export const Title_cover = styled.p`
    color: #FFFFFF;
    font-weight:900;
    font-size:7vh;
`
export const Desc_cover = styled.p`
    font-size:2.5vh;
    font-weight:700;
    color:#3E3E3E;
`
export const Body_content = styled.div`
    background:url(${bg2});
    background-repeat:no-repeat;
    background-color:#E5E5E5;
    height:auto;
`
export const Content_wrap = styled.div`
    padding-top:2%;
`
export const Content = styled.div`
    padding:1.5%;
    background-color:#FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 5px;
`
export const Alert = styled(Modal)`
    margin:0 auto !important;
    margin-top:4% !important; 
`
export const Navbar_scroll = styled.div`
    position: fixed;
    top: -500px;
    width: 100%;
    transition: top 0.3s;
    z-index:99999;
`
export const Footer_scroll = styled.div`
    position: fixed;
    bottom: 0px;
    width: 100%;
    transition: bottom 0.3s;
    z-index:99999;
`
export const Navbar_scroll_bg = styled(Menu)`
    background-color:#333333 !important;
    border-style:none !important;
    border-radius:0px !important;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px !important;
`
export const Navbar_scroll_item = styled(Menu.Item)`
    color:#FFFFFF !important;
    &:hover{
        opacity:0.7;
    }
`
export const Footer_scroll_bg = styled(Menu)`
    background-color:#00b5ad !important;
    border-style:none !important;
    border-radius:0px !important;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px !important;
`
export const Sticky_fin_ratio = styled(Sticky)`
    z-index:99999 !important;
`
export const Fin_ratio_wrap = styled.div`
    z-index:99999 !important;
    right:0.5%; 
    bottom:7%;
    position:fixed;
    /* position:absolute; */
`
export const NavMemu_sticky = styled(Menu)`
    background-color:rgba(178, 175, 180,0.9) !important;
    border-radius:5px !important;
`
export const Confirm_button = styled(Button)`
    float:right;
`
export const Disable_message = styled.p`
    color: #ABB2B9;
`



export const Content_collapse = styled.div`
    background-color:#FFFFFF;
    padding:1.5%;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 5px;
    z-index:9999 !important;
`

export const Grid_bg = styled(Grid)`
    background-color:#E7E7E7;
`
export const Content_header = styled.div`
    padding:2.5%;
    /* padding-bottom:2%; */
    background-color:#FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 5px;
`
export const Table_small_size =styled(Table)`
    font-size:90% !important;
`
export const Radio_small_size = styled(Checkbox)`
    font-size:80% !important;   
`
export const Sub_desc = styled.span`
    font-size:90%;
` 
export const Center =  styled.div`
    text-align:center !important;
`
export const Sticky_info = styled(Sticky)`
    padding-top:1.5%;
    background-color:#FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 5px;
    transform: perspective(1px) translateZ(0);
    transition-duration: 0.3s;
    transition-property: box-shadow;
    &:hover{
        box-shadow: 0 3px 15px rgba(0, 0, 0, 0.4)
    }
`
export const Confirm_wrap = styled.div`
    padding:5%;
    
`
export const Sidenav = styled.div`
    /* height: 100%; */
    width: 20%;
    position: fixed;
    /* z-index: 99999; */
    top: 27%;
    /* left: 0;  */
    background-color:rgba(47, 50, 48,0.5);
`
export const ItemNav = styled.div`
    padding:5%;
    color:#ECECEC;
    &:focus{
        background-color:#00B5AD;
    }
`
export const TitleFactor = styled.div`
    background-color:#FFFFFF;
    width:100%;
    padding:2%;
    box-shadow: 0px 3px 8px rgba(0,0,0,0.2);
    border-top: solid 10px #8A8A8A;
`
export const WrapBody = styled.div`
    background-color:#F5F5F5 !important;
    height:110vh;
    width:82%;
    left:18% !important;
    position: absolute;
`
export const Topic = styled.div`
    padding:1%;
    background-color:#00B5AD;
    text-align:center;
    /* box-shadow: 0px 0 3px -10px rgba(0,0,0,0.2); */
`
export const InputWrap = styled(Content)`
    /* margin:2.5%; */
    padding:0%; 
`
export const AddChoicesBtn = styled.div`
    cursor:pointer;
    padding:1.5%;
    background-color:#EFEFEF;
    margin-left:2%;
    margin-right:2%;
    border: solid 0.5px #A4A4A4;
    &:active{
        opacity:0.7;
    }
    
`
export const ChoicesItem = styled.div`
    border-bottom: solid 0.5px #A4A4A4;
    padding:1%;
    padding-left:2%; 
`
export const Dropdown_scrollX = styled(Dropdown)`
    &.ui.upward.selection.dropdown .menu{
        overflow-x:scroll !important;
    }
    &.ui.selection.dropdown .menu>.item{
        white-space: nowrap !important; 
        overflow-x:scroll !important;
    }

`