/*global kakao*/
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import ItemMap from './ItemMap';

import '../css/ItemMapList.css';
import '../css/KakaoStyle.css';;

// import { Card, CardTitle } from 'reactstrap';

class ItemMapList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getKaKaoMapMarker();
    }

    getKaKaoMapMarker = () => {
        const { geo, items, getDistanceFromLatLonInKm } = this.props;
        // console.log(items);

        // 지도 생성
        // ===================================================================================================
        const lat = geo[0];
        const lng = geo[1];
        const mapContainer = document.getElementById('mapList');

        const mapOption = {
            center: new kakao.maps.LatLng(lat, lng),    // 지도의 중심좌표
            level: 4    // 지도의 확대 레벨
        }
        const map = new kakao.maps.Map(mapContainer, mapOption);    // 지도 생성
        // ===================================================================================================
        

        // 중심좌표(나의 위치) 커스텀 마커 이미지 생성 및 마커 출력
        // ===================================================================================================
        const centerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지의 주소입니다    
        const centerImageSize = new kakao.maps.Size(32, 34); // 마커이미지의 크기입니다
        const centerImageOption = {
            offset: new kakao.maps.Point(27, 69)
        }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const centerMarkerImage = new kakao.maps.MarkerImage(centerImageSrc, centerImageSize, centerImageOption);

        // 중심좌표 위도, 경도를 설정합니다
        const centerLatLng = new kakao.maps.LatLng(lat, lng);

        // 중심좌표에 마커 넣기
        const centerMarker = new kakao.maps.Marker({
            map: map,   // 마커를 표시할 지도
            position: centerLatLng,   // 마커의 위치
            image: centerMarkerImage
        });
        // ===================================================================================================



        // 약국 리스트 입니다.
        // ===================================================================================================
        let positions = items;
        // ===================================================================================================


        // 마커 이미지 주소 모음
        // ===================================================================================================
        // http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png
        // http://t1.daumcdn.net/mapjsapi/images/2x/marker.png
        // https://k.kakaocdn.net/dn/1aitv/btqC3NxkUjj/kZKQNSCjnxYS0lorLaiiM0/img.png
        // http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png
        // https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png
        // https://i1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png
        // ===================================================================================================

        
        // 내 주변 약국 리스트 마커 이미지 생성
        // ===================================================================================================
        const storesImageSrc = 'http://t1.daumcdn.net/mapjsapi/images/2x/marker.png'; // 마커이미지의 주소입니다    
        const storesImageSize = new kakao.maps.Size(32, 34); // 마커이미지의 크기입니다
            // const imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        const storesImageOption = null;

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const storesMarkerImage = new kakao.maps.MarkerImage(storesImageSrc, storesImageSize, storesImageOption);
        // ===================================================================================================

        



        const makeMarkerAndInfoWindow = (item) => {
            // console.log(item);

            // Stores Marker And InfoWindow 생성
            // ===================================================================================================
            
            // 마커 위치
            const storesLatLng = new kakao.maps.LatLng(item.lat, item.lng);
            // 마커를 생성합니다
            const storesMarker = new kakao.maps.Marker({
                map: map,
                position: storesLatLng,
                image: storesMarkerImage
            });

            // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            // let storesContent = document.createElement('div');
            // storesContent.className = "customoverlay";

            let storesContent = '';
            storesContent += '<div class="customoverlay custom-overlay-xx">';
            storesContent +=     '<a href="https://map.kakao.com/link/map/11394059" target="_blank">';
            storesContent +=         '<span class="title">구의야구공원</span>';
            storesContent +=     '</a>';
            storesContent += '</div>';

            // storesContent.innerHTML = html;


            // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            // let storesContent = '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>';
            let iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
            // "https://i1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";

            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                position : storesLatLng, 
                content : storesContent,
                removable  : iwRemoveable
            });
        
            kakao.maps.event.addListener(storesMarker, 'click', function() {
                infowindow.open(map, storesMarker);
            });
        }

        // 내 주변 약국 리스트 마커 출력
        // ===================================================================================================
        for(let nIdx = 0; nIdx < positions.length; nIdx++) {
            // 마커와 커스텀오버레이를 생성합니다
            makeMarkerAndInfoWindow(positions[nIdx]);
        }
        // ===================================================================================================
    }

    render() {
        return (
            <div className="item-map-list">
                <div id="mapList"></div>
            </div>
        );
    }
}

export default ItemMapList;