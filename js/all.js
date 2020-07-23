import pagination from './pagination.js';
import modal from './modal.js';

Vue.component('pagination',pagination);
Vue.component('modal',modal);

new Vue({
  el: "#app",
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      token: '',
      product: {
        imageUrl: []
      },
      productArray: [],
      pagination:{},
      api: {
        uuid: '3e2bba7c-e3f2-4bb1-bf9c-1c406f181d46',
        path: 'https://course-ec-api.hexschool.io/api/'
      },
      isNew: '',
      loadingBtn:''
    }
  },
  methods: {
    signin() {
      var vm = this;
      const api = `${vm.api.path}auth/login`;
      axios.post(api, vm.user).then((res) => {
        console.log(res);
        const token = res.data.token;
        const expired = res.data.expired;
        // week4Token 是存在 cookie 內的 token 的名字
        document.cookie = `week4Token = ${token}; expires = ${new Date(expired * 1000)};path=/`;
        window.location = 'productlist.html';
      }).catch((err) => {
        console.log(err);
      })
    },
    signout() {
      // var vm = this;
      document.cookie = `week4Token = ; expires = ;path=/`;
    },
    getData(num = 1) {
      // console.log(num);
      var vm = this;
      const api = `${vm.api.path}${vm.api.uuid}/admin/ec/products?page=${num}`;
      axios.get(api).then((res)=>{
        console.log(res);
        vm.productArray = res.data.data;
        vm.pagination = res.data.meta.pagination;
      }).catch((err) =>{
        console.log(err);
      })
    },
    // 此為判別要打開哪一種 modal 的函式
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.product = { imageUrl: [] };
          $('#productModal').modal('show');  //開啟 Modal 欄位空白
          break;
        case 'edit':
          this.loadingBtn = item.id;
          const api = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
          axios.get(api)
            .then((res)=>{
              console.log(res);
              this.product = res.data.data;
              this.loadingBtn = '';
              $('#productModal').modal('show');  //開啟 Modal 欄位包含產品資料
            })
          break;
        case 'delete':
          $('#delProductModal').modal('show');  //開啟刪除產品的 Modal
          this.product = Object.assign({}, item);  //淺層複製方式
          break;
        default:
          break;
      }
    },
    // 刪除產品時啟用的函式
    delProduct() {
      var vm = this;
      if (vm.product.id) {
        const id = vm.product.id;
        vm.productArray.forEach(function (item, i) {
          if (item.id === id) {
            vm.productArray.splice(i, 1);
            vm.product = {};
          }
        });
      }
      $('#delProductModal').modal('hide');
    },
    updateProduct() {
      var vm = this;
      console.log('token', vm.token);
      const api = `${vm.api.path}${vm.api.uuid}/admin/ec/product`;
      console.log(vm.product);
      axios.post(api,vm.product).then((res)=>{
        console.log(vm.product);
        console.log(res);
        vm.productArray.push(res.data.data);
        console.log(vm.productArray);
        vm.getData();
      }).catch((err)=>{
        console.log(err)
      });
      $('#productModal').modal('hide');
      ;
    },
    delAllProduct() { }
  },
  created() {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)week4Token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common[`Authorization`] = `Bearer ${this.token}`
    this.getData();
  }
})





// var appProduct = new Vue({
//   el: "#appProduct",
//   data: {
//     product: {}, //新增產品及編輯產品時暫時擺放商品資訊的地方
//     // 擺放商品列表的地方
//     productArray: [
//       {
//         id: 123,
//         unit: '台',
//         category: '廚房',
//         title: '烤箱',
//         origin_price: 30000,
//         price: 22800,
//         description: '可以烤東西',
//         content: '可以烤很多東西喔',
//         enabled: 1,
//         imageUrl: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
//       },
//       {
//         id: 321,
//         unit: '台',
//         category: '客廳',
//         title: '電視',
//         origin_price: 42000,
//         description: '可以看很多節目',
//         content: '有很多節目可以看',
//         price: 35000,
//         enabled: 0,
//         imageUrl: 'https://images.unsplash.com/photo-1571415060716-baff5f717c37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80',
//       },
//       {
//         id: 213,
//         unit: '幢',
//         category: '房間',
//         title: '床',
//         origin_price: 20000,
//         description: '可以好好休息的地方',
//         content: '一直睡好開心',
//         price: 17500,
//         enabled: 0,
//         imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//       },
//       {
//         id: 223,
//         unit: '座',
//         category: '浴室',
//         title: '浴缸',
//         origin_price: 50000,
//         description: '可以好好洗澡的地方',
//         content: '泡太久皮膚會皺皺',
//         price: 45000,
//         enabled: 1,
//         imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//       }
//     ],
//   },
//   methods: {
//     // 新增產品時啟用的函式
//     addProduct() {
//       var vm = this;  //讓 vm 代替 this，這樣 this 才不會亂跑
//       if (vm.product.id) { //此為編輯產品的條件
//         const id = vm.product.id;
//         vm.productArray.forEach(function (item, i) {
//           if (item.id === id) {
//             vm.productArray[i] = vm.product;
//           }
//         });
//       } else {  //此為新增產品的條件
//         const id = new Date().getTime(); //使用 new Date().getTime() 來建立 id
//         vm.product.id = id;
//         vm.productArray.push(vm.product);
//       }
//       vm.product = {}; //清空欄位
//       $('#productModal').modal('hide');  //隱藏 Modal
//     },
//     // 此為 Ray 助教的箭頭函式寫法
//     // addProduct() {
//     //   if (this.product.id) {
//     //     const id = this.product.id;
//     //     this.productArray.forEach((item, i) => {
//     //       if (item.id === id) {
//     //         this.productArray[i] = this.product;
//     //       }
//     //     });
//     //   } else {
//     //     // Unix Timestamp
//     //     const id = new Date().getTime();
//     //     this.product.id = id;
//     //     this.productArray.push(this.product);
//     //   }
//     //   this.product = {};
//     //   $('#productModal').modal('hide');
//     // },

//     // 此為判別要打開哪一種 modal 的函式
//     openModal(isNew, item) {
//       switch (isNew) {
//         case 'new': 
//           this.product = {};
//           $('#productModal').modal('show');  //開啟 Modal 欄位空白
//           break;
//         case 'edit':
//           this.product = Object.assign({}, item);  //淺層複製方式
//           $('#productModal').modal('show');  //開啟 Modal 欄位包含產品資料
//           break;
//         case 'delete':
//           $('#delProductModal').modal('show');  //開啟刪除產品的 Modal
//           this.product = Object.assign({}, item);  //淺層複製方式
//           break;
//         default:
//           break;
//       }
//     },
//     // 刪除產品時啟用的函式
//     delProduct() {
//       var vm = this;
//       if (vm.product.id) {
//         const id = vm.product.id;
//         vm.productArray.forEach(function (item, i) {
//           if (item.id === id) {
//             vm.productArray.splice(i, 1);
//             vm.product = {};
//           }
//         });
//       }
//       $('#delProductModal').modal('hide');
//     },

//     // 此為 Ray 助教的箭頭函式寫法
//     // delProduct() {
//     //   if (this.product.id) {
//     //     const id = this.product.id;
//     //     this.productArray.forEach((item, i) => {
//     //       if (item.id === id) {
//     //         this.productArray.splice(i, 1);
//     //         this.product = {};
//     //       }
//     //     });
//     //   }
//     //   $('#delProductModal').modal('hide');
//     // },
//   },
// });

