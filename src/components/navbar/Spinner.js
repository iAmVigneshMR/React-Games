import React, { Fragment } from 'react';
import "./../../css/spinner.css";

const Spinner = () => {
    return (
        <Fragment>
            <div id="spinner">
                <div className="loader-container">
                    <div className="loader">
                        <div className="sk-chase">
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                        </div>
                        <p className="spnh1">Loading ...</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Spinner