/*global kakao*/
import React from 'react';

import '../css/ItemMapList.css';
import '../css/KakaoStyle.css';
import '../css/MapOverlay.css';



class ItemMapList extends React.Component {

    componentDidMount() {
        this.getKaKaoMapMarker();
    }

    getKaKaoMapMarker = () => {

        // 클릭한 마커를 담을 변수
        let selectedMarker = null;
        // 생성된 overlay 를 담을 변수
        let createdOverlay = null;

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
        // const centerMarker = new kakao.maps.Marker({
        //     map: map,   // 마커를 표시할 지도
        //     position: centerLatLng,   // 마커의 위치
        //     image: centerMarkerImage
        // });
        new kakao.maps.Marker({
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


        // 마커와 커스텀오버레이 생성
        // ===================================================================================================
        const makeMarkerAndCustomOverlay = (item) => {

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
            let overlay = new kakao.maps.CustomOverlay({
                // clickable: true,
                // xAnchor: 0.5,
                yAnchor: 0.7,
                zIndex: 3,
                // content: content,
                map: map,
                position: storesLatLng
            });
            
            // 카카오맵보기 주소
            const kakaoMapCallAddr = item.name + "," + item.lat + "," + item.lng;

            let content = '';
            content +=  '<div class="customoverlay size300">';
            content +=      '<a class="kakao-map-open" href="https://map.kakao.com/link/map/' + kakaoMapCallAddr + '" target="_blank">';
            content +=          '';
            content +=      '</a>';
            content +=      '<div id="size85per" class="card-item '+ item.remain_stat + ' size85per">';
            content +=          '<div class="overlay-innerbody ' + item.remain_stat + ' card left-only-round">';
            content +=              '<div class="overlay-mask-name-distance">';
            content +=                  '<div class="overlay-mask-name ' + item.remain_stat + ' card-title">';
            content +=                      item.name;
            content +=                  '</div>';
            content +=                  '<div class="overlay-distance card-title">';
            content +=                      getDistanceFromLatLonInKm(geo[0], geo[1], item.lat, item.lng) + ' km';
            content +=                  '</div>';
            content +=              '</div>';
            content +=              '<div class="overlay-mask-addr ' + item.remain_stat + ' card-title">';
            content +=                  item.addr;
            content +=              '</div>';
            content +=              '<div class="overlay-mask-remain ' + item.remain_stat + ' card-title">';
            content +=                  '<div class="overlay-mask-remain-color ' + item.remain_stat + '"></div>';
            content +=                  '<div class="overlay-mask-remain-text">';
            content +=                      '재고 : ' + (item.remain_stat === 'plenty' ? ' 100개 이상' :
                                                            (item.remain_stat === 'some' ? ' 30개 이상 100개미만' :
                                                                (item.remain_stat === 'few' ? ' 2개 이상 30개 미만' :
                                                                    (item.remain_stat === 'empty' ? ' 1개 이하' : ' 판매중지'))))
            content +=                  '</div>';
            content +=              '</div>';
            content +=              '<div class="overlay-mask-stock ' + item.remain_stat + ' card-title ' + (item.stock_at === null ? 'none_stock' : 'ok_stock') + '">';
            content +=                  '입고시간 : ' + (item.stock_at === null ? '입고정보없음' : item.stock_at);
            content +=              '</div>';
            content +=          '</div>';
            content +=      '</div>';
            content +=  '</div>';

            // let content = '';
            // content +=  '<div class="customoverlay size300">';
            // content +=      '<a href="https://map.kakao.com/link/map/' + kakaoMapCallAddr + '" target="_blank">';
            // content +=          '<div class="card-item '+ item.remain_stat + ' size90per">';
            // content +=              '<div class="overlay-innerbody ' + item.remain_stat + ' card">';
            // content +=                  '<div class="overlay-mask-name-distance">';
            // content +=                      '<div class="overlay-mask-name ' + item.remain_stat + ' card-title">';
            // content +=                          item.name;
            // content +=                      '</div>';
            // content +=                      '<div class="overlay-distance card-title">';
            // content +=                          getDistanceFromLatLonInKm(geo[0], geo[1], item.lat, item.lng) + ' km';
            // content +=                      '</div>';
            // content +=                  '</div>';
            // content +=                  '<div class="overlay-mask-addr ' + item.remain_stat + ' card-title">';
            // content +=                      item.addr;
            // content +=                  '</div>';
            // content +=                  '<div class="overlay-mask-remain ' + item.remain_stat + ' card-title">';
            // content +=                      '<div class="overlay-mask-remain-color ' + item.remain_stat + '"></div>';
            // content +=                      '<div class="overlay-mask-remain-text">';
            // content +=                          '재고 : ' + (item.remain_stat === 'plenty' ? ' 100개 이상' :
            //                                                         (item.remain_stat === 'some' ? ' 30개 이상 100개미만' :
            //                                                             (item.remain_stat === 'few' ? ' 2개 이상 30개 미만' :
            //                                                                 (item.remain_stat === 'empty' ? ' 1개 이하' : ' 판매중지'))))
            // content +=                      '</div>';
            // content +=                  '</div>';
            // content +=                  '<div class="overlay-mask-stock ' + item.remain_stat + ' card-title ' + (item.stock_at === null ? 'none_stock' : 'ok_stock') + '">';
            // content +=                      '입고시간 : ' + (item.stock_at === null ? '입고정보없음' : item.stock_at);
            // content +=                  '</div>';
            // content +=              '</div>';
            // content +=          '</div>';
            // content +=      '</a>';
            // content +=  '</div>';

        
            kakao.maps.event.addListener(storesMarker, 'click', function() {
                // console.log(selectedMarker);
                // console.log(selectedMarker !== storesMarker);

                // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
                if (!selectedMarker || selectedMarker !== storesMarker) {
                    !!selectedMarker && createdOverlay.setMap(null);

                    overlay.setContent(content);
                    overlay.setMap(map);
                }

                // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
                createdOverlay = overlay;
                selectedMarker = storesMarker;

                // document.getElementById('size85per');
                // console.log(document.getElementById('size85per'));
                document.getElementById('size85per').onclick = function() {
                    createdOverlay.setMap(null);
                    createdOverlay = null;
                    selectedMarker = null;
                }
            });
        }
        // ===================================================================================================



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