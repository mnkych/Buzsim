import React from 'react';
import ProfitNLoss from '../components/Report/ProfitNLoss';
import BalanceSheet from '../components/Report/BalanceSheet';
import CashFlowReport from '../components/Report/CashFlowReport';
import NavbarContent from '../components/Navbar/Navbar';
import Summary from '../components/Report/Summary';
import {
    redirectPage
} from '../Provider/StoreProvider/StoreProvider'
import { calculateMarketShare } from '../Provider/StoreProvider/StoreProvider'
import {
    Button,
    Icon,
    Header,
    Segment,
    Grid,
    Loader,
    Dimmer,
    Container,
    Message
} from 'semantic-ui-react'
import {
    Body_content,
    Content_wrap,
    ItemNav,
    Alert,
    Grid_bg,
} from '../Provider/CSS/styled';
import styled from 'styled-components';
import { calculateIRR } from '../Provider/CashFlowProvider/CashFlowProvider';
import { Scrollbars } from 'react-custom-scrollbars';
import DataVirtual from '../components/DataVirtual/DataVirtual';
import { UserSelectedProvider } from '../Provider/UserProvider/UserProvider';

const NavigationItem = styled(ItemNav)`
    cursor: pointer;
    background-color: ${
    props => props.active ? '#00B5AD' : 'inherit'
    };
    
`
export default class Report extends React.Component {
    state = {
        activeItem: '',
        activeIndex: 0,
        reportCheck: false,
        activeNav: 'summary',
    }
    componentDidMount = async () => {
        if (UserSelectedProvider.getUserSelected()) {
            await this.setState(UserSelectedProvider.getUserSelected())
            await sessionStorage.removeItem('userSelected')
        } else {
            if (!this.props.location.state) {
                this.setState({
                    reportCheck: true,
                })
            } else {
                if (this.props.location.state.userSelected) {
                    await this.setState({ ...this.props.location.state.userSelected })
                }
            }
        }
    }
    handleModal = () => {
        window.close()
        redirectPage('/Instruction')
    }
    handleBack = () => {
        if (this.props.location.state) {
            this.props.history.replace({
                pathname: `/Manage/${this.props.location.state.params}`,
                state: this.props.location.state.userEmail ? { userSelected: this.props.location.state.userSelected, userEmail: this.props.location.state.userEmail } : { userSelected: this.props.location.state.userSelected }
            });
        } else {
            window.close()
        }
    }
    navWhenClick = activeNav => () => this.setState({ activeNav })
    showComponent = () => {
        if (this.state.activeNav === 'summary') {
            return (
                <Scrollbars style={{ width: '100%', height: 1000 }} >
                    < Summary
                        sizeSelected={JSON.parse(this.state.sizeSelected)}
                        decorationSelected={this.state.decorationSelected}
                        ownershipSelected={JSON.parse(this.state.ownershipSelected)}
                        productSelected={this.state.productSelected}
                        productTypeAcceptSelected={this.state.productTypeAcceptSelected}
                        employeeSelected={this.state.employeeSelected}
                        parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}
                        totalTimeSelected={this.state.totalTimeSelected}
                        daySelected={this.state.daySelected}
                        businessScenarioData={this.state.businessScenarioData}
                        locationSelected={JSON.parse(this.state.locationSelected)}
                        marketingSelected={this.state.marketingSelected}
                        marketShared={this.state === undefined ? 0 : calculateMarketShare(
                            this.state.competitorSelected,
                            this.state.decorationSelected,
                            this.state.decorationData,
                            this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined,
                            this.state.daySelected,
                            this.state.totalTimeSelected,
                            this.state.employeeSelected,
                            this.state.parttimeEmployeeSelected,
                            this.state.productSelected,
                            this.state.marketingSelected,
                            this.state.marketingData,
                            this.state.businessScenarioData,
                            this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined,
                            this.state.productChoice,
                            this.state.productData)}
                        targetGroupSelected={JSON.parse(this.state.targetGroupSelected)}
                    />
                </Scrollbars>
            )
        }
        if (this.state.activeNav === 'cashflow') {
            return (
                <CashFlowReport
                    sizeSelected={JSON.parse(this.state.sizeSelected)}
                    decorationSelected={this.state.decorationSelected}
                    ownershipSelected={JSON.parse(this.state.ownershipSelected)}
                    productSelected={this.state.productSelected}
                    productTypeAcceptSelected={this.state.productTypeAcceptSelected}
                    employeeSelected={this.state.employeeSelected}
                    parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}
                    totalTimeSelected={this.state.totalTimeSelected}
                    daySelected={this.state.daySelected}
                    businessScenarioData={this.state.businessScenarioData}
                    locationSelected={JSON.parse(this.state.locationSelected)}
                    marketingSelected={this.state.marketingSelected}
                    marketShared={this.state === undefined ? 0 : calculateMarketShare(
                        this.state.competitorSelected,
                        this.state.decorationSelected,
                        this.state.decorationData,
                        this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined,
                        this.state.daySelected,
                        this.state.totalTimeSelected,
                        this.state.employeeSelected,
                        this.state.parttimeEmployeeSelected,
                        this.state.productSelected,
                        this.state.marketingSelected,
                        this.state.marketingData,
                        this.state.businessScenarioData,
                        this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined,
                        this.state.productChoice,
                        this.state.productData)}
                    targetGroupSelected={JSON.parse(this.state.targetGroupSelected)}
                />
            )
        }
        if (this.state.activeNav === 'profitNLoss') {
            return (<ProfitNLoss
                sizeSelected={JSON.parse(this.state.sizeSelected)}
                decorationSelected={this.state.decorationSelected}
                ownershipSelected={JSON.parse(this.state.ownershipSelected)}
                productSelected={this.state.productSelected}
                productTypeAcceptSelected={this.state.productTypeAcceptSelected}
                employeeSelected={this.state.employeeSelected}
                parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}
                totalTimeSelected={this.state.totalTimeSelected}
                daySelected={this.state.daySelected}
                businessScenarioData={this.state.businessScenarioData}
                locationSelected={JSON.parse(this.state.locationSelected)}
                marketingSelected={this.state.marketingSelected}
                marketShared={this.state === undefined ? 0 : calculateMarketShare(
                    this.state.competitorSelected,
                    this.state.decorationSelected,
                    this.state.decorationData,
                    this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined,
                    this.state.daySelected,
                    this.state.totalTimeSelected,
                    this.state.employeeSelected,
                    this.state.parttimeEmployeeSelected,
                    this.state.productSelected,
                    this.state.marketingSelected,
                    this.state.marketingData,
                    this.state.businessScenarioData,
                    this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined,
                    this.state.productChoice,
                    this.state.productData)}
                targetGroupSelected={JSON.parse(this.state.targetGroupSelected)} />
            )
        }
        if (this.state.activeNav === 'balanceSheet') {
            return (
                <BalanceSheet
                    sizeSelected={JSON.parse(this.state.sizeSelected)}
                    decorationSelected={this.state.decorationSelected}
                    ownershipSelected={JSON.parse(this.state.ownershipSelected)}
                    productSelected={this.state.productSelected}
                    productTypeAcceptSelected={this.state.productTypeAcceptSelected}
                    employeeSelected={this.state.employeeSelected}
                    parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}
                    totalTimeSelected={this.state.totalTimeSelected}
                    daySelected={this.state.daySelected}
                    businessScenarioData={this.state.businessScenarioData}
                    locationSelected={JSON.parse(this.state.locationSelected)}
                    marketingSelected={this.state.marketingSelected}
                    marketShared={this.state === undefined ? 0 : calculateMarketShare(
                        this.state.competitorSelected,
                        this.state.decorationSelected,
                        this.state.decorationData,
                        this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined,
                        this.state.daySelected,
                        this.state.totalTimeSelected,
                        this.state.employeeSelected,
                        this.state.parttimeEmployeeSelected,
                        this.state.productSelected,
                        this.state.marketingSelected,
                        this.state.marketingData,
                        this.state.businessScenarioData,
                        this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined,
                        this.state.productChoice,
                        this.state.productData)}
                    targetGroupSelected={JSON.parse(this.state.targetGroupSelected)}
                />
            )
        } if (this.state.activeNav === 'finalreport') {
            return (
                <DataVirtual
                    sizeSelected={JSON.parse(this.state.sizeSelected)}
                    decorationSelected={this.state.decorationSelected}
                    ownershipSelected={JSON.parse(this.state.ownershipSelected)}
                    productSelected={this.state.productSelected}
                    productTypeAcceptSelected={this.state.productTypeAcceptSelected}
                    employeeSelected={this.state.employeeSelected}
                    parttimeEmployeeSelected={this.state.parttimeEmployeeSelected}
                    totalTimeSelected={this.state.totalTimeSelected}
                    daySelected={this.state.daySelected}
                    businessScenarioData={this.state.businessScenarioData}
                    locationSelected={JSON.parse(this.state.locationSelected)}
                    marketingSelected={this.state.marketingSelected}
                    marketShared={this.state === undefined ? 0 : calculateMarketShare(
                        this.state.competitorSelected,
                        this.state.decorationSelected,
                        this.state.decorationData,
                        this.state.sizeSelected !== undefined ? JSON.parse(this.state.sizeSelected) : undefined,
                        this.state.daySelected,
                        this.state.totalTimeSelected,
                        this.state.employeeSelected,
                        this.state.parttimeEmployeeSelected,
                        this.state.productSelected,
                        this.state.marketingSelected,
                        this.state.marketingData,
                        this.state.businessScenarioData,
                        this.state.locationSelected !== undefined ? JSON.parse(this.state.locationSelected) : undefined,
                        this.state.productChoice,
                        this.state.productData)}
                    targetGroupSelected={JSON.parse(this.state.targetGroupSelected)}
                />
            )
        }
    }

    render() {
        const { activeNav } = this.state
        return (
            <div>
                {this.props.location.state ?
                    <NavbarContent history={this.props.history} /> : ''}
                <Body_content>
                    {this.props.location.state ? '' :
                        <Message icon color='teal'>
                            <Icon name='user outline' />
                            <Message.Content>
                                <Message.Header>{this.state.userStore ? this.state.userStore.StoreEmail : ''}</Message.Header>
                                {this.state.userStore ? '@ ' + this.state.userStore.ClassroomName : ''}
                            </Message.Content>
                        </Message>
                    }
                    <Content_wrap>
                        <Container>
                            <Dimmer page active={this.state.businessScenarioData === "" || this.state.businessScenarioData === undefined ? !this.state.reportCheck : this.state.reportCheck}>
                                <Loader indeterminate size={"massive"}>Please Wait</Loader>
                            </Dimmer>
                            <Alert
                                open={this.state.reportCheck}
                                basic
                                size='small'
                                dimmer='blurring'
                                header='Something wrong!'
                                content='Select one of your students. or Please make the disicion first.'
                                actions={[
                                    <Button key='confirm' color='green' onClick={this.handleModal} inverted>
                                        <Icon name='checkmark' /> Got it
                                    </Button>
                                ]}
                            />
                            {this.state.confirmCheck === false ?
                                <Grid_bg>
                                    <Grid.Column width={3}>
                                        <div>
                                            <NavigationItem
                                                active={activeNav === 'summary'}
                                                onClick={this.navWhenClick('summary')}>
                                                <Header as='h4'>
                                                    Summary
                                                </Header>
                                            </NavigationItem>
                                            <NavigationItem
                                                active={activeNav === 'balanceSheet'}
                                                onClick={this.navWhenClick('balanceSheet')}>
                                                <Header as='h4'>
                                                    Balance Sheet
                                                </Header>
                                            </NavigationItem>
                                            <NavigationItem
                                                active={activeNav === 'profitNLoss'}
                                                onClick={this.navWhenClick('profitNLoss')}>
                                                <Header as='h4'>
                                                    Profit & Loss
                                                </Header>
                                            </NavigationItem>
                                            <NavigationItem
                                                active={activeNav === 'cashflow'}
                                                onClick={this.navWhenClick('cashflow')}>
                                                <Header as='h4'>
                                                    Cashflow
                                                </Header>
                                            </NavigationItem>
                                            <NavigationItem
                                                active={activeNav === 'finalreport'}
                                                onClick={this.navWhenClick('finalreport')}>
                                                <Header as='h4'>
                                                    Final Report
                                                </Header>
                                            </NavigationItem>
                                            <br />
                                            {this.state !== undefined && this.state.businessScenarioData !== undefined ?
                                                <Segment circular inverted style={{ width: 150, height: 150 }}>
                                                    Internal Rate of Return(IRR)
                                                    <Header as='h2' inverted>
                                                        {calculateIRR(
                                                            this.state.productSelected,
                                                            this.state.productTypeAcceptSelected,
                                                            this.state.employeeSelected,
                                                            this.state.parttimeEmployeeSelected,
                                                            this.state.totalTimeSelected,
                                                            this.state.daySelected,
                                                            this.state.businessScenarioData,
                                                            JSON.parse(this.state.locationSelected),
                                                            calculateMarketShare(
                                                                this.state.competitorSelected,
                                                                this.state.decorationSelected,
                                                                this.state.decorationData,
                                                                JSON.parse(this.state.sizeSelected),
                                                                this.state.daySelected,
                                                                this.state.totalTimeSelected,
                                                                this.state.employeeSelected,
                                                                this.state.parttimeEmployeeSelected,
                                                                this.state.productSelected,
                                                                this.state.marketingSelected,
                                                                this.state.marketingData,
                                                                this.state.businessScenarioData,
                                                                JSON.parse(this.state.locationSelected),
                                                                this.state.productChoice,
                                                                this.state.productData),
                                                            this.state.businessScenarioData.BusinessPlayingYear,
                                                            JSON.parse(this.state.targetGroupSelected),
                                                            this.state.marketingSelected,
                                                            this.state.decorationSelected
                                                        ) + " %"}
                                                    </Header>
                                                </Segment>
                                                :
                                                ""
                                            }
                                        </div>
                                        <br /><br />
                                        <Button fluid color='grey' onClick={this.handleBack}>
                                            <Icon name='angle left' />Back to edit
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width={13}>
                                        {this.showComponent()}
                                    </Grid.Column>

                                </Grid_bg>
                                : ""}
                        </Container>
                    </Content_wrap>
                </Body_content>
            </div>
        )
    }
}