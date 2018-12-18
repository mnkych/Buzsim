import React from 'react';
import {
    Collapse
} from 'reactstrap';
import {
    List,
    Grid,
    Icon,
    Header,
    Statistic

} from 'semantic-ui-react';
import { Content, Content_header } from '../../../Provider/CSS/styled';
import { calculateIRR } from '../../../Provider/CashFlowProvider/CashFlowProvider';

export default class MacroEnv extends React.Component {

    state = {
        collapse: true
    }

    handleCollapse = () => {
        this.setState({
            collapse: !this.state.collapse
        })
    }

    render() {
        return (
            <div>
                <Content_header style={{ borderTop: '3px solid #F39C12' }}>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column floated='left'>
                            <Header
                                as='h4'
                                content='Trading Areas Information'
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
                        <Grid container centered columns={2}>
                            <Grid.Column>
                            Internal rate of return (IRR)
                            </Grid.Column>
                            <Grid.Column>
                                <Statistic size='mini'>
                                    <Statistic.Value>
                                        {this.props !== undefined && this.props.businessScenarioData !== undefined ?
                                            calculateIRR(
                                                this.props.productSelected,
                                                this.props.productTypeAcceptSelected,
                                                this.props.employeeSelected,
                                                this.props.parttimeEmployeeSelected,
                                                this.props.totalTimeSelected,
                                                this.props.daySelected,
                                                this.props.businessScenarioData,
                                                this.props.locationSelected,
                                                this.props.marketShared,
                                                this.props.businessScenarioData.BusinessPlayingYear,
                                                this.props.targetGroupSelected,
                                                this.props.marketingSelected,
                                                this.props.decorationSelected
                                            ) : 0} %
                                    </Statistic.Value>

                                </Statistic>
                            </Grid.Column>
                        </Grid>
                    </Content>
                    <Content>
                        <Grid container centered>
                            <Grid.Column width={10} floated='left'>
                                <List size='small'>
                                    <List.Item>Total Population</List.Item>
                                    <List.Item>Trading area Population</List.Item>
                                    <List.Item>Population Growth Rate</List.Item>
                                    <List.Item>Economic Event Rate</List.Item>
                                    <List.Item>Demand Growth Rate</List.Item>
                                    <List.Item>Loan Interest Rate</List.Item>
                                    <List.Item>Number of Competitors</List.Item>
                                    <List.Item>Current Market Share</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={6} floated='right'>
                                <List size='small'>
                                    <List.Item>{this.props.locationSelected === undefined ? 0 : this.props.locationSelected.TotalPopulation.toLocaleString('EN')}</List.Item>
                                    <List.Item>{this.props.locationSelected === undefined ? 0 : this.props.locationSelected.TradingPopulationRatio.toLocaleString('EN')}&nbsp;%</List.Item>
                                    <List.Item>{this.props.locationSelected === undefined ? 0 : this.props.locationSelected.TotalPopulationGrowUpRate.toLocaleString('EN')}&nbsp;%</List.Item>
                                    <List.Item>{this.props.businessScenarioData === undefined ? "" : this.props.businessScenarioData.BusinessEconomicEvent.toLocaleString('EN')}&nbsp;%</List.Item>
                                    <List.Item>{this.props.businessScenarioData === undefined ? "" : this.props.businessScenarioData.BusinessGrossDemandGrowUpRate.toLocaleString('EN')}&nbsp;%</List.Item>
                                    <List.Item>{this.props.businessScenarioData === undefined ? "" : this.props.businessScenarioData.BusinessLoanInterestRate.toLocaleString('EN')}&nbsp;%</List.Item>
                                    <List.Item>{this.props.competitorSelected === undefined ? "" : this.props.competitorSelected.length.toLocaleString('EN')}</List.Item>
                                    <List.Item>{this.props.marketShared}&nbsp;%</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Content>
                </Collapse>
            </div>
        )
    }
}
