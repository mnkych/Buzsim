import React from 'react';

import {
    Collapse,
} from 'reactstrap';
import {
    Form,
    Icon,
    Header,
    Grid,
    Popup,
    Table,
    List
} from 'semantic-ui-react'
import {
    Center,
    Content,
    Content_header,
    Content_collapse,
    Table_small_size,
    Radio_small_size,
    Sub_desc,
} from '../../../Provider/CSS/styled';

export default class SetupStore extends React.Component {
    state = {
        collapseSize: false,
        collapseLoc: false,
        collapseOwn: false,
    }

    componentWillReceiveProps = async (nextProps) => {
        await this.setState({
            locationChoices: nextProps.locationChoices,
            sizeChoices: nextProps.sizeChoices,
            ownershipChoices: nextProps.ownershipChoices,
        })
    }

    openSizeTab = () => {
        this.setState({
            collapseSize: !this.state.collapseSize,
        });
    }

    openLocationTab = () => {
        this.setState({
            collapseLoc: !this.state.collapseLoc,
        });
    }

    openOwnershipTab = () => {
        this.setState({
            collapseOwn: !this.state.collapseOwn
        });
    }

    render() {
        let locationLists = []
        let sizeLists = []
        let ownershipLists = []
        if (this.state.locationChoices !== undefined) {
            locationLists = this.state.locationChoices.map((data, index) => {
                return (
                    <Table.Row key={index} verticalAlign='middle' textAlign='center'>
                        <Table.Cell textAlign='left'>
                            <Form>
                                <Form.Field>
                                    <Radio_small_size
                                        radio
                                        label={data.LocationName}
                                        name='radio_location'
                                        value={JSON.stringify(data)}
                                        checked={JSON.stringify(data) === this.props.locationSelected}
                                        onChange={async (e, data) => await this.props.handleChangeLocation(data.value)}
                                    />
                                </Form.Field>
                            </Form>
                        </Table.Cell>
                        <Table.Cell>{data.TotalPopulation.toLocaleString('EN')} </Table.Cell>
                        <Table.Cell>{data.TotalPopulationGrowUpRate.toLocaleString('EN')} %</Table.Cell>
                    </Table.Row>
                )
            })
        }
        if (this.state.sizeChoices !== undefined) {
            sizeLists = this.state.sizeChoices.map((data, index) => {
                return (
                    <Table.Row key={index} verticalAlign='middle' textAlign='center'>
                        <Table.Cell textAlign='left'>
                            <Form>
                                <Form.Field>
                                    <Radio_small_size
                                        radio
                                        label={data.Size}
                                        name='radio_size'
                                        value={JSON.stringify(data)}
                                        checked={JSON.stringify(data) === this.props.sizeSelected}
                                        onChange={async (e, data) => await this.props.handleChangeSize(data.value)}
                                    />
                                </Form.Field>
                            </Form>
                        </Table.Cell>
                        <Table.Cell>{data.Storage.toLocaleString('EN')}</Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                )
            })
        }
        if (this.state.ownershipChoices !== undefined) {
            ownershipLists = this.state.ownershipChoices.map((data, index) => {
                return (
                    <Table.Row key={index} verticalAlign='middle' textAlign='center'>
                        <Table.Cell textAlign='left'>
                            <Form>
                                <Form.Field>
                                    <Radio_small_size
                                        radio
                                        label={data.OwnershipName}
                                        name='radio_ownership'
                                        value={JSON.stringify(data)}
                                        checked={JSON.stringify(data) === this.props.ownershipSelected}
                                        onChange={async (e, data) => await this.props.handleChangeOwnership(data.value)}
                                    />
                                </Form.Field>
                            </Form>
                        </Table.Cell>
                        <Table.Cell>{data.OwnerBaseElectricityPerUnit.toLocaleString('EN')} ฿</Table.Cell>
                        <Table.Cell>{data.MaintainCost.toLocaleString('EN')} %</Table.Cell>
                        <Table.Cell>{data.OtherCost.toLocaleString('EN')} %</Table.Cell>
                    </Table.Row>
                )
            })
        }

        return (
            <div>
                <Content_header>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column floated='left'>
                            <Header as='h4'>
                                STORE SETUP
                            </Header>
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Popup
                                trigger={<Icon
                                    color='grey'
                                    name='info'
                                />}
                                content={this.props.businessScenarioData !== undefined ? this.props.businessScenarioData.BusinessStoreOperationDescription : ""}
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
                                color='red'
                                name='map marker alternate'
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='left' floated='right'>
                            <List>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Location</List.Header>
                                        <List.Description>
                                            {this.props.locationSelected === undefined ? ""
                                                :
                                                <Sub_desc> {JSON.parse(this.props.locationSelected).LocationName}</Sub_desc>}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column/>
                        <Grid.Column floated='right' textAlign='right'>
                            <Icon
                                link
                                name='list ul'
                                color='grey'
                                onClick={this.openLocationTab}
                            />
                        </Grid.Column>
                    </Grid>
                </Content>
                <Collapse isOpen={this.state.collapseLoc}>
                    <Content_collapse>
                        <Table_small_size singleLine compact='very' color='red'>
                            <Table.Header>
                                <Table.Row verticalAlign='middle' textAlign='center'>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Total Population</Table.HeaderCell>
                                    <Table.HeaderCell>Population Grow Up Rate</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {locationLists}
                            </Table.Body>
                        </Table_small_size>
                    </Content_collapse>
                </Collapse>

                <Content>
                    <Grid verticalAlign='middle' columns={5}>
                        <Grid.Column textAlign='right'>
                            <Icon
                                circular
                                inverted
                                color='blue'
                                name='building'
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='left' floated='right'>
                            <List>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Size</List.Header>
                                        <List.Description>
                                            {this.props.sizeSelected === undefined ? ""
                                                :
                                                <Sub_desc>{JSON.parse(this.props.sizeSelected).Size}</Sub_desc>}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column />
                        <Grid.Column floated='right' textAlign='right'>
                            <Icon
                                link
                                name='list ul'
                                color='grey'
                                onClick={this.openSizeTab}
                            />
                        </Grid.Column>
                    </Grid>
                </Content>
                <Collapse isOpen={this.state.collapseSize}>
                    <Content_collapse>
                        <Table_small_size singleLine compact='very' color='blue'>
                            <Table.Header>
                                <Table.Row verticalAlign='middle' textAlign='center'>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Shelf Capacity</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {sizeLists}
                            </Table.Body>
                        </Table_small_size>
                    </Content_collapse>
                </Collapse>

                <Content>
                    <Grid verticalAlign='middle' columns={5}>
                        <Grid.Column textAlign='right'>
                            <Icon
                                circular
                                inverted
                                color='green'
                                name='user'
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='left' floated='right'>
                            <List>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Ownership</List.Header>
                                        <List.Description>
                                            {this.props.ownershipSelected === undefined ? ""
                                                :
                                                <Sub_desc>{JSON.parse(this.props.ownershipSelected).OwnershipName}</Sub_desc>}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column />
                        <Grid.Column floated='right' textAlign='right'>
                            <Icon
                                link
                                name='list ul'
                                color='grey'
                                onClick={this.openOwnershipTab}
                            />
                        </Grid.Column>
                    </Grid>
                </Content>
                <Collapse isOpen={this.state.collapseOwn}>
                    <Content_collapse>
                        <Table_small_size singleLine compact='very' color='green'>
                            <Table.Header>
                                <Table.Row verticalAlign='middle' textAlign='center'>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Eleccity Cost / Unit</Table.HeaderCell>
                                    <Table.HeaderCell>Maintain Cost</Table.HeaderCell>
                                    <Table.HeaderCell>Other Cost</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {ownershipLists}
                            </Table.Body>
                        </Table_small_size>
                    </Content_collapse>
                </Collapse>
                {(this.props.sizeSelected !== undefined && this.props.locationSelected !== undefined && this.props.ownershipSelected !== undefined) && this.props.businessScenarioData.BLSORID !== undefined ?
                    <Content>
                        <Center>
                            {this.props.businessScenarioData.OwnershipName === "Buy" ?
                                <List horizontal>
                                    <List.Item>
                                        <List.Content>
                                            <List.Description>
                                                <Sub_desc>
                                                    <Icon name='dollar' />
                                                    Land Cost &nbsp;
                                                    {this.props.businessScenarioData.PrivillageCost.toLocaleString('EN')}
                                                    &nbsp;฿
                                                </Sub_desc>
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                                :
                                <div>
                                    {this.props.businessScenarioData.OwnershipName === "Lease" ?
                                        <List horizontal>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Description>
                                                        <Sub_desc>
                                                            <Icon name='dollar' />
                                                            Land Cost &nbsp;
                                                        {this.props.businessScenarioData.PrivillageCost.toLocaleString('EN')}
                                                            &nbsp;฿
                                                </Sub_desc>
                                                    </List.Description>
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Description>
                                                        <Sub_desc>
                                                            <Icon name='dollar' />
                                                            Rental Cost &nbsp;
                                                        {this.props.businessScenarioData.RentalCost.toLocaleString('EN')}
                                                            &nbsp;฿
                                                </Sub_desc>
                                                    </List.Description>
                                                </List.Content>
                                            </List.Item>
                                        </List>
                                        :
                                        <List horizontal>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Description>
                                                        <Sub_desc>
                                                            <Icon name='dollar' />
                                                            Rental Cost &nbsp;
                                                        {this.props.businessScenarioData.RentalCost.toLocaleString('EN')}
                                                            &nbsp;฿
                                                </Sub_desc>
                                                    </List.Description>
                                                </List.Content>
                                            </List.Item>
                                        </List>
                                    }
                                </div>
                            }
                        </Center>
                    </Content>
                    :
                    ""
                }
            </div >
        )
    }
}