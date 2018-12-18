import React from 'react';
import {
    Container,
    Form,
    Icon,
    Header,
    Button,
    Segment,
    Label,
    List,
    Grid,
    Menu,
    Modal,
    Image,
    Pagination
} from 'semantic-ui-react';
import { Alert } from '../../Provider/CSS/styled';
import styled from 'styled-components';
import bgadmin from '../../Static/img/bgadmin.svg';
import { Back_hv } from '../../Provider/CSS/hover';
import ViewScenario from '../ViewScenario/ViewScenario';
import ListScenario from '../ViewScenario/ListScenario'
import select from '../../Static/img/checked.png';
import notSelect from '../../Static/img/circumference.png';
import { countLengthArray2D } from '../../Provider/CreateProvider/CreateProvider';

const Bg_wrap = styled.div`
    background:url(${bgadmin}) no-repeat;
    background-size:cover;
    height:100vh;
`
const Sidebar = styled.div`
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
`
const Body_Main = styled.div`
    transition: margin-right .5s;
    padding: 16px;
`
export default class ClassroomManagement extends React.Component {
    state = {
        activeItem: "Classroom",
        viewSce: false,
        currentPage: 1,
        currentStudentPage: 1
    }
    changeToCreateTab = (name) => {
        if (name === 'Classroom') {
            this.props.handleSelected('selectedScenario', undefined)
        }
        this.setState({
            activeItem: name,
            currentPage: 1
        })
    }
    handlePaginationChange = (activePage) => {
        this.setState({ currentPage: activePage })
    }
    openViewScenario = (check) => {
        this.setState({ viewSce: check })
        if (this.state.viewSce) {
            document.getElementById("viewScn").style.width = "0";
            document.getElementById("main").style.marginRight = "0";
        } else {
            document.getElementById("viewScn").style.width = "55%";
            document.getElementById("main").style.marginRight = "55%";
        }
    }
    handlePaginationStudentsChange = (activePage) => {
        this.setState({ currentStudentPage: activePage })
    }
    genClassroom = () => {
        let genClassroom = []
        if (this.props.classroom && this.props.classroom.length > 0) {
            genClassroom = this.props.classroom[this.state.currentPage - 1].map((e, index) => {
                return (
                    <List.Item onClick={() => this.props.handleSelected('selectedScenario', e)} key={'class' + index}>
                        {this.props.selectedScenario ? this.props.selectedScenario.ClassID === e.ClassID ? <Image avatar src={select} /> : <Image avatar src={notSelect} /> : <Image avatar src={notSelect} />}
                        <List.Content>
                            <List.Header>{e.ClassroomName}</List.Header>
                            <Label color="brown" size="mini">Scenario:</Label>&nbsp;&nbsp;{e.BusinessName}&nbsp;&nbsp;
                            <Label color="blue" size="mini">Key room</Label>&nbsp;&nbsp;{e.EnterCode}
                        </List.Content>
                        <List.Content floated='right'>
                            <Button onClick={() => this.props.handleClassroomDelete(e)} negative inverted circular icon='trash alternate outline' />
                        </List.Content>
                        <Alert
                            size="large"
                            trigger={
                                <Button size='medium' floated='left' circular icon='file alternate outline'
                                    onClick={async () => {
                                        await this.setState({ currentStudentPage: 1 })
                                        await this.props.handleModal(e)
                                    }} />
                            } closeIcon>
                            <Modal.Header>Students List @ {e.ClassroomName}</Modal.Header>
                            <Modal.Content>
                                <Modal.Header>{countLengthArray2D(this.props.students)} Students in class</Modal.Header>
                                <Segment>
                                    <Container>
                                        <Modal.Description>
                                            <ListScenario
                                                array={this.props.students}
                                                name={'students'}
                                                currentPage={this.state.currentStudentPage}
                                                handleStudentReport={this.props.handleStudentReport}
                                            />
                                        </Modal.Description>
                                    </Container>
                                </Segment>
                                <Grid verticalAlign='middle' columns={3}>
                                    <Grid.Column></Grid.Column>
                                    <Grid.Column>
                                        <Pagination
                                            activePage={this.state.currentStudentPage}
                                            onPageChange={(e, { activePage }) => this.handlePaginationStudentsChange(activePage)}
                                            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                            prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                            nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                            totalPages={this.props.students.length}
                                        />
                                    </Grid.Column>
                                    <Grid.Column></Grid.Column>
                                </Grid>
                            </Modal.Content>
                        </Alert>
                    </List.Item>
                )
            })
        }
        return genClassroom
    }
    render() {
        return (
            <Bg_wrap>
                <Back_hv style={{ paddingTop: "2%", position: "absolute" }} name="arrow alternate circle left" size='huge' link color='grey' onClick={() => this.props.handleLocation('Management')} />
                <Body_Main id="main" style={{ paddingTop: "7%" }}>
                    <Container>
                        <Menu attached='top' tabular>
                            <Menu.Item name="Classroom" active={this.state.activeItem === 'Classroom'} onClick={() => this.changeToCreateTab('Classroom')} />
                            {this.state.activeItem === "Create" ?
                                <Menu.Item
                                    name='Create'
                                    active={this.state.activeItem === 'Create'}
                                />
                                :
                                ""}
                        </Menu>
                        <Segment attached='bottom' stacked secondary>
                            {this.state.activeItem === "Classroom" ?
                                <div>
                                    <Header as='h3'>
                                        Classroom list
                                        <Button size='mini' floated='right' content='Show Detail' circular icon={this.state.viewSce ? 'eye slash' : 'eye'} onClick={() => this.openViewScenario(!this.state.viewSce)} />
                                    </Header>
                                    <Segment>
                                        <Container>
                                            <List divided verticalAlign='middle' relaxed='very' selection>
                                                {this.genClassroom()}
                                            </List>
                                        </Container>
                                    </Segment>
                                    <Grid columns={2} stackable>
                                        <Grid.Column textAlign='left'>
                                            <Button positive onClick={() => this.changeToCreateTab("Create")}>
                                                <Icon name="add" />
                                                Create
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column textAlign='right'>
                                            <Pagination
                                                activePage={this.state.currentPage}
                                                onPageChange={(e, { activePage }) => this.handlePaginationChange(activePage)}
                                                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                                firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                                lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                                prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                                nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                                totalPages={this.state.activeItem === 'Classroom' ? this.props.classroom.length : this.props.scenario.length}
                                            />
                                        </Grid.Column>
                                    </Grid>

                                </div>
                                :
                                <div>
                                    <Header as='h3'>
                                        Create Classroom
                                        <Button size='mini' floated='right' content='Show Detail' circular icon={this.state.viewSce ? 'eye slash' : 'eye'} onClick={() => this.openViewScenario(!this.state.viewSce)} />
                                    </Header>
                                    <Form onSubmit={() => {
                                        this.props.handleSubmit()
                                        this.changeToCreateTab('Classroom')
                                    }} size="tiny">
                                        <Form.Group>
                                            <Form.Input
                                                name='NameInput'
                                                label='Classroom name'
                                                value={this.props.NameInput}
                                                onChange={(e, { name, value }) => this.props.handleChange({ name, value })}
                                            />
                                            <Form.Input
                                                label="Key room"
                                                name='CodeInput'
                                                value={this.props.CodeInput}
                                                onChange={(e, { name, value }) => this.props.handleChange({ name, value })}
                                            />
                                        </Form.Group>
                                        <Header as='h5'>Scenario lists</Header>
                                        <Segment>
                                            <Container>
                                                <ListScenario
                                                    handleSelected={this.props.handleSelected}
                                                    array={this.props.scenario}
                                                    selectedScenario={this.props.selectedScenario}
                                                    currentPage={this.state.currentPage}
                                                    name={'Classroom'}
                                                />
                                            </Container>
                                        </Segment>
                                        <Grid columns={2} stackable>
                                            <Grid.Column textAlign='left'>
                                                <Button.Group>
                                                    <Button onClick={() => this.changeToCreateTab("Classroom")}>Back</Button>
                                                    <Button.Or />
                                                    <Form.Button positive>Create</Form.Button>
                                                </Button.Group>
                                            </Grid.Column>
                                            <Grid.Column textAlign='right'>
                                                <Pagination
                                                    activePage={this.state.currentPage}
                                                    onPageChange={(e, { activePage }) => this.handlePaginationChange(activePage)}
                                                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                                    totalPages={this.state.activeItem === 'Classroom' ? this.props.classroom.length : this.props.scenario.length}
                                                />
                                            </Grid.Column>
                                        </Grid>
                                    </Form>
                                </div>
                            }

                        </Segment>
                    </Container>
                </Body_Main >
                <Sidebar id="viewScn" style={{ backgroundColor: "#F3F3F3", }}>
                    <ViewScenario selectedScenario={this.props.selectedScenario} />
                </Sidebar>
            </Bg_wrap >
        )
    }
}