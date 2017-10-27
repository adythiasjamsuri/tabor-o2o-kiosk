function httpInterceptor(e,r,t){return{request:function(e){return e},responseError:function(r){return console.log(r),r.data&&r.data.error?e.reject(r.data.error.statusCode+" - "+r.data.error.message):e.reject(r.status+" - "+r.statusText)}}}function settings(e){return{pageTitle:"O2O"}}function runBlock(e,r,t,o,n){e.$settings=o,t.onStart({},function(t){n.isLoggedIn()||r.go("authentication.login");var o=t.$to().data;if(o.authorizedRoles){for(var i=n.getUser(),a=!1,d=0,l=o.authorizedRoles.length;d<l;d++)a=a||!!i.roles.find(e=>e.name==o.authorizedRoles[d]);a||r.go("app.home")}e.$settings.pageTitle=o.pageTitle,e.$settings.cartOpen=!1})}function sum(){return function(e,r){return e.reduce(function(e,t){return e+t[r]},0)}}function routeConfig(e,r,t){t.html5Mode(!0),r.otherwise("/"),e.state("authentication",{abstract:!0,views:{root:{templateUrl:"app/layout/auth-layout.html"}}}).state("authentication.login",{url:"/login",templateUrl:"app/authentication/login.html",data:{pageTitle:"Login"},controller:"LoginController",controllerAs:"vm"}).state("app",{abstract:!0,views:{root:{templateUrl:"app/layout/app-layout.html"}}}).state("app.home",{url:"/",templateUrl:"app/home/index.html",data:{pageTitle:"Home"},controller:"HomeController",controllerAs:"vm"}).state("app.product",{url:"/search?:keyword&:brand&:category",templateUrl:"app/product/index.html",data:{pageTitle:"Products"},controller:"ProductController",controllerAs:"vm"}).state("app.checkout",{url:"/checkout",templateUrl:"app/order/checkout.html",data:{pageTitle:"Checkout"},controller:"OrderCheckoutController",controllerAs:"vm"}).state("app.confirm",{url:"/confirm",templateUrl:"app/order/confirm.html",data:{pageTitle:"Confirm Order"},controller:"OrderConfirmController",controllerAs:"vm"}).state("app.confirm-message",{url:"/confirm-message/{code}",templateUrl:"app/order/confirm-message.html",data:{pageTitle:"Confirmation Message Order"},controller:"OrderConfirmMessageController",controllerAs:"vm"}).state("app.notification",{url:"/notification",templateUrl:"app/notification/index.html",data:{pageTitle:"Notifications"},controller:"NotificationController",controllerAs:"vm"}).state("app.order",{url:"/order",templateUrl:"app/order/index.html",data:{pageTitle:"Order",authorizedRoles:["staff"]},controller:"OrderController",controllerAs:"vm"}).state("app.order.history",{url:"/history",templateUrl:"app/order/index.history.html",data:{pageTitle:"History",authorizedRoles:["staff"]},controller:"OrderHistoryController",controllerAs:"vm"}).state("app.order.track",{url:"/track/{code}",templateUrl:"app/order/index.track.html",data:{pageTitle:"Track",authorizedRoles:["staff"]},controller:"OrderTrackController",controllerAs:"vm"}).state("app.order.verify",{url:"/verify",templateUrl:"app/order/index.verify.html",data:{pageTitle:"Verify",authorizedRoles:["staff"]},controller:"OrderVerifyController",controllerAs:"vm"}).state("app.order.draft",{url:"/draft",templateUrl:"app/order/index.draft.html",data:{pageTitle:"Draft",authorizedRoles:["staff"]},controller:"OrderDraftController",controllerAs:"vm"}).state("app.order.checkin",{url:"/check-in",templateUrl:"app/order/index.checkin.html",data:{pageTitle:"Check In",authorizedRoles:["staff"]},controller:"OrderCheckInController",controllerAs:"vm"}).state("app.order.detail",{url:"/{code}",templateUrl:"app/order/index.detail.html",data:{pageTitle:"Order Detail",authorizedRoles:["staff"]},controller:"OrderDetailController",controllerAs:"vm"}).state("app.order-payment",{url:"/order/{code}/payment",templateUrl:"app/order/payment.html",data:{pageTitle:"Order Payment",authorizedRoles:["staff"]},controller:"OrderPaymentController",controllerAs:"vm"}).state("blank",{abstract:!0,views:{root:{templateUrl:"app/layout/blank-layout.html"}}}).state("blank.invoice",{url:"/order/{code}/invoice/{paymentId}",templateUrl:"app/invoice/invoice.html",data:{pageTitle:"Invoice",authorizedRoles:["staff"]},controller:"InvoiceController",controllerAs:"vm"})}function BrandService(e,r){function t(e){return e.data}return{getAll:function(){return e.get(r.BASE_API+"/brands").then(t)}}}function AuthenticationService(e,r){function t(e){return e.data}return{signIn:function(o){return e.post(r.BASE_API+"/users/login",o).then(t)},signOut:function(){return e.post(r.BASE_API+"/users/logout").then(t)},getAuthenticatedUser:function(o){return e.get(r.BASE_API+"/users/"+o).then(t)},getKioskUser:function(o){var n={filter:{where:{UserId:o},include:["Kiosk"]}};return e.get(r.BASE_API+"/kioskusers?"+$.param(n)).then(t)},getRoleUser:function(o){var n={filter:{where:{principalType:"USER",principalId:o},include:{relation:"role"}}};return e.get(r.BASE_API+"/rolemappings?"+$.param(n)).then(t)}}}function CategoryService(e,r){function t(e){return e.data}return{getByBrandCode:function(o){var n={where:{BrandCode:o}};return e.get(r.BASE_API+"/productcategories",{params:{filter:JSON.stringify(n)}}).then(t)}}}function HomeService(){}function NotificationService(e,r){function t(e){return e.data}return{getAllByUserId:function(o,n){var i=n.orderBy.indexOf("+")>-1,a={order:n.orderBy.substring(1)+(i?" ASC":" DESC"),limit:n.limit,skip:(n.page-1)*n.limit,where:{UserId:o}};return e.get(r.BASE_API+"/notifications",{params:{filter:JSON.stringify(a)}}).then(t)},countAllByUserId:function(o,n){var i={UserId:o};return e.get(r.BASE_API+"/notifications/count",{params:{where:JSON.stringify(i)}}).then(t)},getAllUnreadByUserId:function(o,n){var i=n.orderBy.indexOf("+")>-1,a={order:n.orderBy.substring(1)+(i?" ASC":" DESC"),limit:n.limit,skip:(n.page-1)*n.limit,where:{IsRead:0,UserId:o}};return e.get(r.BASE_API+"/notifications",{params:{filter:JSON.stringify(a)}}).then(t)},getTotalUnreadNotifications:function(o){var n={IsRead:0,UserId:o};return e.get(r.BASE_API+"/notifications/count",{params:{where:JSON.stringify(n)}}).then(t)},setRead:function(o){return e.patch(r.BASE_API+"/notifications/"+o,{IsRead:!0}).then(t)}}}function OrderService(e,r){function t(e){return e.data}return{getAll:function(o,n){var i=o.orderBy.indexOf("+")>-1,a={order:o.orderBy.substring(1)+(i?" ASC":" DESC"),limit:o.limit,skip:(o.page-1)*o.limit,where:{and:[{or:[{Code:{like:"%"+o.keyword+"%"}},{Name:{like:"%"+o.keyword+"%"}}]},{KioskCode:n}]}};return e.get(r.BASE_API+"/orders",{params:{filter:JSON.stringify(a)}}).then(t)},countAll:function(o,n){var i={and:[{or:[{Code:{like:"%"+o.keyword+"%"}},{Name:{like:"%"+o.keyword+"%"}}]},{KioskCode:n}]};return e.get(r.BASE_API+"/orders/count?where="+encodeURI(JSON.stringify(i))).then(t)},getAllHistory:function(o,n){var i=o.orderBy.indexOf("+")>-1,a={order:o.orderBy.substring(1)+(i?" ASC":" DESC"),limit:o.limit,skip:(o.page-1)*o.limit,where:{and:[{or:[{Code:{like:"%"+o.keyword+"%"}},{Name:{like:"%"+o.keyword+"%"}}]},{Status:{nin:["DRAFTED","VOIDED"]}},{KioskCode:n}]}};return e.get(r.BASE_API+"/orders",{params:{filter:JSON.stringify(a)}}).then(t)},countAllHistory:function(o,n){var i={and:[{or:[{Code:{like:"%"+o.keyword+"%"}},{Name:{like:"%"+o.keyword+"%"}}]},{Status:{nin:["DRAFTED","VOIDED"]}},{KioskCode:n}]};return e.get(r.BASE_API+"/orders/count?where="+encodeURI(JSON.stringify(i))).then(t)},getAllDraft:function(o,n){var i=o.orderBy.indexOf("+")>-1,a={include:[],order:o.orderBy.substring(1)+(i?" ASC":" DESC"),limit:o.limit,skip:(o.page-1)*o.limit,where:{and:[{or:[{Code:{like:"%"+o.keyword+"%"}},{Name:{like:"%"+o.keyword+"%"}}]},{Status:"DRAFTED"},{KioskCode:n}]}};return e.get(r.BASE_API+"/orders",{params:{filter:JSON.stringify(a)}}).then(t)},countAllDraft:function(o,n){var i={and:[{or:[{Code:{like:"%"+o.keyword+"%"}},{Name:{like:"%"+o.keyword+"%"}}]},{Status:"DRAFTED"},{KioskCode:n}]};return e.get(r.BASE_API+"/orders/count?where="+encodeURI(JSON.stringify(i))).then(t)},getByCode:function(o){return e.get(r.BASE_API+"/orders/"+o,{params:{filter:JSON.stringify({include:[{OrderDetails:["Product","OrderTracks"]},"OrderPayments"]})}}).then(t)},getByCodePIN:function(o,n){var i={where:{Code:o,PIN:n},include:[{OrderDetails:["Product","OrderTracks"]},"OrderPayments"]};return e.get(r.BASE_API+"/orders",{params:{filter:JSON.stringify(i)}}).then(t)},createDraft:function(o){return e.post(r.BASE_API+"/orders/draft",{data:o}).then(t)},updateDraft:function(o){return e.put(r.BASE_API+"/orders/draft",{data:o}).then(t)},voidDraft:function(o){return e.post(r.BASE_API+"/orders/void",{code:o}).then(t)},pay:function(o){return e.post(r.BASE_API+"/orders/payment",{data:o}).then(t)},updatePaymentStatus:function(o){return e.post(r.BASE_API+"/orders/payment-status",{code:o}).then(t)},complete:function(o){return e.post(r.BASE_API+"/orders/complete",{code:o}).then(t)},arrive:function(o){return e.post(r.BASE_API+"/orders/arrive",{code:o}).then(t)},detailArrive:function(o,n){return e.post(`${r.BASE_API}/orders/${o}/orderdetails/${n}/arrive`).then(t)}}}function ShippingService(e,r){function t(e){return e.data}return{getPricings:function(o,n,i){var a={origin:o,destination:n,weight:i};return e.post(r.BASE_API+"/orders/shipping/pricings",a).then(t)},getLocations:function(o){return e.get(r.BASE_API+"/orders/shipping/locations",{params:{keyword:o}}).then(t)},getWeightRoundingLimit:function(){return e.get(r.BASE_API+"/orders/shipping/weightroundinglimit").then(t)}}}function ProductService(e,r){function t(e){return e.data}return{getAll:function(o,n){var i=o.orderBy.indexOf("+")>-1,a={order:o.orderBy.substring(1)+(i?" ASC":" DESC"),limit:o.limit,skip:(o.page-1)*o.limit,where:{Name:{like:"%"+(o.keyword||"")+"%"},BrandCode:o.brandCode,ProductCategoryCode:o.categoryCode,KioskCode:n}};return e.get(r.BASE_API+"/vmappedproducts",{params:{filter:JSON.stringify(a)}}).then(t)},getByCode:function(o){var n={where:{Code:o}};return e.get(r.BASE_API+"/vmappedproducts",{params:{filter:JSON.stringify(n)}}).then(t)},countAll:function(o,n){var i={and:[{Name:{like:"%"+(o.keyword||"")+"%"}},{BrandCode:o.brandCode},{ProductCategoryCode:o.categoryCode},{KioskCode:n}]};return e.get(r.BASE_API+"/vmappedproducts/count?where="+encodeURI(JSON.stringify(i))).then(t)}}}function AuthenticationState(e,r){return{setToken:function(t){r.token=t.id,r.tokenExpiredAt=new Date(new Date(t.created)+t.ttl),e.defaults.headers.common.Authorization=t.id},getToken:function(){return r.token},setUser:function(e){r.user=e},getUser:function(){return r.user},isLoggedIn:function(){return!!r.user},remove:function(){r.$reset(),delete e.defaults.headers.common.Authorization},isGuest:function(){return!!r.user.roles&&!!r.user.roles.find(e=>"guest"==e.name)},isStaff:function(){return!!r.user.roles&&!!r.user.roles.find(e=>"staff"==e.name)}}}function Order(e,r){function t(){e.order={},e.order.items=[]}return{getCurrentOrder:function(){return e.order||t(),e.order},addOrderItem:function(o){e.order||t();var n=r("filter")(e.order.items,{sku:o.sku})[0];n?n.quantity++:(o.quantity=1,e.order.items.push(o))},removeOrderItem:function(r){var t=e.order.items.indexOf(r);e.order.items.splice(t,1)},initiateOrder:t}}function totalPrice(){return function(e){return e.reduce(function(e,r){return e+r.quantity*r.price},0)}}function totalDPNominal(){return function(e){return e.reduce(function(e,r){return e+r.quantity*(r.dp/100*r.price)},0)}}function dpNominal(){return function(e){return e.quantity*(e.dp/100*e.price)}}function humanify(){return function(e){return"DRAFTED"==e?"Pesanan dibuat oleh pembeli":"REQUESTED"==e?"Pesanan telah dikirim ke Dealer":"SUBMITTED"==e?"Sudah diterima oleh Dealer":"REJECTED"==e?"Dibatalkan oleh Dealer":"DELIVERED"==e?"Pesanan sedang diantar.":"ARRIVED"==e?"Pesanan sudah sampai di Outlet":"COMPLETED"==e?"Pesanan sudah diterima oleh Customer":"VOIDED"==e?"Pesanan dibatalkan oleh pembeli":e}}function LoginController(e,r,t,o){var n=this;n.user={email:"",password:""},n.login=function(i){n.loading=!0,n.message="";var a={};e.signIn(i).then(function(o){r.setToken(o);var n=[];return n.push(e.getAuthenticatedUser(o.userId)),n.push(e.getKioskUser(o.userId)),n.push(e.getRoleUser(o.userId)),t.all(n)}).then(function(e){var t=e[0];if(a.id=t.id,a.email=t.email,a.username=t.username,0==(t=e[1]).length)throw"User ini tidak berada di kiosk manapun.";var n=t[0].Kiosk;if(a.kiosk={code:n.Code,name:n.Name,address:n.Address,phone:n.PhoneNumber,branchCode:n.BranchCode,branchName:n.BranchName},0==(t=e[2]).length)throw"Unauthorized";a.roles=[];for(var i=0,d=t.length;i<d;i++)a.roles.push(t[i].role);r.setUser(a),o.go("app.home")}).catch(function(e){n.message=e,r.remove()}).finally(function(){n.loading=!1})}}function imageApi(e){return{restrict:"E",replace:!0,scope:{src:"=",name:"="},link:function(r){r.src=`${e.BASE_API}/${r.src}`},templateUrl:"app/components/image-api.html"}}function loadingIndicator(){return{restrict:"E",replace:!0,scope:{},templateUrl:"app/components/loading-indicator.html"}}function noData(){return{restrict:"E",replace:!0,scope:{},templateUrl:"app/components/no-data.html"}}function reloadIndicator(){return{restrict:"E",replace:!0,scope:{action:"&"},templateUrl:"app/components/reload-indicator.html"}}function HomeController(e,r,t,o,n,i,a){function d(e,r){var t=angular.element(".featured-products").scrollLeft(),o=460*r;e?t+=o:t-=o,angular.element(".featured-products").animate({scrollLeft:t},300)}function l(e="BEST SELLER"){p.sliderType=e,"BEST SELLER"==e?c():u()}function c(){p.isError=!1,p.loadingProducts=!0,t.getAll({keyword:"",orderBy:"-Sold",page:1,limit:9,categoryCode:"*"},p.currentUser.kiosk.code).then(e=>{p.products=e}).catch(e=>{p.isError=!0}).finally(()=>{p.loadingProducts=!1})}function u(){p.isError=!1,p.loadingProducts=!0,t.getAll({keyword:"",orderBy:"-CreatedDate",page:1,limit:9,categoryCode:"*"},p.currentUser.kiosk.code).then(e=>{p.products=e}).catch(e=>{p.isError=!0}).finally(()=>{p.loadingProducts=!1})}function s(e){n.addOrderItem({code:e.Code,sku:e.SKU,name:e.Name,description:e.Description,specification:e.Specification,image:e.Image,brandCode:e.BrandCode,dp:e.DP,price:e.Price,dealerCode:e.DealerCode}),i.success("Item telah ditambahkan ke kerajang belanja.","Pesan")}var p=this;p.currentUser=o.getUser(),p.next=function(e=1){d(!0,e)},p.prev=function(e=1){d(!1,e)},p.changeSliderType=l,p.openDetailItem=function(e){a.open({animation:!0,templateUrl:"app/product/detail.modal.html",controller:"ProductDetailModalController",controllerAs:"vm",size:"lg",resolve:{code:function(){return e.Code}}}).result.then(function(e){s(e)})},p.addOrderItem=s,l("BEST SELLER")}function InvoiceController(e,r,t,o,n,i){function a(t){d.loadingGetOrderByCode=!0,n.getByCode(t).then(function(t){d.order=t;var n=r("filter")(t.OrderPayments,{id:e.paymentId});0==n.length&&o.close(),d.orderPayment=n[0]}).catch(function(e){toastr.error(e)}).finally(function(){d.loadingGetOrderByCode=!1})}var d=this;d.currentUser=i.getUser(),d.order={},d.orderPayment={},d.print=function(){o.print()},d.close=function(){o.close()},a(e.code)}function invoiceDownPayment(){return{restrict:"E",replace:!0,scope:{order:"=",orderPayment:"="},templateUrl:"app/invoice/_down-payment.html"}}function invoiceFulfillment(){return{restrict:"E",replace:!0,scope:{order:"=",orderPayment:"="},templateUrl:"app/invoice/_fulfillment.html"}}function invoiceFullPayment(){return{restrict:"E",replace:!0,scope:{order:"=",orderPayment:"="},templateUrl:"app/invoice/_full-payment.html"}}function FooterController(){this.currentYear=(new Date).getFullYear()}function HeaderController(e,r,t,o,n,i,a,d,l,c,u){function s(){h.ticks--,0==h.ticks&&(p(),h.ticks=y),t(s,1e3)}function p(){var e=[];e.push(m({keyword:"",orderBy:"-NotifiedDate",page:1,limit:9})),e.push(g()),h.loadingGetUnreadNotifications=!0,o.all(e).then(e=>{var r=e[0];h.notifications=r,r=e[1],h.totalUnreadNotifications=r.count}).catch(e=>{}).finally(()=>{h.loadingGetUnreadNotifications=!1})}function f(){d.getByBrandCode("SMSG").then(function(e){h.categories=e}).catch(function(e){n.error(e)}).finally(function(){})}function m(e){return u.getAllUnreadByUserId(h.authenticatedUser.id,e)}function g(){return u.getTotalUnreadNotifications(h.authenticatedUser.id)}var h=this,y=600;h.ticks=y,h.totalItemsOnCart=0,h.searchProduct=function(r){r&&e.go("app.product",{keyword:r,brand:"",category:"*"})},h.keyword=r.keyword,h.removeOrderItem=function(e){confirm("Apakah anda yakin untuk membatalkan transaksi item ini?")&&(i.removeOrderItem(e),n.warning("Item telah dihapus dari transaksi ini","Pesan"))},h.logout=function(){return l.signOut().then(()=>{c.remove(),i.initiateOrder(),e.go("authentication.login")})},h.trackOrder=function(r){if(r.IsRead){var t=JSON.parse(r.Data);e.go("app.order.track",{code:t.orderCode})}else r.loading||(r.loading=!0,u.setRead(r.id).then(t=>{var o=JSON.parse(r.Data);e.go("app.order.track",{code:o.orderCode},{reload:!0})}).catch(e=>{}).finally(()=>{r.loading=!1}))},function(){f();var e=i.getCurrentOrder();h.cartItems=e.items,h.authenticatedUser=c.getUser(),h.isStaff=c.isStaff(),h.notifications=[],p(),s()}()}function NotificationController(e,r,t,o){function n(e){i.isError=!1,i.loadingGetNotifications=!0,i.notifications=i.notifications||[];var t=[];t.push(o.getAllByUserId(i.currentUser.id,e)),t.push(o.countAllByUserId(i.currentUser.id,e)),r.all(t).then(r=>{r[0].forEach(e=>{i.notifications.push(e)});var t=r[1];e.count=t.count}).catch(e=>{i.isError=!0}).finally(()=>{i.loadingGetNotifications=!1})}var i=this;i.currentUser=t.getUser(),i.getNotifications=n,i.next=function(){i.query.page++,n(i.query)},i.trackOrder=function(r){if(r.IsRead){var t=JSON.parse(r.Data);e.go("app.order.track",{code:t.orderCode})}else r.loading||(r.loading=!0,o.setRead(r.id).then(t=>{var o=JSON.parse(r.Data);e.go("app.order.track",{code:o.orderCode},{reload:!0})}).catch(e=>{}).finally(()=>{r.loading=!1}))},i.query={keyword:"",orderBy:"-NotifiedDate",page:1,limit:25},n(i.query)}function OrderCheckoutController(e,r,t,o,n){function i(e){a.shippingAddress.address=e?a.currentUser.kiosk.address:""}var a=this;a.order={},a.shippingAddress={},a.removeOrderItem=function(e){confirm("Apakah anda yakin untuk membatalkan transaksi item ini?")&&(o.removeOrderItem(e),t.warning("Item telah dihapus dari transaksi ini","Pesan"))},a.updateAddress=function(r){a.order.name=r.name,a.order.phone=r.phone,a.order.email=r.email,a.order.address=r.address,a.order.idCard=r.idCard,a.order.toKiosk=r.toKiosk,a.order.kioskCode=a.currentUser.kiosk.code,e.go("app.confirm")},a.toggleToKiosk=i,a.currentUser=n.getUser(),a.order=o.getCurrentOrder(),0==a.order.items.length&&(t.warning("Keranjang belanja Anda kosong."),e.go("app.home")),a.order.toKiosk=void 0==a.order.toKiosk||a.order.toKiosk,a.shippingAddress={name:a.order.name,phone:a.order.phone,email:a.order.email,address:a.order.address,idCard:a.order.idCard,toKiosk:a.order.toKiosk},i(a.order.toKiosk)}function OrderConfirmMessageController(e){this.code=e.code}function OrderConfirmController(e,r,t,o,n,i,a,d){var l=this;l.order={},l.submitOrder=function(e){if(confirm("Apakah anda yakin ingin melakukan pemesanan?")){for(var r={KioskCode:e.kioskCode,InChargeEmail:l.isStaff?l.currentUser.email:"",IdCard:e.idCard,Name:e.name,Email:e.email,Latitude:0,Longitude:0,SelfPickUp:e.toKiosk,Address:e.address,Phone:e.phone,OrderDetails:[]},i=0,a=e.items.length;i<a;i++){var d=e.items[i];r.OrderDetails.push({ProductCode:d.code,Quantity:d.quantity,DealerCode:d.dealerCode})}l.loadingCreateDraft=!0,n.createDraft(r).then(function(e){o.initiateOrder(),window.location.href="confirm-message/"+e.result.Code}).catch(function(e){t.error(e)}).finally(function(){l.loadingCreateDraft=!1})}},l.cancelOrder=function(){confirm("Apakah anda yakin ingin membatalkan pemesanan?")&&(o.initiateOrder(),t.warning("Pesanan Anda telah berhasil dibatalkan.","Success"),i(function(){window.location.href=""},2e3))},l.currentUser=d.getUser(),l.isStaff=d.isStaff(),console.log(l.currentUser),l.order=o.getCurrentOrder(),0==l.order.items.length&&(t.warning("Keranjang belanja Anda kosong."),e.go("app.home"))}function OrderDetailModalController(e,r,t,o,n){function i(e){a.loadingGetOrderByCode=!0,r.getByCode(e).then(function(e){a.order=e}).catch(function(e){n.error(e)}).finally(function(){a.loadingGetOrderByCode=!1})}var a=this;a.order={},a.close=function(){t.dismiss("cancel")},a.print=function(){o.print()},i(e)}function OrderCheckInController(e,r){var t=this;t.getOrder=function(o){t.loadingGetOrder=!0,e.getByCode(o).then(e=>{"DELIVERED"==e.Status||"PARTIALLY DELIVERED"==e.Status||"PARTIALLY ARRIVED"==e.Status?e.SelfPickUp?t.order=e:r.error("This order should be delivered to customer"):r.error(`Invalid status: ${e.Status}`)}).catch(e=>{r.error(e)}).finally(()=>{t.loadingGetOrder=!1})},t.arriveOrderDetail=function(o){o.loading=!0,e.detailArrive(o.OrderCode,o.Code).then(r=>{if(r.result)return e.getByCode(o.OrderCode)}).then(e=>{t.order=e}).catch(e=>{r.error(e)}).finally(()=>{o.loading=!1})}}function OrderController(e){}function OrderDetailController(e,r,t,o,n,i,a,d,l){function c(r){g.loadingGetOrderByCode=!0,a.getByCode(r).then(function(r){if("DRAFTED"!=r.Status&&e.go("app.order.draft"),g.order=r,g.order.ShippingDestination&&g.order.ShippingProductCode)return console.log("Fetching shipping information"),u(g.order.ShippingDestination).then(()=>{console.log("Success fetching shipping information"),s(g.pricingOptions.find(e=>e.productCode==g.order.ShippingProductCode))})}).catch(function(e){l.error(e)}).finally(function(){g.loadingGetOrderByCode=!1})}function u(e){return g.loadingPricings=!0,d.getPricings(g.currentUser.kiosk.branchName,e,1).then(e=>{g.pricingOptions=e.result[0].pricingOptions}).catch(e=>{l.error(e)}).finally(()=>{g.loadingPricings=!1})}function s(e){g.pricingOption=e,g.order.ShippingProductCode=e.productCode,g.order.ShippingDestination=g.destination?g.destination.display:g.order.ShippingDestination,g.order.ShippingDueDay=e.dueDay,p()}function p(){if(g.order.TotalShippingFee=0,g.order.TotalPrice=0,!g.order.SelfPickUp)for(var e=Array.from(new Set(g.order.OrderDetails.map(e=>e.DealerCode))),r=0,t=e.length;r<t;r++){var o=g.order.OrderDetails.filter(t=>t.DealerCode==e[r]).map(e=>e.Quantity*e.Product.Weight).reduce((e,r)=>e+r);o=0==o?0:o<1?1:o-Math.floor(o)>h?Math.ceil(o):Math.floor(o),g.order.TotalShippingFee+=o*g.pricingOption.calculationResult}for(var r=0,t=g.order.OrderDetails.length;r<t;r++)g.order.TotalPrice+=g.order.OrderDetails[r].Quantity*g.order.OrderDetails[r].Product.Price}function f(){delete g.pricingOption,g.order.ShippingDestination="",g.order.ShippingProductCode="",g.order.ShippingDueDay=0,g.order.TotalShippingFee=0}function m(){return d.getWeightRoundingLimit().then(e=>{h=e.result})}var g=this,h=.3;g.order={},g.currentUser=i.getUser(),g.isStaff=i.isStaff(),g.toggleSelfPickUp=function(e){e?(g.order.Address=g.currentUser.kiosk.address,f(),delete g.destination,delete g.pricingOption):g.order.Address=""},g.updateDraft=function(r){g.loadingUpdateDraft=!0;for(var t={Code:r.Code,KioskCode:r.KioskCode,InChargeEmail:g.isStaff?g.currentUser.email:"",IdCard:r.IdCard,Name:r.Name,Email:r.Email,Address:r.Address,SelfPickUp:r.SelfPickUp,Phone:r.Phone,ShippingDestination:r.ShippingDestination,ShippingProductCode:r.ShippingProductCode,ShippingDueDay:r.ShippingDueDay,TotalShippingFee:r.TotalShippingFee,OrderDetails:[]},o=0,n=r.OrderDetails.length;o<n;o++){var i=r.OrderDetails[o];t.OrderDetails.push({Code:i.Code,OrderCode:i.OrderCode,ProductCode:i.ProductCode,DealerCode:i.DealerCode,Quantity:i.Quantity})}a.updateDraft(t).then(function(t){e.go("app.order-payment",{code:r.Code})}).catch(function(e){l.error(e)}).finally(function(){g.loadingUpdateDraft=!1})},g.back=function(){o.history.back()},g.voidDraft=function(r){confirm("Apakah Anda yakin untuk membatalkan pesanan ini?")&&(g.loadingVoidDraft=!0,a.voidDraft(r).then(function(r){l.info("Pesanan telah dibatalkan."),e.go("app.order.draft")}).catch(function(e){l.error(e)}).finally(function(){g.loadingVoidDraft=!1}))},g.getLocations=function(e){return d.getLocations(e).then(e=>e.result)},g.selectLocation=u,g.selectPricingOption=s,g.updateDetail=function(e){e.ShippingFee=g.pricingOption?g.pricingOption.calculationResult:0,p()},g.removeCurrentShippingInformation=f,g.calculate=p,function(){var r=n.code;r||e.go("app.order"),c(r),m()}()}function OrderDraftController(e,r,t,o){function n(r){var o=[];o.push(e.getAllDraft(r,i.currentUser.kiosk.code)),o.push(e.countAllDraft(r,i.currentUser.kiosk.code)),i.loadingGetOrders=!0,i.isError=!1,t.all(o).then(function(e){var r=e[0];i.orders=r,r=e[1],i.orderQuery.count=r.count}).catch(function(e){i.isError=!0}).finally(function(){i.loadingGetOrders=!1})}var i=this;i.currentUser=o.getUser(),i.changePage=function(){n(i.orderQuery)},i.getOrders=n,i.orders=[],i.orderQuery={keyword:"",orderBy:"-CreatedDate",page:1,limit:9},n(i.orderQuery)}function OrderHistoryController(e,r,t,o){function n(r){var o=[];o.push(e.getAllHistory(r,i.currentUser.kiosk.code).then(function(e){i.orders=e})),o.push(e.countAllHistory(r,i.currentUser.kiosk.code).then(function(e){i.orderQuery.count=e.count})),i.loadingGetOrders=!0,t.all(o).then(function(e){}).catch(function(e){}).finally(function(){i.loadingGetOrders=!1})}var i=this;i.changePage=function(){n(i.orderQuery)},i.openDetail=function(e){r.open({animation:!0,templateUrl:"app/order/detail.modal.html",controller:"OrderDetailModalController",controllerAs:"vm",size:"lg",resolve:{code:function(){return e}}})},i.currentUser=o.getUser(),i.orders=[],i.orderQuery={keyword:"",orderBy:"-CreatedDate",page:1,limit:9},n(i.orderQuery)}function OrderTrackController(e,r,t){function o(r){n.loadingGetOrder=!0,n.message="",e.getByCode(r).then(function(e){n.order=e}).catch(e=>{n.message=e}).finally(()=>{n.loadingGetOrder=!1})}var n=this;n.code="",n.submitOrder=function(e){r.go("app.order.track",{code:e})},n.code=t.code,n.code&&o(n.code)}function OrderVerifyController(e,r,t,o,n,i){function a(o,n){d.loadingGetOrder=!0,e.getByCodePIN(o,n).then(function(e){if(0!=e.length){var o=e[0];d.order=o;var n=t("sum")(d.order.OrderPayments,"PaidAmount");d.orderPayment={PaymentType:"FULFILLMENT",OrderCode:o.Code,PaidAmount:o.TotalPrice+o.TotalShippingFee-n,Amount:o.TotalPrice+o.TotalShippingFee-n}}else r.error("Anda memasukkan Kode/PIN yang salah.","Pesan")}).catch(function(e){r.error(e)}).finally(function(){d.loadingGetOrder=!1})}var d=this;d.searchOrderByCodeAndPin=a,d.pay=function(t){t.Amount>t.PaidAmount?r.error("Insufficient funds"):(d.loadingPay=!0,e.pay(t).then(function(e){return a(d.code,d.pin)}).catch(function(e,t){r.error(e)}).finally(function(){d.loadingPay=!1}))},d.completeOrder=function(t){d.loadingCompleteOrder=!0,e.complete(t.Code).then(function(e){return r.success("Pesanan telah diterima oleh customer."),a(d.code,d.pin)}).catch(function(e){r.error(e)}).finally(function(){d.loadingCompleteOrder=!1})},d.goToPrint=function(){var e=t("orderBy")(d.order.OrderPayments,"-TransactionDate")[0].id,r=n.href("blank.invoice",{code:d.order.Code,paymentId:e});i.open(r,"_blank")}}function OrderPaymentController(e,r,t,o,n,i,a,d,l){function c(e){p.loadingGetOrderByCode=!0,d.getByCode(e).then(function(r){r.IsFullyPaid&&(i.error("Pesanan sudah dibayar."),o.go("app.order.draft")),"REQUESTED"==r.Status&&o.go("app.order.draft"),p.order=r,p.orderPayment={OrderCode:e,PaidAmount:0,Amount:p.order.TotalPrice+p.order.TotalShippingFee-p.order.DP,PaymentType:"FULL PAYMENT"},s("FULL PAYMENT")}).catch(function(e){i.error(e)}).finally(function(){p.loadingGetOrderByCode=!1})}function u(e){p.loadingPay=!0,d.pay(e).then(r=>d.getByCode(e.OrderCode)).then(e=>{p.orderToBePrinted=e,p.message="Pesanan Anda telah berhasil dilakukan!"}).catch(function(e){i.error(e)}).finally(function(){p.loadingPay=!1})}function s(e){p.orderPayment.Amount=p.order.TotalShippingFee,"FULL PAYMENT"==e?(p.orderPayment.Amount+=p.order.TotalPrice,p.orderPayment.PaidAmount=p.orderPayment.Amount):"DOWN PAYMENT"==e&&(p.orderPayment.Amount+=p.order.DP,p.orderPayment.PaidAmount=0)}var p=this;p.order={},p.orderPayment={},p.pay=u,p.changePaymentType=s,p.goToPrint=function(){var e=r("orderBy")(p.orderToBePrinted.OrderPayments,"-TransactionDate")[0].id,t=o.href("blank.invoice",{code:p.orderToBePrinted.Code,paymentId:e});n.open(t,"_blank")},p.confirmPayment=function(e){e.Amount>e.PaidAmount?i.error("Insufficient funds!"):l.open({animation:!0,templateUrl:"paymentConfirmation.html",controller:"PaymentConfirmationController",controllerAs:"vm",size:"md",resolve:{order:function(){return p.order},orderPayment:function(){return e}}}).result.then(r=>u(e))},c(t.code)}function PaymentConfirmationController(e,r,t){var o=this;o.orderPayment=t,o.ok=function(){e.close()},o.cancel=function(){e.dismiss("cancel")},r.TotalPrice+r.TotalShippingFee<=t.PaidAmount&&(o.orderPayment.PaymentType="FULL PAYMENT",o.orderPayment.Amount=o.orderPayment.PaidAmount=r.TotalPrice+r.TotalShippingFee)}function orderDetail(){return{restrict:"E",replace:!0,scope:{order:"="},templateUrl:"app/order/_detail.html"}}function ProductDetailModalController(e,r,t,o){function n(e){i.loadingGetProduct=!0,r.getByCode(e).then(function(e){i.product=e[0];try{i.product.ArrayedSpecification=JSON.parse(e[0].Specification)}catch(e){}}).catch(function(e){o.error(e)}).finally(function(){i.loadingGetProduct=!1})}var i=this;i.product={},i.close=function(){t.dismiss("cancel")},i.addToCart=function(e){t.close(e)},n(e)}function ProductController(e,r,t,o,n,i,a,d,l,c){function u(e){d.addOrderItem({code:e.Code,sku:e.SKU,name:e.Name,description:e.Description,specification:e.Specification,image:e.Image,brandCode:e.BrandCode,dp:e.DP,price:e.Price,dealerCode:e.DealerCode}),i.success("Item telah ditambahkan ke kerajang belanja.","Pesan")}function s(r,t){p.isError=!1,p.loadingProducts=!0;var o=[];o.push(a.getAll(t,p.currentUser.kiosk.code)),o.push(a.countAll(t,p.currentUser.kiosk.code)),e.all(o).then(e=>{for(var o=e[0],n=0,i=o.length;n<i;n++){try{o[n].ArrayedSpecification=JSON.parse(o[n].Specification)}catch(e){}r.push(o[n])}o=e[1],t.count=o.count}).catch(e=>{p.isError=!0}).finally(()=>{p.loadingProducts=!1})}var p=this;p.currentUser=l.getUser(),p.products=[],p.productQuery={},p.openDetailItem=function(e){n.open({animation:!0,templateUrl:"app/product/detail.modal.html",controller:"ProductDetailModalController",controllerAs:"vm",size:"lg",resolve:{code:function(){return e.Code}}}).result.then(function(e){u(e)})},p.addOrderItem=u,p.nextPage=function(e){e.page++,s(p.products,e)},p.getProducts=s,p.products=[],p.productQuery={keyword:"",orderBy:"+Name",page:1,limit:9},o.keyword||o.brand||o.category||t.go("app.home"),p.productQuery.keyword=o.keyword,p.productQuery.brandCode=o.brand,p.productQuery.categoryCode=o.category,s(p.products,p.productQuery)}function featuredItem(){return{restrict:"E",replace:!0,scope:{product:"=",openDetailItem:"&",addOrderItem:"&"},templateUrl:"app/product/_featured-item.html"}}function productItemCard(){return{restrict:"E",replace:!0,scope:{product:"=",openDetailItem:"&",addOrderItem:"&"},templateUrl:"app/product/_item-card.html"}}angular.module("app",["ui.router","ui.bootstrap","ngStorage","fcsa-number","toastr","ngTouch","app.authentication"]),angular.module("app").factory("httpInterceptor",httpInterceptor),httpInterceptor.$inject=["$q","$rootScope","$localStorage"],angular.module("app").config(["$localStorageProvider",function(e){e.setKeyPrefix("jet-o2o-")}]),angular.module("app").config(["$httpProvider",function(e){e.interceptors.push("httpInterceptor")}]),angular.module("app").config(["$qProvider",function(e){e.errorOnUnhandledRejections(!1)}]),angular.module("app").factory("settings",settings),settings.$inject=["$rootScope"],angular.module("app").run(runBlock),runBlock.$inject=["$rootScope","$state","$transitions","settings","AuthenticationState"],angular.module("app").constant("Urls",{BASE_API:"http://localhost:1337/api"}),angular.module("app").filter("sum",sum),angular.module("app").filter("timeDifference",function(){return function(e,r){if(!e)return"never";if(r||(r=(new Date).getTime()),angular.isDate(e)?e=e.getTime():"string"==typeof e&&(e=new Date(e).getTime()),angular.isDate(r)?r=r.getTime():"string"==typeof r&&(r=new Date(r).getTime()),"NaN"===r&&(r=(new Date).getTime()),"number"==typeof e&&"number"==typeof r){var t=(r-e)/1e3,o=[];if(!isNaN(t)){var n=t%60,i=Math.round(Math.abs(t/3600)).toString(),a=Math.round(Math.abs(n/60)).toString(),d=Math.round(Math.abs(n%60)).toString();return o.push(("00"+i).substring(i.length)),o.push(("00"+a).substring(a.length)),o.push(("00"+d).substring(d.length)),o.join(":")}}}}),angular.module("app").directive("a",function(){return{restrict:"E",link:function(e,r,t){(t.ngClick||""===t.href||"#"===t.href)&&r.on("click",function(e){e.preventDefault()})}}}),angular.module("app").directive("backButton",["$window",function(e){return{restrict:"A",link:function(r,t,o){t.bind("click",function(){e.history.back()})}}}]),angular.module("app").directive("ngSpinnerBar",["$rootScope","$transitions",function(e,r){return{link:function(e,t,o){t.addClass("hide"),r.onStart({},function(){t.removeClass("hide")}),r.onSuccess({},function(){t.addClass("hide")})}}}]),angular.module("app").config(routeConfig),routeConfig.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],angular.module("app.authentication",[]),angular.module("app").service("BrandService",BrandService),BrandService.$inject=["$http","Urls"],angular.module("app.authentication").service("AuthenticationService",AuthenticationService),AuthenticationService.$inject=["$http","Urls"],angular.module("app").service("CategoryService",CategoryService),CategoryService.$inject=["$http","Urls"],angular.module("app").service("HomeService",HomeService),HomeService.$inject=["$http"],angular.module("app").service("NotificationService",NotificationService),NotificationService.$inject=["$http","Urls"],angular.module("app").service("OrderService",OrderService),OrderService.$inject=["$http","Urls"],angular.module("app").service("ShippingService",ShippingService),ShippingService.$inject=["$http","Urls"],angular.module("app").service("ProductService",ProductService),ProductService.$inject=["$http","Urls"],angular.module("app.authentication").factory("AuthenticationState",AuthenticationState),AuthenticationState.$inject=["$http","$localStorage"],angular.module("app").factory("Order",Order),Order.$inject=["$sessionStorage","$filter"],angular.module("app").filter("totalPrice",totalPrice),angular.module("app").filter("dpNominal",dpNominal),angular.module("app").filter("totalDPNominal",totalDPNominal),angular.module("app").filter("humanify",humanify),angular.module("app.authentication").controller("LoginController",LoginController),LoginController.$inject=["AuthenticationService","AuthenticationState","$q","$state"],angular.module("app").directive("imageApi",imageApi),imageApi.$inject=["Urls"],angular.module("app").directive("loadingIndicator",loadingIndicator),angular.module("app").directive("noData",noData),angular.module("app").directive("reloadIndicator",reloadIndicator),angular.module("app").controller("HomeController",HomeController),HomeController.$inject=["$state","HomeService","ProductService","AuthenticationState","Order","toastr","$uibModal"],angular.module("app").controller("InvoiceController",InvoiceController),InvoiceController.$inject=["$stateParams","$filter","$timeout","$window","OrderService","AuthenticationState"],angular.module("app").directive("invoiceDownPayment",invoiceDownPayment),angular.module("app").directive("invoiceFulfillment",invoiceFulfillment),angular.module("app").directive("invoiceFullPayment",invoiceFullPayment),angular.module("app").controller("FooterController",FooterController),FooterController.$inject=[],angular.module("app").controller("HeaderController",HeaderController),HeaderController.$inject=["$state","$stateParams","$timeout","$q","toastr","Order","BrandService","CategoryService","AuthenticationService","AuthenticationState","NotificationService"],angular.module("app").controller("NotificationController",NotificationController),NotificationController.$inject=["$state","$q","AuthenticationState","NotificationService"],angular.module("app").controller("OrderCheckoutController",OrderCheckoutController),OrderCheckoutController.$inject=["$state","$window","toastr","Order","AuthenticationState"],angular.module("app").controller("OrderConfirmMessageController",OrderConfirmMessageController),OrderConfirmMessageController.$inject=["$stateParams"],angular.module("app").controller("OrderConfirmController",OrderConfirmController),OrderConfirmController.$inject=["$state","$window","toastr","Order","OrderService","$timeout","$filter","AuthenticationState"],angular.module("app").controller("OrderDetailModalController",OrderDetailModalController),OrderDetailModalController.$inject=["code","OrderService","$uibModalInstance","$window","toastr"],angular.module("app").controller("OrderCheckInController",OrderCheckInController),OrderCheckInController.$inject=["OrderService","toastr"],angular.module("app").controller("OrderController",OrderController),OrderController.$inject=["$state"],angular.module("app").controller("OrderDetailController",OrderDetailController),OrderDetailController.$inject=["$state","$rootScope","$filter","$window","$stateParams","AuthenticationState","OrderService","ShippingService","toastr"],angular.module("app").controller("OrderDraftController",OrderDraftController),OrderDraftController.$inject=["OrderService","toastr","$q","AuthenticationState"],angular.module("app").controller("OrderHistoryController",OrderHistoryController),OrderHistoryController.$inject=["OrderService","$uibModal","$q","AuthenticationState"],angular.module("app").controller("OrderTrackController",OrderTrackController),OrderTrackController.$inject=["OrderService","$state","$stateParams"],angular.module("app").controller("OrderVerifyController",OrderVerifyController),OrderVerifyController.$inject=["OrderService","toastr","$filter","$timeout","$state","$window"],angular.module("app").controller("OrderPaymentController",OrderPaymentController),OrderPaymentController.$inject=["$rootScope","$filter","$stateParams","$state","$window","toastr","Order","OrderService","$uibModal"],angular.module("app").controller("PaymentConfirmationController",PaymentConfirmationController),PaymentConfirmationController.$inject=["$uibModalInstance","order","orderPayment"],angular.module("app").directive("orderDetail",orderDetail),angular.module("app").controller("ProductDetailModalController",ProductDetailModalController),ProductDetailModalController.$inject=["code","ProductService","$uibModalInstance","toastr"],angular.module("app").controller("ProductController",ProductController),ProductController.$inject=["$q","$rootScope","$state","$stateParams","$uibModal","toastr","ProductService","Order","AuthenticationState","Urls"],angular.module("app").directive("featuredItem",featuredItem),angular.module("app").directive("productItemCard",productItemCard);