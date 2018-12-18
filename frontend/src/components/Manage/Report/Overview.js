import React from 'react';
import {
    Collapse
} from 'reactstrap';
import {
    Divider,
    List,
    Grid,
    Icon,
    Header
} from 'semantic-ui-react';
import { isProductObjectPass, calculateTotalAmount, isSomeProductPass, calculateTotalPurchased } from '../../../Provider/ProductProvider/ProductProvider';
import { isSomeFulltimeEmployeePass, isSomeParttimeEmployeePass, isFulltimeObjectPass, isParttimeObjectPass } from '../../../Provider/HumanResourceProvider/HumanResorceProvider';
import {
    calculateTotalDept,
    calculateTotalSpent,
} from '../../../Provider/StoreProvider/StoreProvider';
import { isSomeMarketingPass, isMarketingObjectPass } from '../../../Provider/MarketingProvider/MarketingProvider';
import {
    Content_header,
    Content
} from '../../../Provider/CSS/styled';
import styled from 'styled-components';

const List_Item_Promotion = styled(List.Item)`
    color:#6435c9;
`
const List_Desc_Promotion = styled(List.Description)`
    color:#6435c9 !important;
`
const List_Item_HR = styled(List.Item)`
    color:#fbbd08;
`
const List_Desc_HR = styled(List.Description)`
    color:#fbbd08 !important;
`
const List_Desc_Dec = styled(List.Description)`
    color: #a333c8 !important;
`
const List_Item_Prod = styled(List.Item)`
    color: #a5673f !important;
`
const List_Desc_Prod = styled(List.Description)`
    color: #a5673f !important;
`


export default class Overview extends React.Component {

    state = {
        collapseCurrency: true,
        collapseOverview: true,
        collapseTotalCost: false
    }

    componentWillReceiveProps = async (nextProps) => {
        await this.setState({
            productChoice: nextProps.productChoice,
            decorationChoices: nextProps.decorationChoices,
        })
    }
    productChoice = () => {
        let productList = []
        if (this.props.productChoice !== undefined) {
            productList = this.state.productChoice.map((e, index) => {
                return (
                    <List_Item_Prod key={index}>{e.ProductName}</List_Item_Prod>
                )
            })
        }
        return productList
    }

    productNameShowSelected = () => {
        let productShowList = []
        if (isSomeProductPass(this.props.productSelected) === true) {
            productShowList = this.props.productSelected.map((e, index) => {
                if (isProductObjectPass(e) === true) {
                    return (
                        <List_Item_Prod key={index}>
                            {++index} Product
                            <List.List>
                                <List_Desc_Prod>
                                    Grade
                                </List_Desc_Prod>
                                <List_Desc_Prod>
                                    Selling Price
                                </List_Desc_Prod>
                                <List_Desc_Prod>
                                    Amount
                                </List_Desc_Prod>
                            </List.List>
                        </List_Item_Prod>
                    )
                }
            })
        }
        return productShowList
    }

    productShowSelected = () => {
        let productShowList = []
        if (isSomeProductPass(this.props.productSelected) === true) {
            productShowList = this.props.productSelected.map((e, index) => {
                if (isProductObjectPass(e) === true) {
                    return (
                        <List_Item_Prod key={index}>
                            {e.productDetail.ProductName}
                            <List.List>
                                <List_Desc_Prod>
                                    {e.productDetail.QualityName}
                                </List_Desc_Prod>
                                <List_Desc_Prod>
                                    {e.sellingPrice.toLocaleString('EN')}
                                </List_Desc_Prod>
                                <List_Desc_Prod>
                                    {e.amount.toLocaleString('EN')}
                                </List_Desc_Prod>
                            </List.List>
                        </List_Item_Prod>)
                }
            })
        }
        return productShowList
    }

    decorationShowSelectedItem = () => {
        let decorationShowSelected = []
        if (this.props.decorationSelected !== undefined && this.props.decorationSelected.length !== 0) {
            decorationShowSelected = this.props.decorationSelected.map((e, index) => {
                return (
                    <List_Desc_Dec key={index}>
                        {e.DecorationItem}
                    </List_Desc_Dec>
                )
            })
        }
        return decorationShowSelected
    }

