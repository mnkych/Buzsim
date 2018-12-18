import React from 'react';
import {
    InputWrap,
    Topic,
} from '../../../Provider/CSS/styled';
import {
    Header,
    Input,
    Form,
    Container,
    Item,
    Label,
    Checkbox
} from 'semantic-ui-react';
import { getProductQualityByID } from '../../../Provider/CreateProvider/CreateProvider';

export default class ProductQuality extends React.Component {

    generateField = () => {
        let qualitySelected = []
        this.props.productChoice.map((productElement, index) => {
            let product = JSON.parse(productElement)
            let genQuality = []
            this.props.qualityOption.map((quality,indexQuality)=> {
                let alreadyChoose = getProductQualityByID({...quality,...product}, this.props.qualityChoice)
                genQuality.push(
                    <Item.Description key={'genQ'+ index + indexQuality}>
                        <Form size='small'>
                            <Form.Group>
                                <Form.Field width={3}>
                                    <label>Grade</label>
                                </Form.Field>
                                <Form.Field width={5}>
                                    <label>Base price</label>
                                </Form.Field>
                            </Form.Group>
                            <Form.Group>
                                <Form.Field width={3}>
                                    <Checkbox 
                                        label={quality.QualityName} 
                                        onChange={()=>this.props.handleProductQuality({...quality,...product,BasePricePerUnit:''})}
                                        value={quality.QualityID}
                                        checked={alreadyChoose !== undefined}
                                    />
                                </Form.Field>
                                <Form.Field width={5}>
                                    <Input
                                        name='BasePricePerUnit'
                                        onChange={(e,{name,value})=>this.props.handleProductQualityInfo(name,alreadyChoose,value)}
                                        value={alreadyChoose ? alreadyChoose.BasePricePerUnit : ''}
                                        error={alreadyChoose ? alreadyChoose.BasePricePerUnit ==='' : false}
                                        disabled={alreadyChoose === undefined}
                                        labelPosition='right'
                                        label={{ basic: true, content: '฿/unit' }}
                                        placeholder='numberic only'
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Item.Description>
                )
            })
            qualitySelected.push(
                <Item key={'Quality' + index}>
                    <Item.Content>
                        <Item.Meta>
                            <span>No.{index}</span>&nbsp;&nbsp;<Label>{product.ProductName}</Label>
                        </Item.Meta>
                        {genQuality}
                    </Item.Content>
                </Item>
            )
        })
        return qualitySelected
    }

    render() {
        return (
                <InputWrap>
                    <Topic>
                        <Header as='h3'>
                            <Header.Content>
                                Relation of Product & Quality
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