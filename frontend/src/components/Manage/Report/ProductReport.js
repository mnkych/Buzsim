import React from 'react';
import {
    Collapse
} from 'reactstrap';
import {
    List,
    Grid,
    Icon,
    Header
} from 'semantic-ui-react';
import {
    Content_header,
    Content
} from '../../../Provider/CSS/styled';
import {
    calculateEstimateSale
} from '../../../Provider/StoreProvider/StoreProvider'



export default class ProductReport extends React.Component {
    state = {
        collapse: true
    }
    showProductEstimated = () => {
        let estimated = []
        let showEstimated = []
        if (this.props.businessScenarioData !== undefined) {
            estimated = calculateEstimateSale(this.props.productSelected, this.props.productTypeAcceptSelected, this.props.employeeSelected, this.props.parttimeEmployeeSelected, this.props.totalTimeSelected, this.props.daySelected, this.props.businessScenarioData, this.props.locationSelected, this.props.marketShared, this.props.businessScenarioData.BusinessPlayingYear, this.props.targetGroupSelected)
           
            if (estimated.length !== 0) {
                showEstimated = estimated[1].map((e, index) => {
                    return (
                        <List.Item key={index}>
                            {e.productDetail.ProductName}
                        </List.Item>
                    )
                })
            }
        }
        return showEstimated
    }

    showUnitEstimated = () => {
        let estimated = []
        let showEstimated = []
        if (this.props.businessScenarioData !== undefined) {
            estimated = calculateEstimateSale(this.props.productSelected, this.props.productTypeAcceptSelected, this.props.employeeSelected, this.props.parttimeEmployeeSelected, this.props.totalTimeSelected, this.props.daySelected, this.props.businessScenarioData, this.props.locationSelected, this.props.marketShared, this.props.businessScenarioData.BusinessPlayingYear, this.props.targetGroupSelected)
            if (estimated.length !== 0) {
                showEstimated = estimated[1].map((e, index) => {
                    return (
                        <List.Item key={index}>
                            {Math.round(e.populationNeedProduct / 12).toLocaleString('EN')}
                        </List.Item>
                    )
                })
            }
        }
        return showEstimated
    }

    handleCollapse = () => {
        this.setState({
            collapse: !this.state.collapse
        })
    }
    render() {
        return (
            <div>
                <Content_header style={{ borderTop: '3px solid #8E44AD' }}>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column floated='left'>
                            <Header
                                as='h4'
                                content='Estimated Sales (Unit/Month)'
                            />
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Icon
                                link
                                color='grey'
                                name={this.state.collapse === true ? 'angle down' : 'angle left'}
                                onClick={this.handleCollapse}
                            />
                        </Grid.Column>
                    </Grid>
                </Content_header>
                <Collapse isOpen={this.state.collapse}>
                    <Content>
                        <Grid container columns={2}>
                            <Grid.Column width={10}>
                                <List>
                                    <List.Item>
                                        <List.Header>
                                            Product
                                        </List.Header>
                                    </List.Item>
                                    {this.showProductEstimated()}
                                </List>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <List>
                                    <List.Item>
                                        <List.Header>
                                            Amount
                                        </List.Header>
                                    </List.Item>
                                    {this.showUnitEstimated()}
                                </List>
                            </Grid.Column>

                        </Grid>
                    </Content>
                </Collapse>
            </div>
        )
    }
}