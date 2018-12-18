import React from 'react';
import {
    TitleFactor,
    Topic,
    InputWrap,
    Content,
    Alert
} from '../../../Provider/CSS/styled';
import {
    Header,
    Icon,
    Grid,
    Input,
    Button,
    Dropdown,
    Container,
    Popup,
    Modal,
    Form,
    Item,
    Label
} from 'semantic-ui-react';
import { getDecorationRelationById } from '../../../Provider/CreateProvider/CreateProvider';


export default class DecorationCreate extends React.Component {
    generateField = () => {
        let genReation = []
        this.props.decorationChoice.map((decoration, indexDecoration) => {
            decoration = JSON.parse(decoration)
            let relavant = []
            this.props.locationChoice.map((location, indexlocation) => {
                location = JSON.parse(location)
                this.props.sizeChoice.map((size, indexSize) => {
                    size = JSON.parse(size)
                    let alreadyChoose = getDecorationRelationById({ ...size, ...location, ...decoration }, this.props.decorationRelationChoice)
                    relavant.push(
                        <span key={indexSize + '' + indexlocation + ''}>
                            <Item.Meta>
                                <span>Size:&nbsp;<Label>{size.Size}</Label></span>
                                <span>Location:&nbsp;<Label>{location.LocationName}</Label></span>
                            </Item.Meta >
                            <Item.Description>
                                <Form size='tiny'>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Price</label>
                                            <Input
                                                name='Price'
                                                labelPosition='right'
                                                label={{ basic: true, content: '฿' }}
                                                placeholder='numberic only'
                                                onChange={(e, { name, value }) => this.props.handleDecorationRelation(name, alreadyChoose, value)}
                                                value={alreadyChoose ? alreadyChoose.Price : ''}
                                                error={alreadyChoose ? alreadyChoose.Price === '' : false}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Electricity Unit Consumtion</label>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                name='ElectricityUnitPerHour'
                                                className='inputBox'
                                                labelPosition='right'
                                                label={{ basic: true, content: 'U/hr.' }}
                                                placeholder='numberic only'
                                                onChange={(e, { name, value }) => this.props.handleDecorationRelation(name, alreadyChoose, value)}
                                                value={alreadyChoose ? alreadyChoose.ElectricityUnitPerHour : ''}
                                                error={alreadyChoose ? alreadyChoose.ElectricityUnitPerHour === '' : false}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Item.Description>
                        </span>
                    )
                })
            })
            genReation.push(
                <Item key={'DecorationRelation' + indexDecoration}>
                    <Item.Content>
                        <Item.Meta>
                            <span>No.{indexDecoration + 1}</span>
                        </Item.Meta>
                        <Item.Meta>
                            <span>Decoration:&nbsp;<Label>{decoration.DecorationItem}</Label></span>
                        </Item.Meta>
                        {relavant}
                    </Item.Content>
                </Item>
            )
        })
        return genReation
    }
    render() {
        return (
            <Container>
                <TitleFactor>
                    <Grid columns={2} container>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h1'>
                                    <Icon name='settings' />
                                    <Header.Content>
                                        Decoration Setting
                                <Header.Subheader>Define each decoration into this scenario</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Dropdown placeholder='Select from previous this scenario'
                                    name='oldDecoration'
                                    fluid search selection
                                    options={this.props.oldBusinessOption}
                                    onChange={async (e, { name, value }) => await this.props.handleChangeFromPreviousSce(name, value)}
                                    value={this.props.oldDecoration}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Button negative animated='vertical' size='mini' onClick={() => this.props.handleChangeFromPreviousSce('oldDecoration')}>
                                    <Button.Content hidden>Reset</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='erase' />
                                    </Button.Content>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </TitleFactor>
                <Topic>
                    <Header as='h3'>Decoration Selection</Header>
                </Topic>
                <Content style={{ padding: "5%" }}>
                    <Container fluid>
                        <Header as='h4'>
                            Decoration list
                        <Header.Subheader>can select multiple choices</Header.Subheader>
                        </Header>
                        <Grid>
                            <Grid.Column width={15}>
                                <Dropdown name='decorationChoice'
                                    placeholder='Select item that you want in this scenario'
                                    fluid multiple search selection
                                    options={this.props.decorationOption}
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    error={this.props.decorationChoice.length === 0}
                                    value={this.props.decorationChoice}
                                />
                            </Grid.Column>
                            <Grid.Column width={1} verticalAlign="middle">
                                <Popup trigger={<Icon name='add' link onClick={() => this.props.trigger('decorationModal')} />} content='Add choice' />
                            </Grid.Column>
                        </Grid>
                    </Container>
                    <Alert
                        open={this.props.decorationModal}>
                        <Modal.Header>
                            Decoration Setting
                        </Modal.Header>
                        <Modal.Content>
                            <Container fluid>
                                <Form>
                                    <Form.Group>
                                        <Form.Field width={8}>
                                            <label>Item</label>
                                            <Input
                                                name='itemName'
                                                onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                                value={this.props.itemName}
                                                error={this.props.itemName === ""}
                                                fluid
                                                placeholder='input new item'
                                            />
                                        </Form.Field>
                                        <Form.Field width={4}>
                                            <label>Depreciation</label>
                                            <Dropdown
                                                name="depreciation"
                                                options={this.props.optionYear}
                                                value={this.props.depreciation}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                placeholder='Number of year'
                                                error={this.props.depreciation === ""}
                                                search
                                                selection
                                                scrolling
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.props.trigger('decorationModal')}>
                                Back
                            </Button>
                            <Button
                                onClick={() => this.props.addDecoration('decorationModal')}
                                primary
                                content='Success'
                            />
                        </Modal.Actions>
                    </Alert>
                </Content >
                {this.props.locationChoice && this.props.decorationChoice && this.props.sizeChoice && this.props.locationChoice.length !== 0 && this.props.decorationChoice.length !== 0 && this.props.sizeChoice.length !== 0 ?
                    <div>
                        <InputWrap>
                            <Topic>
                                <Header as='h3'>
                                    <Header.Content>
                                        Cost Relevant
                                <Header.Subheader>
                                            Cost relation of Size Location and Decoration
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
                    </div> : ''}
            </Container >
        )
    }
}