import React from 'react';
import Item from './Item';

import '../css/ItemList.css';

class ItemList extends React.Component {

    render() {
        // console.log(this.props);
        const { geo, items, getDistanceFromLatLonInKm, handleClick } = this.props;
        // console.log(items);

        const itemList = items.map (
            ( item ) => (
                <Item
                    geo={geo}
                    item={item}
                    key={item.code}
                    getDistanceFromLatLonInKm={getDistanceFromLatLonInKm}
                    handleClick={handleClick} />
            )
        )

        return (
            <div className="item-list">
                {itemList}
            </div>
        );
    }
}

export default ItemList;