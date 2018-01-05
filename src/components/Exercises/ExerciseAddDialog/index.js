import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
import {List, ListItem} from 'material-ui/List';
import { EXERCISE_TYPES, EXERCISE_URL_BASE } from '../../../constants'
import { getGuid } from '../../../util'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider'

import MetricAddDialog from '../MetricAddDialog'

const styles = {
    name: {
        width: '100%'
    },
    type: {
        width: '100%'
    },
    url: {
        width: '100%'
    },
    dialog: {
        width: 400
    }
}

const initialState = {
    exercise: {
        id: getGuid(),
        name: '',
        type: '',
        url: '',
        metrics: []
    },
    metricDialogOpen: false
}

class ExerciseAddDialog extends Component {
    state = initialState

    handleTypeChange = (event, index, value) => {
        this.setState(prevState => ({ 
            exercise: { ...prevState.exercise, type: value } 
        }))
    }

    handleNameChange = (event, value) => {
        this.setState(prevState => ({
            exercise: { ...prevState.exercise, name: value }
        }))
    }

    handleUrlChange = (event, value) => {
        this.setState(prevState => ({
            exercise: { ...prevState.exercise, url: EXERCISE_URL_BASE + value }
        }))
    }

    handleMetricDialogClose = (result) => {
        if (result.added) {
            this.setState(prevState => ({
                exercise: { 
                    ...prevState.exercise, metrics: prevState.exercise.metrics.concat(result.metric) 
                }
            }))
        }

        this.setState({ metricDialogOpen: false })
    }

    handleMetricDialogOpen = () => {
        this.setState({ metricDialogOpen: true })
    }

    componentWillReceiveProps(nextProps) {
        this.setState(initialState);
    }

    render() {
        const dialogActions = [
            <FlatButton 
                style={{float: 'left'}}
                label="Add Metric"
                onClick={this.handleMetricDialogOpen}
            />,
            <FlatButton
                label="Cancel"
                onClick={() => this.props.handleClose({ cancelled: true })}
            />,
            <FlatButton
                label="Add"
                onClick={() => this.props.handleClose({ added: true, exercise: this.state.exercise })}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Add Exercise"
                    actions={dialogActions}
                    modal={true}
                    open={this.props.open}
                    contentStyle={styles.dialog}
                >
                    <TextField
                        hintText="e.g. 'Bench Press'"
                        floatingLabelText="Name"
                        style={styles.name}
                        onChange={this.handleNameChange}
                    /><br />
                    <SelectField
                        floatingLabelText="Type"
                        value={this.state.exercise.type}
                        onChange={this.handleTypeChange}
                        style={styles.type}
                    >
                        {EXERCISE_TYPES.map(e => <MenuItem value={e} primaryText={e}/>)}
                    </SelectField><br/>
                    <TextField
                        hintText="e.g. '/barbell-bench-press-medium-grip'"
                        floatingLabelText="Bodybuilding.com Url"
                        style={styles.url}
                        onChange={this.handleUrlChange}
                    /><br />
                    <List>
                        <Subheader>Metrics</Subheader>
                        {this.state.exercise.metrics ? this.state.exercise.metrics.map(m =>                     
                                <ListItem
                                    leftIcon={<ActionAssignment/>}
                                    primaryText={m.name}
                                    secondaryText={m.uom ? m.uom : ''}
                                />
                            ) : ''}
                    </List>
                </Dialog>
                <MetricAddDialog
                    open={this.state.metricDialogOpen} 
                    handleClose={this.handleMetricDialogClose}
                />
            </div>
        )
    }
}

export default ExerciseAddDialog

