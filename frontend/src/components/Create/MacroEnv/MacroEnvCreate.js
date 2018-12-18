import React from 'react';
import {
    TitleFactor,
    Topic,
    InputWrap
} from '../../../Provider/CSS/styled';
import {
    Header,
    Icon,
    Grid,
    Input,
    Dropdown,
    TextArea,
    Form,
    Container,
    Popup,
    Button
} from 'semantic-ui-react';

export default class MacroEnvCreate extends React.Component {
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
                                        Macro Economics Setting
                                <Header.Subheader>Manage your preferences</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Dropdown placeholder='Select from previous this scenario'
                                    name='oldMacro'
                                    fluid search selection
                                    options={this.props.oldBusinessOption}
                                    onChange={async (e, { name, value }) => await this.props.handleChangeFromPreviousSce(name, value)}
                                    value={this.props.oldMacro}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Button negative animated='vertical' size='mini' onClick={()=>this.props.handleChangeFromPreviousSce('oldMacro')}>
                                    <Button.Content hidden>Reset</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='erase' />
                                    </Button.Content>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </TitleFactor>
                <InputWrap>
                    <Topic>
                        <Header as='h3'>Scenario Setting</Header>
                    </Topic>
                    <Container style={{ paddingTop: "2%", paddingLeft: "3%", paddingRight: "3%" }}>
                        <Form>
                            <Form.Field>
                                <label>Scenario name</label>
                                <Input
                                    name="scenarioName"
                                    fluid
                                    placeholder='Input name of scenario'
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    value={this.props.scenarioName}
                                    error={this.props.scenarioName === ''}
                                />
                            </Form.Field>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    name="scenarioDescription"
                                    control={TextArea}
                                    label='Scenario Description'
                                    placeholder="Input Scenario description for helping user' s decision"
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    value={this.props.scenarioDescription}
                                    error={this.props.scenarioDescription === ""}
                                />
                                <Form.Field
                                    name="storeOperationDescription"
                                    control={TextArea}
                                    label='Store Operation Description'
                                    placeholder="Input Store operation description for helping user' s decision"
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    value={this.props.storeOperationDescription}
                                    error={this.props.storeOperationDescription === ""}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    name="targetGroupDescription"
                                    control={TextArea}
                                    label='Target Group Description'
                                    placeholder="Input target group description for helping user' s decision"
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    value={this.props.targetGroupDescription}
                                    error={this.props.targetGroupDescription === ""}
                                />
                                <Form.Field
                                    name="decorationDescription"
                                    control={TextArea}
                                    label='Decoration Description'
                                    placeholder="Input decoration description for helping user' s decision"
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    value={this.props.decorationDescription}
                                    error={this.props.decorationDescription === ""}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    name="operatingtimeDescription"
                                    control={TextArea}
                                    label='Operating time Description'
                                    placeholder="Input operating time description for helping user' s decision"
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    value={this.props.operatingtimeDescription}
                                    error={this.props.operatingtimeDescription === ""}
                                />
                                <Form.Field
                                    name="merchandisingDescription"
                                    control={TextArea}
                                    label='Merchandising Description'
                                    placeholder="Input Merchandising description for helping user' s decision"
                                    value={this.props.merchandisingDescription}
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    error={this.props.merchandisingDescription === ""}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    name="humanResourceDescription"
                                    control={TextArea}
                                    label='Human Resource Description'
                                    placeholder="Input human resource description for helping user' s decision"
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    value={this.props.humanResourceDescription}
                                    error={this.props.humanResourceDescription === ""}
                                />
                                <Form.Field
                                    name="marketingDescription"
                                    control={TextArea}
                                    label='Marketing Description'
                                    placeholder="Input marketing description for helping user' s decision"
                                    value={this.props.marketingDescription}
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    error={this.props.marketingDescription === ""}
                                />
                            </Form.Group>
                        </Form>
                    </Container>
                    <Grid container centered style={{ paddingBottom: "3%" }}>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>Year</Header>
                            <Popup
                                trigger={
                                    <Dropdown
                                        name="year"
                                        options={this.props.optionYear}
                                        value={this.props.year}
                                        onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                        placeholder='Number of year'
                                        search
                                        selection
                                        scrolling
                                        error={this.props.year === undefined}
                                    />
                                }
                                content='Number of year for making report'
                                position='top center'
                            />
                        </Grid.Column>
                    </Grid>
                </InputWrap >
                <InputWrap>
                    <Topic>
                        <Header as='h3'>Macro Economics Factor</Header>
                    </Topic>
                    <Container style={{ padding: "2%" }}>
                        <Form>
                            <Form.Group>
                                <Form.Field width={4}>
                                    <label>Start money</label>
                                    <Input
                                        name="startMoney"
                                        placeholder='input only Numberic'
                                        labelPosition='right'
                                        label={{ basic: true, content: '฿' }}
                                        onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                        value={this.props.startMoney}
                                        error={this.props.startMoney === ""}
                                        size='mini'
                                    />
                                </Form.Field>
                                <Form.Field width={4}>
                                    <label>license cost</label>
                                    <Input
                                        name="licenseCost"
                                        placeholder='input only Numberic'
                                        labelPosition='right'
                                        label={{ basic: true, content: '฿' }}
                                        onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                        value={this.props.licenseCost}
                                        error={this.props.licenseCost === ""}
                                        size='mini'
                                    />
                                </Form.Field>
                                <Form.Field width={4}>
                                    <label>Gross demand(%)</label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        name="grossdemand"
                                        className="inputBox"
                                        placeholder='Numberic and Decimal'
                                        labelPosition='right'
                                        label={{ basic: true, content: '%' }}
                                        onChange={(e, { name, value }) => this.props.handleChangeFloatValue({ name, value })}
                                        value={this.props.grossdemand}
                                        error={this.props.grossdemand === ""}
                                        size='mini'
                                    />
                                </Form.Field>
                                <Form.Field width={4}>
                                    <label>Gross grow up rate(%)</label>
                                    <Input
                                        className="inputBox"
                                        type="number"
                                        step="0.1"
                                        name="grossGrowUpRate"
                                        placeholder='Numberic and Decimal'
                                        labelPosition='right'
                                        label={{ basic: true, content: '%' }}
                                        onChange={(e, { name, value }) => this.props.handleChangeFloatValue({ name, value })}
                                        value={this.props.grossGrowUpRate}
                                        error={this.props.grossGrowUpRate === ""}
                                        size='mini'
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group>
                                <Form.Field width={4}>
                                    <label>Loan interest rate(%)</label>
                                    <Input
                                        className="inputBox"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        name="loanInterestRate"
                                        placeholder='Numberic and Decimal'
                                        labelPosition='right'
                                        label={{ basic: true, content: '%' }}
                                        onChange={(e, { name, value }) => this.props.handleChangeFloatValue({ name, value })}
                                        value={this.props.loanInterestRate}
                                        error={this.props.loanInterestRate === ""}
                                        size='mini'
                                    />
                                </Form.Field>
                                <Form.Field width={4}>
                                    <label>Economic event(%)</label>
                                    <Input
                                        className="inputMinusBox"
                                        type="number"
                                        step="0.1"
                                        name="economicEvent"
                                        placeholder='Numberic and Decimal'
                                        labelPosition='right'
                                        label={{ basic: true, content: '%' }}
                                        onChange={(e, { name, value }) => this.props.handleChangeMinusFloatValue({ name, value })}
                                        value={this.props.economicEvent}
                                        error={this.props.economicEvent === ""}
                                        size='mini'
                                    />
                                </Form.Field>
                                <Form.Field width={4}>
                                    <label>Inflation(%)</label>
                                    <Input
                                        className="inputBox"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        name="inflation"
                                        placeholder='Numberic and Decimal'
                                        labelPosition='right'
                                        label={{ basic: true, content: '%' }}
                                        onChange={(e, { name, value }) => this.props.handleChangeFloatValue({ name, value })}
                                        value={this.props.inflation}
                                        error={this.props.inflation === ""}
                                        size='mini'
                                    />
                                </Form.Field>
                                <Form.Field width={4}>
                                    <label>Price growth rate(%)</label>
                                    <Input
                                        className="inputBox"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        name="pricePolicyGrowUpRate"
                                        placeholder='Numberic and Decimal'
                                        labelPosition='right'
                                        label={{ basic: true, content: '%' }}
                                        onChange={(e, { name, value }) => this.props.handleChangeFloatValue({ name, value })}
                                        value={this.props.pricePolicyGrowUpRate}
                                        error={this.props.pricePolicyGrowUpRate === ""}
                                        size='mini'
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Container>
                </InputWrap>
            </Container >
        )
    }
}