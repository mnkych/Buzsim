import React from 'react'
import {
    Container,
    Header,
    Segment,
} from 'semantic-ui-react'
import ListScenario from '../../ViewScenario/ListScenario'

export default class DeleteOwnership extends React.Component {
    render() {
        return (
            <div>
                <Header as='h3'>
                    Ownership List
            </Header>
                <Segment>
                    <Container>
                        <ListScenario
                            handleScenarioDelete={this.props.handleScenarioDelete}
                            handleSelected={this.props.handleSelected}
                            array={this.props.ownershipOption}
                            ownership={this.props.ownership}
                            currentPage={this.props.currentPage}
                            name={'ownership'}
                        />
                    </Container>
                </Segment>
            </div>
        )
    }
}