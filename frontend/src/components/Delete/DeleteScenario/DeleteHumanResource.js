import React from 'react'
import {
    Container,
    Header,
    Segment,
} from 'semantic-ui-react'
import ListScenario from '../../ViewScenario/ListScenario'

export default class DeleteHumanResource extends React.Component {
    render() {
        return (
            <div>
            <Header as='h3'>
                Human Resource List
            </Header>
            <Segment>
                <Container>
                    <ListScenario
                        handleScenarioDelete={this.props.handleScenarioDelete}
                        handleSelected={this.props.handleSelected}
                        array={this.props.humanOption}
                        human={this.props.human}
                        currentPage={this.props.currentPage}
                        name={'human'}
                    />
                </Container>
            </Segment>
            </div>
        )
    }
}