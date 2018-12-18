import React from 'react'
import {
    Container,
    Header,
    Segment,
} from 'semantic-ui-react'
import ListScenario from '../../ViewScenario/ListScenario'

export default class DeleteSize extends React.Component {
    render() {
        return (
            <div>
            <Header as='h3'>
                Size List
            </Header>
            <Segment>
                <Container>
                    <ListScenario
                        handleScenarioDelete={this.props.handleScenarioDelete}
                        handleSelected={this.props.handleSelected}
                        array={this.props.sizeOption}
                        size={this.props.size}
                        currentPage={this.props.currentPage}
                        name={'size'}
                    />
                </Container>
            </Segment>
            </div>
        )
    }
}