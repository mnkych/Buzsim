import React from 'react';
import {
    List,
    Button,
    Grid,
    Input,
    Dropdown,
    Modal,
    Popup,
    Icon,
    Table,
    Header,

} from 'semantic-ui-react';
import { getProductByObjectID, calculateTotalCostOfProduct, calculateTotalAmount, calculateTotalPurchased, isSomeProductPass } from '../../../Provider/ProductProvider/ProductProvider';
import {
    Alert,
    Content,
    Content_header,
    Center,
    Sub_desc,
    Radio_small_size
} from '../../../Provider/CSS/styled';
import { Collapse } from 'reactstrap'

export default class Product extends React.Component {

    state = {
        collapseMerchan: false,
        alreadyDone: false
    }

    componentWillReceiveProps = async (nextProps) => {
        let object = { productChoice: nextProps.productChoice, productOption: nextProps.productOption }
        await this.setState({
            productChoice: object
        })
    }

    done = () => {
        this.setState({ alreadyDone: false })
    }

    openMerchanTab = () => {
        this.setState({
            collapseMerchan: !this.state.collapseMerchan
        })
    }

    showProductList() {
        let productList = []
        if (this.props.productChoice !== undefined) {
            productList = this.state.productChoice.productChoice.map((e, index) => {
                let alreadyChoose = getProductByObjectID(e, this.props.productSelected)
                return (
                    <Table.Row key={"Row" + index}>
                        <Table.Cell key={'CollumnCheck' + index}>
                            <Radio_small_size
                                key={'A' + index}
                                label={e.ProductName}
                                name={e.ProductName}
                                value={JSON.stringify(e)}
                                onChange={this.props.handleChangeProduct}
                                checked={alreadyChoose !== undefined}
                            />
                        </Table.Cell>
                        <Table.Cell key={'CollumnGrade' + index}>
                            <Dropdown
                                placeholder='Grade'
                                key={'B' + index}
                                onChange={this.props.handleChangeProduct}
                                options={this.state.productChoice.productOption[index]}
                                value={alreadyChoose !== undefined ? JSON.stringify(alreadyChoose.productDetail) : undefined}
                                disabled={alreadyChoose === undefined}
                                error={alreadyChoose !== undefined && alreadyChoose.productDetail === undefined}
                            />
                        </Table.Cell>
                        <Table.Cell key={'CollumnSelling' + index}>
                            <Input
                                placeholder='Selling Price'
                                key={'SELLINGPRICE' + index}
                                id={alreadyChoose !== undefined ? alreadyChoose.ProductID : ""}
                                size='mini'
                                label={{ basic: true, content: '฿' }}
                                labelPosition='right'
                                disabled={alreadyChoose !== undefined ? alreadyChoose.productDetail === undefined : true}
                                onChange={this.props.handleChangeProductSellingPrice}
                                value={alreadyChoose !== undefined && alreadyChoose.productDetail !== undefined ? alreadyChoose.sellingPrice || "" : ""}
                                error={alreadyChoose !== undefined && alreadyChoose.productDetail !== undefined && alreadyChoose.sellingPrice !== undefined ? alreadyChoose.sellingPrice === "" : false}
                            />
                        </Table.Cell>
                        <Table.Cell key={'CollumnPrice' + index}>
                            <Input
                                key={'Total' + index}
                                transparent
                                disabled
                                size='mini'
                                label={{ basic: true, content: '฿/piece' }}
                                labelPosition='right'
                                value={alreadyChoose !== undefined &&
                                    alreadyChoose.productDetail !== undefined ?
                                    alreadyChoose.productDetail.BasePricePerUnit.toLocaleString('EN')
                                    :
                                    ""}
                            />
                        </Table.Cell>
                        <Table.Cell key={'CollumnAmount' + index}>
                            <Input
                                placeholder='Amount(Monthly)'
                                key={'AMOUNT' + index}
                                id={alreadyChoose !== undefined ? alreadyChoose.ProductID : ""}
                                size='mini'
                                label={{ basic: true, content: 'Pc.' }}
                                labelPosition='right'
                                disabled={alreadyChoose !== undefined ? alreadyChoose.productDetail === undefined : true}
                                onChange={this.props.handleChangeProductAmount}
                                onBlur={async (e) => { if (await this.props.adapOnBlur(e) === true) { this.setState({ alreadyDone: true }) } }}
                                value={alreadyChoose !== undefined && alreadyChoose.productDetail !== undefined ? alreadyChoose.amount || "" : ""}
                                error={alreadyChoose !== undefined && alreadyChoose.productDetail !== undefined && alreadyChoose.amount !== undefined ? alreadyChoose.amount === "" || alreadyChoose.amount === 0 : false}
                            />
                        </Table.Cell>
                        <Table.Cell key={'CollumnTotal' + index}>
                            <Input
                                key={'Total' + index}
                                transparent
                                disabled
                                size='mini'
                                label={{ basic: true, content: '฿' }}
                                labelPosition='right'
                                value={alreadyChoose !== undefined &&
                                    alreadyChoose.productDetail !== undefined &&
                                    alreadyChoose.amount !== undefined ?
                                    calculateTotalCostOfProduct(
                                        alreadyChoose.amount,
                                        alreadyChoose.productDetail.BasePricePerUnit
                                    ).toLocaleString('EN')
                                    :
                                    ""}
                            />
                        </Table.Cell>
                    </Table.Row>
                )
            })
            return productList;
        }
    }

