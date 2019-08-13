<template>
  <div class="container">
    <div class="row sp-list-controls">
      <div class="flex-column justify-center">
        <span class="red-rect"></span>
        <span class="products">Products</span>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="flex-column" v-if="productList">
        <sp-gallery :list="productList"></sp-gallery>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Gallery from '../components/Gallery'

export default {
  name: 'ItemList'
  async asyncData({ store }) {
    const items = await store.dispatch('getAllItems')
    return {productList: items}
  },
  components: {
    spGallery: Gallery
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.flex-column {
  display: flex;
  flex-direction: column;
}

.products {
  font-size: 28px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.11;
  letter-spacing: 5.6px;
}

.red-rect {
  height: 2em;
  width: 8em;
  position: absolute;
  background: #f9dfdf;
  right: 50%;
  bottom: 3px;
  z-index: -1;
}

.sp-list-controls {
  margin-top: 1em;
  margin-bottom: 2em;
  align-items: flex-end;
  @media only screen and (max-width: 768px) {
    height: 15em;
    align-content: space-around;
  }
}
</style>
