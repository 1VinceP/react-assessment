import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTasks, getTaskId } from '../redux/reducer';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            hasTasks: false
        }
    }

    componentDidMount() {

        this.props.getTasks()
            .then( () => {
                this.setState({
                    hasTasks: true
                })
            })

    }

    render() {

        let tasks = this.props.tasks
        let taskMapper

        if( this.state.hasTasks ) {
            taskMapper = tasks.map( ( task, i ) => {
                return (
                    <Link to={{ pathname: '/edit-task', query: { refresh: 'false' } }} onClick={() => this.props.getTaskId( task.id )} key={i}>
                        <div style={{marginLeft: '50px', marginTop: '10px'}} >
                            {task.title}
                        </div>
                    </Link>
                )
            } )
        }
        else {
            taskMapper = null
        }
        

        return(
            <div>
                {taskMapper}
            </div>
        )
    }
}

function mapStateToProps( state ) {

    return state
}

export default connect( mapStateToProps, { getTasks, getTaskId } )(Home);