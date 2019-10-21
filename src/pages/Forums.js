import React, { Component } from 'react';
import axios from 'axios';

export default class Forums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:3001/forums')
            .then(res => {
                this.setState({
                    threads: res.data
                });
            })
            .catch((err) => console.log(err));
    }

    // threadList() {
    //     return this.state.threads.map((currentThread, i) => {
    //         // return List of threads
    //     })
    // }

    render() {
        return (
            <div>
                {this.state.threads}
            </div>
        )
    }
}