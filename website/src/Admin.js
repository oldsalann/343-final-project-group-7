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


class Admin extends Component {

    constructor(props) {
        super(props) 
        this.state ={
            data : []
        }
    }

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

    handleSignOut() {
        firebase.auth().signOut().then(
            () => {
                this.props.history.push('/Contact');
            }
        );
    }


    render() {

        return(
        <MuiThemeProvider>
            <Card style={{margin:100}}>
            <div>
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

