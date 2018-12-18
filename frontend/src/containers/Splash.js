import React from 'react';
import {
    Icon,
    Grid,
    Image,
    Header,
} from 'semantic-ui-react'
import {
    Margin_left,
    Grid_height_top,
    Link_ins,
    Bg_cover,
    Bg_title_wrap,
    Header_title,
} from '../Provider/CSS/styled';
import {
    TadaAnimate,
    PulseAnimate,
    BounceInAminate,
} from '../Provider/CSS/animation';
import {
    Btn_float_shadow_start,
    Btn_float_shadow_classroom
} from '../Provider/CSS/hover';
import logo from '../Static/img/logo.svg';
import Logon from '../components/Logon/Logon';
import { getUser, getUserInfo } from '../Provider/GetData/GetData';
import {UserProvider} from '../Provider/UserProvider/UserProvider'
import CryptoJS from 'crypto-js'
import swal from 'sweetalert2'


export default class Splash extends React.Component {

    state = {
        logon: false,
        username: '',
        password: '',
    }
    changeStatusLogon = () => {
        this.setState({
            logon: !this.state.logon
        })
    }
    handleChangeInput = ( name, value ) => {
        this.setState({
            [name]: value
        })
    }
    logIn = async () => {
        if (!UserProvider.getUserOnLog()) {
            if (this.isLogInPass()) {
                const data = await getUserInfo(this.state.username)
                if (data[0] && data !== false) {
                    let hash = CryptoJS.MD5(data[0].Salt + this.state.password)
                    let password = ''
                    hash.words.map(e => {
                        password += e
                    })
                    const user = await getUser(this.state.username, password)
                    if (user) {
                        const toast = swal.mixin({
                            toast: true,
                            position: 'center-start',
                            showConfirmButton: false,
                            timer: 3000
                        })
                        toast({
                            type: 'success',
                            title: 'Signed in successfully'
                        })
                        UserProvider.setUserOnLog(user)
                        this.props.history.push({
                            pathname: "/Management",
                            state: UserProvider.getUserOnLog()
                        })
                    } else {
                        const toast = swal.mixin({
                            toast: true,
                            position: 'center-start',
                            html: 'Invalid Password',
                            showConfirmButton: false,
                            timer: 3000,
                        })
                        toast({
                            type: 'warning',
                            title: 'Something wrong!',
                        })
                    }
                } else {
                    const toast = swal.mixin({
                        toast: true,
                        position: 'center-start',
                        html: 'Invalid Username',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                    toast({
                        type: 'warning',
                        title: 'Something wrong!',
                    })
                }
            } else {
                const toast = swal.mixin({
                    toast: true,
                    position: 'center-start',
                    html: this.state.username ? 'Password is required' : 'Username is required',
                    showConfirmButton: false,
                    timer: 3000,
                });
                toast({
                    type: 'warning',
                    title: 'Something wrong!',
                })
            }
        } else {
            this.props.history.push({
                pathname: "/Management",
                state: UserProvider.getUserOnLog()
            })
        }
    }
    isLogInPass = () => {
        let isLogInPass = false
        if (this.state.username && this.state.password) {
            isLogInPass = true
        }
        return isLogInPass
    }
    render() {
        return (
            <Bg_cover fluid>
                <Bg_title_wrap>
                    {!this.state.logon ?
                        <Grid padded centered columns={3}>
                            <Grid.Row>
                                <Grid.Column floated='left' width={5}>
                                    <TadaAnimate>
                                        <Image src={logo} size='medium' href='/' />
                                    </TadaAnimate>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid_height_top>
                                <Grid.Column floated='left' width={7} textAlign='left'>
                                    <PulseAnimate>
                                        <Header_title>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            Business Simulation
                                        </Header_title>
                                    </PulseAnimate>
                                </Grid.Column>
                            </Grid_height_top>
                            <Grid.Row>
                                <Grid.Column floated='left' width={7} textAlign='left'>
                                    <Margin_left>
                                        <PulseAnimate>
                                            <Header as='h3' disabled>
                                                Challenge your business mindset by trial on various strategies and tactics of your retail store and build a successful and profitable business.
                                        </Header>
                                        </PulseAnimate>
                                    </Margin_left>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid_height_top>
                                <Grid.Column floated='left' width={7} textAlign='left'>
                                    <BounceInAminate>
                                        <Margin_left>
                                            <Btn_float_shadow_start>
                                                <Link_ins to={'/Instruction'}>
                                                    Get start&nbsp;<Icon name='angle double right' />
                                                </Link_ins>
                                            </Btn_float_shadow_start>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Btn_float_shadow_classroom onClick={UserProvider.getUserOnLog() ? this.logIn : this.changeStatusLogon}>
                                                Log on&nbsp;<Icon name='lock' />
                                            </Btn_float_shadow_classroom>
                                        </Margin_left>
                                    </BounceInAminate>
                                </Grid.Column>
                            </Grid_height_top>
                        </Grid>
                        :
                        <Logon changeStatusLogon={this.changeStatusLogon}
                            handleChangeInput={this.handleChangeInput}
                            password={this.state.password}
                            username={this.state.username}
                            logIn={this.logIn}
                        />}
                </Bg_title_wrap>
            </Bg_cover>
        )
    }
}