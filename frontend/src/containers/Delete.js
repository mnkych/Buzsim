import React from 'react';
import { getBusinessNotInClassroom, getDecorationNotInBD, getSizeNotInBB, getLocationNotInBB, getOwnerNotInB, getHumanNotInBH, getMarketingNotInBM, getCompetitorNotIntBC, getProductNotInBP } from '../Provider/GetData/GetData'
import { UserProvider } from '../Provider/UserProvider/UserProvider'
import swal from 'sweetalert2'
import { deleteBusiness, deleteProductQuality, deleteDeCID, deleteLocation, deleteSize, deleteCompetitor, deleteMarketing, deleteHumanID, deleteProduct, deleteOwner } from '../Provider/DeleteData/DeleteData'
import styled from 'styled-components'
import bgadmin from '../Static/img/bgadmin.svg'
import { splitArrayToArray, } from '../Provider/CreateProvider/CreateProvider'
import DeleteScenario from '../components/Delete/DeleteScenario/DeleteScenario'
import DeleteSize from '../components/Delete/DeleteScenario/DeleteSize'
import DeleteDecoration from '../components/Delete/DeleteScenario/DeleteDecoration'
import FooterTeal from '../components/Footer/FooterTeal'
import {
    Container,
    Icon,
    Segment,
    Grid,
    Menu,
    Pagination
} from 'semantic-ui-react';
import { Back_hv } from '../Provider/CSS/hover'
import DeleteLocation from '../components/Delete/DeleteScenario/DeleteLocation';
import DeleteOwnership from '../components/Delete/DeleteScenario/DeleteOwnership';
import DeleteProduct from '../components/Delete/DeleteScenario/DeleteProduct';
import DeleteHumanResource from '../components/Delete/DeleteScenario/DeleteHumanResource';
import DeleteMarketing from '../components/Delete/DeleteScenario/DeleteMarketing';
import DeleteCompetitor from '../components/Delete/DeleteScenario/DeleteCompetitor';
const Body_Main = styled.div`
    transition: margin-right .5s;
    padding: 16px;
`
const Bg_wrap = styled.div`
    background:url(${bgadmin}) no-repeat;
    background-size:cover;
    height:101vh;
`

