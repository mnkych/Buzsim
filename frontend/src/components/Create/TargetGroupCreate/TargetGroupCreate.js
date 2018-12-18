import React from 'react';
import {
    TitleFactor,
    InputWrap,
    Topic,
    ChoicesItem
} from '../../../Provider/CSS/styled';
import {
    Header,
    Icon,
    Grid,
    Input,
    Checkbox,
    Statistic,
    Form,
    Message,
    Button,
    Dropdown
} from 'semantic-ui-react';
import { Container } from 'reactstrap';
import { getTargetGroupByID, calculateTotalQuantity } from '../../../Provider/CreateProvider/CreateProvider';

export default class TargetGroupCreate extends React.Component {
    render() {
        let targetGroupOption = []
        if (this.props.targetGroupOption) {
            targetGroupOption = this.props.targetGroupOption.map((element, index) => {
                let alreadyChoose = getTargetGroupByID(element, this.props.targetGroupChoice)
                return (
                    <Form.Group key={'target' + index}>
                        <Form.Field width={4}>
                            <Checkbox label={element.TargetGroupName}
                                id={index + 1}
                                value={element.TargetGroupID}
                                onChange={() => this.props.handleChangeTargetGroupChoice({ ...element, TargetGroupQuantityRatio: '', TargetGroupGrowUpRatio: '' })}
                                checked={alreadyChoose !== undefined}
                            />
                        </Form.Field>
                        <Form.Field width={6}>
                            <Input
                                name='TargetGroupGrowUpRatio'
                                labelPosition='right'
                                label={{ basic: true, content: '%' }}
                                placeholder='numberic and decimal'
                                className="inputMinusBox"
                                type="number"
                                step="0.1"
                                value={alreadyChoose ? alreadyChoose.TargetGroupGrowUpRatio : ''}
                                onChange={(e, { name, value }) => this.props.handleChangeTagetGroupInfo(name, alreadyChoose, value)}
                                disabled={alreadyChoose === undefined}
                                error={alreadyChoose ? alreadyChoose.TargetGroupGrowUpRatio === '' : false}
                            />
                        </Form.Field>
                        <Form.Field width={6}>
                            <Input
                                name='TargetGroupQuantityRatio'
                                labelPosition='right'
                                label={{ basic: true, content: '%' }}
                                placeholder='numberic only'
                                value={alreadyChoose ? alreadyChoose.TargetGroupQuantityRatio : ''}
                                onChange={(e, { name, value }) => this.props.handleChangeTagetGroupInfo(name, alreadyChoose, value)}
                                onBlur={() => this.props.adapOnBlur(alreadyChoose)}
                                disabled={alreadyChoose === undefined}
                                error={alreadyChoose ? alreadyChoose.TargetGroupQuantityRatio === '' : false}
                            />
                        </Form.Field>
                    </Form.Group>
                )
            })
        }
        return (
            <Container>
                <TitleFactor>
                    <Grid columns={2} container>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h1'>
                                    <Icon name='settings' />
                                    <Header.Content>
                                        Target Group Setting
                                <Header.Subheader>Manage your preferences</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Dropdown placeholder='Select from previous this scenario'
                                    name='oldTargetGroup'
                                    fluid search selection
                                    options={this.props.oldBusinessOption}
                                    onChange={async (e, { name, value }) => await this.props.handleChangeFromPreviousSce(name, value)}
                                    value={this.props.oldTargetGroup}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Button negative animated='vertical' size='mini' onClick={() => this.props.handleChangeFromPreviousSce('oldTargetGroup')}>
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
                        <Header as='h3'>
                            Target Group Factor
                        </Header>
                    </Topic>
                    <ChoicesItem>
                        <Header as='h4'>
                            <Header.Content>
                                Target Group Choices
                                <Header.Subheader>
                                    have to select 1 choice but not over 3 choices
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </ChoicesItem>
                    <Container style={{ padding: "5%", paddingTop: "3%", paddingBottom: "3%" }}>
                        <Grid stackable>
                            <Grid.Column width={10}>
                                <Form size='small'>
                                    <Form.Group>
                                        <Form.Field width={4}>
                                            <label>Target Group</label>
                                        </Form.Field>
                                        <Form.Field width={6}>
                                            <label>Grow up rate(%)</label>
                                        </Form.Field>
                                        <Form.Field width={6}>
                                            <label>Quantity of people(%)</label>
                                        </Form.Field>
                                    </Form.Group>
                                    {targetGroupOption}
                                </Form>
                            </Grid.Column>
                            <Grid.Column width={6} textAlign='center'>
                                <Statistic>
                                    <Statistic.Label>Total Quantity</Statistic.Label>
                                    <Statistic.Value>{calculateTotalQuantity(this.props.targetGroupChoice, 'TargetGroupQuantityRatio')} %</Statistic.Value>
                                </Statistic>
                                <Message warning size='tiny'>
                                    Total quantity(%) is not over 100%
                                </Message>
                            </Grid.Column>
                        </Grid>
                    </Container>
                </InputWrap>
            </Container>
        )
    }
}