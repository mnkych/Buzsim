import React from 'react';
import {
    getEmployeeByObjectID,
    getPartEmployeeByObjectID,
    calculateCostPerPerSon,
    isFulltimeObjectPass,
    isParttimeObjectPass,
    isSomeFulltimeEmployeePass,
    isSomeParttimeEmployeePass,
    calculateTotalCost,
    calculateTotalParttimeWagePerMonth,
    calculateAllOfFullTimeTotalCost,
    calculateAllOfPartTimeTotalCost,
    countMainFulltimeEmployeePass,

} from '../../../Provider/HumanResourceProvider/HumanResorceProvider';
import {
    Input,
    Button,
    Grid,
    Card,
    Checkbox,
    Dropdown,
    Header,
    Icon,
    Label,
    Modal,
    List,
    Divider,
    Popup
} from 'semantic-ui-react';
import {
    Content_header,
    Content,
    Alert,
    Center,
    Sub_desc
} from '../../../Provider/CSS/styled';

export default class HumanResource extends React.Component {
    state = {
        humanResourceIsOpen: false
    }
    componentWillReceiveProps = async (nextProps) => {
        await this.setState({
            fullTimeJobChoice: nextProps.fullTimeJobChoice,
            partTimeJobChoice: nextProps.partTimeJobChoice
        })
    }
    openHumanResourceTab = () => {
        this.setState({
            humanResourceIsOpen: !this.state.humanResourceIsOpen
        })
    }
    showFulltimeJobList = () => {
        let fullTimeJobList = []
        if (this.props.fullTimeJobChoice !== undefined) {
            fullTimeJobList = this.state.fullTimeJobChoice.map((e, index) => {
                let alreadyChoose = getEmployeeByObjectID(e, this.props.employeeSelected)
                return (
                    <Grid.Row key={"Choice" + index} columns={2}>
                        <Grid.Column width={5}>
                            <Checkbox
                                key={'A' + index}
                                name={e.Job}
                                value={JSON.stringify(e)}
                                onChange={this.props.handleChangeEmployee}
                                checked={alreadyChoose !== undefined}
                                label={e.Job}
                            />
                            {alreadyChoose !== undefined && alreadyChoose.Status !== "Owner" ?
                                <List>
                                    <List.Item>
                                        <List.Content>
                                            <List.Description>
                                                <Sub_desc>
                                                    {alreadyChoose !== undefined && alreadyChoose.BaseSalaryPerMonth !== null ?
                                                        <span>
                                                            <Label color='green' size='tiny'>
                                                                Base Salary
                                                            </Label>
                                                            &nbsp;&nbsp;&nbsp;{alreadyChoose.BaseSalaryPerMonth.toLocaleString('EN')}&nbsp;฿
                                                        </span>
                                                        :
                                                        ""
                                                    }
                                                </Sub_desc>
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                                :
                                ""
                            }
                        </Grid.Column>
                        <Grid.Column width={11}>
                            {alreadyChoose !== undefined ?
                                <table style={{ width: '100%' }}>
                                    <tr>
                                        {alreadyChoose !== undefined && alreadyChoose.Status === "Owner" ?
                                            <td>
                                                <Label color='green' size='tiny'>
                                                    Base Salary
                                                </Label>
                                                <br />
                                                <Input
                                                    key={'F' + index}
                                                    id={alreadyChoose !== undefined ? alreadyChoose.HumanResourceID : ""}
                                                    size='mini'
                                                    label={{ basic: true, content: '฿' }}
                                                    labelPosition='right'
                                                    disabled={alreadyChoose === undefined}
                                                    onChange={this.props.handleChangeBaseSalaryOfOwner}
                                                    value={alreadyChoose !== undefined && alreadyChoose.BaseSalaryPerMonth !== null ? alreadyChoose.BaseSalaryPerMonth : ""}
                                                />
                                            </td>
                                            :
                                            <td>
                                                <Label color='yellow' size='tiny'>
                                                    Experience
                                                </Label>
                                                <br />
                                                <Header as='h7'>
                                                    <Header.Content>
                                                        <Dropdown
                                                            scrolling
                                                            id={alreadyChoose !== undefined ? alreadyChoose.HumanResourceID : ""}
                                                            key={'B' + index}
                                                            inline
                                                            onChange={this.props.handleChangeEmployeeExp}
                                                            options={this.props.expChoice}
                                                            value={alreadyChoose !== undefined ? alreadyChoose.exp : undefined}
                                                            disabled={alreadyChoose === undefined || (alreadyChoose.Status !== "Main" && alreadyChoose.Status !== "Assistant")}
                                                        />
                                                        {'  '}years
                                                    </Header.Content>
                                                </Header>
                                            </td>
                                        }
                                        <td>
                                            <Label color='blue' size='tiny'>
                                                {alreadyChoose !== undefined && alreadyChoose.Status === "Owner" ?
                                                    "Number of Owner"
                                                    :
                                                    "Number of Employee"
                                                }
                                            </Label>
                                            <br />
                                            <Header as='h7'>
                                                <Header.Content>
                                                    <Dropdown
                                                        scrolling
                                                        id={alreadyChoose !== undefined ? alreadyChoose.HumanResourceID : ""}
                                                        key={'B' + index}
                                                        inline
                                                        onChange={this.props.handleChangeNumberOfEmployee}
                                                        options={this.props.numberChoice}
                                                        value={alreadyChoose !== undefined ? alreadyChoose.numberOfEmployee : undefined}
                                                        error={alreadyChoose.numberOfEmployee === undefined}
                                                    />{'  '}person
                                                </Header.Content>
                                            </Header>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <br />
                                            <List horizontal>
                                                <List.Item>
                                                    <List.Content>
                                                        <List.Description>
                                                            {isFulltimeObjectPass(alreadyChoose) === true && this.props.employeeSelected !== undefined ?
                                                                <div>
                                                                    <Label size='tiny' color='teal'>
                                                                        Net Salary
                                                                    </Label>
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    <Sub_desc>
                                                                        {calculateCostPerPerSon(alreadyChoose, this.props.employeeSelected).toLocaleString('EN')}
                                                                        &nbsp;฿
                                                                    </Sub_desc>
                                                                </div>
                                                                :
                                                                ""
                                                            }
                                                        </List.Description>
                                                    </List.Content>
                                                </List.Item>
                                            </List>
                                        </td>
                                        <td>
                                            <br />
                                            <List horizontal>
                                                <List.Item>
                                                    <List.Content>
                                                        <List.Description>
                                                            {isFulltimeObjectPass(alreadyChoose) === true && this.props.employeeSelected !== undefined ?
                                                                <span>
                                                                    <Label color='red' size='tiny'>
                                                                        Total Cost
                                                                        </Label>
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    <Sub_desc>
                                                                        {calculateTotalCost(alreadyChoose, this.props.employeeSelected).toLocaleString('EN')}
                                                                        &nbsp;฿
                                                                    </Sub_desc>
                                                                </span>
                                                                :
                                                                ""
                                                            }
                                                        </List.Description>
                                                    </List.Content>
                                                </List.Item>
                                            </List>
                                        </td>
                                    </tr>

                                </table>
                                :
                                ""
                            }
                        </Grid.Column>
                    </Grid.Row>
                )
            })

        }
        return fullTimeJobList
    }
    showParttimeJobList = () => {
        let partTimeJobList = []
        if (this.props.partTimeJobChoice !== undefined) {
            partTimeJobList = this.state.partTimeJobChoice.map((e, index) => {
                let alreadyChoose = getPartEmployeeByObjectID(e, this.props.parttimeEmployeeSelected)
                return (
                    <Grid.Row key={"Choice" + index} columns={2}>
                        <Grid.Column width={5} >
                            <Checkbox
                                label={e.Job}
                                key={'A' + index}
                                name={e.Job}
                                value={JSON.stringify(e)}
                                onChange={this.props.handleChangePartEmployee}
                                checked={alreadyChoose !== undefined}
                            />
                        </Grid.Column>
                        {alreadyChoose !== undefined ?
                            <Grid.Column width={11}>
                                <table style={{ width: '100%' }}>
                                    <tr>
                                        <td>
                                            <Label color='yellow' size='tiny'>
                                                Experience
                                            </Label>
                                            <br />
                                            <Header as='h7'>
                                                <Header.Content>
                                                    <Dropdown
                                                        scrolling
                                                        id={alreadyChoose !== undefined ? alreadyChoose.HumanResourceID : ""}
                                                        key={'B' + index}
                                                        inline
                                                        onChange={this.props.handleChangePartEmployeeExp}
                                                        options={this.props.expChoice}
                                                        value={alreadyChoose !== undefined ? alreadyChoose.exp : undefined}
                                                        disabled={alreadyChoose === undefined || (alreadyChoose.Status !== "Main" && alreadyChoose.Status !== "Assistant") || countMainFulltimeEmployeePass(this.props.employeeSelected) > 0}
                                                    />
                                                    {'  '}years
                                                </Header.Content>
                                            </Header>
                                        </td>
                                        <td>
                                            <Label color='blue' size='tiny'>
                                                Number of Employee
                                            </Label>
                                            <br />
                                            <Header as='h7'>
                                                <Header.Content>
                                                    <Dropdown
                                                        scrolling
                                                        id={alreadyChoose !== undefined ? alreadyChoose.HumanResourceID : ""}
                                                        key={'B' + index}
                                                        inline
                                                        onChange={this.props.handleChangeNumberOfParttimeEmployee}
                                                        options={this.props.numberChoice}
                                                        value={alreadyChoose !== undefined ? alreadyChoose.numberOfEmployee : undefined}
                                                        error={alreadyChoose !== undefined && alreadyChoose.numberOfEmployee === undefined}
                                                    />{'  '}person
                                            </Header.Content>
                                            </Header>
                                        </td>
                                    </tr>


                                    <tr>
                                        <td>
                                            <br />
                                            <Label color='orange' size='tiny'>
                                                Working Hours
                                            </Label>
                                            <br />
                                            <Header as='h7'>
                                                <Header.Content>
                                                    <Dropdown
                                                        id={alreadyChoose !== undefined ? alreadyChoose.HumanResourceID : ""}
                                                        key={'C' + index}
                                                        inline
                                                        scrolling
                                                        onChange={this.props.handleWorkHourParttime}
                                                        options={this.props.hourOptions}
                                                        value={alreadyChoose !== undefined ? alreadyChoose.workHourPerDay : undefined}
                                                        disabled={alreadyChoose === undefined}
                                                    />
                                                    {'  '}hours
                                                </Header.Content>
                                            </Header>
                                        </td>
                                        <td>
                                            <br />
                                            <Label color='brown' size='tiny'>
                                                Working Days
                                            </Label>
                                            <br />
                                            <Header as='h7'>
                                                <Header.Content>
                                                    <Dropdown
                                                        id={alreadyChoose !== undefined ? alreadyChoose.HumanResourceID : ""}
                                                        key={'D' + index}
                                                        inline
                                                        scrolling
                                                        onChange={this.props.handleWorkDayParttime}
                                                        options={this.props.dayChoices}
                                                        value={alreadyChoose !== undefined ? alreadyChoose.workDayPerWeek : undefined}
                                                        disabled={alreadyChoose === undefined}
                                                    />
                                                    {'  '}days
                                                </Header.Content>
                                            </Header>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan='2'>
                                            <br />
                                            <List horizontal>
                                                <List.Item>
                                                    <List.Content>
                                                        <List.Description>
                                                            {isParttimeObjectPass(alreadyChoose) === true ?
                                                                <div>
                                                                    <Label size='tiny' color='red'>
                                                                        Total Cost
                                                                    </Label>
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    <Sub_desc>
                                                                        {calculateTotalParttimeWagePerMonth(alreadyChoose).toLocaleString('EN')}
                                                                        &nbsp;฿
                                                                    </Sub_desc>
                                                                </div>
                                                                :
                                                                ""
                                                            }
                                                        </List.Description>
                                                    </List.Content>
                                                </List.Item>
                                            </List>
                                        </td>
                                    </tr>
                                </table>
                            </Grid.Column>
                            :
                            ""
                        }
                    </Grid.Row>

                )
            })
        }
        return partTimeJobList
    }
    showParttimeEmployeeSelectedList = () => {
        let partTimeJobList = []
        if (this.props.parttimeEmployeeSelected !== undefined) {
            partTimeJobList = this.props.parttimeEmployeeSelected.map((e, index) => {
                let check = isParttimeObjectPass(e)
                if (check === true) {
                    return (
                        <Grid.Row key={"Choice" + index} centered columns={6}>
                            <Grid.Column width={1} textAlign={"center"}>
                            </Grid.Column>
                            <Grid.Column width={1} textAlign={"center"}>
                                {e.Job}
                            </Grid.Column>
                            <Grid.Column width={3} textAlign={"center"}>
                                {e.numberOfEmployee.toLocaleString('EN')}
                            </Grid.Column>
                            <Grid.Column width={3} textAlign={"center"}>
                                {e.workHourPerDay}
                            </Grid.Column>
                            <Grid.Column width={3} textAlign={"center"}>
                                {e.workDayPerWeek}
                            </Grid.Column>
                            <Grid.Column textAlign={"center"} width={4}>
                                <Input
                                    key={'Total' + index}
                                    transparent
                                    disabled
                                    label={{ basic: true, content: '฿' }}
                                    labelPosition='right'
                                    value={isParttimeObjectPass(e) === true ?
                                        calculateTotalParttimeWagePerMonth(e) : ""}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    )
                }
            })

        }
        return partTimeJobList
    }
    showSelectedParttimeEmp = () => {
        if (isSomeParttimeEmployeePass(this.props.parttimeEmployeeSelected) === true) {
            return (
                <Card fluid>
                    < Grid >
                        <Grid.Row centered columns={5} >
                            <Grid.Column textAlign={"center"}>
                                Part Job Hire Employee
                                    </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered columns={6}>
                            <Grid.Column width={1} textAlign={"center"}>
                            </Grid.Column>
                            <Grid.Column width={1} textAlign={"center"}>
                                JOB
                                </Grid.Column>
                            <Grid.Column width={3} textAlign={"center"}>
                                Number of Employee
                                </Grid.Column>
                            <Grid.Column width={3} textAlign={"center"}>
                                Work Hour Per Day
                                </Grid.Column>
                            <Grid.Column width={3} textAlign={"center"}>
                                Work Day Per Week
                                </Grid.Column>
                            <Grid.Column width={4} textAlign={"center"}>
                                Total wage / Month
                                </Grid.Column>
                        </Grid.Row>
                        {this.showParttimeEmployeeSelectedList()}
                    </Grid >
                </Card>
            )
        } else {
            return <Grid><Grid.Row centered columns={6}> You are not hire any parttime employee </Grid.Row></Grid>
        }
    }
    render() {
        return (
            <div>
                <Content_header>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column floated='left'>
                            <Header as='h4'>
                                HUMAN RESOURCE
                            </Header>
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Popup
                                trigger={<Icon
                                    color='grey'
                                    name='info'
                                />}
                                content={this.props.businessScenarioData !== undefined ? this.props.businessScenarioData.BusinessEmployeeDescription : ""}
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
                                color='yellow'
                                name='users'
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='left' floated='right'>
                            <Header as='h6'>
                                Human Resource
                            </Header>
                        </Grid.Column>
                        <Grid.Column />
                        <Grid.Column floated='right' textAlign='right'>
                            <Icon
                                link
                                name='list ul'
                                color='grey'
                                onClick={this.openHumanResourceTab}
                            />
                        </Grid.Column>
                    </Grid>
                </Content>
                {isSomeFulltimeEmployeePass(this.props.employeeSelected) !== true ?
                    ""
                    :
                    <Content>
                        <div>
                            <Center>
                                <List horizontal>
                                    <List.Item>
                                        <List.Content>
                                            <List.Description>
                                                <Sub_desc>
                                                    Full-time:&nbsp;&nbsp;
                                                    <Icon name='users' />&nbsp;
                                                    {this.props.employeeSelected.employeeSelected.length.toLocaleString('EN')}
                                                    &nbsp;Type of employee
                                                </Sub_desc>
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Description>
                                                <Sub_desc>
                                                    <Icon name='dollar' />
                                                    Total Cost&nbsp;
                                                    {isSomeFulltimeEmployeePass(this.props.employeeSelected) === true ? calculateAllOfFullTimeTotalCost(this.props.employeeSelected).toLocaleString('EN') : ""}
                                                    &nbsp;฿
                                                </Sub_desc>
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Center>
                        </div>
                    </Content>
                }
                {isSomeParttimeEmployeePass(this.props.parttimeEmployeeSelected) !== true ?
                    ""
                    :
                    <Content>
                        <div>
                            <Center>
                                <List horizontal>
                                    <List.Item>
                                        <List.Content>
                                            <List.Description>
                                                <Sub_desc>
                                                    Part-time:&nbsp;&nbsp;
                                                    <Icon name='users' />&nbsp;
                                                    {this.props.parttimeEmployeeSelected.length}
                                                    &nbsp;Type of employee
                                                </Sub_desc>
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content>
                                            <List.Description>
                                                <Sub_desc>
                                                    <Icon name='dollar' />
                                                    Total Cost&nbsp;
                                                    {isSomeParttimeEmployeePass(this.props.parttimeEmployeeSelected) === true ? calculateAllOfPartTimeTotalCost(this.props.parttimeEmployeeSelected).toLocaleString('EN') : ""}
                                                    &nbsp;฿
                                                </Sub_desc>
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Center>
                        </div>
                    </Content >
                }
                <Alert
                    open={this.state.humanResourceIsOpen}
                    size='fullscreen'>
                    <Modal.Header>
                        <Icon name='setting' />
                        Setting Human Resource
                    </Modal.Header>
                    <Modal.Content scrolling>
                        <Grid centered columns={2}>
                            <Grid.Column>
                                <Header as='h3' textAlign='center'>
                                    Full-time
                                    <Header.Subheader>
                                        Description
                                    </Header.Subheader>
                                </Header>
                                <Grid container divided='vertically'>
                                    {this.showFulltimeJobList()}
                                    <Grid.Row columns={2} textAlign='center'>
                                        <Grid.Column>
                                            <Label color='teal' size='tiny'>
                                                Allowance
                                            </Label>
                                            <Dropdown
                                                scrolling
                                                upward
                                                inline
                                                onChange={this.props.handleChangeEmployeeAllowance}
                                                options={this.props.allowlanceChoice}
                                                value={this.props.employeeSelected !== undefined ? this.props.employeeSelected.allowance : 0}
                                                disabled={this.props.employeeSelected === undefined || this.props.employeeSelected.employeeSelected === undefined || this.props.employeeSelected.employeeSelected.length === 0}
                                            />{' '}%
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Label color='teal' size='tiny'>
                                                Bonus
                                            </Label>
                                            <Dropdown
                                                scrolling
                                                upward
                                                inline
                                                onChange={this.props.handleChangeEmployeeBonus}
                                                options={this.props.bonusChoice}
                                                value={this.props.employeeSelected !== undefined ? this.props.employeeSelected.bonus : 0}
                                                disabled={this.props.employeeSelected === undefined || this.props.employeeSelected.employeeSelected === undefined || this.props.employeeSelected.employeeSelected.length === 0}
                                            />{' '}month
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Divider vertical>OR</Divider>
                            <Grid.Column>
                                <Header as='h3' textAlign='center'>
                                    Part-time
                                    <Header.Subheader>
                                        Description
                                    </Header.Subheader>
                                </Header>
                                <Grid container divided='vertically'>
                                    {this.showParttimeJobList()}
                                </Grid>
                            </Grid.Column>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.openHumanResourceTab}
                            positive icon='checkmark'
                            labelPosition='right'
                            content='Done' />
                    </Modal.Actions>
                </Alert>
            </div>
        )
    }
}