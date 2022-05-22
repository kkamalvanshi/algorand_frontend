import React, { Fragment } from "react";

const NFTInfo = () => {
    return (<Fragment>
        <section className = "info-container">
            <section className = "makeoffer button2">
                <div>
                    Make an Offer:
                </div>
                <div>
                    <input placeholder = "#"></input>
                </div>
                <div>
                    <input placeholder = "Currency"></input>
                </div>
                <div>
                    <button>Bid</button>
                </div>
            </section>
        </section>
        </Fragment>
    );
}

export default NFTInfo;