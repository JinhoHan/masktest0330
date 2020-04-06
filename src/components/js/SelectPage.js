import React from 'react';
import { Link } from "react-router-dom";

import '../css/SelectPage.css';


class SelectPage extends React.Component {

    acceptLocationCheck = (e) => {
        const { getAcceptLocationInformation } = this.props;

        if(!window.confirm("위치정보확인에 동의하십니까?")) {
            e.preventDefault();
            getAcceptLocationInformation(false);
            return;
        }
        getAcceptLocationInformation(true);
    }

    render () {
        return (
            <div className={`select-condition-box`}>
                <div className="select-codition-content">
                    <div className="select-codition-text">
                        내 주변 마스크는 어디에?
                    </div>
                    <div className="select-condition-button">
                        <Link id="select-button" className="select-button" onClick={this.acceptLocationCheck} to="/list" >위치정보동의</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectPage;