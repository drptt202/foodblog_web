import React, {Component} from "react";
import background from "../../images/auth/background.svg";

class President extends Component {
    render() {
        return (
            <div className="auth" style={{backgroundImage: `url(${background})`}}>
                <div className="antd-pro-layouts-user-layout-content">
                    <div className="antd-pro-layouts-user-layout-top">
                    </div>
                    <div className="antd-pro-pages-user-login-index-main">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default President