import React from 'react';
import {
    TitleFactor,
    Topic,
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
    Checkbox,
} from 'semantic-ui-react';
import { Dropdown_scrollX } from "../../../Provider/CSS/styled";

export default class HumanResource extends React.Component {
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
                                        Human Resource Setting
                                <Header.Subheader>Define main employee and assistant into this scenario</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Dropdown placeholder='Select from previous this scenario'
                                    name='oldHuman'
                                    fluid search selection
                                    options={this.props.oldBusinessOption}
                                    onChange={async (e, { name, value }) => await this.props.handleChangeFromPreviousSce(name, value)}
                                    value={this.props.oldHuman}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Button negative animated='vertical' size='mini' onClick={() => this.props.handleChangeFromPreviousSce('oldHuman')}>
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
                    <Header as='h3'>Human Resource Selection</Header>
                </Topic>
                <Content style={{ padding: "5%" }}>
                    <Container fluid>
                        <Header as='h4'>
                            Full-time employees list
                            <Header.Subheader>
                                can select multiple choices
                            </Header.Subheader>
                        </Header>
                        <Dropdown_scrollX
                            placeholder='Select full-time employees that you want in this scenario'
                            fluid multiple search selection
                            options={this.props.fulltimeOption}
                            name='fulltimeChoice'
                            onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                            error={this.props.fulltimeChoice.length === 0}
                            value={this.props.fulltimeChoice}
                        />
                        <Header as='h4'>
                            Part-time employees list
                            <Header.Subheader>
                                can select multiple choices
                            </Header.Subheader>
                        </Header>
                        <Dropdown_scrollX
                            placeholder='Select part-time employees that you want in this scenario'
                            fluid multiple search selection
                            options={this.props.parttimeOption}
                            name='parttimeChoice'
                            onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                            error={this.props.parttimeChoice.length === 0}
                            value={this.props.parttimeChoice}
                        />
                        <br />
                        <Popup trigger={<Button icon='add' floated='right' onClick={() => this.props.trigger('humanresourceModal')} />} content='Add choice' />
                    </Container>
                    <Alert
                        size='small'
                        open={this.props.humanresourceModal}>
                        <Modal.Header>
                            Employee Addition
                        </Modal.Header>
                        <Modal.Content>
                            <Container fluid>
                                <Form size='small'>
                                    <Form.Field width={8}>
                                        <label>Career</label>
                                        <Input
                                            name='job'
                                            onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                            value={this.props.job}
                                            error={this.props.job === ""}
                                            fluid
                                            placeholder='input career'
                                        />
                                    </Form.Field>
                                    <Form.Group>
                                        <Form.Field width={6}>
                                            <label>Position</label>
                                            <Dropdown
                                                name="status"
                                                options={this.props.optionStatus}
                                                value={this.props.status}
                                                onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                                placeholder='Select position'
                                                error={this.props.status === ""}
                                                selection
                                                scrolling
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group inline>
                                        <Form.Field width={3}>
                                            <Checkbox
                                                radio
                                                label='Full-time'
                                                name='jobType'
                                                onChange={(e, { name, value }) => {
                                                    value = true
                                                    this.props.handleChangeDescription({ name, value })
                                                }}
                                                checked={this.props.jobType === true}
                                            />
                                        </Form.Field>
                                        <Form.Field width={6}>
                                            <Input
                                                name='baseSalaryPerMonth'
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                value={this.props.status === 'Owner' ? 0 : this.props.baseSalaryPerMonth}
                                                error={this.props.baseSalaryPerMonth === ""}
                                                labelPosition='right'
                                                label={{ basic: true, content: '฿/Month' }}
                                                placeholder='Salary'
                                                disabled={!this.props.jobType || this.props.status === 'Owner'}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group inline>
                                        <Form.Field width={3}>
                                            <Checkbox
                                                radio
                                                label='Part-time'
                                                name='jobType'
                                                onChange={(e, { name, value }) => {
                                                    value = false
                                                    this.props.handleChangeDescription({ name, value })
                                                }}
                                                checked={this.props.jobType === false}
                                            />
                                        </Form.Field>
                                        <Form.Field width={6}>
                                            <Input
                                                name='basePayPerHour'
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                value={this.props.basePayPerHour}
                                                error={this.props.basePayPerHour === ""}
                                                labelPosition='right'
                                                label={{ basic: true, content: '฿/Hour' }}
                                                placeholder='Wages'
                                                disabled={this.props.jobType === '' || this.props.jobType === true}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Field width={6}>
                                            <label>Grow up rate of pay</label>
                                            <Input
                                                name='baseSalaryGrowUpRate'
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                value={this.props.baseSalaryGrowUpRate}
                                                error={this.props.baseSalaryGrowUpRate === ""}
                                                labelPosition='right'
                                                label={{ basic: true, content: '%' }}
                                                placeholder='numberic'
                                            />
                                        </Form.Field>
                                        <Form.Field width={6}>
                                            <label>Experience pay(monthly)</label>
                                            <Input
                                                name='additionPayPerExp'
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                value={this.props.additionPayPerExp}
                                                error={this.props.additionPayPerExp === ""}
                                                labelPosition='right'
                                                label={{ basic: true, content: '฿' }}
                                                placeholder='numberic only'
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.props.trigger('humanresourceModal')}>
                                Back
                            </Button>
                            <Button
                                onClick={() => this.props.addHumanResource('humanresourceModal')}
                                primary
                                icon='add'
                                content='Add'
                            />
                        </Modal.Actions>
                    </Alert>
                </Content >
            </Container >
        )
    }
}