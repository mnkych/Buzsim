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
    Label
} from 'semantic-ui-react';
import { getStoreRelationById } from '../../../Provider/CreateProvider/CreateProvider';

export default class CostRelation extends React.Component {

    generateField = () => {
        let genRelate = []
        this.props.ownershipChoice.map((ownership, indexOwnership) => {
            ownership = JSON.parse(ownership)
            let relavant = []
            this.props.sizeChoice.map((size, indexSize) => {
                size = JSON.parse(size)
                this.props.locationChoice.map((location, indexlocation) => {
                    location = JSON.parse(location)
                    let alreadyChoose = getStoreRelationById({ ...size, ...location, ...ownership }, this.props.storeOperationChoice)
                    relavant.push(
                        <span key={indexSize + '' + indexlocation + '' + indexOwnership}>
                            <Item.Meta>
                                <span>Size:&nbsp;<Label>{size.Size}</Label></span>
                                <span>Location:&nbsp;<Label>{location.LocationName}</Label></span>
                            </Item.Meta >
                            <Item.Description>
                                <Form size='tiny'>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Privilege cost</label>
                                            <Input
                                                name='PrivillageCost'
                                                labelPosition='right'
                                                label={{ basic: true, content: '฿' }}
                                                placeholder='numberic only'
                                                onChange={(e, { name, value }) => this.props.handleChangeStoreRelation(name,alreadyChoose,ownership.OwnershipName === 'Rent' ? 0 : value)}
                                                value={alreadyChoose ? alreadyChoose.PrivillageCost : ''}
                                                error={alreadyChoose ? alreadyChoose.PrivillageCost === "" : false}
                                                disabled={ownership.OwnershipName === 'Rent'}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Rental cost</label>
                                            <Input
                                                name='RentalCost'
                                                labelPosition='right'
                                                label={{ basic: true, content: '฿' }}
                                                placeholder='numberic only'
                                                onChange={(e, { name, value }) => this.props.handleChangeStoreRelation(name,alreadyChoose,ownership.OwnershipName === 'Buy' ? 0 : value)}
                                                value={alreadyChoose ? alreadyChoose.RentalCost : ''}
                                                error={alreadyChoose ? alreadyChoose.RentalCost === "" : false}
                                                disabled={ownership.OwnershipName === 'Buy'}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Accounting fee</label>
                                            <Input
                                                name='AccountingFee'
                                                labelPosition='right'
                                                label={{ basic: true, content: '฿' }}
                                                placeholder='numberic only'
                                                onChange={(e, { name, value }) => this.props.handleChangeStoreRelation(name,alreadyChoose,value)}
                                                value={alreadyChoose ? alreadyChoose.AccountingFee : ''}
                                                error={alreadyChoose ? alreadyChoose.AccountingFee === "" : false}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Item.Description>
                        </span>

                    )
                })
            })
            genRelate.push(
                <Item key={indexOwnership}>
                    <Item.Content>
                        <Item.Meta>
                            <span>No.{indexOwnership + 1}</span>
                        </Item.Meta>
                        <Item.Meta>
                            <span>Ownership:&nbsp;<Label>{ownership.OwnershipName}</Label></span>
                        </Item.Meta>
                        {relavant}
                    </Item.Content>
                </Item>

            )
        })
        return genRelate
    }

    render() {
        return (
            <div>
                <InputWrap>
                    <Topic>
                        <Header as='h3'>
                            <Header.Content>
                                Cost Relevant
                                <Header.Subheader>
                                    Cost relation of Size Location and Ownership
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Topic>
                    <Container fluid style={{ padding: "3%" }}>
                        <Item.Group divided>
                            {this.generateField()}
                        </Item.Group>

                    </Container>
                </InputWrap>
            </div>
        )
    }
}