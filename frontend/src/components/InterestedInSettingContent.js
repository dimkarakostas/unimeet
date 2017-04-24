import React, { Component } from 'react';

class InterestedInSettingContent extends Component {
    isActive = () => {
        return 'modal-tab-content ' + ((this.props.active === this.props.option) ? 'active' : '');
    }

    render() {
        return (
            <div className={this.isActive()}>
                <div className="interested-in-setting">
                    <h4>Interested in</h4><hr/>
                </div>
            </div>
        );
    }
}

export default InterestedInSettingContent;
