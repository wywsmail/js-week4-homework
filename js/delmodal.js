export default {
  template: `      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 id="exampleModalLabel" class="modal-title">
              <span>刪除商品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{product.title}}</strong> 商品(刪除後將無法恢復)
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal" class="btn btn-outline-secondary">取消</button>
            <button type="button" class="btn btn-danger" v-on:click="delProduct">確認刪除</button>
            <!-- 增加 v-on:click 啟動 delProduct 函式 -->
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
    delProduct() {
      let url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.product.id}`;
      axios.delete(url, this.product)
        .then(res=>{
          this.$emit('update')
        })
      $('#delProductModal').modal('hide');
    }
  },
  props: ['product', 'api']
}