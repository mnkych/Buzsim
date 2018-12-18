import React from 'react'
import {
    Container,
    Header,
    Segment,
} from 'semantic-ui-react'
import ListScenario from '../../ViewScenario/ListScenario'

export default class DeleteLocation extends React.Component {
    render() {
        return (
            <div>
                <Header as='h3'>
                    Location List
            </Header>
                <Segment>
                    <Container>
                        <ListScenario
                            handleScenarioDelete={this.props.handleScenarioDelete}
                            handleSelected={this.props.handleSelected}
                            array={this.props.locationOption}
                            location={this.props.location}
                            currentPage={this.props.currentPage}
                            name={'location'}
                        />
                    </Container>
                </Segment>
            </div>
        )
    }
}