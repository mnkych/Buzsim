import React from 'react';
import {
    InputWrap,
    Topic,
} from '../../../Provider/CSS/styled';
import {
    Header,
    Grid,
    Input,
    Form,
    Container,
    Item,
    Label,
    Statistic,
    Message
} from 'semantic-ui-react';
import { getProductAcceptionById, calculateTotalQuantity } from '../../../Provider/CreateProvider/CreateProvider';

export default class ProductTargetgroup extends React.Component {

    generateField = () => {
        let relation = []
        this.props.targetGroupChoice.map((target, indexTarget) => {
            let genProduct = []
            let statefilter = []
            this.props.productChoice.map((product, indexProduct) => {
                product = JSON.parse(product)
                let alreadyChoose = getProductAcceptionById({ ...target, ...product }, this.props.acceptionChoice)
                genProduct.push(
                    <Form.Group key={'accept' + indexTarget + indexProduct}>
                        <Form.Field width={4}>
                            <Label>
                                {alreadyChoose ? product.ProductName : ''}
                            </Label>
                        </Form.Field>
                        <Form.Field width={4}>
                            <Input
                                name='AcceptRatio'
                                labelPosition='right'
                                label={{ basic: true, content: '%' }}
                                placeholder='numberic only'
                                value={alreadyChoose ? alreadyChoose.AcceptRatio : ''}
                                onChange={(e, { name, value }) => this.props.handleProductAcceptInfo(name, alreadyChoose, value)}
                                onBlur={() => this.props.acceptOnBlur(alreadyChoose)}
                                error={alreadyChoose ? alreadyChoose.AcceptRatio === '' : false}
                            />
                        </Form.Field>
                        <Form.Field width={4}>
                            <Input
                                name='AcceptRatioGrowUpRate'
                                type="number"
                                step="0.1"
                                labelPosition='right'
                                label={{ basic: true, content: '%' }}
                                placeholder='numberic and decimal'
                                value={alreadyChoose ? alreadyChoose.AcceptRatioGrowUpRate : ''}
                                onChange={(e, { name, value }) => this.props.handleProductAcceptInfo(name, alreadyChoose, value)}
                                className='inputMinusBox'
                                error={alreadyChoose ? alreadyChoose.AcceptRatioGrowUpRate === '' : false}
                            />
                        </Form.Field>
                        <Form.Field width={4}>
                            <Input
                                name='MaximumPriceRate'
                                labelPosition='right'
                                label={{ basic: true, content: '%' }}
                                placeholder='numberic'
                                value={alreadyChoose ? alreadyChoose.MaximumPriceRate : ''}
                                onChange={(e, { name, value }) => this.props.handleProductAcceptInfo(name, alreadyChoose, value)}
                                error={alreadyChoose ? alreadyChoose.MaximumPriceRate === '' : false}
                            />
                        </Form.Field>
                    </Form.Group>
                )
            statefilter = this.props.acceptionChoice.filter(e=>{return alreadyChoose?alreadyChoose.TargetGroupID === e.TargetGroupID : false})
            })
            relation.push(
                <Item key={'acceptByTarget' + indexTarget}>
                    <Item.Content>
                        <Item.Meta>
                            <span>Target group :</span>&nbsp;&nbsp;<Label>{target.TargetGroupName}</Label>
                        </Item.Meta>
                        <Item.Description>
                            <Grid stackable>
                                <Grid.Column width={12}>
                                    <Form size='tiny'>
                                        <Form.Group>
                                            <Form.Field width={4}>
                                                <label>Product</label>
                                            </Form.Field>
                                            <Form.Field width={4}>
                                                <label>Product acceptance rate</label>
                                            </Form.Field>
                                            <Form.Field width={4}>
                                                <label>Acceptance growth rate</label>
                                            </Form.Field>
                                            <Form.Field width={4}>
                                                <label>Max price acceptance rate</label>
                                            </Form.Field>
                                        </Form.Group>
                                        {genProduct}
                                    </Form>
                                </Grid.Column>
                                <Grid.Column width={4} verticalAlign='middle' textAlign='center'>
                                    <Statistic>
                                        <Statistic.Label>Total acceptance rate</Statistic.Label>
                                        <Statistic.Value>{calculateTotalQuantity(statefilter,'AcceptRatio')} %</Statistic.Value>
                                    </Statistic>
                                    <Message warning size='tiny'>
                                        Total acceptance rate must be 100%
                                    </Message>
                                </Grid.Column>
                            </Grid>
                        </Item.Description>
                    </Item.Content>
                </Item>
            )
        })
        return relation
    }

    render() {
        return (
            <InputWrap>
                <Topic>
                    <Header as='h3'>
                        <Header.Content>
                            Relation of Product & Target group
                        </Header.Content>
                    </Header>
                </Topic>
                <Container fluid style={{ padding: "3%" }}>
                    <Item.Group divided>
                        {this.generateField()}
                    </Item.Group>
                </Container>
            </InputWrap>
        )
    }
}