import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { turnArray, calculateProductSelling, calculateTotalRevenue, calculateAllExpense, calculateNetProfit, calculateEbitda, calculateGrossProfit, } from '../../Provider/ProductSellingReportProvider/ProductSellingReportProvider';
import {
    Divider,
    Grid
} from 'semantic-ui-react';
import { calculateTotalLiability } from '../../Provider/BalanceSheetProvider/BalanceSheetProvider';

export default class DataVirtual extends React.Component {

    genYaer = () => {
        let year = []
        for (let i = 0; i <= this.props.businessScenarioData.BusinessPlayingYear; i++) {
            year.push('Y' + i)
        }
        return year
    }
    genRevenueData = () => {
        return {
            labels: this.genYaer(),
            datasets: [{
                data: calculateTotalRevenue(
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
                ),
                label: 'Revenue',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgb(75,192,192)',
                borderColor: 'rgb(75,192,192)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10
            },
            {
                data: calculateAllExpense(
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
                ),
                label: 'Expense',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#E74C3C',
                borderColor: '#E74C3C',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#E74C3C',
                pointHoverBorderColor: '#E74C3C',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10
            }]
        }
    }
    genNetProfit = () => {
        return {
            labels: this.genYaer(),
            datasets: [{
                data: calculateNetProfit(this.props.productSelected,
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
                ),
                label: 'Net Profit',
                fill: false,
                lineTension: 0,
                backgroundColor: '#28B463',
                borderColor: '#28B463'
            }]
        }
    }
    genRevenueByProdData = () => {
        let colorArray = [
            'rgba(244, 208, 63,0.6)',
            'rgba(40, 180, 99,0.6)',
            'rgba(243, 156, 18,0.6)',
            'rgba(52, 152, 219,0.6)',
            'rgba(110, 44, 0,0.6)',
            'rgba(142, 68, 173,0.6)'
        ]
        let boderColorArray = [
            'rgba(244, 208, 63,1)',
            'rgba(40, 180, 99,1)',
            'rgba(243, 156, 18,1)',
            'rgba(52, 152, 219,1)',
            'rgba(110, 44, 0,1)',
            'rgba(142, 68, 173,1)'
        ]
        let barLabel = []
        let barData =
            calculateProductSelling(
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
            ).map((element, index) => {
                barLabel.push(element.map(
                    label => {
                        return label.productDetail.ProductName
                    }
                ))
                return element.map(
                    year => {
                        return year.revenue
                    }
                )
            })
        barData = turnArray(barData)
        barLabel = turnArray(barLabel)
        let lineChart = {
            data: calculateTotalRevenue(
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
            ),
            label: 'Total Revenue',
            type: 'line',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            lineTension: 0,
        }
        let barChart = barData.map((e, index) => {
            return {
                data: e,
                label: barLabel[index][0],
                backgroundColor: colorArray[index % colorArray.length],
                borderColor: boderColorArray[index % boderColorArray.length],
                hoverBorderColor: boderColorArray[index % boderColorArray.length]
            }
        })
        return {
            labels: this.genYaer(),
            datasets: [...barChart, lineChart]
        }
    }
    genTotalDebt = () => {
        return {
            labels: this.genYaer(),
            datasets: [{
                data: calculateTotalLiability(
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
                ),
                label: 'Total Debt',
                type: 'line',
                fill: false,
                backgroundColor: '#FF211A',
                borderColor: '#FF211A',
                lineTension: 0,
            }]
        }
    }
    genGrossProfitEbitdaNetProfit = () => {
        return {
            labels: this.genYaer(),
            datasets: [
                {
                    data: calculateGrossProfit(
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
                    ),
                    label: 'Gross Profit',
                    backgroundColor: 'rgba(78, 94, 255)',
                    borderWidth: 1,
                },
                {
                    data: calculateEbitda(
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
                    ),
                    label: 'EBITDA',
                    backgroundColor: 'rgba(23, 182, 57)',
                    borderWidth: 1,
                },
                {
                    data: calculateNetProfit(
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
                    ),
                    label: 'Net Profit',
                    backgroundColor: 'rgba(249, 193, 63)',
                    borderWidth: 1,
                }
            ]


        }
    }

    render() {
        return (
            <div>
                <Divider horizontal>
                    Revenue & EXPENSE
                </Divider>
                <Line data={this.genRevenueData()} />
                <br />
                <Divider horizontal>
                    Revenue by product
                </Divider>
                <Bar data={this.genRevenueByProdData()} />
                <br />
                <Grid columns={2}>
                    <Grid.Column>
                        <Divider horizontal>
                            Net Profit
                        </Divider>
                        <Line data={this.genNetProfit()} />
                    </Grid.Column>
                    <Grid.Column>
                        <Divider horizontal>
                            Total Debt
                        </Divider>
                        <Line data={this.genTotalDebt()} />
                    </Grid.Column>
                </Grid>
                <br />
                <Divider horizontal>
                    Gross Profit / Ebitda / Net Profit
                </Divider>
                <Bar data={this.genGrossProfitEbitdaNetProfit()} />
            </div>
        )
    }
}


