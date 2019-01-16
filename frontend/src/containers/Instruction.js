import React from 'react';
import Content from '../components/Instruction/Content';
import NavbarContent from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer'
import { Grid, Image } from 'semantic-ui-react'
import {
    Body_content,
    Content_wrap,
    Grid_bg
} from '../Provider/CSS/styled';
import logo from '../Static/img/logo.svg';

export default class Instruction extends React.Component {
    render() {
        return (
            <div>
                <NavbarContent
                    history={this.props.history} />
                <Body_content>
                    <Content_wrap>
                        <Grid_bg container>
                            <Grid.Row>
                                <Image src={logo} size='medium' centered />
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Content />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid_bg>
                    </Content_wrap>
                </Body_content>
                <Footer />
            </div>

        )
    }
}