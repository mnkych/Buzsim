import React from 'react';
import styled from 'styled-components';
import NavbarBg from '../../Static/img/navbar.png';
import { Menu,
    Icon,
    Modal 
} from 'semantic-ui-react'
import {
    Alert
} from '../../Provider/CSS/styled';
import Classroom from '../Classroom/classroom';

const Nav_wrap = styled.div`
    background: rgba(76, 175, 80, 0);
    z-index:99999;   
    width:100%;
    height:100px;
    background:url(${NavbarBg});
    background-size: contain;
`

const Menu_li = styled(Menu.Item)`
    color:#00b5ad !important;
    &:hover {
        color: #000000 !important;
    }
`
export default class NavbarContent extends React.Component {
    state = { 
        storeEmail: '',
        roomKey: '',
        storeEmailCheck: false,
        roomKeyCheck: false
    }
    setValue = ({ name, value }) => {
        this.setState({
            [name]: value,
            [name + 'Check']: false,
        })
    }
    enterRoom = async () => {
        if ((this.state.storeEmail === "" || this.state.storeEmail === undefined || this.state.storeEmail === null) || (this.state.roomKey === "" || this.state.roomKey === undefined || this.state.roomKey === null)) {
            if (this.state.storeEmail === "" || this.state.storeEmail === undefined || this.state.storeEmail === null) {
                this.setState({
                    storeEmailCheck: true,
                })
            }
            if (this.state.roomKey === "" || this.state.roomKey === undefined || this.state.roomKey === null) {
                this.setState({
                    roomKeyCheck: true,
                })
            }
        } else {
            this.props.history.push({
                pathname: `/Manage/${this.state.roomKey}`,
                state: { userEmail: this.state.storeEmail }
            });
            window.location.reload()
        }
    }
    render() {
        return (
            <Nav_wrap>
                <Menu icon='labeled' text size='large' widths={4}>
                    <Menu_li header name='Home' href='/'>
                        <Icon name='home'/>Home
                    </Menu_li>
                    <Menu_li header name='Instruction' href='/Instruction'>
                        <Icon name='book'/>Instruction
                    </Menu_li>
                    <Alert
                        size="tiny"
                        trigger={
                            <Menu_li header name='Classroom'>
                                <Icon name='student' />Classroom
                        </Menu_li>
                        } closeIcon>
                        <Modal.Header>Join in Classroom</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <Classroom
                                    storeEmail={this.state.storeEmail}
                                    roomKey={this.state.roomKey}
                                    setValue={this.setValue}
                                    enterRoom={this.enterRoom}
                                    storeEmailCheck={this.state.storeEmailCheck}
                                    roomKeyCheck={this.state.roomKeyCheck}
                                />
                            </Modal.Description>
                        </Modal.Content>
                    </Alert>
                    
                </Menu>                    
            </Nav_wrap>
        )
    }
}