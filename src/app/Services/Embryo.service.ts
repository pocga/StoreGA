import { Injectable, OnInit } from '@angular/core';
import { HttpClient ,HttpResponse,HttpHeaders} from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig, MatSidenav } from '@angular/material';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import 'rxjs/Rx';
import { environment } from '../../environments/environment'
import { ReviewPopupComponent } from '../Global/ReviewPopup/ReviewPopup.component';
import { ConfirmationPopupComponent } from '../Global/ConfirmationPopup/ConfirmationPopup.component';
import {ThankPopupComponent}  from '../Pages/Checkout/thankPopup/thank-popup.component';
import {OrderPopupComponent} from '../Pages/UserAccount/OrderPopup/OrderPopup.component'
import { AuthService } from './auth.service';
import { PopUpSignoutComponent } from '../Pages/Session/PopUpSignout/PopUpSignout.component';
interface Response {
  data     : any;
}

@Injectable()
export class EmbryoService  {
   

   sidenavOpen                 : boolean = false;
   paymentSidenavOpen          : boolean = false;
   isDirectionRtl              : boolean = false;
   featuredProductsSelectedTab : any = 0;
   newArrivalSelectedTab       : any = 0;

   currency  : string = '';
   language  : string = '';     

   shipping  : number = 12.95;
   tax       : number = 27.95;

   products  : AngularFireObject<any>;

   localStorageCartProducts : any;
   localStorageWishlist : any;
   navbarCartCount : number = 0;
   navbarWishlistProdCount = 0;
   buyUserCartProducts : any;

   private username:any;
    
   constructor(private http:HttpClient, 
               private dialog: MatDialog, 
               private db: AngularFireDatabase,
               private toastyService: ToastaService,
               private toastyConfig: ToastaConfig,
               private authService:AuthService) { 

      this.toastyConfig.position = "top-right";
      this.toastyConfig.theme = "material";
      this.calculateLocalWishlistProdCounts();
      localStorage.removeItem("user");
      localStorage.removeItem("byProductDetails");
                  
      this.db.object("products").valueChanges().subscribe(res => {this.setCartItemDefaultValue(res['gadgets'][1])});
       
   }
  
   public token(){
      return this.authService.getDecodedAccessToken(localStorage.getItem("idToken"));
   }

   public productList(){

   }

   public PopupThank(res){
      
      let review: MatDialogRef<ThankPopupComponent>;
      review = this.dialog.open(ThankPopupComponent);
      review.componentInstance.res = res;
      return review.afterClosed();  
   }

   public PedidoPopup(orderid , totales){
      
      let review: MatDialogRef<OrderPopupComponent>;
      review = this.dialog.open(OrderPopupComponent);
      review.componentInstance.orderid = orderid;
      review.componentInstance.totales = totales;
      return review.afterClosed();
   }
   
   public reserve(){
      let toastOption: ToastOptions = {
         title: "Gracias por su compra",
         msg: "Su Id de reserva es:",
         showClose: true,
         timeout: 10000,
         theme: "material"
      };
     
      toastOption.title = "Gracias por su reserva";
      toastOption.msg = "Su ID de reserva es: ";
      
   }

   public setCartItemDefaultValue(setCartItemDefaultValue) {
      let products : any;
      products = JSON.parse(localStorage.getItem("cart_item")) || [];
      let found = products.some(function (el, index) {
         if(el.name == setCartItemDefaultValue.name){
            return  true;
         }
      });
      if (!found) { products.push(setCartItemDefaultValue); }

      localStorage.setItem("cart_item", JSON.stringify(products));
      this.calculateLocalCartProdCounts();
   }
   
   public reviewPopup(detailData) {
      let review: MatDialogRef<ReviewPopupComponent>;
      review = this.dialog.open(ReviewPopupComponent);
      review.componentInstance.detailData = detailData;
      return review.afterClosed();
   }

   public confirmationPopup(message:string)
   {
      let confirmationPopup: MatDialogRef<ConfirmationPopupComponent>;
      confirmationPopup = this.dialog.open(ConfirmationPopupComponent);
      confirmationPopup.componentInstance.message = message;
      return confirmationPopup.afterClosed();
   }
   public confirmationPopupSignout(message:string)
   {
      let confirmationPopup: MatDialogRef<PopUpSignoutComponent>;
      confirmationPopup = this.dialog.open(PopUpSignoutComponent);
      confirmationPopup.componentInstance.message = message;
      return confirmationPopup.afterClosed();
   }

