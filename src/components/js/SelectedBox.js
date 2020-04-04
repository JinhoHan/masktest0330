import React from 'react';
import '../css/SelectedBox.css';
import SelectedItem from './SelectedItem';


class SelectedBox extends React.Component {

    render() {
        const { geo, selectedItem, getDistanceFromLatLonInKm, handleRemove } = this.props;
        // console.log(selectedItem);

        return (
            <div>
                <div className={`item-detail-overlay show`} onClick={handleRemove}>
                </div>
                <div className={`item-detail show`}>
                    <SelectedItem
                        geo={geo}
                        name={selectedItem.name}
                        addr={selectedItem.addr}
                        remain_stat={selectedItem.remain_stat}
                        stock_at={selectedItem.stock_at}
                        lat={selectedItem.lat}
                        lng={selectedItem.lng}
                        id={selectedItem.code}
                        key={selectedItem.code}
                        getDistanceFromLatLonInKm={getDistanceFromLatLonInKm} />
                </div>
            </div>
        );
    }
}

export default SelectedBox;