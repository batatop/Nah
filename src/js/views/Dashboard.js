import React from "react";
var ProgressBar = require('react-progressbar.js');
var Circle = ProgressBar.Circle;

export default class Featured extends React.Component {
    render() {
        const cardStyle = {
            width: "90%"
        };

        return (
            <div>
                <h1>Dashboard</h1>
                <div class="mdl-grid">
                    <div class="mdl-cell mdl-cell--6-col wide-card mdl-card mdl-shadow--2dp">
                        <div class="mdl-card__title">
                            <h2 class="mdl-card__title-text">Product Name</h2>
                            <h4 class="mdl-card__subtitle-text">Affiliated Person</h4>
                        </div>
                        <div class="mdl-card__supporting-text">
                            stock/in production
                        </div>
                        <div class="mdl-card__actions mdl-card--border">
                            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