export default class Delete extends React.Component {
    state = {
        scenario: [],
        decorationOption: [],
        sizeOption: [],
        ownershipOption: [],
        productOption: [],
        humanOption: [],
        marketingOption: [],
        competitorOption: [],
        selectedScenario: undefined,
        decoration: undefined,
        size: undefined,
        location: undefined,
        ownership: undefined,
        product: undefined,
        human: undefined,
        marketing: undefined,
        competitor: undefined,
        currentPage: 1,
        activeItem: 'scenario'
    }
    componentWillMount = () => {
        if (!UserProvider.getUserOnLog()) {
            swal({
                position: 'center',
                type: 'info',
                title: 'Instructor ?',
                html: 'Please login first',
                showConfirmButton: true,
            }).then(() => {
                this.logOut()
            })
        }
    }
    componentDidMount = async () => {
        let dataBus = await getBusinessNotInClassroom()
        let decData = await getDecorationNotInBD()
        let sizeData = await getSizeNotInBB()
        let loData = await getLocationNotInBB()
        let ownershipData = await getOwnerNotInB()
        let productData = await getProductNotInBP()
        let humanData = await getHumanNotInBH()
        let marketData = await getMarketingNotInBM()
        let competitorData = await getCompetitorNotIntBC()
        dataBus = splitArrayToArray(dataBus.reverse(), 6)
        decData = splitArrayToArray(decData.reverse(), 6)
        sizeData = splitArrayToArray(sizeData.reverse(), 6)
        loData = splitArrayToArray(loData.reverse(), 6)
        ownershipData = splitArrayToArray(ownershipData.reverse(), 6)
        productData = splitArrayToArray(productData.reverse(), 6)
        humanData = splitArrayToArray(humanData.reverse(), 6)
        marketData = splitArrayToArray(marketData.reverse(), 6)
        competitorData = splitArrayToArray(competitorData.reverse(), 6)
        this.setState({
            scenario: dataBus,
            decorationOption: decData,
            sizeOption: sizeData,
            locationOption: loData,
            ownershipOption: ownershipData,
            productOption: productData,
            humanOption: humanData,
            marketingOption: marketData,
            competitorOption: competitorData
        })
    }
    logOut = () => {
        UserProvider.setUserOnLog(undefined)
        this.props.history.replace({
            pathname: "/",
            state: undefined
        })
    }
    handleChange = async ({ name, value }) => {
        if (name !== 'scenario') {
            if (document.getElementById("viewScn") && document.getElementById("main")) {
                document.getElementById("viewScn").style.width = "0";
                document.getElementById("main").style.marginRight = "0";
            }
        }
        await this.setState({
            [name]: value,
        })
    }
    handleLocation = (path) => {
        this.props.history.push({
            pathname: `/${path}`,
            state: UserProvider.getUserOnLog()
        })
    }
    handleSelected = async (name, value) => {
        await this.setState({
            [name]: value
        })
    }
    handleScenarioDelete = (value, name) => {
        swal({
            title: 'Are you sure?',
            html: `Your ${name} will be lost <br> & <br> You won't be able to revert this!`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.value && name === 'scenario') {
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        await deleteProductQuality(value.BusinessID).then(async () => {
                            await deleteBusiness(value.BusinessID)
                            this.componentDidMount()
                        })
                        swal(
                            'Deleted!',
                            `Your ${name} has been deleted.`,
                            'success'
                        )
                    }
                }).then(() => {
                    swal.close()
                })
            }
            if (result.value && name === 'decoration') {
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        await deleteDeCID(value.DecorationID).then(() => {
                            this.componentDidMount()
                        })
                        swal(
                            'Deleted!',
                            `Your ${name} has been deleted.`,
                            'success'
                        )
                    }
                }).then(() => {
                    swal.close()
                })
            }
            if (result.value && name === 'size') {
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        await deleteSize(value.SizeID).then(() => {
                            this.componentDidMount()
                        })
                        swal(
                            'Deleted!',
                            `Your ${name} has been deleted.`,
                            'success'
                        )
                    }
                }).then(() => {
                    swal.close()
                })
            }
            if (result.value && name === 'location') {
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        await deleteLocation(value.LocationID).then(() => {
                            this.componentDidMount()
                        })
                        swal(
                            'Deleted!',
                            `Your ${name} has been deleted.`,
                            'success'
                        )
                    }
                }).then(() => {
                    swal.close()
                })
            }
            if (result.value && name === 'ownership') {
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        await deleteOwner(value.OwnershipID).then(() => {
                            this.componentDidMount()
                        })
                        swal(
                            'Deleted!',
                            `Your ${name} has been deleted.`,
                            'success'
                        )
                    }
                }).then(() => {
                    swal.close()
                })
            }
            if (result.value && name === 'product') {
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        await deleteProduct(value.ProductID).then(() => {
                            this.componentDidMount()
                        })
                        swal(
                            'Deleted!',
                            `Your ${name} has been deleted.`,
                            'success'
                        )
                    }
                }).then(() => {
                    swal.close()
                })
            }
            if (result.value && name === 'human') {
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        await deleteHumanID(value.HumanResourceID).then(() => {
                            this.componentDidMount()
                        })
                        swal(
                            'Deleted!',
                            `Your ${name} has been deleted.`,
                            'success'
                        )
                    }
                }).then(() => {
                    swal.close()
                })
            }
            if (result.value && name === 'marketing') {
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        await deleteMarketing(value.MarketingID).then(() => {
                            this.componentDidMount()
                        })
                        swal(
                            'Deleted!',
                            `Your ${name} has been deleted.`,
                            'success'
                        )
                    }
                }).then(() => {
                    swal.close()
                })
            }
            if (result.value && name === 'competitor') {
                swal({
                    html: 'Please wait',
                    timer: 2000,
                    showConfirmButton: false,
                    onBeforeOpen: async () => {
                        swal.showLoading()
                        await deleteCompetitor(value.CompetitorScoreID).then(() => {
                            this.componentDidMount()
                        })
                        swal(
                            'Deleted!',
                            `Your ${name} has been deleted.`,
                            'success'
                        )
                    }
                }).then(() => {
                    swal.close()
                })
            }
        })
    }
    render() {
        if (UserProvider.getUserOnLog()) {
            return (
                <div>
                    <Bg_wrap>
                        <Back_hv style={{ paddingTop: "2%", position: "absolute" }} name="arrow alternate circle left" size='huge' link color='grey' onClick={() => this.handleLocation('Management')} />
                        <Body_Main id="main" style={{ paddingTop: "7%" }}>
                            <Container>
                                <Menu attached='top' tabular>
                                    <Menu.Item name='Scenario' active={this.state.activeItem === 'scenario'} onClick={() => this.handleChange({ name: 'activeItem', value: 'scenario' })} />
                                    <Menu.Item name='Decoration' active={this.state.activeItem === 'decoration'} onClick={() => this.handleChange({ name: 'activeItem', value: 'decoration' })} />
                                    <Menu.Item name='size' active={this.state.activeItem === 'size'} onClick={() => this.handleChange({ name: 'activeItem', value: 'size' })} />
                                    <Menu.Item name='location' active={this.state.activeItem === 'location'} onClick={() => this.handleChange({ name: 'activeItem', value: 'location' })} />
                                    <Menu.Item name='ownership' active={this.state.activeItem === 'ownership'} onClick={() => this.handleChange({ name: 'activeItem', value: 'ownership' })} />
                                    <Menu.Item name='product' active={this.state.activeItem === 'product'} onClick={() => this.handleChange({ name: 'activeItem', value: 'product' })} />
                                    <Menu.Item name='human' active={this.state.activeItem === 'human'} onClick={() => this.handleChange({ name: 'activeItem', value: 'human' })} />
                                    <Menu.Item name='marketing' active={this.state.activeItem === 'marketing'} onClick={() => this.handleChange({ name: 'activeItem', value: 'marketing' })} />
                                    <Menu.Item name='competitor' active={this.state.activeItem === 'competitor'} onClick={() => this.handleChange({ name: 'activeItem', value: 'competitor' })} />
                                </Menu>
                                <Segment attached='bottom' stacked secondary>
                                    {this.state.activeItem === 'scenario' ?
                                        <DeleteScenario
                                            scenario={this.state.scenario}
                                            selectedScenario={this.state.selectedScenario}
                                            currentPage={this.state.currentPage}
                                            handleScenarioDelete={this.handleScenarioDelete}
                                            handleSelected={this.handleSelected}
                                        /> : ''}
                                    {this.state.activeItem === 'decoration' ?
                                        <DeleteDecoration
                                            decorationOption={this.state.decorationOption}
                                            decoration={this.state.decoration}
                                            currentPage={this.state.currentPage}
                                            handleScenarioDelete={this.handleScenarioDelete}
                                            handleSelected={this.handleSelected}
                                        /> : ''}
                                    {this.state.activeItem === 'size' ?
                                        <DeleteSize
                                            sizeOption={this.state.sizeOption}
                                            size={this.state.size}
                                            currentPage={this.state.currentPage}
                                            handleScenarioDelete={this.handleScenarioDelete}
                                            handleSelected={this.handleSelected}
                                        /> : ''}
                                    {this.state.activeItem === 'location' ?
                                        <DeleteLocation
                                            locationOption={this.state.locationOption}
                                            location={this.state.location}
                                            currentPage={this.state.currentPage}
                                            handleScenarioDelete={this.handleScenarioDelete}
                                            handleSelected={this.handleSelected}
                                        /> : ''}
                                    {this.state.activeItem === 'ownership' ?
                                        <DeleteOwnership
                                            ownershipOption={this.state.ownershipOption}
                                            ownership={this.state.ownership}
                                            currentPage={this.state.currentPage}
                                            handleScenarioDelete={this.handleScenarioDelete}
                                            handleSelected={this.handleSelected}
                                        /> : ''}
                                    {this.state.activeItem === 'product' ?
                                        <DeleteProduct
                                            productOption={this.state.productOption}
                                            product={this.state.product}
                                            currentPage={this.state.currentPage}
                                            handleScenarioDelete={this.handleScenarioDelete}
                                            handleSelected={this.handleSelected}
                                        /> : ''}
                                    {this.state.activeItem === 'human' ?
                                        <DeleteHumanResource
                                            humanOption={this.state.humanOption}
                                            human={this.state.human}
                                            currentPage={this.state.currentPage}
                                            handleScenarioDelete={this.handleScenarioDelete}
                                            handleSelected={this.handleSelected}
                                        /> : ''}
                                    {this.state.activeItem === 'marketing' ?
                                        <DeleteMarketing
                                            marketingOption={this.state.marketingOption}
                                            marketing={this.state.marketing}
                                            currentPage={this.state.currentPage}
                                            handleScenarioDelete={this.handleScenarioDelete}
                                            handleSelected={this.handleSelected}
                                        /> : ''}
                                    {this.state.activeItem === 'competitor' ?
                                        <DeleteCompetitor
                                            competitorOption={this.state.competitorOption}
                                            competitor={this.state.competitor}
                                            currentPage={this.state.currentPage}
                                            handleScenarioDelete={this.handleScenarioDelete}
                                            handleSelected={this.handleSelected}
                                        /> : ''}
                                    <Grid verticalAlign='middle' columns={3}>
                                        <Grid.Column></Grid.Column>
                                        <Grid.Column>
                                            <Pagination
                                                activePage={this.state.currentPage}
                                                onPageChange={(e, { activePage }) => this.handlePaginationChange(activePage)}
                                                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                                firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                                lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                                prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                                nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                                totalPages={this.state.scenario.length}
                                            />
                                        </Grid.Column>
                                        <Grid.Column></Grid.Column>
                                    </Grid>
                                </Segment>
                            </Container>
                        </Body_Main >
                    </Bg_wrap>
                    <FooterTeal />
                </div>
            )
        } else {
            return (<Bg_wrap fluid></Bg_wrap>)
        }
    }
}