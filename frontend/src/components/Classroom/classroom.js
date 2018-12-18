import React from 'react';
import { Form, Message, Grid, Button } from 'semantic-ui-react'

export default class Classroom extends React.Component {
    render() {
        return (
            <div>
                <Form onSubmit={this.props.enterRoom}>
                    <Grid centered>
                        <Grid.Row>
                            <Form.Group>
                                <Grid.Column>
                                    <Form.Input
                                        placeholder='Key room'
                                        name='roomKey'
                                        value={this.props.roomKey}
                                        onChange={(e, { name, value }) => this.props.setValue({ name, value })}
                                    />
                                    <Message
                                        visible={this.props.roomKeyCheck}
                                        error
                                        header='Invalid key'
                                        content={'Can\'t find classroom with ' + this.props.roomKey + ' key'}
                                    />
                                </Grid.Column>
                            </Form.Group>
                        </Grid.Row>
                        <Grid.Row>
                            <Form.Group>
                                <Grid.Column>
                                    <Form.Input
                                        type='Email'
                                        placeholder='Email'
                                        name='storeEmail'
                                        value={this.props.storeEmail}
                                        onChange={(e, { name, value }) => this.props.setValue({ name, value })}
                                    />
                                    <Message
                                        visible={this.props.storeEmailCheck}
                                        error
                                        header='Invalid Email'
                                        content={'Can\'t find ' + this.props.storeEmail + ' in this classroom'}
                                    />
                                </Grid.Column>
                            </Form.Group>
                        </Grid.Row>
                        <Grid.Row>
                            <Button.Group>
                                <Form.Button positive>Submit</Form.Button>
                            </Button.Group>
                        </Grid.Row>
                    </Grid>
                </Form>
            </div>
        )
    }
}
