import React from "react";
import "./SearchListItem.css";

function SearchListItem(props) {
  return (
    <div className="search-items">
      {props.items.map((data) => (
        <div key={data.id} className="search-item">
          <img src={`${data.image_url}`} alt={`${data.name}`}></img>

          <div className="search-desc1">
            <h3>{data.name}</h3>
            <p>{data.distance} from center</p>
            <p className="search__tag">{data.tag}</p>
            <p>
              <strong>{data.description}</strong>
            </p>
            <p>{data.type}</p>
            {data.free_cancel ? (
              <div className="search__cancel">
                <p>
                  <strong>Free cancellation</strong>
                </p>
                <p>You can cancel later, so lock in this great price today!</p>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="search-desc2">
            <div className="search__rate">
              <p>{data.rate_text}</p>
              <p className="search__rate-score">{data.rate}</p>
            </div>
            <div className="search__more">
              <p className="search__price">${data.price}</p>
              <p className="search__tax">Includes taxes and fees</p>
              <button type="button">See availability</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchListItem;
