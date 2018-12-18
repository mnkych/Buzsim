import React from 'react';
import {
    TitleFactor,
    Content,
    Topic,
    Alert,
} from '../../../Provider/CSS/styled';
import {
    Form,
    Header,
    Icon,
    Grid,
    Input,
    Dropdown,
    Button,
    Container,
    Popup,
    Modal
} from 'semantic-ui-react';
import CostRelation from './costRelation';
import { Dropdown_scrollX } from '../../../Provider/CSS/styled';

export default class SizeOwnerLocationCreate extends React.Component {
    showCostRelationWhenFillCompletely = () => {
        return <CostRelation
            sizeChoice={this.props.sizeChoice}
            ownershipChoice={this.props.ownershipChoice}
            locationChoice={this.props.locationChoice}

            storeOperationChoice={this.props.storeOperationChoice}

            handleChangeStoreRelation={this.props.handleChangeStoreRelation}
            handleChangeNumericValue={this.props.handleChangeNumericValue}
        />
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
                                        Store Operation Setting
                                        <Header.Subheader>Manage your preferences</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Dropdown placeholder='Select from previous this scenario'
                                    name='oldStoreOperation'
                                    fluid search selection
                                    options={this.props.oldBusinessOption}
                                    onChange={async (e, { name, value }) => await this.props.handleChangeFromPreviousSce(name, value)}
                                    value={this.props.oldStoreOperation}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Button negative animated='vertical' size='mini' onClick={() => this.props.handleChangeFromPreviousSce('oldStoreOperation')}>
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
                    <Header as='h3'>Store Operating Setting</Header>
                </Topic>
                <Content style={{ padding: "5%" }}>
                    <Header as='h4'>
                        Location Selection
                        <Header.Subheader>can select multiple choices</Header.Subheader>
                    </Header>
                    <Grid stackable>
                        <Grid.Column width={15}>
                            <Dropdown_scrollX
                                name='locationChoice'
                                placeholder='Select location that you want in this scenario'
                                fluid multiple search selection
                                options={this.props.locationOption}
                                onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                value={this.props.locationChoice}
                                error={this.props.locationChoice.length === 0}
                            />
                        </Grid.Column>
                        <Grid.Column width={1} verticalAlign="middle">
                            <Popup
                                trigger={<Icon name='add' link onClick={() => this.props.trigger('locationModal')} />}
                                content='Add choice'
                            />
                        </Grid.Column>
                    </Grid>
                    <Alert
                        open={this.props.locationModal}>
                        <Modal.Header>
                            Location Setting
                        </Modal.Header>
                        <Modal.Content>
                            <Container fluid>
                                <Form size='mini'>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Location</label>
                                            <Input
                                                name="locationName"
                                                placeholder='input location'
                                                onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                                value={this.props.locationName}
                                                error={this.props.locationName === ""}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Total Population</label>
                                            <Input
                                                name="totalPopulation"
                                                placeholder='numberic only'
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                value={this.props.totalPopulation}
                                                error={this.props.totalPopulation === ""}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Trading Population(%)</label>
                                            <Dropdown
                                                name="tradingPopulation"
                                                options={this.props.optionTrading}
                                                value={this.props.tradingPopulation}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                placeholder='numberic only'
                                                error={this.props.tradingPopulation === ""}
                                                search
                                                selection
                                                scrolling
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Grow up rate(%)</label>
                                            <Input
                                                name="totalPopulationGrowUpRate"
                                                placeholder='input numberic only'
                                                labelPosition='right'
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                value={this.props.totalPopulationGrowUpRate}
                                                error={this.props.totalPopulationGrowUpRate === ""}
                                                label={{ basic: true, content: '%' }}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.props.trigger('locationModal')} >
                                Back
                            </Button>
                            <Button
                                onClick={() => this.props.addLocation('locationModal')}
                                primary
                                content='Success'
                            />
                        </Modal.Actions>
                    </Alert>
                    <Header as='h4'>
                        Size Selection
                        <Header.Subheader>can select multiple choices</Header.Subheader>
                    </Header>
                    <Grid>
                        <Grid.Column width={15}>
                            <Dropdown_scrollX
                                name='sizeChoice'
                                placeholder='Select size that you want in this scenario'
                                fluid multiple search selection
                                options={this.props.sizeOption}
                                onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                error={this.props.sizeChoice.length === 0}
                                value={this.props.sizeChoice}
                            />
                        </Grid.Column>
                        <Grid.Column width={1} verticalAlign="middle">
                            <Popup trigger={<Icon name='add' link onClick={() => this.props.trigger('sizeModal')} />} content='Add choice' />
                        </Grid.Column>
                    </Grid>
                    <Alert
                        open={this.props.sizeModal}>
                        <Modal.Header>
                            Size Setting
                        </Modal.Header>
                        <Modal.Content>
                            <Container fluid>
                                <Form size='mini'>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Size</label>
                                            <Input
                                                name='sizeName'
                                                onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                                value={this.props.sizeName}
                                                error={this.props.sizeName === ""}
                                                placeholder='input size'
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Storage in this size</label>
                                            <Input
                                                name="storage"
                                                placeholder='numberic only'
                                                labelPosition='right'
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                value={this.props.storage}
                                                error={this.props.storage === ""}
                                                label={{ basic: true, content: 'pieces' }}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Electricity</label>
                                            <Input
                                                name="electricity"
                                                placeholder='numberic only'
                                                labelPosition='right'
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                value={this.props.electricity}
                                                error={this.props.electricity === ""}
                                                label={{ basic: true, content: '฿/Unit' }}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Marketshare score</label>
                                            <Dropdown
                                                name="marketsharedScore"
                                                options={this.props.optionScore}
                                                value={this.props.marketsharedScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                placeholder='numberic 1-10 only'
                                                error={this.props.marketsharedScore === ""}
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
                            <Button onClick={() => this.props.trigger('sizeModal')} >
                                Back
                            </Button>
                            <Button
                                onClick={() => this.props.addSize('sizeModal')}
                                primary
                                content='Success'
                            />
                        </Modal.Actions>
                    </Alert>

                    <Header as='h4'>
                        Ownership Selection
                        <Header.Subheader>can select multiple choices</Header.Subheader>
                    </Header>
                    <Grid>
                        <Grid.Column width={15}>
                            <Dropdown_scrollX
                                name='ownershipChoice'
                                placeholder='Select ownership that you want in this scenario'
                                fluid multiple search selection
                                options={this.props.ownershipOption}
                                onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                error={this.props.ownershipChoice.length === 0}
                                value={this.props.ownershipChoice}
                            />
                        </Grid.Column>
                        <Grid.Column width={1} verticalAlign="middle">
                            <Popup trigger={<Icon name='add' link onClick={() => this.props.trigger('ownershipModal')} />} content='Add choice' />
                        </Grid.Column>
                    </Grid>
                    <Alert
                        open={this.props.ownershipModal}>
                        <Modal.Header>
                            Ownership Setting
                        </Modal.Header>
                        <Modal.Content>
                            <Container fluid>
                                <Form size='mini'>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Ownership</label>
                                            <Dropdown
                                                name="ownershipName"
                                                options={this.props.optionOwnership}
                                                value={this.props.ownershipName}
                                                onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                                placeholder='select ownership'
                                                error={this.props.ownershipName === ""}
                                                selection
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Land/Tax cost</label>
                                            <Input
                                                className="inputBox"
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                name="landTaxCost"
                                                placeholder='Numberic and Decimal'
                                                labelPosition='right'
                                                label={{ basic: true, content: '%' }}
                                                onChange={(e, { name, value }) => this.props.handleChangeFloatValue({ name, value })}
                                                value={this.props.landTaxCost}
                                                error={this.props.landTaxCost === ""}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Other cost</label>
                                            <Input
                                                className="inputBox"
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                name="otherCost"
                                                placeholder='Numberic and Decimal'
                                                labelPosition='right'
                                                label={{ basic: true, content: '%' }}
                                                onChange={(e, { name, value }) => this.props.handleChangeFloatValue({ name, value })}
                                                value={this.props.otherCost}
                                                error={this.props.otherCost === ""}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Maintain cost</label>
                                            <Input
                                                className="inputBox"
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                name="maintainCost"
                                                placeholder='numberic and decimal'
                                                labelPosition='right'
                                                label={{ basic: true, content: '%' }}
                                                onChange={(e, { name, value }) => this.props.handleChangeFloatValue({ name, value })}
                                                value={this.props.maintainCost}
                                                error={this.props.maintainCost === ""}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Depreciation</label>
                                            <Input
                                                name="ownerDepreciation"
                                                placeholder='numberic only'
                                                labelPosition='right'
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                value={this.props.ownerDepreciation}
                                                error={this.props.ownerDepreciation === ""}
                                                label={{ basic: true, content: 'Year' }}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Electricity</label>
                                            <Input
                                                className="inputBox"
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                name="electricityPerUnit"
                                                placeholder='Numberic and Decimal'
                                                labelPosition='right'
                                                label={{ basic: true, content: '฿/Unit' }}
                                                onChange={(e, { name, value }) => this.props.handleChangeFloatValue({ name, value })}
                                                value={this.props.electricityPerUnit}
                                                error={this.props.electricityPerUnit === ""}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.props.trigger('ownershipModal')} secondary>
                                Back
                            </Button>
                            <Button
                                onClick={() => this.props.addOwnership('ownershipModal')}
                                primary
                                content='Success'
                            />
                        </Modal.Actions>
                    </Alert>
                </Content>
                {this.props.locationChoice && this.props.ownershipChoice && this.props.sizeChoice && this.props.locationChoice.length !== 0 && this.props.ownershipChoice.length !== 0 && this.props.sizeChoice.length !== 0 ?
                    this.showCostRelationWhenFillCompletely() : ''}
            </Container>
        )
    }
}