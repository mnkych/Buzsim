import React from 'react';
import { Link } from "react-router-dom";
import {
    Container,
    Header,
    Button,
    Divider,
    List,
    Icon,
    Modal,
    Grid
} from 'semantic-ui-react'
import {
    Alert
} from '../../Provider/CSS/styled';
import styled from 'styled-components';

const Link_btn = styled(Link)`
    color:#00B5AD !important;
    &:hover {
        opacity:0.6;
        text-decoration:none !important;
    }
`

export default class Content extends React.Component {
    state = {
        levelModal: false
    }

    selectLevel = () => {
        this.setState({
            levelModal: !this.state.levelModal
        })
    }
    render() {
        return (
            <div>
                <Container text>
                    <Header as='h2'>Business Simulation</Header>
                    <p>
                        The simulation is designed to illustrate the small business concept, especially the retail environment.
                        Users start stratrgically operate for higher business performance.
                    </p>
                    <p>
                        Users will experiment with various strategies and tactics that can help improve effectiveness of user's retail store and build a successful and profitable company.
                    </p>
                    <Divider />
                    <Header as='h2'>Storylines</Header>
                    <p>
                        Users are about the start a drug store. Their roles is to integrated the store with several elements of business
                        from sourcing, merchandising, financing, inventory managing, selling, human managing and merchandising at
                        the promising timeframe.
                    </p>
                    <Divider />
                    <Header as='h2'>The Decisions</Header>
                    <List as='ul'>
                        <List.Item as='li'>Where should your store located?</List.Item>
                        <List.Item as='li'>How big of your store?</List.Item>
                        <List.Item as='li'>Where should you fund the business?</List.Item>
                        <List.Item as='li'>What kind of store decoration do you need?</List.Item>
                        <List.Item as='li'>What product will you place in the store(at what price and unit stocked for sales)?</List.Item>
                        <List.Item as='li'>How many employee do you need?</List.Item>
                        <List.Item as='li'>How many working hours?</List.Item>
                    </List>
                    <Divider />
                    <Header as='h2'>Learning Outcomes</Header>
                    <p>
                        After finish the game, users shall be able to understand the following small business concepts
                    </p>
                    <List as='ul'>
                        <List.Item as='li'>Business Model and Model testing</List.Item>
                        <List.Item as='li'>Business Feasibility</List.Item>
                        <List.Item as='li'>Understand relationship among merchandising, pricing, inventory management, operating costs, logistics and financial</List.Item>
                        <List.Item as='li'>pricing, sensitivity analysis. product demand and return</List.Item>
                        <List.Item as='li'>Basic financial and cashflow analysis</List.Item>
                    </List>
                    <Alert 
                        size="tiny" 
                        trigger={
                            <div style={{ textAlign: "center" }}>
                                <Button circular positive size='massive' onClick={this.selectLevel}>
                                    <Icon name='play' />
                                    Start Business
                                </Button>
                            </div>
                    } closeIcon>
                        <Modal.Header>Select difficulty levels</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <Grid container centered padded>
                                <Link_btn to={`/Manage/${"Easy"}`}>
                                    <Button color='green' id="easy_bt">
                                        Easy
                                    </Button>
                                </Link_btn>
                                <Link_btn to={`/Manage/${"Moderate"}`}>
                                    <Button color='yellow'>
                                        Moderate
                                    </Button>
                                </Link_btn>
                                <Link_btn to={`/Manage/${"Difficult"}`}>
                                    <Button color='red'>
                                        Difficult
                                    </Button>
                                </Link_btn>
                                </Grid>
                            </Modal.Description>
                        </Modal.Content>
                    </Alert>

                </Container>
            </div>
        )
    }
}