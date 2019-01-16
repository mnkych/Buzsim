import React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react'

const Footer_wrap = styled.div`
    border-top: 2px solid black;
    background: #E7E7E7;
    z-index:99999;   
    width:100%;
    height:150px;
    padding-top:1%;
    background-size: contain;
`

export default class FooterContentGray extends React.Component {
    render() {
        return (
            <Footer_wrap>
                <Grid textAlign='center'>
                    <Grid.Row columns={3}>
                    <Grid.Column>
                        Weerapat Laorshubpayapat<br/>
                        weerapat.laor@gmail.com
                    </Grid.Column>
                    <Grid.Column>
                        Chantavat Pradit<br/>
                        mnkych@gmail.com
                    </Grid.Column>
                    <Grid.Column>
                        Eakarach Assawaraksakul<br/>
                        guysanook14@gmail.com
                    </Grid.Column>
                    </Grid.Row>
                        © Copyright 2018 Buzsim @ SIT
                </Grid>         
            </Footer_wrap>
        )
    }
}