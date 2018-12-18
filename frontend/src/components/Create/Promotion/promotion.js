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
    Form
} from 'semantic-ui-react';

export default class PromotionCreate extends React.Component {
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
                                    Promotion Setting
                                <Header.Subheader>Define each promotion channel into this scenario</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Dropdown placeholder='Select from previous this scenario'
                                    name='oldPromotion'
                                    fluid search selection
                                    options={this.props.oldBusinessOption}
                                    onChange={async (e, { name, value }) => await this.props.handleChangeFromPreviousSce(name, value)}
                                    value={this.props.oldPromotion}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Button negative animated='vertical' size='mini' onClick={() => this.props.handleChangeFromPreviousSce('oldPromotion')}>
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
                    <Header as='h3'>Promotion Selection</Header>
                </Topic>
                <Content style={{ padding: "5%" }}>
                    <Container fluid>
                        <Header as='h4'>
                            Promotion channel list
                            <Header.Subheader>
                                can select multiple choices
                            </Header.Subheader>
                        </Header>
                        <Grid>
                            <Grid.Column width={15}>
                                <Dropdown placeholder='Select item that you want in this scenario'
                                    name={'marketingChoice'}
                                    fluid multiple search selection
                                    options={this.props.marketingOption}
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    error={this.props.marketingChoice.length === 0}
                                    value={this.props.marketingChoice}
                                />
                            </Grid.Column>
                            <Grid.Column width={1} verticalAlign="middle">
                                <Popup trigger={<Icon name='add' link onClick={() => { this.props.trigger('promotionModal') }} />} content='Add choice' />
                            </Grid.Column>
                        </Grid>
                    </Container>
                    <Alert
                        open={this.props.promotionModal}>
                        <Modal.Header>
                            Promotion Setting
                        </Modal.Header>
                        <Modal.Content>
                            <Container fluid>
                                <Form>
                                    <Form.Group>
                                        <Form.Field width={8}>
                                            <label>Channel</label>
                                            <Input
                                                name='channel'
                                                onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                                value={this.props.channel}
                                                error={this.props.channel === ""}
                                                fluid
                                                placeholder='input channel'
                                                size='mini'
                                            />
                                        </Form.Field>
                                        <Form.Field width={4}>
                                            <label>Price</label>
                                            <Input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                name="pricePerTime"
                                                className="inputBox"
                                                placeholder='numberic and decimal'
                                                labelPosition='right'
                                                label={{ basic: true, content: '%' }}
                                                onChange={(e, { name, value }) => this.props.handleChangeFloatValue({ name, value })}
                                                value={this.props.pricePerTime}
                                                error={this.props.pricePerTime === ""}
                                                size='mini'
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.props.trigger('promotionModal')}>
                                Back
                            </Button>
                            <Button
                                onClick={() =>this.props.addMarketing('promotionModal')} 
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