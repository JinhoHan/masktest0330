/*global kakao*/
import React from 'react';

import '../css/SelectedItem.css';
import { Card, CardTitle } from 'reactstrap';

class SelectedItem extends React.Component {

    componentDidMount() {

        const { lat, lng, name } = this.props;

        const mapContainer = document.getElementById('map'); // 지도를 표시할 div 
        const mapOption = { 
            center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
            level: 4 // 지도의 확대 레벨
        };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption);
        

        // 마커가 표시될 위치입니다.
        const markerPosition  = new kakao.maps.LatLng(lat, lng);

        // 중심좌표 커스텀 마커 이미지 생성
        // ===================================================================================================
        const centerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지의 주소입니다    
        const centerImageSize = new kakao.maps.Size(40, 44); // 마커이미지의 크기입니다
        const centerImageOption = null; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const centerMarkerImage = new kakao.maps.MarkerImage(centerImageSrc, centerImageSize, centerImageOption);
        // ===================================================================================================


        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
            position: markerPosition,
            image: centerMarkerImage
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);


        // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        // ===================================================================================================
        let content = document.createElement("div");
        content.className = "customoverlay";


        // https://map.kakao.com/link/map/우리회사,37.402056,127.108212

        const kakaoMapCallAddr = name + "," + lat + "," + lng;
        
        let html = '';
        html +=     '<a href="https://map.kakao.com/link/map/' + kakaoMapCallAddr + '" target="_blank">';
        html +=         '<span class="title">' + name + '</span>';
        html +=     '</a>';

        content.innerHTML = html;
        // ===================================================================================================

        // 커스텀 오버레이가 표시될 위치입니다
        const overlayPosition = marker.getPosition();

        // 커스텀 오버레이를 생성합니다.
        // const customOverlay = new kakao.maps.CustomOverlay({
        //     map: map,
        //     position: overlayPosition,
        //     content: content,
        //     yAnchor: 0.3
        // });
        new kakao.maps.CustomOverlay({
            map: map,
            position: overlayPosition,
            content: content,
            yAnchor: 0.3
        });
    }

    render() {
        const { geo, name, addr, remain_stat, stock_at, lat, lng, getDistanceFromLatLonInKm } = this.props;

        return (
            <div className={`card-item`} >
                <Card className={`innerbody selected-item`}>
                    <CardTitle className={`mask_name`}>{name}</CardTitle>

                    <CardTitle className="distance selected-item">{getDistanceFromLatLonInKm(geo[0], geo[1], lat, lng)} km</CardTitle>

                    <CardTitle className={`mask_addr `}>{addr}</CardTitle>

                    <CardTitle className={`mask_remain`}>
                        <div className={`mask_remain_color`}></div>
                        <div className="mask_remain_text">
                            재고 :
                                {remain_stat === 'plenty' ? ' 100개 이상' :
                                (remain_stat === 'some' ? ' 30개 이상 100개미만' :
                                    (remain_stat === 'few' ? ' 2개 이상 30개 미만' :
                                        (remain_stat === 'empty' ? ' 1개 이하' : ' 판매중지')))}
                        </div>
                    </CardTitle>

                    <CardTitle className={`mask_stock`}>
                        입고시간 : {stock_at === null ? '입고정보없음' : stock_at}
                    </CardTitle>
                </Card>
                <Card id="map" className="kakao_map"></Card>
            </div>
        );
    }
}

export default SelectedItem;