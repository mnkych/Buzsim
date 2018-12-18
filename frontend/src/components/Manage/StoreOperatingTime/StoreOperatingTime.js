import React from 'react';
import {
    Collapse,
} from 'reactstrap';
import {
    Dropdown,
    Icon,
    Header,
    Table,
    Grid,
    Checkbox,
    List,
    Popup
} from 'semantic-ui-react'
import {
    Center,
    Table_small_size,
    Content,
    Content_header,
    Content_collapse,
    Sub_desc,
} from '../../../Provider/CSS/styled';

export default class StoreOperatingTime extends React.Component {

    state = {
        collapseOperate: false,
        timeSettingStatus: false
    }

    openOperateTab = () => {
        this.setState({
            collapseOperate: !this.state.collapseOperate,
        });
    }

    handleChangeDay = async (e, data) => {
        await this.props.handleChangeDay(data.value)
    }

    handleChangeTimeOpen = async (e, data) => {
        await this.props.handleChangeTimeOpen(data.value)
    }

    handleChangeTimeClose = async (e, data) => {
        await this.props.handleChangeTimeClose(data.value)
    }

    handleChange24Hr = async (e, data) => {
        if (this.props.totalTimeSelected === 24) {
            await this.props.handleChangeTimeClose(undefined)
            await this.props.handleChangeTimeOpen(undefined)
        }else{
            await this.props.handleChange24Hr(24)
        }
    }

    render() {
        return (
            <div>
                <Content_header>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column floated='left'>
                            <Header as='h4'>
                                OPERATING TIME
                            </Header>
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                        <Popup
                                trigger={<Icon
                                    color='grey'
                                    name='info'
                                />}
                                content={this.props.businessScenarioData !== undefined ? this.props.businessScenarioData.BusinessOperatingTimeDescription : ""}
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
                                color='orange'
                                name='clock'
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='left' floated='right'>
                            <List>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Time</List.Header>
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
                                onClick={this.openOperateTab}
                            />
                        </Grid.Column>
                    </Grid>
                   
                </Content>
                {this.props.daySelected !== undefined ||
                    this.props.openTimeSelected !== undefined ||
                    this.props.closeTimeSelected !== undefined ? 
                    <Content>
                        <Center>
                            <List horizontal>
                                <List.Item>
                                    <List.Content>
                                        <List.Description>
                                            {this.props.daySelected === undefined ? ""
                                                :
                                                <Sub_desc>
                                                    <Icon name='calendar alternate outline' />
                                                    {this.props.daySelected} d/week
                                                </Sub_desc>}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Description>
                                            <Sub_desc>
                                            {this.props.openTimeSelected === undefined && this.props.closeTimeSelected === undefined ? "" : <Icon name='clock' /> }    
                                            {this.props.openTimeSelected === undefined ? "" :
                                                    JSON.parse(this.props.openTimeSelected).view}
                                                    {this.props.closeTimeSelected !== undefined || this.props.openTimeSelected !== undefined ? <span>&nbsp;-&nbsp;</span> : ""}
                                                    {this.props.closeTimeSelected === undefined ? ""
                                                    :
                                                    JSON.parse(this.props.closeTimeSelected).view}
                                            </Sub_desc>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Center>
                    </Content> 
                    :
                    ""}
                    
                 
                <Collapse isOpen={this.state.collapseOperate}>
                    <Content_collapse >
                        <Table_small_size singleLine compact='very' color='orange'>
                            <Table.Header>
                                <Table.Row verticalAlign='middle' textAlign='center'>
                                    <Table.HeaderCell>
                                        <Dropdown 
                                            upward
                                            scrolling
                                            options={this.props.dayChoices}
                                            onChange={this.handleChangeDay}
                                            text='Day' 
                                            icon='calendar 
                                            alternate outline' 
                                            floating labeled button className='icon'
                                        />
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Dropdown
                                            upward 
                                            scrolling
                                            options={this.props.openTimeChoices}
                                            onChange={this.handleChangeTimeOpen}
                                            value={this.props.openTimeSelected === undefined ? "" : this.props.openTimeSelected}
                                            disabled={this.props.totalTimeSelected === 24} 
                                            text='Open time' 
                                            icon='clock' 
                                            floating labeled button className='icon'
                                        />
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Dropdown
                                            upward
                                            scrolling
                                            options={this.props.closeTimeChoices}
                                            onChange={this.handleChangeTimeClose}
                                            value={this.props.closeTimeSelected === undefined ? "" : this.props.closeTimeSelected}
                                            disabled={this.props.totalTimeSelected === 24}
                                            text='Close time'
                                            icon='clock'
                                            floating labeled button className='icon'
                                        />
                                    </Table.HeaderCell>
                                </Table.Row>
                                <Table.Row textAlign='center'>
                                    <Table.HeaderCell colSpan='3'>
                                        <Checkbox
                                            checked={this.props.totalTimeSelected === 24}
                                            toggle
                                            onChange={this.handleChange24Hr}
                                            label='Do you need to open 24 hours?(All of day)'
                                        />
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table_small_size>
                    </Content_collapse>
                </Collapse>
            </div>
        )
    }
}