import React from 'react';
import '../css/SelectedItemMap.css';

import { Card, CardTitle } from 'reactstrap';

class SelectedItemMap extends React.Component {

    render() {
        // console.log(this.props);
        // const { geo, id, name, addr, remain_stat, stock_at, lat, lng, getDistanceFromLatLonInKm, handleClick } = this.props;
        const { geo, selectedItemMap, getDistanceFromLatLonInKm } = this.props;

        const { name, addr, remain_stat, stock_at, lat, lng } = selectedItemMap;

        // const { id, geo, name, addr, remain_stat, stock_at, lat, lng, getDistanceFromLatLonInKm } = this.props;

        return (
            <div className={`card-item ${remain_stat}`} >
                <Card className={`innerbody ${remain_stat}`}>
                    <div className="mask_name_distance">
                        <CardTitle className={`mask_name ${remain_stat}`}>{name}</CardTitle>

                        <CardTitle className="distance">{getDistanceFromLatLonInKm(geo[0], geo[1], lat, lng)}km</CardTitle>
                    </div>

                    <CardTitle className={`mask_addr ${remain_stat}`}>{addr}</CardTitle>
                    {/* <CardText>{addr}</CardText> */}
            
                    <CardTitle className={`mask_remain ${remain_stat}`}>
                        <div className={`mask_remain_color ${remain_stat}`}></div>
                        <div className="mask_remain_text">
                            재고 :
                                {remain_stat === 'plenty' ? ' 100개 이상' :
                                (remain_stat === 'some' ? ' 30개 이상 100개미만' :
                                    (remain_stat === 'few' ? ' 2개 이상 30개 미만' :
                                        (remain_stat === 'empty' ? ' 1개 이하' : ' 판매중지')))}
                        </div>
                    </CardTitle>

                    <CardTitle className={`mask_stock ${stock_at === null ? 'none_stock' : 'ok_stock'} ${remain_stat}`}>
                        입고시간 : {stock_at === null ? '입고정보없음' : stock_at}
                    </CardTitle>
                </Card>
            </div>
        );
    }
}

export default SelectedItemMap;