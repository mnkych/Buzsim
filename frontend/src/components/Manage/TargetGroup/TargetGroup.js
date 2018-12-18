import React from 'react';
import {
    Collapse,
} from 'reactstrap';
import {
    Form,
    Icon,
    Header,
    Table,
    Grid,
    Popup,
    List
} from 'semantic-ui-react'
import {
    Radio_small_size,
    Content,
    Content_header,
    Content_collapse,
    Sub_desc,
    Table_small_size
} from '../../../Provider/CSS/styled';

export default class TargetGroup extends React.Component {

    state = {
        collapseTar: false
    }
    componentWillReceiveProps = async (nextProps) => {
        await this.setState({
            targetGroupChoices: nextProps.targetGroupChoices
        })
    }

    openTarTab = () => {
        this.setState({
            collapseTar: !this.state.collapseTar,
        });
    }

    handleChangeTargetGroup = async (e, data) => {
        await this.props.handleChangeTargetGroup(data.value)
    }

    render() {
        let targetGroupLists = []
        if (this.state.targetGroupChoices !== undefined) {
            targetGroupLists = this.state.targetGroupChoices.map((data, index) => {
                return (
                    <Table.Row key={index} verticalAlign='middle' textAlign='center'>
                        <Table.Cell textAlign='left'>
                            <Form>
                                <Form.Field>
                                    <Radio_small_size
                                        radio
                                        label={data.TargetGroupName}
                                        name='radio_targetgroup'
                                        value={JSON.stringify(data)}
                                        checked={JSON.stringify(data) === this.props.targetGroupSelected}
                                        onChange={this.handleChangeTargetGroup}
                                    />
                                </Form.Field>
                            </Form>
                        </Table.Cell>
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
                                TARGET GROUP
                            </Header>
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Popup
                                trigger={<Icon
                                    color='grey'
                                    name='info'
                                />}
                                content={this.props.businessScenarioData !== undefined ? this.props.businessScenarioData.BusinessTargetGroupDescription : ""}
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
                                color='pink'
                                name='target'
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='left' floated='right'>
                            <List>
                                <List.Item>
                                    <List.Content>
                                        <List.Header>Target Group</List.Header>
                                        <List.Description>
                                            {this.props.targetGroupSelected === undefined ? ""
                                                :
                                                <Sub_desc> {JSON.parse(this.props.targetGroupSelected).TargetGroupName}</Sub_desc>}
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
                                onClick={this.openTarTab}
                            />
                        </Grid.Column>
                    </Grid>
                </Content>
                <Collapse isOpen={this.state.collapseTar}>
                    <Content_collapse>
                        <Table_small_size singleLine compact='very' color='pink'>
                            <Table.Header>
                                <Table.Row verticalAlign='middle' textAlign='center'>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {targetGroupLists}
                            </Table.Body>
                        </Table_small_size>
                    </Content_collapse>
                </Collapse>
            </div>
        )
    }
}