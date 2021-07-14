import * as React from "react";
import { GeolocatedProps, geolocated } from "react-geolocated";

interface IDemoProps {
    label: string;
}

class Demo extends React.Component<  GeolocatedProps> {
    render(): JSX.Element {
        return (
            <div>
                latitude: {this.props.coords && this.props.coords.latitude}
                longitude: {this.props.coords && this.props.coords.longitude}
            </div>
        );
    }
}

export default geolocated()(Demo);