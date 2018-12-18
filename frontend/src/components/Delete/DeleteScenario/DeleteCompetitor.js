import React from 'react'
import {
    Container,
    Header,
    Segment,
} from 'semantic-ui-react'
import ListScenario from '../../ViewScenario/ListScenario'

export default class DeleteCompetitor extends React.Component {
    render() {
        return (
            <div>
            <Header as='h3'>
                Competitor List
            </Header>
            <Segment>
                <Container>
                    <ListScenario
                        handleScenarioDelete={this.props.handleScenarioDelete}
                        handleSelected={this.props.handleSelected}
                        array={this.props.competitorOption}
                        competitor={this.props.competitor}
                        currentPage={this.props.currentPage}
                        name={'competitor'}
                    />
                </Container>
            </Segment>
            </div>
        )
    }
}