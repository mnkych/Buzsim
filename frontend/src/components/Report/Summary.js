import React from 'react';
import {
    Table,
    Icon,
    Label
} from 'semantic-ui-react';
import { calculateGrossProfitRatio, calculateEditdaToRevenueRatio, calculateNetprofitToRevenueRatio, calculateEPS, calculateROE, calculateROA, calculateDebtToEquityRatio, calculateImageRating, calculateCreditRating, calculateStockPrice } from '../../Provider/SummaryProvider/SummaryProvider';

export default class Summary extends React.Component {
    closeTab = () => {
        if (this.props.func !== undefined) {
            this.props.func(false);
        }
    }
    showYearHeader = () => {
        let showYearHeader = []
        for (let i = 0; i <= this.props.businessScenarioData.BusinessPlayingYear; i++) {
            showYearHeader.push(<Table.HeaderCell key={i}>
                <Label>YEAR {i}</Label>
            </Table.HeaderCell>)
        }
        return showYearHeader
    }
    showGrossProfitRatio = () => {
        let showGross = []
        let ratio = calculateGrossProfitRatio(
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
        showGross = ratio.map((e, index) => {
            return <Table.Cell style={{ borderTop: 'solid 2px #000000' }} key={index}>{e.toLocaleString('EN')} %</Table.Cell>
        })
        return showGross
    }
    showEbitdaToRevenueRatio = () => {
        let ebitdaToRevenue = []
        let ratio = calculateEditdaToRevenueRatio(
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
        ebitdaToRevenue = ratio.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')} %</Table.Cell>
        })
        return ebitdaToRevenue
    }
    showNetProfitToRevenueRatio = () => {
        let netProfitToRevenue = []
        let ratio = calculateNetprofitToRevenueRatio(
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
        netProfitToRevenue = ratio.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')} %</Table.Cell>
        })
        return netProfitToRevenue
    }
    showEPS = () => {
        let eps = []
        let ratio = calculateEPS(
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
        eps = ratio.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return eps
    }
    showROE = () => {
        let roe = []
        let ratio = calculateROE(
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
        roe = ratio.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')} %</Table.Cell>
        })
        return roe
    }
    showROA = () => {
        let roa = []
        let ratio = calculateROA(
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
        roa = ratio.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')} %</Table.Cell>
        })
        return roa
    }
    showDeptToEquity = () => {
        let deptToEquity = []
        let ratio = calculateDebtToEquityRatio(
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
        deptToEquity = ratio.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return deptToEquity
    }
    showImageRating = () => {
        let imageRating = []
        let ratio = calculateImageRating(
            this.props.marketingSelected,
            this.props.businessScenarioData,
            this.props.locationSelected,
            this.props.businessScenarioData.BusinessPlayingYear,
        )
        imageRating = ratio.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return imageRating
    }
    showCreditRating = () => {
        let creditRating = []
        let ratio = calculateCreditRating(
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
        creditRating = ratio.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return creditRating
    }
    showMarketShared = () => {
        let showMarketShared = []
        for (let i = 0; i <= this.props.businessScenarioData.BusinessPlayingYear; i++) {
            showMarketShared.push(<Table.Cell key={i} xs={1}>{this.props.marketShared} %</Table.Cell>)
        }
        return showMarketShared
    }
    showStockPrice = () => {
        let stockPrice = []
        let ratio = calculateStockPrice(
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
        stockPrice = ratio.map((e, index) => {
            return <Table.Cell key={index}>{e.toLocaleString('EN')}</Table.Cell>
        })
        return stockPrice
    }

    render() {
        return (
            <Table size='small' singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={this.props.businessScenarioData.BusinessPlayingYear+1}>
                            Financial Ratio ({this.props.businessScenarioData ? this.props.businessScenarioData.BusinessPlayingYear : ''} years estimation)
                                </Table.HeaderCell>
                        <Table.HeaderCell colSpan='1' textAlign='right'>
                            <Icon link name='window minimize' onClick={this.closeTab} />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell></Table.Cell>
                        {this.showYearHeader()}
                    </Table.Row>
                    <Table.Row>
                    <Table.HeaderCell  style={{ borderTop: 'solid 2px #000000' }}>Gross Profit(%)</Table.HeaderCell>
                        {this.showGrossProfitRatio()}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>EBITDA to revenue(%)</Table.HeaderCell>
                        {this.showEbitdaToRevenueRatio()}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Net Profit(%)</Table.HeaderCell>
                        {this.showNetProfitToRevenueRatio()}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>EPS</Table.HeaderCell>
                        {this.showEPS()}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>ROE</Table.HeaderCell>
                        {this.showROE()}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>ROA</Table.HeaderCell>
                        {this.showROA()}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Debt to equity ratio</Table.HeaderCell>
                        {this.showDeptToEquity()}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Image rating</Table.HeaderCell>
                        {this.showImageRating()}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Credit rating</Table.HeaderCell>
                        {this.showCreditRating()}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Market share</Table.HeaderCell>
                        {this.showMarketShared()}
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Stock price</Table.HeaderCell>
                        {this.showStockPrice()}
                    </Table.Row>
                </Table.Body>
            </Table>
        )
    }
}