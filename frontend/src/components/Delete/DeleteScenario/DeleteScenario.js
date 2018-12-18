import React from 'react'
import {
    Container,
    Header,
    Button,
    Segment,
} from 'semantic-ui-react'
import styled from 'styled-components'
import ViewScenario from '../../ViewScenario/ViewScenario'
import ListScenario from '../../ViewScenario/ListScenario'

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

export default class DeleteScenario extends React.Component {
    state = {
        viewSce: false,
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
    render() {
        return (
            <div>
            <Header as='h3'>
                Scenario List
                <Button size='mini' floated='right' content='Show Detail' circular icon={this.state.viewSce ? 'eye slash' : 'eye'} onClick={() => this.openViewScenario(!this.state.viewSce)} />
            </Header>
            <Segment>
                <Container>
                    <ListScenario
                        handleScenarioDelete={this.props.handleScenarioDelete}
                        handleSelected={this.props.handleSelected}
                        array={this.props.scenario}
                        selectedScenario={this.props.selectedScenario}
                        currentPage={this.props.currentPage}
                        name={'scenario'}
                    />
                </Container>
            </Segment>
            <Sidebar id="viewScn" style={{ backgroundColor: "#F3F3F3", }}>
                <ViewScenario selectedScenario={this.props.selectedScenario} />
            </Sidebar>
            </div>
        )
    }
}