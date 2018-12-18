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
import ProductQuality from './ProductQuality';
import ProductTargetgroup from './ProductTargetgroup';

export default class ProductCreate extends React.Component {
    render() {
        return (
            <Container fluid>
                <TitleFactor>
                    <Grid columns={2} container>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h1'>
                                    <Icon name='settings' />
                                    <Header.Content>
                                        Merchandising Setting
                                <Header.Subheader>Define product and quality into this scenario</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Dropdown placeholder='Select from previous this scenario'
                                    name='oldProduct'
                                    fluid search selection
                                    options={this.props.oldBusinessOption}
                                    onChange={async (e, { name, value }) => await this.props.handleChangeFromPreviousSce(name, value)}
                                    value={this.props.oldProduct}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Button negative animated='vertical' size='mini' onClick={() => this.props.handleChangeFromPreviousSce('oldProduct')}>
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
                    <Header as='h3'>Merchandising Selection</Header>
                </Topic>
                <Content style={{ padding: "5%" }}>
                    <Container fluid>
                        <Header as='h4'>
                            Product list
                            <Header.Subheader>
                                can select multiple choices
                            </Header.Subheader>
                        </Header>
                        <Grid>
                            <Grid.Column width={15}>
                                <Dropdown placeholder='Select product that you want in this scenario'
                                    name={'productChoice'}
                                    fluid multiple search selection
                                    options={this.props.productOption}
                                    onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                    error={this.props.productChoice.length === 0}
                                    value={this.props.productChoice}
                                />
                            </Grid.Column>
                            <Grid.Column width={1} verticalAlign="middle">
                                <Popup trigger={<Icon name='add' link onClick={() => { this.props.trigger('productModal') }} />} content='Add choice' />
                            </Grid.Column>
                        </Grid>
                    </Container>
                    <Alert
                        open={this.props.productModal}>
                        <Modal.Header>
                            Merchandising Setting
                        </Modal.Header>
                        <Modal.Content>
                            <Container fluid>
                                <Form>
                                    <Form.Group>
                                        <Form.Field width={8}>
                                            <label>Product</label>
                                            <Input
                                                name='ProductName'
                                                value={this.props.ProductName}
                                                onChange={(e, { name, value }) => this.props.handleChangeDescription({ name, value })}
                                                error={this.props.ProductName === ""}
                                                fluid
                                                placeholder='input product'
                                            />
                                        </Form.Field>
                                        <Form.Field width={4}>
                                            <label>Depreciation</label>
                                            <Dropdown
                                                name="ProductDepreciationRatio"
                                                options={this.props.optionRatio}
                                                value={this.props.ProductDepreciationRatio}
                                                onChange={(e, { name, value }) => this.props.handleChangeNumericValue({ name, value })}
                                                placeholder='numberic 1-100 in %'
                                                error={this.props.ProductDepreciationRatio === ""}
                                                search
                                                selection
                                                scrolling

                                            />
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={() => this.props.trigger('productModal')}>
                                Back
                            </Button>
                            <Button
                                onClick={() => this.props.addProduct('productModal')}
                                primary
                                icon='add'
                                content='Add'
                            />
                        </Modal.Actions>
                    </Alert>
                </Content>
                {this.props.productChoice.length > 0 ?
                    <ProductQuality
                        productChoice={this.props.productChoice}
                        qualityOption={this.props.qualityOption}
                        qualityChoice={this.props.qualityChoice}
                        handleProductQuality={this.props.handleProductQuality}
                        handleProductQualityInfo={this.props.handleProductQualityInfo}
                    />
                    : ''}
                {this.props.targetGroupChoice.length > 0 && this.props.productChoice.length > 0 ?
                    <ProductTargetgroup
                        handleProductAcceptInfo={this.props.handleProductAcceptInfo}
                        targetGroupChoice={this.props.targetGroupChoice}
                        acceptionChoice={this.props.acceptionChoice}
                        productChoice={this.props.productChoice}
                        acceptOnBlur={this.props.acceptOnBlur}
                    />
                    : ''}
            </Container>
        )
    }
}