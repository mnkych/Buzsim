import React from 'react';
import {
    Container,
    Card,
    Icon,
    Header,
    Button,
    Grid,
} from 'semantic-ui-react';
import {
    ZoomInAnimateCard,
    BounceInAminateCard,
    FadeInAnimate
} from '../Provider/CSS/animation';
import FooterTeal from '../components/Footer/FooterTeal'
import styled from 'styled-components';
import bgadmin from '../Static/img/bgadmin.svg';
import { Back_hv } from '../Provider/CSS/hover';
import swal from 'sweetalert2'
import { UserProvider } from '../Provider/UserProvider/UserProvider'
const Bg_wrap = styled(Container)`
    background:url(${bgadmin}) no-repeat;
    background-size:cover;
    height:101vh;
`
const Card_zmIn = styled(ZoomInAnimateCard)`
    top:27% !important;
    left:20%;
    right:20%;
    position:absolute;
`
const Card_bncIn = styled(BounceInAminateCard)`
    top:27% !important;
    left:20%;
    right:20%;
    position:absolute;
`
export default class AdminManagement extends React.Component {
    state = {
        currentComponent: "management"
    }
    componentWillMount = () => {
        if (!UserProvider.getUserOnLog()) {
            swal({
                position: 'center',
                type: 'info',
                title: 'Instructor ?',
                html: 'Please login first',
                showConfirmButton: true,
            }).then(() => {
                this.logOut()
            })
        }
    }
    logOut = () => {
        UserProvider.setUserOnLog(undefined)
        this.props.history.replace({
            pathname: "/",
            state: undefined
        })
    }
    goToClassroom = () => {
        this.setState({
            currentComponent: "classroom"
        })
    }
    goToScenario = () => {
        this.setState({
            currentComponent: "scenario"
        })
    }
    goToManagement = () => {
        this.setState({
            currentComponent: "management"
        })
    }
    handleLocation = (path) => {
        this.props.history.push({
            pathname: `Management/${path}`,
            state: UserProvider.getUserOnLog()
        })
    }
    showCurrentCard = () => {
        if (this.state.currentComponent === "management") {
            return (
                <Card_bncIn centered>
                    <Card>
                        <Card.Content>
                            <Header as='h1' icon>
                                <Icon name='graduation' />
                                Classroom
                                <Header.Subheader>
                                    You can create classroom for students joining and define business scenario into the classroom, in addition remove classroom.
                                </Header.Subheader>
                            </Header>
                            <Header icon>
                                <Button primary onClick={() => this.handleLocation('Classroom')}>
                                    Manage
                                    </Button>
                            </Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Header as='h1' icon>
                                <Icon name='clipboard' />
                                Scenario
                                <Header.Subheader>
                                    You can create scenario and set factors in each main factors into the scenario, in addition delete factors that are not use it.
                                </Header.Subheader>
                            </Header>
                            <Header icon>
                                <Button primary onClick={this.goToScenario}>Manage</Button>
                            </Header>
                        </Card.Content>
                    </Card>
                </Card_bncIn>
            )
        } if (this.state.currentComponent === "scenario") {
            return (
                <Card_zmIn centered>
                    <Card>
                        <Card.Content>
                            <Header as='h1' icon>
                                <Icon name='add circle' />
                                Create
                                <Header.Subheader>
                                    You can create classroom for students joining and define business scenario into the classroom, in addition remove classroom.
                                </Header.Subheader>
                            </Header>
                            <Header icon>
                                <Button positive onClick={() => this.handleLocation('Scenario/CreateScenario')}>Create</Button>
                            </Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Header as='h1' icon>
                                <Icon name='trash alternate' />
                                Delete
                                <Header.Subheader>
                                    You can create scenario and set factors in each main factors into the scenario, in addition delete factors that are not use it.
                                </Header.Subheader>
                            </Header>
                            <Header icon>
                                <Button negative onClick={() => this.handleLocation('Scenario/DeleteScenario')}>
                                    Delete
                                </Button>
                            </Header>
                        </Card.Content>
                    </Card>
                </Card_zmIn>
            )
        }
    }
    render() {
        if (UserProvider.getUserOnLog()) {
            return (
                <div>
                    <Bg_wrap fluid>
                        {this.state.currentComponent === "management" ?
                            ""
                            :
                            <Back_hv style={{ paddingTop: "2%", position: "absolute" }} name="arrow alternate circle left" size='huge' link color='grey' onClick={this.goToManagement} />
                        }
                        <div style={{ right: "2%", paddingTop: "2%", position: "absolute" }}>
                            <Button onClick={this.logOut} basic content='Log out' circular icon='unlock' />
                        </div>
                        <Grid container style={{ height: "80%" }} columns={3}>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column style={{ top: "20%" }} textAlign="center">
                                {this.state.currentComponent === "scenario" ?
                                    <FadeInAnimate>
                                        <Header as='h1' style={{ color: "#FFFFFF" }}>
                                            <Header.Content>
                                                Scenario Management
                                        </Header.Content>
                                        </Header>
                                    </FadeInAnimate>
                                    :
                                    ""
                                }
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                        </Grid>
                        {this.showCurrentCard()}
                    </Bg_wrap>
                    <FooterTeal />
                </div>
            )
        } else {
            return (<Bg_wrap fluid></Bg_wrap>)
        }
    }
}