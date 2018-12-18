import select from '../../Static/img/checked.png';
import notSelect from '../../Static/img/circumference.png';
import React from 'react';
import {
    Button,
    List,
    Image
} from 'semantic-ui-react';


export default class ListScenario extends React.Component {

    genComponent = (array, name) => {
        let component = []
        if (array && array.length > 0 && name) {
            if (name === 'Classroom') {
                component = array[this.props.currentPage - 1].map((e, index) => {
                    return (
                        <List.Item onClick={async () => await this.props.handleSelected('selectedScenario', e)} key={'sce' + index}>
                            <List.Content floated='right'>
                            </List.Content>
                            {this.props.selectedScenario ? this.props.selectedScenario.BusinessID === e.BusinessID ? <Image avatar src={select} /> : <Image avatar src={notSelect} /> : <Image avatar src={notSelect} />}
                            <List.Content>
                                <List.Header>{e.BusinessName}</List.Header>
                            </List.Content>
                        </List.Item>
                    )
                })
            }
            if (name === 'scenario') {
                component = array[this.props.currentPage - 1].map((e, index) => {
                    return (
                        <List.Item onClick={async () => await this.props.handleSelected('selectedScenario', e)} key={'sce' + index}>
                            <List.Content floated='right'>
                                <Button negative inverted circular size="mini" icon='trash alternate outline' onClick={async () => await this.props.handleScenarioDelete(e, 'scenario')} />
                            </List.Content>
                            {this.props.selectedScenario ? this.props.selectedScenario.BusinessID === e.BusinessID ? <Image avatar src={select} /> : <Image avatar src={notSelect} /> : <Image avatar src={notSelect} />}
                            <List.Content>
                                <List.Header>{e.BusinessName}</List.Header>
                            </List.Content>
                        </List.Item>
                    )
                })
            }
            if (name === 'decoration' || name === 'size' || name === 'location' || name === 'ownership' || name === 'product' || name === 'marketing' || name === 'human' || name === 'competitor') {
                component = array[this.props.currentPage - 1].map((e, index) => {
                    return (
                        <List.Item onClick={async () => await this.props.handleSelected(name, e)} key={'sce' + index}>
                            <List.Content floated='right'>
                                <Button negative inverted circular size="mini" icon='trash alternate outline' onClick={async () => await this.props.handleScenarioDelete(e, name)} />
                            </List.Content>
                            {this.props[name] ? Object.values(this.props[name])[0] === Object.values(e)[0] ? <Image avatar src={select} /> : <Image avatar src={notSelect} /> : <Image avatar src={notSelect} />}
                            <List.Content>
                                {
                                    Object.keys(e).map((key, indexObj) => {
                                        if (indexObj >= 1 && (Object.values(e)[indexObj] || Object.values(e)[indexObj] === 0) && key !== 'JobType' && key !== 'ProductType') {
                                            return (<List.Header key={indexObj} size='small'>{key} : {Object.values(e)[indexObj]}</List.Header>)
                                        } else {
                                            return ''
                                        }
                                    })
                                }
                            </List.Content>
                        </List.Item>
                    )
                })
            }
            if (name === 'students') {
                component = array[this.props.currentPage - 1].map((e, index) => {
                    return (
                        <List.Item key={'sce' + index}>
                            <List.Content floated='right'>
                                <Button size='medium' floated='left' circular icon='file alternate outline' onClick={async () => await this.props.handleStudentReport(e)} />
                            </List.Content>
                            <List.Content>
                                <List.Header>{e.StoreEmail}</List.Header>
                            </List.Content>
                        </List.Item>
                    )
                })
            }
        }
        return component
    }
    render() {
        return (
            <List divided verticalAlign='middle' relaxed='very' selection ordered = {this.props.name==='students'? true:false }>
                {this.genComponent(this.props.array, this.props.name)}
            </List>
        )
    }
}