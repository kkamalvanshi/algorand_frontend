import React, { Fragment } from "react";

const NFTInfo = () => {
    return (<Fragment>
        <section className = "info-container">
            <section className = "nftinfo button2">
                <div>
                    Name: Starship Robot
                </div>
                <div>
                    Description: Robots that deliver food on Purdue campus
                </div>
                <div>
                    Contract: 0x12345
                </div>
                <div>
                    Token: 123
                </div>
                <div>
                    Seller: 0x1
                </div>
            </section>
        </section>
        </Fragment>
    );
}

export default NFTInfo;