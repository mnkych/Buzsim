import React from 'react'
import {
    Label,
    Table,
} from 'semantic-ui-react';

import { calculateEndingCF, calculateTotalCurrentInventoryValue, calculateAccountPayable } from '../../Provider/CashFlowProvider/CashFlowProvider';
import { calculateTotalCurrentAsset, calculateAllTotalSpent, calculateIntangible, calculateAccumulatedDepre, calculateNonCurrentAssest, calculateTotalAssest, calculateTotalCurrentLiability, calculateTotalLiability, calculateRegister, calculateReserve, calculateUnappropriated, calculateTotalEquityNLiability, calculateTotalEquity } from '../../Provider/BalanceSheetProvider/BalanceSheetProvider';
import { calculateInterest } from '../../Provider/ProductSellingReportProvider/ProductSellingReportProvider';
import { Scrollbars } from 'react-custom-scrollbars';

export default class BalanceSheet extends React.Component {
    showYearHeader = () => {
        let showYearHeader = []
        for (let i = 0; i <= this.props.businessScenarioData.BusinessPlayingYear; i++) {
            showYearHeader.push(
                <Table.HeaderCell key={i}>
                    <Label>YEAR {i}</Label>
                </Table.HeaderCell>)
        }
        return showYearHeader
    }
    showCash = () => {
        let value = []
        let showCash =
            calculateEndingCF(
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
            )
        value = showCash.map((e, i) => {
            return (
                <Table.Cell style={{ borderTop: 'solid 2px #000000' }} key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showTotalCurrentInventoryValue = () => {
        let value = []
        let productValue =
            calculateTotalCurrentInventoryValue(
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
                this.props.targetGroupSelected
            )
        value = productValue.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showTotalCurrentAssest = () => {
        let value = []
        let productValue =
            calculateTotalCurrentAsset(
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
            )
        value = productValue.map((e, i) => {
            return (
                <Table.HeaderCell key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        }) 
        return value
    }
    showBuildingAndEquipment = () => {
        let value = []
        let deptExceptProduct =
            calculateAllTotalSpent(this.props.decorationSelected, this.props.businessScenarioData)
        value = deptExceptProduct.map((e, i) => {
            return (
                <Table.Cell style={{ borderTop: 'solid 2px #000000' }} key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showIntangible = () => {
        let value = []
        let intangible = calculateIntangible(this.props.businessScenarioData)
        value = intangible.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showAccumulated = () => {
        let value = []
        let accumulated = calculateAccumulatedDepre(this.props.businessScenarioData, this.props.decorationSelected)
        value = accumulated.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showNonCurrentAssets = () => {
        let value = []
        let nonCurrentAssest = calculateNonCurrentAssest(this.props.businessScenarioData, this.props.decorationSelected)
        value = nonCurrentAssest.map((e, i) => {
            return (
                <Table.HeaderCell key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell> 
            )
        })
        return value
    }
    showTotalAssest = () => {
        let value = []
        let totalAssest = calculateTotalAssest(
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
        )
        value = totalAssest.map((e, i) => {
            return (
                <Table.HeaderCell style={{ backgroundColor: '#F1F1F1', borderTop: 'solid 2px #000000' }} key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell> 
            )
        })
        return value
    }
    showLiability = () => {
        let value = []
        let liability = calculateAccountPayable(
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
        )
        value = liability.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showShortTerm = () => {
        let value = []
        let shortTerm = calculateInterest(
            this.props.decorationSelected,
            this.props.productSelected,
            this.props.businessScenarioData,
            this.props.businessScenarioData.BusinessPlayingYear
        )
        value = shortTerm.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.plan.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showTotalCurrentLiability = () => {
        let value = []
        let currentLiability = calculateTotalCurrentLiability(
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
        )
        value = currentLiability.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showLongTermLoan = () => {
        let value = []
        let longTermLoan = calculateInterest(
            this.props.decorationSelected,
            this.props.productSelected,
            this.props.businessScenarioData,
            this.props.businessScenarioData.BusinessPlayingYear
        )
        value = longTermLoan.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.base.toLocaleString('EN')}</Table.Cell>
            )
        })
        return value
    }
    showTotalLiability = () => {
        let value = []
        let totalLiability = calculateTotalLiability(
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
        )
        value = totalLiability.map((e, i) => {
            return (
                <Table.HeaderCell key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return value
    }
    showRegisterEquity = () => {
        let result = []
        let regis = calculateRegister(this.props.businessScenarioData)
        result = regis.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return result
    }
    showReserve = () => {
        let result = []
        let reserve = calculateReserve(this.props.businessScenarioData)
        result = reserve.map((e, i) => {
            return (
                <Table.Cell key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return result
    }
    showUnappropriated = () => {
        let result = []
        let unAppropriated = calculateUnappropriated(
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
            this.props.decorationSelected)
        result = unAppropriated.map((e, i) => {
            return (
                <Table.Cell xs={1} key={"Col" + i}>{e.toLocaleString('EN')}</Table.Cell>
            )
        })
        return result
    }
    showTotalEquity = () => {
        let result = []
        let equity = calculateTotalEquity(
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
            this.props.decorationSelected)
        result = equity.map((e, i) => {
            return (
                <Table.HeaderCell xs={1} key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return result
    }
    showEquityAndLiability = () => {
        let result = []
        let equityNLiability = calculateTotalEquityNLiability(
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
            this.props.decorationSelected)
        result = equityNLiability.map((e, i) => {
            return (
                <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }} key={"Col" + i}>{e.toLocaleString('EN')}</Table.HeaderCell>
            )
        })
        return result
    }

    render() {
        return (
            <Scrollbars style={{ width: '100%', height: 1000 }} >
                <Table size='small' singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='12'>
                                Balance Sheet
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            {this.showYearHeader()}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em',borderTop: 'solid 2px #000000' }}>Cash</Table.Cell>
                            {this.showCash()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em' }}>Inventory</Table.Cell>
                            {this.showTotalCurrentInventoryValue()}
                        </Table.Row>
                        <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                            <Table.HeaderCell>Total Current assets</Table.HeaderCell>
                            {this.showTotalCurrentAssest()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em',borderTop: 'solid 2px #000000'}}>Building and Equipments</Table.Cell>
                            {this.showBuildingAndEquipment()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em' }}>Intangible Assets</Table.Cell>
                            {this.showIntangible()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em' }}>Depreciation & Amortization</Table.Cell>
                            {this.showAccumulated()}
                        </Table.Row>
                        <Table.Row style={{ backgroundColor: '#F1F1F1' }}> 
                            <Table.HeaderCell>Total Non-Current assets</Table.HeaderCell>
                            {this.showNonCurrentAssets()}
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell style={{ backgroundColor: '#F1F1F1',borderTop: 'solid 2px #000000' }}>Total Assets</Table.HeaderCell>
                            {this.showTotalAssest()}
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell colSpan='12' style={{borderTop: 'solid 2px #000000' }}>Liabilities</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '4em' }}>A/P</Table.Cell>
                            {this.showLiability()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '4em' }}>Short-term liability</Table.Cell>
                            {this.showShortTerm()}
                        </Table.Row>
                        <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                            <Table.HeaderCell style={{ paddingLeft: '2em' }}>Total Current Liabilities</Table.HeaderCell> 
                            {this.showTotalCurrentLiability()}
                        </Table.Row>
                        <Table.Row style={{ backgroundColor: '#F1F1F1' }}>
                            <Table.HeaderCell style={{ paddingLeft: '2em' }}>
                                Total Non-Current Liabilities(Long Term Loan)
                            </Table.HeaderCell>
                            {this.showLongTermLoan()}
                        </Table.Row>
                        <Table.Row active> 
                            <Table.HeaderCell >
                                Total Liabilities
                                </Table.HeaderCell>
                            {this.showTotalLiability()}
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell colSpan='12' style={{ borderTop: 'solid 2px #000000' }}>Equity</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Registered and Paid Up Capital</Table.Cell>
                            {this.showRegisterEquity()}
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell colSpan='12'>Retained Earning</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em' }}>Appropriated - Reserve</Table.Cell>
                            {this.showReserve()}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ paddingLeft: '2em' }}>Unappropriated</Table.Cell>
                            {this.showUnappropriated()}
                        </Table.Row>
                        <Table.Row active>
                            <Table.HeaderCell>
                                Total Equity
                                </Table.HeaderCell>
                            {this.showTotalEquity()}
                        </Table.Row>
                        <Table.Row active> 
                            <Table.HeaderCell style={{ borderTop: 'solid 2px #000000' }}>Total Liabilities and Equity</Table.HeaderCell>
                            {this.showEquityAndLiability()}
                        </Table.Row>
                        {/* <Table.Row>
                            <Table.Cell style={{ borderTop: 'solid 2px #000000' }}>Check</Table.Cell>
                            {this.showCheck()}
                        </Table.Row> */}
                    </Table.Body>
                </Table>
            </Scrollbars>
        )

    }
}