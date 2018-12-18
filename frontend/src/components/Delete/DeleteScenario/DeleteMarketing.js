import React from 'react'
import {
    Container,
    Header,
    Segment,
} from 'semantic-ui-react'
import ListScenario from '../../ViewScenario/ListScenario'

export default class DeleteMarketing extends React.Component {
    render() {
        return (
            <div>
            <Header as='h3'>
                Marketing List
            </Header>
            <Segment>
                <Container>
                    <ListScenario
                        handleScenarioDelete={this.props.handleScenarioDelete}
                        handleSelected={this.props.handleSelected}
                        array={this.props.marketingOption}
                        marketing={this.props.marketing}
                        currentPage={this.props.currentPage}
                        name={'marketing'}
                    />
                </Container>
            </Segment>
            </div>
        )
    }
}