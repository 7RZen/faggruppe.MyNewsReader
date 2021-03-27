import React, { Component } from 'react';

export class NewsOutlet extends Component {
    constructor (props) {
        super(props);
        this.selectNewsOutlet = this.selectNewsOutlet.bind(this);
    }

    selectNewsOutlet(outlet) {
        this.props.setActiveNewsOutlet(outlet);
    }

    render() {
        const outlet = this.props.data;
        const isActiveCss = this.props.selectedOutlet === outlet.tag ? " active" : "";

        return (
            <button type="button" className={"list-group-item list-group-item-action" + isActiveCss} onClick={() => this.selectNewsOutlet(outlet.tag)}>{outlet.name}</button>
        );
    }
}
