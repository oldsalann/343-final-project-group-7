import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Portfolio.css';
import firebase from 'firebase';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { Gallery as MobileGallery } from 'react-sleek-photo-gallery';
import styles from 'react-sleek-photo-gallery/dist/style.css';



export class Portfolio extends Component {
    render() {
        let storage = firebase.storage();
        let storageRef = storage.ref();
        console.log(storageRef);
        return (
            <div>
                <ImageContainer storageItem={storageRef} />
            </div>
        );
    }
}


const photos = [];
export class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: [],
            currentImage: 0,
            photos: []

        }
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);

    }


    componentDidMount() {
        let storage = firebase.storage();
        let storageRef = storage.ref();

        let allImages = [
            storageRef.child('images/28768591_10211716205604473_1060917020_o.jpg'),
            storageRef.child('images/28810468_10211716206404493_1130485339_o.jpg'),
            storageRef.child('images/28821832_10211716205724476_361433538_o.jpg'),
            storageRef.child('images/28822563_10211716206724501_7716507_o.jpg'),
            storageRef.child('images/28822675_10211716205764477_205517830_o.jpg'),
            storageRef.child('images/28876315_10211716205484470_662176243_o.jpg'),
            storageRef.child('images/28876651_10211716205644474_1999308415_o.jpg'),
            storageRef.child('images/28876962_10211716205924481_1460516792_o.jpg'),
            storageRef.child('images/28877159_10211716205524471_1202501323_o.jpg'),
            storageRef.child('images/28877208_10211716205684475_1126602387_o.jpg'),
            storageRef.child('images/28879500_10211716206124486_921311484_o.jpg')
        ];
        allImages.map((imgRef, i) => {
            this.getUrl(imgRef);
            console.log("imgRef", imgRef);
        });

        // console.log()
        // allImages.forEach(imgURL => {
        //     this.setState({
        //         photos: photos.push({ "src": imgURL, "width": 4, "height": 6 }),
        //     });
        //     console.log("photos", photos);
        // })

    }
    getUrl(imgRef) {
        let setUrl = undefined;
        imgRef.getDownloadURL().then((url) => {
            setUrl = url;
            console.log(setUrl)
            let newArray = this.state.url.slice();
            newArray.push(setUrl);
            console.log(newArray);
            this.setState({
                url: newArray,
                photos: photos.push({ "src": setUrl, "width": 3, "height": 2 }),
            })
        }).catch(function (error) {
            console.error(error);
        });
    }


    openLightbox(event, obj) {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true,
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }


    render() {
        return (
            <div>
                {/* {this.state.url !== '' &&
                    this.state.url.map((item, i) => {
                        return (<ImageCard key={"key-" + i} src={item} />);
                    })

                } */}

                <Gallery photos={photos} onClick={this.openLightbox} />

                <Lightbox images={photos}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                />
            </div>
        );
    }
}

export class ImageCard extends Component {
    render() {
        const containerStyle = {
            position: 'relative',
            width: '50%'
        }
        const middleStyle = {
            transition: '.5s ease',
            opacity: '0',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            msTransform: 'translate(-50%, -50%)',
            textAlign: 'center'
        }
        const imageStyle = {
            opacity: '1',
            display: 'block',
            width: '100%',
            height: 'auto',
            transition: '.5s ease',
            backfaceVisibility: 'hidden'
        }
        const textStyle = {
            backgroundColor: '#4CAF50',
            color: 'white',
            fontSize: '16px',
            padding: '16px 32px'
        }
        return (
            <div style={containerStyle} className="container">
                <img style={imageStyle} className="image" height="400" width="600" src={this.props.src} data-lightbox="roadtrip" data-title="My caption" alt="test" />
                <div style={middleStyle} className="middle">
                    <div style={textStyle} className="text"> Location </div>
                </div>
            </div>
        );
    }
}
