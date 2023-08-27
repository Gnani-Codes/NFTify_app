import { Component } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillFacebook,
} from "react-icons/ai";
import Loader from "react-loader-spinner";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import PriceCard from "../PriceCard";
import "./index.css";

const renderViewStatusObj = {
  normalView: "NORMAL",
  loadingView: "LOADING",
  searchView: "SEARCH",
  failureView: "FAILURE",
};

class Home extends Component {
  state = {
    searchInput: "",
    pairAddData: [],
    tokenAddData: [],
    searchInputData: [],
    activeBtn: "pair",
    currentView: renderViewStatusObj.failureView,
  };

  componentDidMount() {
    this.getPriceData();
  }

  getPriceData = async () => {
    this.setState({
      currentView: renderViewStatusObj.loadingView,
    });

    const pairUrl =
      "https://api.dexscreener.io/latest/dex/pairs/bsc/0x7213a321F1855CF1779f42c0CD85d3D95291D34C,0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae";
    const tokenUrl =
      "https://api.dexscreener.io/latest/dex/tokens/0x2170Ed0880ac9A755fd29B2688956BD959F933F8,0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const options = {
      method: "GET",
    };
    const pairsDataResponse = await fetch(pairUrl, options);
    const pairsData = await pairsDataResponse.json();

    const tokenDataResponse = await fetch(tokenUrl, options);
    const tokenData = await tokenDataResponse.json();

    console.log(pairsData.pairs, "data");
    if (pairsDataResponse.ok && tokenDataResponse.ok) {
      this.setState({
        pairAddData: pairsData.pairs,
        tokenAddData: tokenData.pairs,
        currentView: renderViewStatusObj.normalView,
      });
    }
  };

  renderSearchView = () => {
    const { searchInputData } = this.state;
    console.log(searchInputData, "input data");

    return (
      <>
        <h1 className="pair-heading">Search Results</h1>
        {searchInputData.map((obj, index) => (
          <PriceCard data={obj} key={index} />
        ))}
      </>
    );
  };

  renderNormalView = () => {
    const { pairAddData, tokenAddData, activeBtn } = this.state;

    return (
      <>
        {activeBtn === "pair" ? (
          <div>
            <h1 className="pair-heading">Pair Address</h1>
            <div className="pair-container">
              {pairAddData.map((obj, index) => (
                <PriceCard data={obj} key={index} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="pair-heading">Token Address</h1>
            <div className="pair-container">
              {tokenAddData.map((obj, index) => (
                <PriceCard data={obj} key={index} />
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  renderFailureView = () => (
    <div className="loading-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure"
      />
      <h1 className="failure-msg">Something went wrong try again!</h1>
    </div>
  );

  renderLoadingView = () => (
    <div className="loading-view-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  );

  renderViewSection = () => {
    const { currentView } = this.state;

    switch (currentView) {
      case renderViewStatusObj.normalView:
        return this.renderNormalView();
      case renderViewStatusObj.searchView:
        return this.renderSearchView();
      case renderViewStatusObj.loadingView:
        return this.renderLoadingView();
      case renderViewStatusObj.failureView:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  onChangeInput = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  onClickSearch = async () => {
    this.setState({
      currentView: renderViewStatusObj.loadingView,
    });

    const { searchInput } = this.state;
    const searchUrl = `https://api.dexscreener.com/latest/dex/search/?q=${searchInput}`;

    const options = {
      method: "GET",
    };
    const response = await fetch(searchUrl, options);
    const data = await response.json();
    console.log(data, "search data");

    this.setState({
      searchInputData: data.pairs,
      currentView: renderViewStatusObj.searchView,
    });
  };

  onClickPairAddBtn = (event) => {
    console.log(event.target.id, "id");
    this.setState({
      activeBtn: event.target.id,
    });
  };

  render() {
    const { searchInput, activeBtn } = this.state;

    const pairBtn = activeBtn === "pair" ? "active-button" : "";
    const tokenBtn = activeBtn === "token" ? "active-button" : "";
    return (
      <>
        <div className="home-container">
          <div className="side-bar">
            <div className="menu-logo-container">
              <p className="menu-icon">
                <GiHamburgerMenu />
              </p>
              <h1 className="logo-name">NFTify</h1>
            </div>

            <div className={`pair-d-flex ${pairBtn}`}>
              <img
                src="https://anima-uploads.s3.amazonaws.com/projects/64e8ec47e1c2a81b98b3d09f/releases/64ea0722d0fdd67ea0b57166/img/fluent-pair-24-filled@2x.png"
                alt="token"
                className="pair-btn-img"
              />
              <button
                type="button"
                id="pair"
                className={`pair-address-btn`}
                onClick={this.onClickPairAddBtn}
              >
                Pair Address
              </button>
            </div>

            <div className={`pair-d-flex ${tokenBtn}`}>
              <img
                src="https://anima-uploads.s3.amazonaws.com/projects/64e8ec47e1c2a81b98b3d09f/releases/64ea0722d0fdd67ea0b57166/img/ic-baseline-token@2x.png"
                alt="token"
                className="pair-btn-img"
              />
              <button
                type="button"
                id="token"
                className={` pair-address-btn `}
                onClick={this.onClickPairAddBtn}
              >
                Token Address
              </button>
            </div>

            <div className="contact-section">
              <p className="contact-icon">
                <AiFillFacebook color="##F30050" />
              </p>
              <p className="contact-icon">
                <AiFillLinkedin />
              </p>
              <p className="contact-icon">
                <AiFillTwitterCircle />
              </p>
            </div>
          </div>

          <div className="home-background">
            <div className="navbar-container">
              <div className="menu-logo-container d-none">
                <p className="menu-icon">
                  <GiHamburgerMenu />
                </p>
                <h1 className="logo-name">NFTify</h1>
              </div>

              <div className="search-input-container header-search">
                <input
                  type="search"
                  className="input"
                  placeholder="search"
                  value={searchInput}
                  onChange={this.onChangeInput}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.onClickSearch}
                >
                  <BiSearch />
                </button>
              </div>

              <button className="connect-btn">Connect</button>
              <ConnectButton/>
            </div>

            <div className="search-input-container large-header-search">
              <input
                type="search"
                className="input"
                placeholder="search"
                value={searchInput}
                onChange={this.onChangeInput}
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <BiSearch />
              </button>
            </div>

            {this.renderViewSection()}
          </div>
          <div className="footer"></div>
        </div>
        <div className="footer"></div>
      </>
    );
  }
}

export default Home;
