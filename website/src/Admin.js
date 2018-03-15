import React, { Component } from 'react';
import firebase from 'firebase';
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactTable from "react-table";
import "react-table/react-table.css";
import ImageUploader from 'react-firebase-image-uploader';


class Admin extends Component {

    constructor(props) {
        super(props) 
        this.state ={
            data:[],
            progress: 0,
            isUploading: false,
            submitted: false,
        }
    }

    // get data from firebase database 
    componentDidMount() {
        this.dataRef = firebase.database().ref('form/');
        let datas = []
        let comp = this;
        this.dataRef.on('value', (snapshot) => {
            console.log('snapshot', snapshot.val())
            snapshot.forEach(function (child) {
                datas.push(child.val());
            })
            comp.setState({
                data:datas 
            })
        })
        console.log(datas);
        console.log(this.state.data);
    }

    // Sign out control 
    handleSignOut() {
        firebase.auth().signOut().then(
            () => {
                this.props.history.push('/Contact');
            }
        );
    }

    // Image upload 
    handleUploadStart = () => this.setState({isUploading: true, progress: 0})

    // Image upload progress 
    handleProgress = (progress) => this.setState({progress})

    // Catch error whem uoloading image
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }

    //  Success upload
    handleUploadSuccess = (filename) => {
        this.setState({progress: 100, isUploading: false});
        
    }



    render() {

        return(
        <MuiThemeProvider>
            <Card style={{margin:50}}>
                <CardHeader
                    title={<h1 style={{fontFamily: 'Philosopher'}}>Administration Page</h1>}
                    style={{marginTop:10, marginLeft:10, marginBottum: 10, marginRight: 10}}
                    />
                
                <CardHeader
                    title={<h2 style={{fontFamily: 'Philosopher'}}>Photo uploader</h2>}
                    style={{marginTop:10, marginLeft:10, marginBottum: 10, marginRight: 10}}
                    />
                <CardText>
                <div>
                <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
                        {this.state.submitted &&
                            <p>Success!</p>
                        }
                        {this.state.isUploading &&
                            <p>Progress: {this.state.progress}</p>
                        }
                        <ImageUploader
                            storageRef={firebase.storage().ref('images')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                        <RaisedButton 
                          label= "submit"
                          type="submit"
                          disabled={this.state.submitted} 
                          style={{marginTop:5, marginLeft:0, marginBottum: 30, marginRight: 30}} 
                          />
                </label>
                </div>
                </CardText>
            <div>
                <CardHeader
                    title={<h2 style={{fontFamily: 'Philosopher'}}>Form List</h2>}
                    style={{marginTop:10, marginLeft:10, marginBottum: 10, marginRight: 10}}
                    />
                <CardText>
                    <MakeDataTable data={this.state.data}></MakeDataTable>
                </CardText>
                <RaisedButton label="Sign out" 
                              onClick={() => this.handleSignOut()} 
                              style={{ margin: 30 }} />
            </div>
            </Card>
        </MuiThemeProvider>
        );
    }
}

// Create data table 
class MakeDataTable extends Component {
    render(){
        return(
            <div>
                <ReactTable
                data={this.props.data}
                columns={[
                {
                    Header: "Name",
                    accessor: 'name'
                },
                {
                    Header: "Email",
                    accessor: 'email'
                },
                {
                    Header: 'Time',
                    accessor: 'time'
                },
                {
                    Header: 'Subject',
                    accessor: 'subject'
                },
                {
                    Header: 'Message',
                    accessor: 'message'
                }
                ]}
                defaultPageSize={20}
                className="-striped -highlight"/>
            </div>
        );
    }
  }

export default Admin;

