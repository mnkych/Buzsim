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
import { calculateAllCostOfMarketing } from '../../../Provider/MarketingProvider/MarketingProvider'
import {
    Content_header,
    Content
} from '../../../Provider/CSS/styled';
import { calculateTotalWage, calculateAllMaintainance, calculateSellingAdminiStration, calculateLossProduct, calculateAllStorageCost, calculateAllOtherCost, calculateAllDepreciation, calculateAllAmortisation, calculateUtility, calculateAllLandTax, calculateOperatingLicense, calculateAccounttingFee } from '../../../Provider/ProductSellingReportProvider/ProductSellingReportProvider';

export default class Cost extends React.Component {

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
                <Content_header style={{ borderTop: '3px solid #E74C3C' }}>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column>
                            <Header
                                as='h4'
                                content='EASTIMATED COSTS (Monthly)'
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
                        <Grid container centered columns={2} >
                            <Grid.Column width={10}>
                                <List size='small'>
                                    <List.Item>Rental</List.Item>
                                    <List.Item>Wages</List.Item>
                                    <List.Item>Selling and Administration</List.Item>
                                    <List.Item>Utility</List.Item>
                                    <List.Item>Operating Licenses</List.Item>
                                    <List.Item>Accounting fees</List.Item>
                                    <List.Item>Maintainance</List.Item>
                                    <List.Item>Signate and land taxes</List.Item>
                                    <List.Item>Marketing costs</List.Item>
                                    <List.Item>Loss from inventory write-off</List.Item>
                                    <List.Item>Storage costs</List.Item>
                                    <List.Item>Others</List.Item>
                                    <List.Item>Depreciation & Amortisation</List.Item>
                                    <List.Item>Total Operating expenses</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <List size='small'>
                                    <List.Item>{(this.props.sizeSelected !== undefined && this.props.locationSelected !== undefined && this.props.ownershipSelected !== undefined) && this.props.businessScenarioData.BLSORID !== undefined ?
                                        this.props.businessScenarioData.RentalCost.toLocaleString('EN') + " ฿" : " 0 ฿ "}
                                    </List.Item>
                                    <List.Item>{this.props.businessScenarioData !== undefined ?
                                        (Math.round(calculateTotalWage(this.props.employeeSelected, this.props.parttimeEmployeeSelected, this.props.businessScenarioData.BusinessPlayingYear)[1] / 12)).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{this.props.businessScenarioData !== undefined ? ( Math.round(calculateSellingAdminiStration(
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
                                        this.props.decorationSelected,
                                    )[1]/12) +
                                    Math.round(calculateAllOtherCost(
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
                                    )[1] / 12)).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{this.props.decorationSelected !== undefined || this.props.totalTimeSelected !== undefined || this.props.sizeSelected !== undefined || this.props.ownershipSelected !== undefined ? Math.round(calculateUtility(this.props.decorationSelected, this.props.ownershipSelected, this.props.totalTimeSelected, this.props.sizeSelected, this.props.businessScenarioData.BusinessPlayingYear)[1]/12).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{this.props.businessScenarioData !== undefined ? Math.round(calculateOperatingLicense(this.props.businessScenarioData,this.props.businessScenarioData.BusinessPlayingYear)[1]/12).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{(this.props.sizeSelected !== undefined && this.props.locationSelected !== undefined && this.props.ownershipSelected !== undefined) && this.props.businessScenarioData !== undefined ?
                                        Math.round(calculateAccounttingFee(this.props.businessScenarioData,this.props.businessScenarioData.BusinessPlayingYear)[1]/12).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{(this.props.sizeSelected !== undefined && this.props.locationSelected !== undefined && this.props.ownershipSelected !== undefined) && this.props.businessScenarioData !== undefined ? 
                                    Math.round(calculateAllMaintainance(this.props.productSelected,
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
                                        this.props.ownershipSelected
                                    )[1] / 12).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{this.props.businessScenarioData !== undefined ? Math.round(calculateAllLandTax(this.props.businessScenarioData, this.props.businessScenarioData,this.props.businessScenarioData.BusinessPlayingYear)[1]/12).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{this.props.marketingSelected !== undefined ? Math.round(calculateAllCostOfMarketing(this.props.marketingSelected)/12).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{this.props.businessScenarioData !== undefined ? Math.round(calculateLossProduct(this.props.productSelected,
                                        this.props.productTypeAcceptSelected,
                                        this.props.employeeSelected,
                                        this.props.parttimeEmployeeSelected,
                                        this.props.totalTimeSelected,
                                        this.props.daySelected,
                                        this.props.businessScenarioData,
                                        this.props.locationSelected,
                                        this.props.marketShared,
                                        this.props.businessScenarioData.BusinessPlayingYear,
                                        this.props.targetGroupSelected)[1] / 12).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{this.props.businessScenarioData !== undefined ? Math.round(calculateAllStorageCost(
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
                                    )[1] / 12).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{this.props.businessScenarioData !== undefined ? Math.round(calculateAllOtherCost(
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
                                    )[1] / 12).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{this.props.businessScenarioData !== undefined ? Math.round(
                                        (
                                            calculateAllDepreciation(this.props.businessScenarioData, this.props.decorationSelected, this.props.businessScenarioData.BusinessPlayingYear)[1] +
                                            calculateAllAmortisation(this.props.businessScenarioData, this.props.businessScenarioData.BusinessPlayingYear)[1]
                                        ) / 12
                                    ).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                    <List.Item>{(this.props.sizeSelected !== undefined && this.props.locationSelected !== undefined && this.props.ownershipSelected !== undefined) && this.props.businessScenarioData !== undefined ? ((Math.round(calculateTotalWage(this.props.employeeSelected, this.props.parttimeEmployeeSelected, this.props.businessScenarioData.BusinessPlayingYear)[1] / 12)) +
                                        this.props.businessScenarioData.RentalCost + Math.round(calculateSellingAdminiStration(
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
                                        )[1]/12) + Math.round(
                                            (
                                                calculateAllDepreciation(this.props.businessScenarioData, this.props.decorationSelected, this.props.businessScenarioData.BusinessPlayingYear)[1] +
                                                calculateAllAmortisation(this.props.businessScenarioData, this.props.businessScenarioData.BusinessPlayingYear)[1]
                                            ) / 12
                                        )).toLocaleString('EN') + " ฿" : " 0 ฿ "}</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Content>
                </Collapse>
            </div>
        )
    }
}