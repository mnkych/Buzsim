import React from 'react';
import {
    Container,
    Segment,
    Header,
    Label,
    Grid,
    Loader,
    Tab,
    Table,
} from 'semantic-ui-react';
import { getCompetitor, getSizeChoice, getLocationChoice, getOwnershipChoice, getTargetGroupChoice, getProductChoice, getMarketing, getEmployee, getProductDetail, getSelectBuProductAcceptByTarget, getSelectAllDecorationBuDec, getSelectDecorationBuDec, getAllBusinessSizeLocationOwnership } from '../../Provider/GetData/GetData';
import { calculateTotalQuantity, getProductAcceptionById, getDecorationRelationById, getStoreRelationById } from '../../Provider/CreateProvider/CreateProvider';

export default class ViewScenario extends React.Component {
    state = { currentScenario: undefined }
    componentWillReceiveProps = async (nextProps) => {
        let currentScenario = {}
        if (nextProps.selectedScenario) {
            currentScenario = nextProps.selectedScenario
            const dataComp = await getCompetitor(currentScenario.BusinessID)
            const dataSize = await getSizeChoice(currentScenario.BusinessID)
            const dataLo = await getLocationChoice(currentScenario.BusinessID)
            const dataOwn = await getOwnershipChoice(currentScenario.BusinessID)
            const dataTarget = await getTargetGroupChoice(currentScenario.BusinessID)
            const dataMarketing = await getMarketing(currentScenario.BusinessID)
            const dataFullTime = await getEmployee(currentScenario.BusinessID, 1)
            const dataPartTime = await getEmployee(currentScenario.BusinessID, 0)
            const dataTargetAccept = await getSelectBuProductAcceptByTarget(currentScenario.BusinessID)
            const dataDec = await getSelectDecorationBuDec(currentScenario.BusinessID)
            const dataDecRelate = await getSelectAllDecorationBuDec(currentScenario.BusinessID)
            const dataStoreRelate = await getAllBusinessSizeLocationOwnership(currentScenario.BusinessID)
            const dataPro = await getProductChoice(currentScenario.BusinessID)
            const productChoice = dataPro.data.map(async (e) => {
                return await getProductDetail({ BusinessID: currentScenario.BusinessID, ProductID: e.ProductID })
            })
            await Promise.all(productChoice).then((choices) => {
                currentScenario = { ...currentScenario, competitor: dataComp.data, size: dataSize.data, location: dataLo.data, owner: dataOwn.data, target: dataTarget.data, market: dataMarketing.data, fulltime: dataFullTime.data, parttime: dataPartTime.data, product: dataPro.data, productQuality: choices.map(e => { return e.data }), productAccept: dataTargetAccept, decoration: dataDec, decRelated: dataDecRelate, macroRelate: dataStoreRelate }
                this.setState({ currentScenario: currentScenario })
            })
        } else {
            this.setState({ currentScenario: undefined })
        }
    }
    render() {
        const panes1 = [
            {
                menuItem: 'Macro', render: () =>
                    <div>
                        <Segment>
                            <Label color='teal' size='large' attached='top'>
                                Scenario Detail
                            </Label>
                            <Table size='small'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Scenario Description</Table.HeaderCell>
                                        <Table.HeaderCell>Store Operation Description</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>{this.state.currentScenario.BusinessScenarioDescription}</Table.Cell>
                                        <Table.Cell>{this.state.currentScenario.BusinessStoreOperationDescription}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <Table size='small'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Target Group Description</Table.HeaderCell>
                                        <Table.HeaderCell>Decoration Description</Table.HeaderCell>
                                        <Table.HeaderCell>Operating Time Description</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>{this.state.currentScenario.BusinessTargetGroupDescription}</Table.Cell>
                                        <Table.Cell>{this.state.currentScenario.BusinessStoreOperationDescription}</Table.Cell>
                                        <Table.Cell>{this.state.currentScenario.BusinessOperatingTimeDescription}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <Table size='small'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Merchandising Description</Table.HeaderCell>
                                        <Table.HeaderCell>Human Resource Description</Table.HeaderCell>
                                        <Table.HeaderCell>Marketing Description</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>{this.state.currentScenario.BusinessProductDescription}</Table.Cell>
                                        <Table.Cell>{this.state.currentScenario.BusinessEmployeeDescription}</Table.Cell>
                                        <Table.Cell>{this.state.currentScenario.BusinessPromotionDescription}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                        <Segment>
                            <Label color='teal' size='large' attached='top'>
                                Macro Economics Detail
                            </Label>
                            <Grid stackable centered columns={2}>
                                <Grid.Column>
                                    <Table basic='very' celled collapsing size="small">
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h5'>
                                                        <Header.Content>
                                                            Start money
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{this.state.currentScenario.BusinessStartMoney.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h5'>
                                                        <Header.Content>
                                                            Economic event
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{this.state.currentScenario.BusinessEconomicEvent.toLocaleString('EN') + ' %'}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h5'>
                                                        <Header.Content>
                                                            Gross demand
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{this.state.currentScenario.BusinessGrossDemand.toLocaleString('EN') + ' %'}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h5'>
                                                        <Header.Content>
                                                            Gross grow up rate
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{this.state.currentScenario.BusinessGrossDemandGrowUpRate.toLocaleString('EN') + ' %'}</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                                <Grid.Column>
                                    <Table basic='very' celled collapsing size="small">
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h5'>
                                                        <Header.Content>
                                                            LicenseCost
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{this.state.currentScenario.BusinessLicenseCost.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h5'>
                                                        <Header.Content>
                                                            Loan interest rate
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{this.state.currentScenario.BusinessLoanInterestRate.toLocaleString('EN') + ' %'}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h5'>
                                                        <Header.Content>
                                                            Inflation
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{this.state.currentScenario.BusinessInflation.toLocaleString('EN') + ' %'}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h5'>
                                                        <Header.Content>
                                                            Price growth rate
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{this.state.currentScenario.BusinessPriceGrowthPolicy.toLocaleString('EN') + ' %'}</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </div>
            },
            {
                menuItem: 'Store', render: () =>
                    <div>
                        <Segment>
                            <Label color='teal' size='large' attached='top'>
                                Location Detail
                            </Label>
                            <Table basic='very' size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>Location</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Total population</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Trading population ratio</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Total population grow up rate</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                                <Table.Body>
                                    {this.state.currentScenario.location.map((e, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{e.LocationName}</Table.Cell>
                                                <Table.Cell>{e.TotalPopulation.toLocaleString('EN') + ' pers.'}</Table.Cell>
                                                <Table.Cell>{e.TradingPopulationRatio.toLocaleString('EN') + ' %'}</Table.Cell>
                                                <Table.Cell>{e.TotalPopulationGrowUpRate.toLocaleString('EN') + ' %'}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Segment>
                        <Segment>
                            <Label color='teal' size='large' attached='top'>
                                Size Detail
                            </Label>
                            <Table basic='very' size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>Size</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Storage</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Base electricity unit on size</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Market share score</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                                <Table.Body>
                                    {this.state.currentScenario.size.map((e, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{e.Size}</Table.Cell>
                                                <Table.Cell>{e.Storage.toLocaleString('EN') + ' ps'}</Table.Cell>
                                                <Table.Cell>{e.BaseElectricityUnitOnSize.toLocaleString('EN') + 'unit'}</Table.Cell>
                                                <Table.Cell>{e.MarketSharedScore.toLocaleString('EN')}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Segment>
                        <Segment>
                            <Label color='teal' size='large' attached='top'>
                                Ownership Detail
                            </Label>
                            <Table basic='very' size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>Ownership</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Maintain cost</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Land tax cost</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Other cost</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Ownership base electricity/unit</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Ownership depreciation aging</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                                <Table.Body>
                                    {this.state.currentScenario.owner.map((e, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{e.OwnershipName}</Table.Cell>
                                                <Table.Cell>{e.MaintainCost.toLocaleString('EN') + ' %'}</Table.Cell>
                                                <Table.Cell>{e.OwnershipName === 'Buy' ? e.LandTaxCost.toLocaleString('EN') + ' %' : e.LandTaxCost.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                                <Table.Cell>{e.OtherCost.toLocaleString('EN') + ' %'}</Table.Cell>
                                                <Table.Cell>{e.OwnerBaseElectricityPerUnit.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                                <Table.Cell>{e.OwnerDepreciationAging.toLocaleString('EN') + ' yr.'}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </div>
            },
            {
                menuItem: 'Cost', render: () =>
                    <Segment>
                        <Label color='teal' size='large' attached='top'>
                            Cost Detail
                        </Label>
                        <Table basic='very' size="small">
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h5'>Ownership</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as='h5'>Location</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as='h5'>Size</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as='h5'>Privillage Cost</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as='h5'>Rental Cost</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as='h5'>Accounting Fee</Header>
                                    </Table.Cell>
                                </Table.Row>
                                {this.state.currentScenario.owner.map((owner, indexDec) => {
                                    return this.state.currentScenario.location.map((lo, indexLo) => {
                                        return this.state.currentScenario.size.map((size, indexSize) => {
                                            let found = getStoreRelationById({ ...owner, ...lo, ...size }, this.state.currentScenario.macroRelate)
                                            return (
                                                <Table.Row key={indexDec + '' + indexLo + '' + indexSize}>
                                                    <Table.Cell>{indexLo === 0 && indexSize === 0 ? owner.OwnershipName : ''}</Table.Cell>
                                                    <Table.Cell>{indexSize === 0 ? lo.LocationName : ''}</Table.Cell>
                                                    <Table.Cell>{size.Size}</Table.Cell>
                                                    <Table.Cell>{found.PrivillageCost.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                                    <Table.Cell>{found.RentalCost.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                                    <Table.Cell>{found.AccountingFee.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    })
                                })}
                            </Table.Body>
                        </Table>
                    </Segment>
            },
            {
                menuItem: 'Target', render: () =>
                    <Segment>
                        <Label color='teal' size='large' attached='top'>
                            Target group Detail
                        </Label>
                        <Table celled size="small">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Target Group</Table.HeaderCell>
                                    <Table.HeaderCell>Grow up rate</Table.HeaderCell>
                                    <Table.HeaderCell>Quantity of people</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.state.currentScenario.target.map((e, index) => {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.Cell>{e.TargetGroupName}</Table.Cell>
                                            <Table.Cell>{e.TargetGroupGrowUpRatio.toLocaleString('EN') + ' %'}</Table.Cell>
                                            <Table.Cell>{e.TargetGroupQuantityRatio.toLocaleString('EN') + ' %'}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.Cell />
                                    <Table.Cell textAlign='right'>
                                        <Header as='h5'>Total quantity</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as='h5'>{calculateTotalQuantity(this.state.currentScenario.target, 'TargetGroupQuantityRatio').toLocaleString('EN') + ' %'}</Header>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Segment>
            },
            {
                menuItem: 'Decoration', render: () =>
                    <Segment>
                        <Label color='teal' size='large' attached='top'>
                            Decoration Detail
                        </Label>
                        <Table basic='very' size="small">
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h5'>Item</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as='h5'>Location</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as='h5'>Size</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as='h5'>Price</Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header as='h5'>Electricity Unit / Hr.</Header>
                                    </Table.Cell>
                                </Table.Row>
                                {this.state.currentScenario.decoration.map((dec, indexDec) => {
                                    return this.state.currentScenario.location.map((lo, indexLo) => {
                                        return this.state.currentScenario.size.map((size, indexSize) => {
                                            let found = getDecorationRelationById({ ...dec, ...lo, ...size }, this.state.currentScenario.decRelated)
                                            return (
                                                <Table.Row key={indexDec + '' + indexLo + '' + indexSize}>
                                                    <Table.Cell>{indexLo === 0 && indexSize === 0 ? found.DecorationItem : ''}</Table.Cell>
                                                    <Table.Cell>{indexSize === 0 ? lo.LocationName : ''}</Table.Cell>
                                                    <Table.Cell>{size.Size}</Table.Cell>
                                                    <Table.Cell>{found.Price.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                                    <Table.Cell>{found.ElectricityUnitPerHour.toLocaleString('EN') + ' Unit'}</Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    })
                                })}
                            </Table.Body>
                        </Table>
                    </Segment>
            },
            {
                menuItem: 'Merchandising', render: () =>
                    <div>
                        <Segment>
                            <Label color='teal' size='large' attached='top'>
                                Merchandising Detail
                        </Label>
                            <Table basic='very' size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>Product</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Quality</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Depreciation Ratio</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Price / Unit</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    {this.state.currentScenario.product.map((e, indexA) => {
                                        return this.state.currentScenario.productQuality[indexA].map((element, index) => {
                                            return (
                                                <Table.Row key={indexA}>
                                                    <Table.Cell>{index === 0 ? e.ProductName : ''}</Table.Cell>
                                                    <Table.Cell>{element.QualityName}</Table.Cell>
                                                    <Table.Cell>{element.ProductDepreciationRatio.toLocaleString('EN') + ' %'}</Table.Cell>
                                                    <Table.Cell>{element.BasePricePerUnit.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    })
                                    }
                                </Table.Body>
                            </Table>
                        </Segment>
                        <Segment>
                            <Label color='teal' size='large' attached='top'>
                                Acception Detail
                        </Label>
                            <Table basic='very' size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>Target Group</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Product Name</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Accept Ratio</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Acception Ratio Grow Up</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Maximum Price Rate</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    {this.state.currentScenario.target.map((element, index) => {
                                        return this.state.currentScenario.product.map((e, indexA) => {
                                            let found = getProductAcceptionById({ ...element, ...e }, this.state.currentScenario.productAccept)
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>{indexA === 0 ? found.TargetGroupName : ''}</Table.Cell>
                                                    <Table.Cell>{found.ProductName}</Table.Cell>
                                                    <Table.Cell>{found.AcceptRatio.toLocaleString('EN') + ' %'}</Table.Cell>
                                                    <Table.Cell>{found.AcceptRatioGrowUpRate.toLocaleString('EN') + ' %'}</Table.Cell>
                                                    <Table.Cell>{found.MaximumPriceRate.toLocaleString('EN') + ' %'}</Table.Cell>
                                                </Table.Row>
                                            )
                                        })
                                    })
                                    }
                                </Table.Body>
                            </Table>
                        </Segment>
                    </div>
            },
            {
                menuItem: 'HR', render: () =>
                    <div>
                        <Segment>
                            <Label color='teal' size='large' attached='top'>
                                Full-time employees Detail
                            </Label>
                            <Table basic='very' size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>Job</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Status</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Base salary(Monthly)</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Base salary grow up rate</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Addition pay(EXP)</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                                <Table.Body>
                                    {this.state.currentScenario.fulltime.map((e, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{e.Job}</Table.Cell>
                                                <Table.Cell>{e.Status}</Table.Cell>
                                                <Table.Cell>{e.Status === 'Owner' ? <i>Input from user</i> : e.BaseSalaryPerMonth.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                                <Table.Cell>{e.BaseSalaryGrowUpRate.toLocaleString('EN') + ' %'}</Table.Cell>
                                                <Table.Cell>{e.AdditionPayPerExp.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Segment>
                        <Segment>
                            <Label color='teal' size='large' attached='top'>
                                Part-time employees Detail
                            </Label>
                            <Table basic='very' size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>Job</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Status</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Base pay(Hourly)</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Base salary grow up rate</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Addition pay(EXP)</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                                <Table.Body>
                                    {this.state.currentScenario.parttime.map((e, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{e.Job}</Table.Cell>
                                                <Table.Cell>{e.Status}</Table.Cell>
                                                <Table.Cell>{e.BasePayPerHour.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                                <Table.Cell>{e.BaseSalaryGrowUpRate.toLocaleString('EN') + ' %'}</Table.Cell>
                                                <Table.Cell>{e.AdditionPayPerExp.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </div>
            },
            {
                menuItem: 'Promotion', render: () =>
                    <div>
                        <Segment>
                            <Label color='teal' size='large' attached='top'>
                                Promotion Detail
                </Label>
                            <Table basic='very' size="small">
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>Channel</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5'>Price Per Time</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                                <Table.Body>
                                    {this.state.currentScenario.market.map((e, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{e.Channel}</Table.Cell>
                                                <Table.Cell>{e.PricePerTime.toLocaleString('EN') + ' ฿'}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </div>
            },
            {
                menuItem: 'Competitor', render: () =>
                    <div>

                        {this.state.currentScenario.competitor.length > 0 ?
                            <Segment>
                                <Label color='teal' size='large' attached='top'>
                                    Competitor Detail
                            </Label>
                                {this.state.currentScenario.competitor.map((e, index) => {
                                    return (
                                        <Table celled size="small" key={index}>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Competitor Name : {e.CompetitorName}</Table.HeaderCell>
                                                    <Table.HeaderCell>Score</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Decoration Score
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {e.DecorationScore}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        ProductVariety Score
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {e.ProductVarietyScore}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        ProductQuality Score
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {e.ProductQualityScore}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Size Score
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {e.SizeScore}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Day Score
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {e.DayScore}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Time Score
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {e.TimeScore}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        NumberOfEmployee Score
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {e.NumberOfEmployeeScore}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        NumberOfAssistance Score
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {e.NumberOfAssistanceScore}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        MarketingVariety Score
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {e.MarketingVarietyScore}
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        MarketingFrequency Score
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {e.MarketingFrequencyScore}
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    )
                                })}
                            </Segment>
                            :
                            <Segment>
                                <Label color='teal' size='large' attached='top'>
                                    This scenario doesn't have any competitor
                                </Label>
                            </Segment>
                        }
                    </div>
            },
        ]
        if (this.state.currentScenario) {
            return (
                <Container fluid style={{ overflowY: "auto" }}>
                    <Segment color='teal'>
                        <Header as='h3'>
                            {this.state.currentScenario.BusinessName}
                        </Header>
                    </Segment>
                    <Tab menu={{ secondary: true }} panes={panes1} />
                </Container>
            )
        } else {
            return (
                <Loader active size='massive'>Please select to show more detail</Loader>

            )
        }
    }
}