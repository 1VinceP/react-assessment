import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateTask, markCompleted, deleteTask } from '../redux/reducer';

class EditTask extends Component {
    constructor() {
        super();

        this.state = {
            taskTitle: '',
            taskDescription: '',
            currentTask: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.setComplete = this.setComplete.bind(this)
        this.cancelEdit = this.cancelEdit.bind(this)
    }

    componentDidMount() {

        if( this.props.location.query ) {
            console.log( 'not from refresh' )
            let currentTask
        
            for( let i = 0; i < this.props.tasks.length; i++ ) {
                if( this.props.tasks[i].id === this.props.taskId ) {
                    currentTask = this.props.tasks[i]
                }
            }

            this.setState({
                currentTask
            })

            localStorage.setItem( 'currentTask', JSON.stringify(currentTask) )
            localStorage.setItem( 'taskId', this.props.taskId )

            console.log( localStorage )
        }
        else {

            let currentTask
            let task = localStorage.getItem( 'currentTask' )
            let id = localStorage.getItem( 'taskId' )

            let newTask = JSON.parse( task )

            this.setState({
                currentTask: newTask
            })

            localStorage.setItem( 'currentTask', this.state.currentTask )
            localStorage.setItem( 'taskId', this.props.taskId )
        }
    }

    handleInputChange( e ) {
        let value = e.target.value
        let name = e.target.name

        this.setState({
            [name]: value
        })
    }

    setComplete() {
        this.props.markCompleted( this.props.taskId )
    }

    cancelEdit() {
        this.setState({
            taskTitle: '',
            taskDescription: ''
        })

        document.getElementById( 'inputs' ).reset()
    }

    saveEdit() {
        let newTitle = this.state.currentTask.title
        let newDesc = this.state.currentTask.description
        if( this.state.taskTitle ) {
            newTitle = this.state.taskTitle
        }
        if( this.state.taskDescription ) {
            newDesc = this.state.taskDescription
        }

        let body = {
            title: newTitle,
            description: newDesc
        }

        this.props.updateTask( this.props.taskId, body )
    }

    deleteTask() {
        this.props.deleteTask( this.props.taskId )
    }

    render() {
        
        console.log( this.state.currentTask )
        return(
            <div style={{ height: '60vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                <form id='inputs'>
                    <input placeholder={ this.state.currentTask.title } name='taskTitle' onChange={ e => this.handleInputChange(e) } />
                    <input placeholder={ this.state.currentTask.description } name='taskDescription' onChange={ e => this.handleInputChange(e) } />
                </form>
                
                <Link to='/' onClick={ () => this.setComplete() } ><button>Complete task</button></Link>

                <button onClick={ () => this.cancelEdit() }>Delete Changes</button>
                <Link to='/' onClick={ () => this.saveEdit() } ><button>Save Changes</button></Link>
                <Link to='/'><button>Back to Home</button></Link>
                <Link to='/' onClick={ () => this.deleteTask() } ><button style={{background: 'red'}} >DELETE TASK</button></Link>
            </div>
        )
    }
}

function mapStateToProps( state ) {

    return state
}

export default connect( mapStateToProps, { updateTask, markCompleted, deleteTask } )(EditTask);