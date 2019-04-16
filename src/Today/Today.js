import React, { Component } from 'react';
import './Today.css';
import axios from 'axios';
import Pusher from 'pusher-js'

class Today extends Component {
    constructor () {
        super();
        this.state = {
            btcprice: '',
            ltcprice: '',
            ethprice: ''
        };
    }
    componentWillMount () {
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
            .then(response => {
                this.setState({ btcprice: response.data.BTC.USD });
                this.setState({ ethprice: response.data.ETH.USD });
                this.setState({ ltcprice: response.data.LTC.USD });
            })
            .catch(error => {
                console.log(error)
            })
        this.pusher = new Pusher('APP_KEY', {
            cluster: 'YOUR_CLUSTER',
            encrypted: true
        });
        this.prices = this.pusher.subscribe('coin-prices');
    }

    sendPricePusher (data) {
        axios.post('/prices/new', {
            prices: data
        })
          .then(response => {
              console.log(response)
          })
          .catch(error => {
              console.log(error)
          })
     }
     
    render() {
        return (
            <div className="today--section container">
                <h2>Current Price</h2>
                <div className="columns today--section__box">
                    <div className="column btc--section">
                        <h5>${this.state.btcprice}</h5>
                        <p>1 BTC</p>
                    </div>
                    <div className="column eth--section">
                        <h5>${this.state.ethprice}</h5>
                        <p>1 ETH</p>
                    </div>
                    <div className="column ltc--section">
                        <h5>${this.state.ltcprice}</h5>
                        <p>1 LTC</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Today;