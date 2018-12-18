import React from 'react';
import {
    Grid,
    Header,
    Icon,
    Container,
    Dropdown,
    Modal,
    Popup,
    Form,
    Button,
    Input,
    Message,
} from 'semantic-ui-react';
import {
    TitleFactor,
    Topic,
    Content,
    Alert,
} from '../../../Provider/CSS/styled';
import { Dropdown_scrollX } from '../../../Provider/CSS/styled';


export default class Competitor extends React.Component {
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
                                        Competitors Setting
                                <Header.Subheader>Define competitors into this scenario</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Dropdown placeholder='Select from previous this scenario'
                                    name='oldCompetitor'
                                    fluid search selection
                                    options={this.props.oldBusinessOption}
                                    onChange={async (e, { name, value }) => await this.props.handleChangeFromPreviousSce(name, value)}
                                    value={this.props.oldCompetitor}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Button negative animated='vertical' size='mini' onClick={() => this.props.handleChangeFromPreviousSce('oldCompetitor')}>
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
                    <Header as='h3'>Competitors Selection</Header>
                </Topic>
                <Content style={{ padding: "5%" }}>
                    <Container fluid>
                        <Header as='h4'>
                            Competitors list
                        <Header.Subheader>can select multiple choices</Header.Subheader>
                        </Header>
                        <Grid>
                            <Grid.Column width={15}>
                                <Dropdown_scrollX
                                    upward
                                    placeholder='Select competitor that you want in this scenario'
                                    fluid multiple search selection
                                    options={this.props.competitorOption}
                                    name='competitorChoice'
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    error={this.props.competitorChoice.length === 0}
                                    value={this.props.competitorChoice}
                                />
                            </Grid.Column>
                            <Grid.Column width={1} verticalAlign="middle">
                                <Popup trigger={<Icon name='add' link onClick={() => this.props.trigger('competitorModal')} />} content='Add choice' />
                            </Grid.Column>
                        </Grid>
                    </Container>
                    <Alert
                        open={this.props.competitorModal}
                    >
                        <Modal.Header>
                            Competitor Setting
                        </Modal.Header>
                        <Modal.Content>
                            <Container fluid>
                                <Form size='tiny'>
                                    <Form.Field width={8}>
                                        <label>Competitor name</label>
                                        <Input
                                            onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                            name='competitorName'
                                            value={this.props.competitorName}
                                            error={this.props.competitorName === ""}
                                            fluid
                                            placeholder='input competitor name'
                                        />
                                    </Form.Field>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Decoration score</label>
                                            <Dropdown placeholder='Score'
                                                compact selection
                                                options={this.props.rangeScoreOption}
                                                name='decorationScore'
                                                value={this.props.decorationScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                error={this.props.decorationScore === ''}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Product variety score</label>
                                            <Dropdown placeholder='Score'
                                                compact selection
                                                options={this.props.rangeScoreOption}
                                                name='productVarietyScore'
                                                value={this.props.productVarietyScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                error={this.props.productVarietyScore === ''}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Product quality score</label>
                                            <Dropdown placeholder='Score'
                                                compact selection
                                                options={this.props.rangeScoreOption}
                                                name='productQualityScore'
                                                value={this.props.productQualityScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                error={this.props.productQualityScore === ''}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Store size score</label>
                                            <Dropdown placeholder='Score'
                                                compact selection
                                                options={this.props.rangeScoreOption}
                                                name='sizeScore'
                                                value={this.props.sizeScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                error={this.props.sizeScore === ''}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Operating time score</label>
                                            <Dropdown placeholder='Score'
                                                compact selection
                                                options={this.props.rangeScoreOption}
                                                name='timeScore'
                                                value={this.props.timeScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                error={this.props.timeScore === ''}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Operating day score</label>
                                            <Dropdown placeholder='Score'
                                                compact selection
                                                options={this.props.rangeScoreOption}
                                                name='dayScore'
                                                value={this.props.dayScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                error={this.props.dayScore === ''}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>No of main employee score</label>
                                            <Dropdown placeholder='Score'
                                                compact selection
                                                options={this.props.rangeScoreOption}
                                                name='numberOfEmployeeScore'
                                                value={this.props.numberOfEmployeeScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                error={this.props.numberOfEmployeeScore === ''}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>No of assistant score</label>
                                            <Dropdown placeholder='Score'
                                                compact selection
                                                options={this.props.rangeScoreOption}
                                                name='numberOfAssistanceScore'
                                                value={this.props.numberOfAssistanceScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                error={this.props.numberOfAssistanceScore === ''}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Promotion variety score</label>
                                            <Dropdown placeholder='Score'
                                                compact selection
                                                options={this.props.rangeScoreOption}
                                                name='marketingVarietyScore'
                                                value={this.props.marketingVarietyScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                error={this.props.marketingVarietyScore === ''}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Promotion frequency score</label>
                                            <Dropdown placeholder='Score'
                                                compact selection
                                                options={this.props.rangeScoreOption}
                                                name='marketingFrequencyScore'
                                                value={this.props.marketingFrequencyScore}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                error={this.props.marketingFrequencyScore === ''}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                                <Message info>You define score each factors of competitor.</Message>
                            </Container>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.props.trigger('competitorModal')}>
                                Back
                            </Button>
                            <Button
                                onClick={() => this.props.addCompetitor('competitorModal')}
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