(this.webpackJsonpmasktest0330=this.webpackJsonpmasktest0330||[]).push([[0],{31:function(e,a,t){e.exports=t(60)},36:function(e,a,t){},37:function(e,a,t){},43:function(e,a,t){},44:function(e,a,t){},45:function(e,a,t){},46:function(e,a,t){},47:function(e,a,t){},48:function(e,a,t){},49:function(e,a,t){},57:function(e,a,t){},58:function(e,a,t){},60:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),c=t(15),s=t.n(c),r=(t(36),t(6)),i=t(7),l=t(8),m=t(9),u=t(13),d=(t(37),o.a.Component,t(43),t(61)),k=t(62),p=function(e){Object(m.a)(t,e);var a=Object(l.a)(t);function t(){return Object(r.a)(this,t),a.apply(this,arguments)}return Object(i.a)(t,[{key:"render",value:function(){var e=this.props,a=e.geo,t=e.item,n=e.getDistanceFromLatLonInKm,c=e.handleClick,s=t.name,r=t.addr,i=t.remain_stat,l=t.stock_at,m=t.lat,u=t.lng;return o.a.createElement("div",{className:"card-item ".concat(i)},o.a.createElement(d.a,{className:"innerbody ".concat(i),onClick:function(){return c(t)}},o.a.createElement("div",{className:"mask_name_distance"},o.a.createElement(k.a,{className:"mask_name ".concat(i)},s),o.a.createElement(k.a,{className:"distance"},n(a[0],a[1],m,u)," km")),o.a.createElement(k.a,{className:"mask_addr ".concat(i)},r),o.a.createElement(k.a,{className:"mask_remain ".concat(i)},o.a.createElement("div",{className:"mask_remain_color ".concat(i)}),o.a.createElement("div",{className:"mask_remain_text"},"\uc7ac\uace0 :","plenty"===i?" 100\uac1c \uc774\uc0c1":"some"===i?" 30\uac1c \uc774\uc0c1 100\uac1c\ubbf8\ub9cc":"few"===i?" 2\uac1c \uc774\uc0c1 30\uac1c \ubbf8\ub9cc":"empty"===i?" 1\uac1c \uc774\ud558":" \ud310\ub9e4\uc911\uc9c0")),o.a.createElement(k.a,{className:"mask_stock ".concat(null===l?"none_stock":"ok_stock"," ").concat(i)},"\uc785\uace0\uc2dc\uac04 : ",null===l?"\uc785\uace0\uc815\ubcf4\uc5c6\uc74c":l)))}}]),t}(o.a.Component),g=(t(44),o.a.Component,t(45),t(46),t(47),o.a.Component,t(22),t(48),t(49),t(63),t(64),t(68),t(65),t(66),t(67),t(57),t(58),function(e){Object(m.a)(t,e);var a=Object(l.a)(t);function t(){return Object(r.a)(this,t),a.apply(this,arguments)}return Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,a=e.lat,t=e.lng,n=e.name,o=document.getElementById("map"),c={center:new kakao.maps.LatLng(a,t),level:4},s=new kakao.maps.Map(o,c),r=new kakao.maps.LatLng(a,t),i=new kakao.maps.Size(40,44),l=new kakao.maps.MarkerImage("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",i,null),m=new kakao.maps.Marker({position:r,image:l});m.setMap(s);var u=document.createElement("div");u.className="customoverlay";var d="";d+='<a href="https://map.kakao.com/link/map/'+(n+","+a+","+t)+'" target="_blank">',d+='<span class="title">'+n+"</span>",d+="</a>",u.innerHTML=d;var k=m.getPosition();new kakao.maps.CustomOverlay({map:s,position:k,content:u,yAnchor:.3})}},{key:"render",value:function(){var e=this.props,a=e.geo,t=e.name,n=e.addr,c=e.remain_stat,s=e.stock_at,r=e.lat,i=e.lng,l=e.getDistanceFromLatLonInKm;return o.a.createElement("div",{className:"card-item"},o.a.createElement(d.a,{className:"innerbody selected-item"},o.a.createElement(k.a,{className:"mask_name"},t),o.a.createElement(k.a,{className:"distance selected-item"},l(a[0],a[1],r,i)," km"),o.a.createElement(k.a,{className:"mask_addr "},n),o.a.createElement(k.a,{className:"mask_remain"},o.a.createElement("div",{className:"mask_remain_color"}),o.a.createElement("div",{className:"mask_remain_text"},"\uc7ac\uace0 :","plenty"===c?" 100\uac1c \uc774\uc0c1":"some"===c?" 30\uac1c \uc774\uc0c1 100\uac1c\ubbf8\ub9cc":"few"===c?" 2\uac1c \uc774\uc0c1 30\uac1c \ubbf8\ub9cc":"empty"===c?" 1\uac1c \uc774\ud558":" \ud310\ub9e4\uc911\uc9c0")),o.a.createElement(k.a,{className:"mask_stock"},"\uc785\uace0\uc2dc\uac04 : ",null===s?"\uc785\uace0\uc815\ubcf4\uc5c6\uc74c":s)),o.a.createElement(d.a,{id:"map",className:"kakao_map"}))}}]),t}(o.a.Component)),f=(o.a.Component,t(14),function(e){Object(m.a)(t,e);var a=Object(l.a)(t);function t(e){var n;return Object(r.a)(this,t),(n=a.call(this,e)).getAcceptLocationInformation=function(e){!0===e&&n.setState({acceptLocationInformation:e},(function(e){n.getGeolocation()}))},n.getAddressToGeolocation=function(e){null!==e&&(n.setState({address:e.roadAddress}),n.handleSuccess(e))},n.getDistanceToUser=function(e){if(n.state.distance!==e){var a=1*e;n.setState({distance:a},(function(e){console.log(n.state.distance),n.handleSuccess(null)}))}},n.getGeolocation=function(){navigator.geolocation?(n.setState({address:null}),navigator.geolocation.getCurrentPosition(n.handleSuccess,n.handleError)):alert("\ud604\uc7ac\uc704\uce58\ucc3e\uae30\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\ub294 \ube0c\ub77c\uc6b0\uc800 \uc785\ub2c8\ub2e4. \ud639\uc740 \uc124\uc815\uc5d0\uc11c \uc704\uce58\uc815\ubcf4 \uc811\uadfc \uad8c\ud55c\uc744 \ud5c8\uc6a9\ud574\uc8fc\uc138\uc694")},n.handleError=function(e){alert("\ud604\uc7ac\uc704\uce58\ub97c \ubc1b\uc544\uc624\ub294\ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4")},n.handleSuccess=function(e){if(console.log(e),null!==e){var a=[e.coords.latitude,e.coords.longitude];n.setState({geo:a})}var t="https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat="+n.state.geo[0]+"&lng="+n.state.geo[1]+"&m="+n.state.distance;fetch(t).then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then((function(e){return n.setState({items:e.stores})})).catch((function(e){return console.log(e)}))},n.getDistanceFromLatLonInKm=function(e,a,t,o){var c=n.getDegreesToRadians(t-e),s=n.getDegreesToRadians(o-a),r=Math.sin(c/2)*Math.sin(c/2)+Math.cos(n.getDegreesToRadians(e))*Math.cos(n.getDegreesToRadians(t))*Math.sin(s/2)*Math.sin(s/2),i=6371*(2*Math.atan2(Math.sqrt(r),Math.sqrt(1-r)));return i=i.toFixed(2)},n.getDegreesToRadians=function(e){return e*(Math.PI/180)},n.handleClick=function(e){n.setState({selectedItem:e})},n.handleRemove=function(){n.setState({selectedItem:null})},n.state={geo:[],address:[],items:[],distance:1e3,selectStoreType:null,selectedItem:null,selectedItemMap:null,acceptLocationInformation:!0},n}return Object(i.a)(t,[{key:"componentDidMount",value:function(){this.state.acceptLocationInformation&&this.getGeolocation()}},{key:"render",value:function(){}}]),t}(o.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(59);s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[31,1,2]]]);
//# sourceMappingURL=main.c3dbf4a5.chunk.js.map