    showProductUnit = () => {
        let productSelectedList = [];
        if (this.props.productSelected !== undefined && this.props.productSelected.length !== 0) {
            productSelectedList = this.props.productSelected.map((e, index) => {
                if (e.productDetail !== undefined && e.amount !== "" && e.sellingPrice !== "" && e.amount !== 0) {
                    return (
                        <Table.Body key={"Show" + index}>
                            <Table.Row>
                                <Table.Cell>
                                    {e.productDetail.ProductName}
                                </Table.Cell>
                                <Table.Cell>
                                    {e.productDetail.QualityName}
                                </Table.Cell>
                                <Table.Cell>
                                    {e.amount.toLocaleString('EN')}
                                </Table.Cell>
                                <Table.Cell>
                                    {e.sellingPrice.toLocaleString('EN')}
                                </Table.Cell>
                                <Table.Cell>
                                    {e.productDetail.BasePricePerUnit.toLocaleString('EN')}
                                </Table.Cell>
                                <Table.Cell>
                                    {calculateTotalCostOfProduct(e.amount, e.productDetail.BasePricePerUnit).toLocaleString('EN')}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                }
            })
        }
        return productSelectedList;
    }

    render() {
        return (
            <div>
                <Alert
                    size='tiny'
                    open={this.state.alreadyDone}
                    closeOnEscape={false}
                    closeOnDimmerClick={false}
                >
                    <Modal.Header>
                        Maximum Capacity !
                    </Modal.Header>
                    <Modal.Content>
                        Amount of product is over!
                        <p>Size is  {this.props.sizeSelected !== undefined ? JSON.parse(this.props.sizeSelected).Size : ""}</p>
                        <p>Product Capacity is  {this.props.sizeSelected !== undefined ? calculateTotalAmount(this.props.productSelected).toLocaleString('EN') + " / " + (JSON.parse(this.props.sizeSelected).Storage).toLocaleString('EN') : ""}</p>
                        <p>Product amount will set maximum automatically</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.done}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Accept'
                        />
                    </Modal.Actions>
                </Alert>
                <Content_header>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column floated='left'>
                            <Header as='h4'>
                                MERCHANDISING
                            </Header>
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Popup
                                trigger={<Icon
                                    color='grey'
                                    name='info'
                                />}
                                content={this.props.businessScenarioData !== undefined ? this.props.businessScenarioData.BusinessProductDescription : ""}
                                inverted
                            />
                        </Grid.Column>
                    </Grid>
                </Content_header>
                <Content>
                    <Grid verticalAlign='middle' columns={5}>
                        <Grid.Column textAlign='right'>
                            <Icon
                                circular
                                inverted
                                color='brown'
                                name='shopping cart'
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='left' floated='right'>
                            <Header as='h6'>
                                Product
                        </Header>
                        </Grid.Column>
                        <Grid.Column />
                        <Grid.Column floated='right' textAlign='right'>
                            <Icon
                                link
                                name='list ul'
                                color='grey'
                                onClick={this.openMerchanTab}
                            />
                        </Grid.Column>
                    </Grid>
                </Content>
                {isSomeProductPass(this.props.productSelected) === true ?
                    <Content>
                        <Center>
                            <List horizontal>
                                <List.Item>
                                    <List.Content>
                                        <List.Description>
                                            <Sub_desc>
                                                <Icon name='box' />&nbsp;
                                                  {this.props.productSelected.length === 1 ?
                                                    this.props.productSelected.length.toLocaleString('EN') + " kind"
                                                    :
                                                    this.props.productSelected.length.toLocaleString('EN') + " kinds"
                                                    }
                                            </Sub_desc>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Description>
                                            <Sub_desc>
                                                <Icon name='dollar' />
                                                    Total cost &nbsp;
                                                    {this.props.productSelected !== undefined ?
                                                    calculateTotalPurchased(this.props.productSelected).toLocaleString('EN')
                                                    :
                                                    0}&nbsp;฿
                                                </Sub_desc>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Center>
                    </Content>
                    :
                    ""
                }
                {this.props.sizeSelected !== undefined ?
                    <Alert open={this.state.collapseMerchan}>
                        <Modal.Header>
                            <Icon name='setting' />
                            Setting Merchandise</Modal.Header>
                        <Modal.Content scrolling>
                            <Grid container>
                                <Table basic='very' celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.Cell></Table.Cell>
                                            <Table.Cell>
                                                <Header as='h5'>Grade</Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Header as='h5'>Selling Price</Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Header as='h5'>Product Cost</Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Header as='h5'>Amount Purchase/unit</Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Header as='h5'>Total Cost</Header>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {this.showProductList()}
                                    </Table.Body>
                                </Table>
                            </Grid>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.openMerchanTab} positive icon='checkmark' labelPosition='right' content='Done' />
                        </Modal.Actions>
                    </Alert>
                    :
                    <Collapse isOpen={this.state.collapseMerchan}>
                        <Content>
                            <Grid container relaxed padded='vertically'>
                                <Grid.Column>
                                    <Header as='h2' icon textAlign='center'>
                                        <Icon name='announcement' circular />
                                        <Header.Content>
                                            Remind !
                                    <Header.Subheader>
                                                Please select size factor before !
                                    </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Grid.Column>
                            </Grid>
                        </Content>
                    </Collapse>
                }
            </div>
        )
    }
}