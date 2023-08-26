import "./index.css";

const PriceCard = (props) => {
  const { data } = props;
  const {
    dexId,
    pairAddress,
    baseToken,
    quoteToken,
    priceNative,
    priceUsd,
  } = data;
  const { name, symbol, address } = baseToken;

  return (
    <div className="card">
      <div className="price-card-background-container">
        <div className="card-container">
          <h1 className="card-heading">Basic Info</h1>
          <p className="sub-heading">
            Pair Created at
            <span className="sub-heading-ans">{name}</span>
          </p>
          <p className="sub-heading">
            Symbol
            <span className="sub-heading-ans">{symbol}</span>
          </p>
          <p className="sub-heading">
            Dex ID
            <span className="sub-heading-ans">{dexId}</span>
          </p>
          <div className="sub-heading">
            Pair Address
            <p className="sub-heading-ans">
              {pairAddress.length > 5 ? `${name}` : `${pairAddress}`}
            </p>
          </div>
        </div>
      </div>

      <div className="price-card-background-container">
        <div className="card-container">
          <h1 className="card-heading">Basic Token</h1>
          <p className="sub-heading">
            Name
            <span className="sub-heading-ans">{name}</span>
          </p>
          <p className="sub-heading">
            Symbol
            <span className="sub-heading-ans">{symbol}</span>
          </p>
          <div className="sub-heading">
            Address
            <p className="sub-heading-ans">
              {address.length > 5 ? `${name}` : `${address}`}
            </p>
          </div>
          <div className="icon-container">
            <img
              src="https://anima-uploads.s3.amazonaws.com/projects/64e8ec47e1c2a81b98b3d09f/releases/64e8ecf5614af8af40953cf4/img/material-symbols-token-outline@2x.png"
              className="icon"
              alt="icon"
            />
          </div>
        </div>
      </div>

      <div className="price-card-background-container">
        <div className="card-container">
          <h1 className="card-heading">Quote Token</h1>
          <p className="sub-heading">
            Name
            <span className="sub-heading-ans">{quoteToken.name}</span>
          </p>
          <p className="sub-heading">
            Symbol
            <span className="sub-heading-ans">{quoteToken.symbol}</span>
          </p>
          <div className="sub-heading">
            Address
            <p className="sub-heading-ans">
              {quoteToken.address.length > 5
                ? `${name}`
                : `${quoteToken.address}`}
            </p>
          </div>
          <div className="icon-container">
            <img
              src="https://anima-uploads.s3.amazonaws.com/projects/64e8ec47e1c2a81b98b3d09f/releases/64e8ecf5614af8af40953cf4/img/material-symbols-token-outline@2x.png"
              className="icon"
              alt="icon"
            />
          </div>
        </div>
      </div>

      <div className="price-card-background-container">
        <div className="card-container">
          <h1 className="card-heading">Price</h1>
          <p className="sub-heading">
            Price Native
            <span className="sub-heading-ans">
              {quoteToken.symbol} {priceNative}
            </span>
          </p>
          <div className="sub-heading">
            Price USD
            <p className="sub-heading-ans">{priceUsd}</p>
          </div>
          <div className="icon-container">
            <img
              src="https://anima-uploads.s3.amazonaws.com/projects/64e8ec47e1c2a81b98b3d09f/releases/64e8ecf5614af8af40953cf4/img/pepicons-pop-dollar@2x.png"
              className="icon"
              alt="icon"
            />
          </div>
        </div>
      </div>

      <hr className="hr" />
    </div>
  );
};

export default PriceCard;
