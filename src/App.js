import React from 'react';

import SelectPage from './components/js/SelectPage';
import ItemList from './components/js/ItemList';
import ItemMapList from './components/js/ItemMapList';
import Header from './components/js/Header';
import SelectedBox from './components/js/SelectedBox';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			geo: [],
			address: [],
			items: [],
			distance: 1000,
			selectStoreType: null,
			selectedItem: null,
			selectedItemMap: null,

			// acceptLocationInformation: false
			acceptLocationInformation: true
			// map이나 list 에서 새로고침을 할 경우.. url은 그대로 /masktest0330/list(또는 map)을 유지하지만..
			// 해당 값이 false 여서 화면이 제대로 표시되지 않음. 그래서 true 로 변경하는 꼼수 사용.
			// 앞에서 위치확인 비동의를 할 경우에 경로 이동을 시켜주지 않기때문에..
		}
	}

	componentDidMount() {
		if(this.state.acceptLocationInformation) {
			this.getGeolocation();
		}
	}

	getAcceptLocationInformation = (bool) => {
		if(bool === true) {
			this.setState({ acceptLocationInformation: bool }, (state) => {
				this.getGeolocation();
			});
		}
	}

	getAddressToGeolocation = (addressObject) => {
		if(addressObject !== null) {
			this.setState({ address: addressObject.roadAddress });
			this.handleSuccess(addressObject);
		}
	}

	getDistanceToUser = (distanceObject) => {
		if(this.state.distance !== distanceObject) {
			let distance = distanceObject *1;
			this.setState({ distance: distance }, (state) => {
				console.log(this.state.distance);
				this.handleSuccess(null);
			});
		}
	}

	getGeolocation = () => {
		if(!navigator.geolocation) {
			alert("현재위치찾기를 지원하지 않는 브라우저 입니다. 혹은 설정에서 위치정보 접근 권한을 허용해주세요");
		} else {
			this.setState({ address: null });
			navigator.geolocation.getCurrentPosition(this.handleSuccess, this.handleError);
		}
	}

	handleError = (error) => {
		// console.log(error.code);
		alert("현재위치를 받아오는데 실패했습니다");
	}

	handleSuccess = (position) => {
		console.log(position);
		if(position !== null) {
			const geo = [position.coords.latitude, position.coords.longitude];
			// const latitude = geo[0];
			// const longitude = geo[1];
			// console.log(latitude + " ::: " + longitude);
			// console.log(this.state.distance);
			this.setState({geo: geo});
		}
		// console.log(this.state.geo[0]);
		// console.log(this.state.geo[1]);
		// console.log(this.state.distance);

		let url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=" + this.state.geo[0] + "&lng=" + this.state.geo[1] + "&m=" + this.state.distance;
		// console.log(url);

		fetch(url)
			.then(res => {
				if(!res.ok) {
					throw new Error(res.status);
				}
				return res.json();
			})
			.then(mask => this.setState({items: mask.stores}))
			.catch(err => console.log(err))
	}

	getDistanceFromLatLonInKm = (lat1, lng1, lat2, lng2) => {
		const R = 6371; // Radius of the earth in km
		const dLat = this.getDegreesToRadians(lat2 - lat1);  // degreesToRadians below
		const dLon = this.getDegreesToRadians(lng2 - lng1);
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.getDegreesToRadians(lat1)) * Math.cos(this.getDegreesToRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		let d = R * c; // Distance in km
		d = d.toFixed(2);
		return d;
	}

	getDegreesToRadians = (deg) => {
		return deg * (Math.PI / 180);
	}

	handleClick = (item) => {
		this.setState({ selectedItem: item });
	}

	handleRemove = () => {
		this.setState({ selectedItem: null });
	}
	
	render() {
		return (
			<Router>
				<Switch>
					{
						this.state.acceptLocationInformation &&
						<Route path="/masktest0330/list" component={() => 
							<>
								<Header 
									geo={this.state.geo}
									distance={this.state.distance}
									address={this.state.address}
									getGeolocation={this.getGeolocation}
									getAddressToGeolocation={this.getAddressToGeolocation}
									getDistanceToUser={this.getDistanceToUser}
								/>
								<ItemList
									geo={this.state.geo}
									items={this.state.items}
									getDistanceFromLatLonInKm={this.getDistanceFromLatLonInKm}
									handleClick={this.handleClick} />
									{this.state.selectedItem && <SelectedBox
																	geo={this.state.geo}
																	selectedItem={this.state.selectedItem}
																	getDistanceFromLatLonInKm={this.getDistanceFromLatLonInKm}
																	handleRemove={this.handleRemove} />
									}
							</>
						} 
						/>
					}

					{
						this.state.acceptLocationInformation &&
						<Route path="/masktest0330/map" component={() => 
							<>
								<Header 
									geo={this.state.geo}
									distance={this.state.distance}
									address={this.state.address}
									getGeolocation={this.getGeolocation}
									getAddressToGeolocation={this.getAddressToGeolocation}
									getDistanceToUser={this.getDistanceToUser}
								/>
								<ItemMapList
									geo={this.state.geo}
									items={this.state.items}
									getDistanceFromLatLonInKm={this.getDistanceFromLatLonInKm}
									/>
							</>
						} 
						/>
					}

					<Route path="/masktest0330" component={() => 
						<SelectPage 
							getAcceptLocationInformation={this.getAcceptLocationInformation}
						/>
					} 
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;