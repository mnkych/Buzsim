import React from 'react'
import {
    Container,
    Header,
    Segment,
} from 'semantic-ui-react'
import ListScenario from '../../ViewScenario/ListScenario'

export default class DeleteDecoration extends React.Component {
    render() {
        return (
            <div>
            <Header as='h3'>
                Decoration List
            </Header>
            <Segment>
                <Container>
                    <ListScenario
                        handleScenarioDelete={this.props.handleScenarioDelete}
                        handleSelected={this.props.handleSelected}
                        array={this.props.decorationOption}
                        decoration={this.props.decoration}
                        currentPage={this.props.currentPage}
                        name={'decoration'}
                    />
                </Container>
            </Segment>
            </div>
        )
    }
}