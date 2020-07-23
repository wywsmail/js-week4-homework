export default {
  template: `<!-- 此 productModal 「新增」與「編輯」共用 -->
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">新增產品</div>
          <div class="modal-body p-4 rounded-0">
            <div class="row">
              <div class="col-4">
                <form>
                  <div class="form-group">
                    <label for="imageUrl">輸入圖片網址</label>
                    <input type="text" class="form-control" id="imageUrl" placeholder="請輸入圖片網址"
                      v-model.trim="product.imageUrl[0]">
                  </div>
                  <img class="img-fluid" v-bind:src="product.imageUrl[0]" alt="">
                </form>
              </div>
              <div class="col-8">
                <form>
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model.trim="product.title">
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                        v-model.trim="product.category">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="unit">單位</label>
                      <input type="text" class="form-control" id="unit" placeholder="請輸入單位" v-model.trim="product.unit">
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                        v-model.number="product.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control" id="price" placeholder="請輸入售價"
                        v-model.number="product.price">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="descriptipn">產品描述</label>
                    <input type="text" class="form-control" id="descriptipn" placeholder="請輸入產品描述"
                      v-model.trim="product.description">
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <input type="text" class="form-control" id="content" placeholder="請輸入說明內容"
                      v-model.trim="product.content">
                  </div>
                  <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="is_enabled" v-model="product.enabled"
                      :true-value="1" :false-value="0">
                    <!-- 使用 v-modal 判讀，若為 true 值為 1，若為 false 值為 2 -->
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer p-4 bg-white justify-content-end">
            <button type="button" class="btn btn-outline-primary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-secondary" v-on:click="updateProduct">確認</button>
            <!-- 增加 v-on:click 啟動 addProduct 函式 -->
          </div>
        </div>
      </div>`,
  data() {
    return {
      // product: {imageUrl:[

      // ]}
    }
  },
  methods: {
    updateProduct() {
      let url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.product.id}`;
      axios.patch(url,this.product)
        .then.$emit('update')
    }
  },
  props: ['product','api']
}