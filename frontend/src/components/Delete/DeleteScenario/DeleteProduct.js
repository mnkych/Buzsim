import React from 'react'
import {
    Container,
    Header,
    Segment,
} from 'semantic-ui-react'
import ListScenario from '../../ViewScenario/ListScenario'

export default class DeleteProduct extends React.Component {
    render() {
        return (
            <div>
            <Header as='h3'>
                Product List
            </Header>
            <Segment>
                <Container>
                    <ListScenario
                        handleScenarioDelete={this.props.handleScenarioDelete}
                        handleSelected={this.props.handleSelected}
                        array={this.props.productOption}
                        product={this.props.product}
                        currentPage={this.props.currentPage}
                        name={'product'}
                    />
                </Container>
            </Segment>
            </div>
        )
    }
}