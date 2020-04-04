/*global kakao*/
import React from 'react';

import '../css/ItemMapList.css';
import '../css/KakaoStyle.css';;

// import { Card, CardTitle } from 'reactstrap';

class ItemMapList extends React.Component {
// const ItemMapList = (props) => {
    // constructor(props) {
    //     super(props);
    // }

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
        let mapOption = {
            center: new kakao.maps.LatLng(lat, lng),    // 지도의 중심좌표
            level: 3    // 지도의 확대 레벨
        }
        const map = new kakao.maps.Map(mapContainer, mapOption);    // 지도 생성
        // ===================================================================================================
        



        // 중심좌표 커스텀 마커 이미지 생성 및 마커 출력
        // ===================================================================================================
        let centerImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
            centerImageSize = new kakao.maps.Size(32, 34), // 마커이미지의 크기입니다
            centerImageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        let centerMarkerImage = new kakao.maps.MarkerImage(centerImageSrc, centerImageSize, centerImageOption);

        // 중심좌표에 마커 넣기
        let centerLatLng = new kakao.maps.LatLng(lat, lng);
        const centerMarker = new kakao.maps.Marker({
            map: map,   // 마커를 표시할 지도
            position: centerLatLng,   // 마커의 위치
            image: centerMarkerImage
        });
        // ===================================================================================================



        // 약국리스트
        // ===================================================================================================
        let positions = items;
        // ===================================================================================================


        // 마커 이미지 주소
        // const imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";


        // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다.
        // const iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        //     iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성합니다
        // var infowindow = new kakao.maps.InfoWindow({
        //     content : iwContent,
        //     removable: iwRemoveable
        // });


        
        // 내 주변 약국 리스트 마커 이미지 생성
        // https://k.kakaocdn.net/dn/1aitv/btqC3NxkUjj/kZKQNSCjnxYS0lorLaiiM0/img.png
        // ===================================================================================================
        const imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'; // 마커이미지의 주소입니다    
        const imageSize = new kakao.maps.Size(40, 44); // 마커이미지의 크기입니다
            // const imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        const imageOption = null;

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        // ===================================================================================================
        

        // 내 주변 약국 리스트 마커 출력
        // ===================================================================================================
        for(let index = 0; index < positions.length; index++) {
            
            // 마커의 위도 경도 설정
            let latlng = new kakao.maps.LatLng(positions[index].lat, positions[index].lng);
            
            // 마커 생성
            let marker = new kakao.maps.Marker({
                // 마커를 표시할 지도
                map: map,
                // 마커 위치
                position: latlng,
                // 마커 이미지
                image: markerImage
            });
            

            // 마커 위에 커스텀오버레이를 표시합니다
            // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
            const overlay = new kakao.maps.CustomOverlay({
                clickable: true,
                xAnchor: 2,
                yAnchor: 5,
                zIndex: 1,
                // content: content,
                map: map,
                position: latlng
            });

            const makeClickListener = () => {
                const content = makeContent();
                overlay.setContent(content);
                overlay.setMap(map);
            }

            const closeOverlay = function() {
                overlay.setMap(null);
            }


            const makeContent = () => {
                const item = positions[index];

                // 커스텀 오버레이 엘리먼트를 만들고, 컨텐츠를 추가합니다
                let content = document.createElement('div');
                content.className = 'wrap';

                let html = '';
                html +=     '<div class="info">';
                html +=         '<div class="title">';
                html +=             item.name; 
                html +=             '<div class="close" title="닫기" onclick="{closeOverlay();}"></div>';
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

                return content;
            }

            // 마커에 click 이벤트 설정
            kakao.maps.event.addListener(marker, "click", function() {
                makeClickListener();
            });

            kakao.maps.event.addListener(map, "click", function() {
                closeOverlay();
            });
            
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