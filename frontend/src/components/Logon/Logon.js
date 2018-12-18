import React from 'react';
import {
    Icon,
    Grid,
    Image,
    Header,
    Form,
} from 'semantic-ui-react'
import {
    Margin_left,
    Grid_height_top,
} from '../../Provider/CSS/styled';
import {
    ZoomInAnimate
} from '../../Provider/CSS/animation';
import {
    Btn_float_shadow_start,
    Btn_float_shadow_classroom
} from '../../Provider/CSS/hover';
import styled from 'styled-components';
import logoLogon from '../../Static/img/logoInsturctor.svg';

const InputLogon = styled.input`
    background:none !important;
    border: none !important;
    border-bottom: 2px solid #B1B1B1 !important;
    border-radius:0rem !important;
    &:focus{
        outline: none !important;
        border-bottom: 2px solid #00B5AD !important;
    }    
`
export default class Logon extends React.Component {

    render() {
        return (
            <ZoomInAnimate>
                <Grid padded centered columns={3}>
                    <Grid.Row>
                        <Grid.Column floated='left' width={5}>
                            <Image src={logoLogon} size='medium' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid_height_top style={{ paddingLeft: "4%" }}>
                        <Grid.Column floated='left' width={7} textAlign='left'>
                            <Header as='h1'>
                                Welcome !
                                <Header.Subheader>Log on to continue using</Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid_height_top>
                    <Grid.Row style={{ paddingLeft: "4%" }}>
                        <Grid.Column>
                            <Form>
                                <Form.Field width={10}>
                                    <InputLogon
                                        name='username'
                                        placeholder='Username'
                                        value={this.props.username}
                                        onChange={(e) => this.props.handleChangeInput(e.target.name,e.target.value)}
                                    />
                                </Form.Field>
                                <Form.Field width={10}>
                                    <InputLogon
                                        name='password'
                                        type='password'
                                        placeholder='Password'
                                        value={this.props.password}
                                        onChange={(e) => this.props.handleChangeInput(e.target.name,e.target.value)}
                                    />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column></Grid.Column>
                        <Grid.Column></Grid.Column>
                    </Grid.Row>
                    <Grid_height_top>
                        <Grid.Column floated='left' width={7} textAlign='left'>
                            <Margin_left>
                                <Btn_float_shadow_classroom onClick={this.props.changeStatusLogon}>
                                    Back&nbsp;<Icon name='angle left' />
                                </Btn_float_shadow_classroom>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Btn_float_shadow_start onClick={this.props.logIn}>
                                    Log on&nbsp;<Icon name='sign in alternate' />
                                </Btn_float_shadow_start>
                            </Margin_left>
                        </Grid.Column>
                    </Grid_height_top>
                </Grid>
            </ZoomInAnimate>
        )
    }
}