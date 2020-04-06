/*global kakao*/
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../css/Header.css';
import '../css/HeaderModal.css';

import { Navbar, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



const Header = ({ getGeolocation, getAddressToGeolocation, address, distance, getDistanceToUser }) => {

    // 모달 창 오픈 클로즈 
    const [modal, setModal] = useState(false);
    const modalToggle = () => {
        setModal(!modal);
    }

    // 거리
    const [ userDistance, setUserDistance ] = useState(distance);
    const handleDistanceChange = (event) => {
        let selectedValue = event.target.value;
        selectedValue = selectedValue *1;
        // console.log(selectedValue);
        setUserDistance(selectedValue);
    }


    const handleKaKaoPostService = () => {
        // console.log("handleKaKaoPostService");

        new window.daum.Postcode({
            oncomplete: function (data) {
                const roadAddress = data.roadAddress; // 길 최종 주소 변수
                // console.log(data);

                document.getElementById('my-location').innerHTML = roadAddress;

                // 주소-좌표 변환 객체를 생성합니다
                let geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색한다
                geocoder.addressSearch(data.roadAddress, function (result, status) {
                    // console.log(result);
                    // console.log(status);
                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {
                        let position = {
                            coords : {
                                latitude : result[0].y,
                                longitude : result[0].x
                            },
                            roadAddress : roadAddress
                        }
                        getAddressToGeolocation(position);
                    }
                });
            }
        }).open();
    }

    return (
        <>
            <Navbar className="navbar fixed-top navbar-light bg-light white" >
                <div className="header__title">
                    <div id="my-location" className="header_text" onClick={() => handleKaKaoPostService()}>
                        {address !== null ? address : '내 위치'}
                    </div>
                    <div className="gps_button" onClick={() => getGeolocation()}>
                        <img className="gps_image" src="https://k.kakaocdn.net/dn/bkl7up/btqC48UZVoy/iu1sMcCNmjuYAlZ4zW8qHK/img.png" alt="" />
                    </div>
                </div>
                <div className="user-button-box">
                    <Link className="btn btn-sm btn-primary toggle-button" to="/list">목록보기</Link>
                    <Link className="btn btn-sm btn-danger toggle-button" to="/map">지도보기</Link>
                    <Button className="user-button btn-sm filter" onClick={modalToggle}>
                        필터&nbsp;
                            <svg className="bi bi-filter" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                            </svg>
                    </Button>
                </div>
            </Navbar>
            <Modal className="user-modal" returnFocusAfterClose={false} isOpen={modal} fade={false}>
                <ModalHeader>내 주변 마스크는 어디에?</ModalHeader>
                <ModalBody>
                    <div>
                        <div className="user-distance">
                            검색 반경
                        </div>
                        <div className="user-distance-select-div">
                            <select id="user-distance-select" className="btn btn-outline-secondary btn-lg user-distance-select" value={userDistance} onChange={handleDistanceChange}>
                                <option className="" value="1000">1km</option>
                                <option className="" value="2000">2km</option>
                                <option className="" value="5000">5km</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        // console.log(document.getElementById('user-distance-select').value);
                        modalToggle();
                        getDistanceToUser(userDistance);
                    }}>
                        완료
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Header;