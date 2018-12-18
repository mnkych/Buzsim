import React from 'react';
import { Collapse } from 'reactstrap';
import {
    Input,
    Grid,
    Checkbox,
    Label,
    Icon,
    Header,
    List,
    Popup,
    Form,
    Divider
} from 'semantic-ui-react';
import {
    getMarketingByObjectID,
    calculateTotalCostOfMarketing,
    calculateAllCostOfMarketing,
    isSomeMarketingPass
} from '../../../Provider/MarketingProvider/MarketingProvider';
import {
    Content,
    Content_header,
    Center,
    Sub_desc
} from '../../../Provider/CSS/styled';


export default class Marketing extends React.Component {

    state = {
        collapseMarketing: false,
    }
    componentWillReceiveProps = async (nextProps) => {
        await this.setState({
            marketingChoice: nextProps.marketingChoice
        })
    }

    openMarketingTab = () => {
        this.setState({
            collapseMarketing: !this.state.collapseMarketing
        });
    }

    showPromotionList = () => {
        let marketList = []
        if (this.props.marketingChoice !== undefined) {
            marketList = this.state.marketingChoice.map((e, index) => {
                let alreadyChoose = getMarketingByObjectID(e, this.props.marketingSelected)
                return (
                    <Form key={"Choice" + index} size='tiny'>
                        <Form.Field>
                            <Checkbox
                                key={'A' + index}
                                name={e.Channel}
                                value={JSON.stringify(e)}
                                onChange={this.props.handleChangeMarketing}
                                checked={alreadyChoose !== undefined}
                                label={e.Channel}
                            />
                        </Form.Field>
                        {alreadyChoose !== undefined ?
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Frequency</label>
                                        <Input
                                            key={'Frequency' + index}
                                            id={alreadyChoose !== undefined ? alreadyChoose.marketingDetail.MarketingID : ""}
                                            size='mini'
                                            label={{ basic: true, content: 'times' }}
                                            labelPosition='right'
                                            disabled={alreadyChoose === undefined}
                                            onChange={this.props.handleChangeMarketingFrequency}
                                            value={alreadyChoose !== undefined ? alreadyChoose.frequency || "" : ""}
                                            error={alreadyChoose !== undefined && alreadyChoose.frequency !== undefined ? alreadyChoose.frequency === "" || alreadyChoose.frequency === 0 : false}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Viewer</label>
                                        <Input
                                            key={'Viewer' + index}
                                            id={alreadyChoose !== undefined ? alreadyChoose.marketingDetail.MarketingID : ""}
                                            size='mini'
                                            label={{ basic: true, content: 'views.' }}
                                            labelPosition='right'
                                            disabled={alreadyChoose === undefined}
                                            onChange={this.props.handleChangeMarketingViewer}
                                            value={alreadyChoose !== undefined ? alreadyChoose.viewer || "" : ""}
                                            error={alreadyChoose !== undefined && alreadyChoose.viewer !== undefined ? alreadyChoose.viewer === "" || alreadyChoose.viewer === 0 : false}
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <Label color='orange' size='tiny'>&nbsp;Price/Viewer</Label>&nbsp;
                                        {e.PricePerTime.toLocaleString('EN')}
                                    </Form.Field>
                                    <Form.Field>
                                        <Label color='red' size='tiny'>&nbsp;Total Cost</Label>&nbsp;
                                        {alreadyChoose !== undefined && alreadyChoose.viewer !== undefined && alreadyChoose.frequency !== undefined ?
                                            calculateTotalCostOfMarketing(alreadyChoose.marketingDetail.PricePerTime, alreadyChoose.frequency, alreadyChoose.viewer).toLocaleString('EN')
                                            :
                                            " - "}
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                            :
                            ""
                        }
                        <Divider />
                    </Form>
                )
            })
        }
        return marketList
    }

    showMarketingSelected = () => {
        let marketSelectedList = [];
        if (this.props.marketingSelected !== undefined && this.props.marketingSelected.length !== 0) {
            marketSelectedList = this.props.marketingSelected.map((e, index) => {
                if (e.marketingDetail !== undefined && e.frequency !== "" && e.viewer !== "" && e.frequency !== 0 && e.viewer !== 0) {
                    return (
                        <Grid.Row centered columns={6} key={"Show" + index}>
                            <Grid.Column>
                                {index + 1}
                            </Grid.Column>
                            <Grid.Column>
                                {e.marketingDetail.Channel}
                            </Grid.Column>
                            <Grid.Column>
                                {e.frequency.toLocaleString('EN')}
                            </Grid.Column>
                            <Grid.Column>
                                {e.viewer.toLocaleString('EN')}
                            </Grid.Column>
                            <Grid.Column>
                                {e.marketingDetail.PricePerTime.toLocaleString('EN')}
                            </Grid.Column>
                            <Grid.Column>
                                {calculateTotalCostOfMarketing(e.marketingDetail.PricePerTime, e.frequency, e.viewer).toLocaleString('EN')}
                            </Grid.Column>
                        </Grid.Row>
                    )
                }
            })
        }
        return marketSelectedList;
    }

    render() {
        return (
            <div>
                <Content_header>
                    <Grid verticalAlign='middle' columns={2}>
                        <Grid.Column floated='left'>
                            <Header as='h4'>
                                PROMOTION
                            </Header>
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Popup
                                trigger={<Icon
                                    color='grey'
                                    name='info'
                                />}
                                content={this.props.businessScenarioData !== undefined ? this.props.businessScenarioData.BusinessPromotionDescription : ""}
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
                                color='violet'
                                name='announcement'
                            />
                        </Grid.Column>
                        <Grid.Column textAlign='left' floated='right'>
                            <Header as='h6'>
                                Promotion
                            </Header>
                        </Grid.Column>
                        <Grid.Column />
                        <Grid.Column floated='right' textAlign='right'>
                            <Icon
                                link
                                name='list ul'
                                color='grey'
                                onClick={this.openMarketingTab}
                            />
                        </Grid.Column>
                    </Grid>
                </Content>
                {isSomeMarketingPass(this.props.marketingSelected) === true ?
                    <Content>
                        <Center>
                            <List horizontal>
                                <List.Item>
                                    <List.Content>
                                        <List.Description>
                                            <Sub_desc>
                                                <Icon name='announcement' />&nbsp;
                                                    {this.props.marketingSelected.length.toLocaleString('EN')}&nbsp;kinds of promotion
                                                </Sub_desc>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <List.Description>
                                            <Sub_desc>
                                                <Icon name='dollar' />
                                                Total cost / Year &nbsp;
                                                    {calculateAllCostOfMarketing(this.props.marketingSelected).toLocaleString('EN')}
                                                &nbsp;฿
                                                </Sub_desc>
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Center>
                    </Content>
                    :
                    ""
                }
                <Collapse isOpen={this.state.collapseMarketing}>
                    <Content>
                        {this.showPromotionList()}
                    </Content>
                </Collapse>
            </div>
        )
    }
}