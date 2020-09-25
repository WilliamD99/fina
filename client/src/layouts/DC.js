import React, { Component } from "react";
import Admin from "./Admin";
import axios from "axios";
import { Auth } from "aws-amplify";

export default class DC extends Component {
  resolveUser = async (data) => {
    let userInfo = await data;
    this.setState({
      userInfo: userInfo,
    });
  };

  state = {
    search: "AAPL",
    floor: "US",
    userInfo: "",
  };

  // Handle search function
  handleSymbol = (e) => {
    this.setState({ search: e });
  };

  handleLoading = () => {
    this.setState({
      candle: undefined,
      profile: undefined,
      peers: undefined,
      news: undefined,
      basic: undefined,
      buy: undefined,
      earning: undefined,
    });
  };

  quoteRoute = `/quote`;

  candleRequest = axios.get(`/candle`, {
    headers: {
      comp: this.state.search,
    },
  });
  profileRequest = axios.get(`/profile`, {
    headers: {
      comp: this.state.search,
    },
  });
  symbolsRequest = axios.get(`/symbols`, {
    headers: {
      floor: this.state.floor,
    },
  });
  floorsRequest = axios.get(`/floors`);
  peerRequest = axios.get(`/peers`, {
    headers: {
      comp: this.state.search,
    },
  });
  newsRequest = axios.get(`/news`, {
    headers: {
      comp: this.state.search,
    },
  });
  basicRequest = axios.get(`/basic`, {
    headers: {
      comp: this.state.search,
    },
  });
  buyRequest = axios.get(`/buy`, {
    headers: {
      comp: this.state.search,
    },
  });
  earningRequest = axios.get(`/earn`, {
    headers: {
      comp: this.state.search,
    },
  });
  // Get current user info
  user = Auth.currentUserInfo().then((res) => {
    this.setState({
      user: res.attributes,
    });
  });
  componentDidMount() {
    axios
      .all([
        this.candleRequest,
        this.profileRequest,
        this.symbolsRequest,
        this.floorsRequest,
        this.peerRequest,
        this.newsRequest,
        this.basicRequest,
        this.buyRequest,
        this.earningRequest,
        // this.candleCurrencyRequest,
      ])
      .then(
        axios.spread((...res) => {
          const candleData = res[0].data;
          const profileData = res[1].data;
          const symbolsData = res[2].data;
          const floors = res[3].data;
          const peers = res[4].data;
          const news = res[5].data;
          const basic = res[6].data;
          const buy = res[7].data;
          const earning = res[8].data;
          // const candleCurrency = res[9].data;

          this.setState({
            candle: candleData,
            profile: profileData,
            symbols: symbolsData,
            floors: floors,
            peers: peers,
            news: news,
            basic: basic,
            buy: buy,
            earning: earning,
            // candleC: candleCurrency,
          });
        })
      )
      .then(() => {
        let request = this.state.peers.map((comp) => {
          let compRequest = axios.get(this.quoteRoute, {
            headers: {
              comp: comp,
            },
          });
          return compRequest;
        });
        axios.all(request).then(
          axios.spread((...res) => {
            const comp1 = res[0].data;
            const comp2 = res[1].data;
            const comp3 = res[2].data;
            const comp4 = res[3].data;
            const peerData = [comp1, comp2, comp3, comp4];
            this.setState({
              peerData: peerData,
            });
          })
        );
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.floor !== this.state.floor) {
    //   const symbolRequest = axios.get(this.symbolsRoute, {
    //     headers: {
    //       floor: this.state.floor,
    //     },
    //   });

    //   axios.all([symbolRequest]).then(
    //     axios.spread((...res) => {
    //       const symbolsData = res[0].data;
    //       this.setState({ symbols: symbolsData });
    //     })
    //   );
    // } else if (prevState.search !== this.state.search) {
    if (prevState.search !== this.state.search) {
      let candleRequest = axios.get(`/candle`, {
          headers: {
            comp: this.state.search,
          },
        }),
        profileRequest = axios.get(`/profile`, {
          headers: {
            comp: this.state.search,
          },
        }),
        peerRequest = axios.get(`/peers`, {
          headers: {
            comp: this.state.search,
          },
        }),
        newsRequest = axios.get(`/news`, {
          headers: {
            comp: this.state.search,
          },
        }),
        basicRequest = axios.get(`/basic`, {
          headers: {
            comp: this.state.search,
          },
        }),
        buyRequest = axios.get(`/buy`, {
          headers: {
            comp: this.state.search,
          },
        }),
        earningRequest = axios.get(`/earn`, {
          headers: {
            comp: this.state.search,
          },
        });
      // let candleCurrencyRequest = axios.get("/candleCurrency", {
      //   headers: {
      //     rate: this.state.currency,
      //   },
      // });
      axios
        .all([
          candleRequest,
          profileRequest,
          peerRequest,
          newsRequest,
          basicRequest,
          buyRequest,
          earningRequest,
          // candleCurrencyRequest,
        ])
        .then(
          axios.spread((...res) => {
            const candleData = res[0].data;
            const profileData = res[1].data;
            const peers = res[2].data;
            const news = res[3].data;
            const basic = res[4].data;
            const buy = res[5].data;
            const earning = res[6].data;
            // const candleCurrency = res[7].data;

            this.setState({
              candle: candleData,
              profile: profileData,
              peers: peers,
              news: news,
              basic: basic,
              buy: buy,
              earning: earning,
              // candleC: candleCurrency,
            });
          })
        )
        .then(() => {
          if (this.state.peeer !== undefined) {
            let request = this.state.peers.map((comp) => {
              let compRequest = axios.get(this.quoteRoute, {
                headers: {
                  comp: comp,
                },
              });
              return compRequest;
            });
            axios.all(request).then(
              axios.spread((...res) => {
                const comp1 = res[0].data;
                const comp2 = res[1].data;
                const comp3 = res[2].data;
                const comp4 = res[3].data;
                const peerData = [comp1, comp2, comp3, comp4];
                this.setState({
                  peerData: peerData,
                });
              })
            );
          }
        });
    }
  }

  render() {
    this.resolveUser(this.props.user);
    console.log(this.state.userInfo);
    return (
      <Admin
        user={this.state.user}
        search={this.state.search}
        candle={this.state.candle}
        profile={this.state.profile}
        symbols={this.state.symbols}
        floors={this.state.floors}
        peers={this.state.peers}
        peerData={this.state.peerData}
        news={this.state.news}
        basic={this.state.basic}
        buy={this.state.buy}
        earning={this.state.earning}
        handleSymbol={this.handleSymbol}
        handleLoading={this.handleLoading}
        handleLogout={this.props.handleLogout}
      />
    );
  }
}
