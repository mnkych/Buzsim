import React from 'react';
import {
    Table,
    Icon,
    Grid,
    Form,
    Header,
    Popup,
    List
} from 'semantic-ui-react'
import { calculateTotolCostOfDecoration, getDecorationByObjectID } from '../../../Provider/DecorationProvider/DecorationProvider'
import { Collapse } from 'reactstrap';
import {
    Content,
    Content_header,
    Content_collapse,
    Table_small_size,
    Radio_small_size,
    Center,
    Sub_desc,
} from '../../../Provider/CSS/styled';

export default class Decoration extends React.Component {
    state = {
        collapseDec: false
    }

    componentWillReceiveProps = async (nextProps) => {
        await this.setState({
            decorationChoices: nextProps.decorationChoices,
        })
    }

    handleDecorate = async (e, data) => {
        await this.props.handleChangeDecoration(data.value)
    }

    openDecTab = () => {
        this.setState({ collapseDec: !this.state.collapseDec })
    }

    render() {
        let decorationLists = []
        if (this.props.decorationChoices !== undefined) {
            decorationLists = this.state.decorationChoices.map((e, index) => {
                let alreadyChoose = getDecorationByObjectID(e, this.props.decorationSelected)
                return (
                    <Table.Row key={index} verticalAlign='middle'>
                        <Table.Cell>
                            <Form>
                                <Form.Field>
                                    <Radio_small_size
                                        key={index + 50}
                                        label={e.DecorationItem}
                                        name={e.DecorationItem}
                                        value={JSON.stringify({ value: e, index: index })}
                                        onChange={this.handleDecorate}
                                        checked={alreadyChoose !== undefined}
                                    />
                                </Form.Field>
                            </Form>
                        </Table.Cell>
                        <Table.Cell>{e.Price.toLocaleString('EN')}</Table.Cell>
                        <Table.Cell>฿</Table.Cell>
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
                                DECORATION
                            </Header>
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Popup
                                trigger={<Icon
                                    color='grey'
                                    name='info'
                                />}
                                content={this.props.businessScenarioData !== undefined ? this.props.businessScenarioData.BusinessDecorationDescription : ""}
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
                                color='purple'
                                name='plug'
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='left' floated='right'>
                            <Header as='h6'>
                                Decoration
                        </Header>
                        </Grid.Column>
                        <Grid.Column/>
                        <Grid.Column floated='right' textAlign='right'>
                            <Icon
                                link
                                name='list ul'
                                color='grey'
                                onClick={this.openDecTab}
                            />
                        </Grid.Column>
                    </Grid>
                </Content>
                <Collapse isOpen={this.state.collapseDec}>
                    {this.state.decorationChoices === undefined ?
                        <Content>
                            <Grid container relaxed padded='vertically'>
                                <Grid.Column>
                                    <Header as='h2' icon textAlign='center'>
                                        <Icon name='announcement' circular />
                                        <Header.Content>
                                            Remind !
                                    <Header.Subheader>
                                                Please select Size and Location factors before !
                                    </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Grid.Column>
                            </Grid>
                        </Content>
                        :
                        <Content_collapse>
                            <Table_small_size singleLine compact='very' color='purple'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Decoration Item</Table.HeaderCell>
                                        <Table.HeaderCell>Price</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {decorationLists}
                                </Table.Body>
                            </Table_small_size>
                        </Content_collapse>
                    }
                </Collapse>
                {this.props.decorationSelected === undefined || this.props.decorationSelected.length === 0 ? ""
                    :
                    <Content>
                        <Center>
                            <List horizontal>
                                <List.Item>
                                    <List.Content>
                                        <List.Description>
                                            <Sub_desc>
                                                <Icon name='tv' />&nbsp;
                                                {this.props.decorationSelected.length === 1 ?
                                                    this.props.decorationSelected.length.toLocaleString('EN') + " piece"
                                                    :
                                                    this.props.decorationSelected.length.toLocaleString('EN') + " pieces"
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
                                                    {this.props.decorationSelected !== undefined ?
                                                    calculateTotolCostOfDecoration(this.props.decorationSelected).toLocaleString('EN')
                                                    :
                                                    0}&nbsp;฿
                                                </Sub_desc>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Center>
                    </Content>
                }
            </div>
        )
    }
}