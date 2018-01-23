import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRoutines } from './RoutinesActions'

import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import RoutineCard from './RoutineCard'

const styles = {
    grid: {
        display: 'grid',
        gridGap: 10,
        gridTemplateColumns: 'repeat(auto-fit, 400px)'
    },
    icon: {
        height: 48,
        width: 48,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
}

class Routines extends Component {
    state = {
        api: {
            isExecuting: false,
            isErrored: false,
        }
    }

    componentWillMount() {
        this.setState({ api: { ...this.state.api, isExecuting: true }})

        this.props.fetchRoutines()
            .then(response => {
                this.setState({ api: { isExecuting: false, isErrored: false }})
            }, error => {
                this.setState({ api: { isExecuting: false, isErrored: true }})
            })
    }

    render() {
        return (
            <div>
                { 
                    this.state.api.isExecuting ? <CircularProgress style={styles.icon} /> : 
                        this.state.api.isErrored ? <ActionHighlightOff style={{ ...styles.icon, color: red500 }} /> :
                            <div style={styles.grid}>
                                {this.props.routines.map(r =>  
                                    <RoutineCard routine={r} />
                                )}
                            </div>
                }
            </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    routines: state.routines,
})

const mapDispatchToProps = {
    fetchRoutines,
}

export default connect(mapStateToProps, mapDispatchToProps)(Routines)