    decorationShowSelectedPrice = () => {
        let decorationShowSelected = []
        if (this.props.decorationSelected !== undefined && this.props.decorationSelected.length !== 0) {
            decorationShowSelected = this.props.decorationSelected.map((e, index) => {
                return (
                    <List_Desc_Dec key={index}>
                        {e.Price.toLocaleString('EN') + " ฿"}
                    </List_Desc_Dec>

                )
            })
        }
        return decorationShowSelected
    }
    promotionShowSelected = () => {
        let promotionShowList = []
        if (isSomeMarketingPass(this.props.marketingSelected) === true) {
            promotionShowList = this.props.marketingSelected.map((e, index) => {
                if (isMarketingObjectPass(e) === true) {
                    return (
                        <List_Item_Promotion key={index}>
                            Channel
                            <List.List>
                                <List_Desc_Promotion>
                                    Viewer
                                </List_Desc_Promotion>
                                <List_Desc_Promotion>
                                    Frequency
                                </List_Desc_Promotion>
                            </List.List>
                        </List_Item_Promotion>
                    )
                }
            })
        }
        return promotionShowList
    }
    promotionDetailShowSelected = () => {
        let promotionShowList = []
        if (isSomeMarketingPass(this.props.marketingSelected) === true) {
            promotionShowList = this.props.marketingSelected.map((e, index) => {
                if (isMarketingObjectPass(e) === true) {
                    return (
                        <List_Item_Promotion key={index}>
                            {e.marketingDetail.Channel}
                            <List.List>
                                <List_Desc_Promotion>
                                    {e.viewer.toLocaleString('EN')}
                                </List_Desc_Promotion>
                                <List_Desc_Promotion>
                                    {e.frequency.toLocaleString('EN')}
                                </List_Desc_Promotion>
                            </List.List>
                        </List_Item_Promotion>
                    )
                }
            })
        }
        return promotionShowList
    }
    amountfulltimeSelected = () => {
        let fulltimeShowList = []
        if (isSomeFulltimeEmployeePass(this.props.employeeSelected) === true) {
            fulltimeShowList = this.props.employeeSelected.employeeSelected.map((e, index) => {
                if (isFulltimeObjectPass(e) === true) {
                    return (
                        <List_Item_HR key={index}>
                            <List_Desc_HR>
                                {e.numberOfEmployee.toLocaleString('EN')}
                            </List_Desc_HR>
                        </List_Item_HR>
                    )
                }
            })
        }
        return fulltimeShowList
    }

    fulltimeSelected = () => {
        let fulltimeShowList = []
        if (isSomeFulltimeEmployeePass(this.props.employeeSelected) === true) {
            fulltimeShowList = this.props.employeeSelected.employeeSelected.map((e, index) => {
                if (isFulltimeObjectPass(e) === true) {
                    return (
                        <List_Item_HR key={index}>
                            <List_Desc_HR>
                                {e.Job}
                            </List_Desc_HR>
                        </List_Item_HR>
                    )
                }
            })
        }
        return fulltimeShowList
    }

    parttimeSelected = () => {
        let parttimeShowList = []
        if (isSomeParttimeEmployeePass(this.props.parttimeEmployeeSelected) === true) {
            parttimeShowList = this.props.parttimeEmployeeSelected.map((e, index) => {
                if (isParttimeObjectPass(e) === true) {
                    return (
                        <List_Item_HR key={index}>
                            <List_Desc_HR>
                                {e.Job}
                            </List_Desc_HR>
                        </List_Item_HR>)
                }
            })
        }
        return parttimeShowList
    }

    amountParttimeSelected = () => {
        let parttimeShowList = []
        if (isSomeParttimeEmployeePass(this.props.parttimeEmployeeSelected) === true) {
            parttimeShowList = this.props.parttimeEmployeeSelected.map((e, index) => {
                if (isParttimeObjectPass(e) === true) {
                    return (
                        <List_Item_HR key={index}>
                            <List_Desc_HR>
                                {e.numberOfEmployee.toLocaleString('EN')}
                            </List_Desc_HR>
                        </List_Item_HR>)
                }
            })
        }
        return parttimeShowList
    }

