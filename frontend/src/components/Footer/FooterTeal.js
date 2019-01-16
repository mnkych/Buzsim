import React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react'

const Footer_wrap = styled.div`
    border-top: 2px solid black;
    padding-top:30px;
    color:#FFFFFF;
    background: #00B5AC;
    z-index:99999;   
    width:100%;
    height:150px;
    background-size: contain;
`

export default class FooterContentTeal extends React.Component {
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