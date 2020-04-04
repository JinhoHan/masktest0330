/*global kakao*/
import React from 'react';

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

        

        const closeOverlay = (overlay) => {
            overlay.setMap(null);
        }


        const makeMarkerAndCustomOverlay = (item) => {
            // console.log(item);

            // 마커의 위도 경도를 설정합니다
            const storesLatLng = new kakao.maps.LatLng(item.lat, item.lng);

            // 마커를 생성합니다
            const storesMarker = new kakao.maps.Marker({
                map: map,
                position: storesLatLng,
                image: storesMarkerImage

            });

            // 마커 위에 커스텀오버레이를 표시합니다
            // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
            const overlay = new kakao.maps.CustomOverlay({
                clickable: true,
                // xAnchor: 2,
                // yAnchor: 5,
                zIndex: 1,
                // content: content,
                // map: map,
                position: storesLatLng
            });

            // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            // ===================================================================================================
            // let content = document.createElement("div");
            // content.className = "customoverlay";


            // // https://map.kakao.com/link/map/우리회사,37.402056,127.108212

            // const kakaoMapCallAddr = name + "," + lat + "," + lng;
            
            // let html = '';
            // html +=     '<a href="https://map.kakao.com/link/map/' + kakaoMapCallAddr + '" target="_blank">';
            // html +=         '<span class="title">' + name + '</span>';
            // html +=     '</a>';

            // content.innerHTML = html;
            // ===================================================================================================

            // 커스텀 오버레이 엘리먼트를 만들고, 컨텐츠를 추가합니다
            let content = document.createElement('div');
            content.className = 'wrap';

            let closeBtn = document.createElement('div');
            closeBtn.className = "close";
            // closeBtn.innerHTML = '<div class="close" title="닫기" onclick="{closeOverlay(overlay);}"></div>';

            closeBtn.onclick = function () {
                overlay.setMap(null);
            };

            let html = '';
            html +=     '<div class="info">';
            html +=         '<div class="title">';
            html +=             '<div class="xxxxx">' + item.name + '</div>'; 
            html +=             '<div class="close" id="kkk" title="닫기" onclick="{closeOverlay(overlay)}"></div>';
            html +=         '</div>';
            html +=         '<div class="body">';
            html +=             '<div class="desc">';
            html +=                 '<div class="ellipsis">주소 : ' + item.addr + '</div>';
            html +=                 '<div class="ellipsis">재고 : ' + item.remain_stat + '</div>';
            html +=                 '<div class="ellipsis">입고 시간 : ' + item.stock_at + '</div>';
            html +=             '</div>';
            html +=         '</div>';
            html +=     '</div>'; 
            
            content.innerHTML = html;

            overlay.setContent(content);
        
            kakao.maps.event.addListener(storesMarker, 'click', function() {
                overlay.setMap(map);
            });
        }

        // 내 주변 약국 리스트 마커 출력
        // ===================================================================================================
        for(let nIdx = 0; nIdx < positions.length; nIdx++) {
            // 마커와 커스텀오버레이를 생성합니다
            makeMarkerAndCustomOverlay(positions[nIdx]);
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