    handleCollapseCurrency = () => {
        this.setState({
            collapseCurrency: !this.state.collapseCurrency
        })
    }

    handleCollapseTotalCost = () => {
        this.setState({
            collapseTotalCost: !this.state.collapseTotalCost
        })
    }

    handleCollapseOverview = () => {
        this.setState({
            collapseOverview: !this.state.collapseOverview
        })
    }

    render() {
        return (
            <div>
                <Content_header style={{ borderTop: '3px solid #27AE60' }}>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column floated='left'>
                            <Header
                                as='h4'
                                content='Initial Investment'
                            />
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Icon
                                link
                                color='grey'
                                name={this.state.collapseCurrency === true ? 'angle down' : 'angle left'}
                                onClick={this.handleCollapseCurrency}
                            />
                        </Grid.Column>
                    </Grid>
                </Content_header>
                <Collapse isOpen={this.state.collapseCurrency}>
                    <Content>
                        <Grid container centered>
                            <Grid.Column width={10} floated='left'>
                                <List size='small'>
                                    <List.Item>Initial fund</List.Item>
                                    <List.Item>
                                        Store investment
                                    </List.Item>
                                    <List.Item>
                                        Merchandise investment
                                    </List.Item>

                                    <List.Item>
                                        {calculateTotalDept(this.props.decorationSelected, this.props.productSelected, this.props.businessScenarioData) >= 0 ?
                                            "Total Balance"
                                            :
                                            "Total Debt"
                                        }
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <List size='small'>
                                    <List.Item>
                                        {this.props.businessScenarioData === undefined ?
                                            "0 ฿"
                                            :
                                            this.props.businessScenarioData.BusinessStartMoney.toLocaleString('EN') + " ฿"
                                        }
                                    </List.Item>
                                    <List.Item>
                                        {(this.props.sizeSelected !== undefined &&
                                            this.props.locationSelected !== undefined &&
                                            this.props.ownershipSelected !== undefined) ||
                                            this.props.decorationSelected !== undefined ?
                                            calculateTotalSpent(this.props.decorationSelected,
                                                this.props.businessScenarioData).toLocaleString('EN') + " ฿"
                                            :
                                            "0 ฿"
                                        }
                                    </List.Item>
                                    <List.Item>

                                        {isSomeProductPass(this.props.productSelected) === true ?
                                            (calculateTotalPurchased(this.props.productSelected) * 12).toLocaleString('EN') + " ฿"
                                            :
                                            "0 ฿"
                                        }

                                    </List.Item>
                                    <List.Item>
                                        {this.props.businessScenarioData !== undefined && (this.props.decorationSelected !== undefined || isSomeProductPass(this.props.productSelected) === true) ?
                                            calculateTotalDept(this.props.decorationSelected, this.props.productSelected, this.props.businessScenarioData).toLocaleString('EN') + " ฿" :
                                            this.props.businessScenarioData !== undefined ? this.props.businessScenarioData.BusinessStartMoney.toLocaleString('EN') + " ฿" : "0 ฿"}
                                    </List.Item>
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Content>
                </Collapse>
                <Content_header style={{ borderTop: '3px solid #3498DB' }}>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column floated='left'>
                            <Header
                                as='h4'
                                content='Store Operation'
                            />
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Icon
                                link
                                color='grey'
                                name={this.state.collapseOverview === true ? 'angle down' : 'angle left'}
                                onClick={this.handleCollapseOverview}
                            />
                        </Grid.Column>
                    </Grid>
                </Content_header>
                <Collapse isOpen={this.state.collapseOverview}>
                    <Content>
                        <Grid container centered>
                            <Grid.Column width={10} floated='left'>
                                <List size='small'>
                                    <List.Item>Location</List.Item>
                                    <List.Item>Size</List.Item>
                                    <List.Item>Ownership</List.Item>
                                    <List.Item>
                                        Decoration
                                        <List.List>
                                            <Divider fitted />
                                            {this.decorationShowSelectedItem()}
                                            <Divider fitted />
                                        </List.List>
                                    </List.Item>
                                    <List.Item>
                                        Merchandise Capacity
                                        <List.List>
                                            <Divider fitted />
                                            {this.productNameShowSelected()}
                                            <Divider fitted />
                                        </List.List>
                                    </List.Item>
                                    <List.Item>Selling to Customer at </List.Item>
                                    <List.Item>Offer service (Hours/day)</List.Item>
                                    <List.Item>Opening day / Week</List.Item>
                                    <List.Item>
                                        Full-time:
                                        <List.List>
                                            <Divider fitted />
                                            {this.fulltimeSelected()}
                                            <Divider fitted />
                                        </List.List>
                                    </List.Item>
                                    <List.Item>
                                        Part-time:
                                        <List.List>
                                            <Divider fitted />
                                            {this.parttimeSelected()}
                                            <Divider fitted />
                                        </List.List>
                                    </List.Item>
                                    <List.Item>
                                        Promotion Channel
                                        <List.List>
                                            <Divider fitted />
                                            {this.promotionShowSelected()}
                                            <Divider fitted />
                                        </List.List>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <List size='small'>
                                    <List.Item>
                                        {this.props.locationSelected === undefined ?
                                            "-"
                                            :
                                            this.props.locationSelected.LocationName
                                        }
                                    </List.Item>
                                    <List.Item>
                                        {this.props.sizeSelected === undefined ?
                                            "-"
                                            :
                                            this.props.sizeSelected.Size
                                        }
                                    </List.Item>
                                    <List.Item>
                                        {this.props.ownershipSelected === undefined ?
                                            "-"
                                            :
                                            this.props.ownershipSelected.OwnershipName
                                        }
                                    </List.Item>
                                    <List.Item>
                                        {this.props.decorationSelected !== undefined &&
                                            this.props.decorationChoices !== undefined ?
                                            this.props.decorationSelected.length + " / " +
                                            this.state.decorationChoices.length
                                            :
                                            "Not be selected"
                                        }
                                        <List.List>
                                            <Divider fitted />
                                            {this.decorationShowSelectedPrice()}
                                            <Divider fitted />
                                        </List.List>

                                    </List.Item>
                                    <List.Item>
                                        {isSomeProductPass(this.props.productSelected) === true &&
                                            this.props.sizeSelected !== undefined ?
                                            calculateTotalAmount(this.props.productSelected).toLocaleString('EN') + " / " +
                                            this.props.sizeSelected.Storage.toLocaleString('EN')
                                            :
                                            "Not be selected"
                                        }
                                        <List.List>
                                            <Divider fitted />
                                            {this.productShowSelected()}
                                            <Divider fitted />
                                        </List.List>
                                    </List.Item>
                                    <List.Item>
                                        {this.props.targetGroupSelected === undefined ?
                                            "-"
                                            :
                                            this.props.targetGroupSelected.TargetGroupName}
                                    </List.Item>
                                    <List.Item>
                                        {this.props.totalTimeSelected !== undefined ?
                                            this.props.totalTimeSelected
                                            :
                                            "-"
                                        }
                                    </List.Item>
                                    <List.Item>
                                        {this.props.daySelected === undefined ?
                                            "-"
                                            :
                                            this.props.daySelected
                                        }
                                    </List.Item>
                                    <List.Item>
                                        {isSomeFulltimeEmployeePass(this.props.employeeSelected) === true ?
                                            "Amount"
                                            :
                                            "Not be selected"
                                        }
                                        <List.List>
                                            <Divider fitted />
                                            {this.amountfulltimeSelected()}
                                            <Divider fitted />
                                        </List.List>
                                    </List.Item>
                                    <List.Item>
                                        {isSomeParttimeEmployeePass(this.props.parttimeEmployeeSelected) === true ?
                                            "Amount"
                                            :
                                            "Not be selected"
                                        }
                                        <List.List>
                                            <Divider fitted />
                                            {this.amountParttimeSelected()}
                                            <Divider fitted />
                                        </List.List>
                                    </List.Item>
                                    <List.Item>
                                        {this.props.marketingSelected !== undefined ?
                                            this.props.marketingSelected.length + " Channel"
                                            :
                                            "Not be selected"
                                        }
                                        <List.List>
                                            <Divider fitted />
                                            {this.promotionDetailShowSelected()}
                                            <Divider fitted />
                                        </List.List>
                                    </List.Item>
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Content>
                </Collapse>
            </div>
        )
    }
}