   public getProducts() {
      this.products = this.db.object("products");
      return this.products;
   }
   public getSlidesImage(){

      return this.http.get(`${environment.BASE_URL}catalogo/productos/imagenes`);
   }
  
   public calculateLocalCartProdCounts() {

      this.localStorageCartProducts = null;
      this.localStorageCartProducts = JSON.parse(localStorage.getItem("cart_item")) || [];
      this.navbarCartCount = +((this.localStorageCartProducts).length);
   }

   public getPedidos(){
    
      let user= this.token();     
      let rol=user["custom:role"];
      this.username=user["cognito:username"]
      
      if (rol=="Administrador"){
         return this.http.get(`${environment.BASE_URL}pedidos`);
      }else {                 
         return this.http.get(`${environment.BASE_URL}pedidos/usuarios/${this.username}`);
      }     
   }

   public confirmarPedido(data){
      return this.http.post(`${environment.BASE_URL}pedidos`, data);
   }

   public deleteCart(data) {      
      let deleteProduct=data.producto.idProducto;
      var httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
         observe: 'response' as 'response'  
      };
      let user= this.token();
      this.username=user["cognito:username"]
      return this.http.delete(`${environment.BASE_URL}carrito/${this.username}/productos/${deleteProduct}`, httpOptions)     
   }

   public deleteOrder(data) {

      var httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
         observe: 'response' as 'response'  
      };
      return this.http.delete(`${environment.BASE_URL}pedidos/${data}`, httpOptions)     
   }

   public getDataCart(){
      let user= this.token();
      this.username=user["cognito:username"]
      return this.http.get(`${environment.BASE_URL}carrito/${this.username}/productos`);
   }

   public putDataCart(data,value:any) {      
      let user= this.token();
      this.username=user["cognito:username"]
      let producto={"idProducto": data.idProducto, "cantidad":value};
      return this.http.put(`${environment.BASE_URL}carrito/${this.username}/productos`, producto);
   }
 
   public addToCart(data: any, type:any){
      let user= this.token();
      this.username=user["cognito:username"]
      data=parseInt(data.idProducto);      
      let producto={"idProducto": data, "cantidad":type};

      return this.http.post(`${environment.BASE_URL}carrito/${this.username}/productos`, producto);
   }

   public getAllCatalogo(){
      return this.http.get(`${environment.BASE_URL}catalogo/productos/`);
   } 

   public getCategories(){
      let user= this.token();
      this.username=user["cognito:username"]
      return this.http.get(`${environment.BASE_URL}catalogo/productos/categorias`);
   }

   public getPrice(){
      return this.http.get(`${environment.BASE_URL}catalogo/productos/rango`);
   }

   public getOnlyCategoria(value){
      return this.http.get(`${environment.BASE_URL}catalogo/productos?categ=${value}`);
   }

   public getCatalogByFilter(options){
      return this.http.get(
      `${environment.BASE_URL}catalogo/productos?categ=${options.categorias}&disp=${options.disponibilidad}&from=${options.from}&to=${options.to}`);
   }

   public buyNow(data:any) {
      let products : any;
      products = JSON.parse(localStorage.getItem("cart_item")) || [];

      let found = products.some(function (el, index) {
         if(el.name == data.name){
            if(!data.quantity) { data.quantity = 1}
            products[index]['quantity'] = data.quantity;
            return  true;
         }
      });
      if (!found) { products.push(data); }

      localStorage.setItem("cart_item", JSON.stringify(products));
      this.calculateLocalCartProdCounts();
   }

   public updateAllLocalCartProduct(products:any) {
      localStorage.removeItem('cart_item');

      localStorage.setItem("cart_item", JSON.stringify(products))
   }

   public updateLocalCartProduct(product:any) {
      localStorage.setItem("cart_item", JSON.stringify(product))
   }

   public removeLocalCartProduct(product: any) {
      let products: any = JSON.parse(localStorage.getItem("cart_item"));

      for (let i = 0; i < products.length; i++) {
         if (products[i].productId === product.productId) {
           products.splice(i, 1);
           break;
         }
      }

      let toastOption: ToastOptions = {
         title: "Removiendo producto del carrito",
         msg: "Producto removido del carrito",
         showClose: true,
         timeout: 2000,
         theme: "material"
      };

      this.toastyService.wait(toastOption);
      setTimeout(() => {
        
         localStorage.setItem("cart_item", JSON.stringify(products));
         this.calculateLocalCartProdCounts();
      }, 500);
   }

   public addToWishlist(data: any){
      let toastOption: ToastOptions = {
         title: "Adding Product To Wishlist",
         msg: "Product adding to the wishlist",
         showClose: true,
         timeout: 1000,
         theme: "material"
      };

      let products : any;
      products = JSON.parse(localStorage.getItem("wishlist_item")) || [];
      let productsLength = products.length;

      let found = products.some(function (el, index) {
         if(el.name == data.name){
            if(!data.quantity) { data.quantity = 1}
            products[index]['quantity'] = data.quantity;
            return  true;
         }
      });
      if (!found) { products.push(data); }

      if(productsLength == products.length) {
         toastOption.title = "Product Already Added";
         toastOption.msg = "You have already added this product to wishlist";
      }

      this.toastyService.wait(toastOption);
      setTimeout(() => {
         localStorage.setItem("wishlist_item", JSON.stringify(products));
         this.calculateLocalWishlistProdCounts();
      }, 500);
      
   }

   public calculateLocalWishlistProdCounts() {

      this.localStorageWishlist = null;
      this.localStorageWishlist = JSON.parse(localStorage.getItem("wishlist_item")) || [];
      this.navbarWishlistProdCount = +((this.localStorageWishlist).length);
   }

   public removeLocalWishlistProduct(product: any) {
      let products: any = JSON.parse(localStorage.getItem("wishlist_item"));

      for (let i = 0; i < products.length; i++) {
         if (products[i].productId === product.productId) {
           products.splice(i, 1);
           break;
         }
      }

      const toastOption: ToastOptions = {
         title: "Remove Product From Wishlist",
         msg: "Product removing from wishlist",
         showClose: true,
         timeout: 1000,
         theme: "material"
      };


      this.toastyService.wait(toastOption);
      setTimeout(() => {
         // ReAdding the products after remove
         localStorage.setItem("wishlist_item", JSON.stringify(products));
         this.calculateLocalWishlistProdCounts();
      }, 500);
      
   }

   public addAllWishListToCart(dataArray:any) {
      let a : any;
      a = JSON.parse(localStorage.getItem("cart_item")) || [];

      for(let singleData of dataArray) {
         a.push(singleData);
      }

      let toastOption: ToastOptions = {
         title: "Adding All Product To Cart",
         msg: "Products adding to the cart",
         showClose: true,
         timeout: 1000,
         theme: "material"
      };

      this.toastyService.wait(toastOption);
      setTimeout(() => {
         localStorage.removeItem('wishlist_item');
         localStorage.setItem("cart_item", JSON.stringify(a));
         this.calculateLocalCartProdCounts();
         this.calculateLocalWishlistProdCounts();
      }, 500);

   }

   public getBlogList()
   {
      let blogs : any;
      blogs = this.db.list("blogs");
      return blogs;
   }

   public getContactInfo()
   {
      let contact : any;
      contact = this.db.object("contact");
      return contact;
   }

   public getTermCondition()
   {
      let termCondition : any;
      termCondition = this.db.list("term_condition");
      return termCondition;
   }

   public getPrivacyPolicy()
   {
      let privacyPolicy : any;
      privacyPolicy = this.db.list("privacy_policy");
      return privacyPolicy;
   }

   public getFaq()
   {
      let faq : any;
      faq = this.db.object("faq");
      return faq;
   }

   public getProductReviews()
   {
      let review : any;
      review = this.db.list("product_reviews");
      return review;
   }

   public addBuyUserDetails(formdata) {
      localStorage.setItem("user", JSON.stringify(formdata));
      
      let product = JSON.parse(localStorage.getItem("cart_item"))
      localStorage.setItem("byProductDetails", JSON.stringify(product));
      this.buyUserCartProducts = JSON.parse(localStorage.getItem("byProductDetails"))

      localStorage.removeItem("cart_item");
      this.calculateLocalCartProdCounts();
   }

   public removeBuyProducts() {
      localStorage.removeItem("byProductDetails");
      this.buyUserCartProducts = JSON.parse(localStorage.getItem("byProductDetails"))
   }

   public getTeam()
   {
      let team : any;
      team = this.db.list("team");
      return team;
   }

   public getTestimonial() {
      let testimonial : any;
      testimonial = this.db.object("testimonial");
      return testimonial;
   }

   public getMissionVision() {
      let mission_vision : any;
      mission_vision = this.db.list("mission_vision");
      return mission_vision;
   }

   public getAboutInfo() {
      let about_info : any;
      about_info = this.db.object("about_info");
      return about_info;
   }

}
