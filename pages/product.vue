<template>
  <div class="container">
    <div class="row" v-if="product">
      <b-col cols="12" md="6" class="flex justify-center">
        <img :src="product.image" :alt="product">
      </b-col>
      <b-col cols="12" md="6" class="flex justify-center">
        <div>
          <h4>{{ product.title }}</h4>
          <p>{{ product.price }}</p>
          <br />
          <p>{{ product.description }}</p>
        </div>
      </b-col>
        <!-- <b-form-select v-for="attr in product.attributes" :key="attr.id" v-model="selectedLabel"> -->
        <button class="sp-stretch sp-btn-success" @click="addToCart"
          >Add to cart</button
        >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
    }
  },
  methods: {
    addToCart() {
      console.log('TBD: ')
    }
  },
  computed: {
  },

  async asyncData({store}) {
    const { id } = this.$route.params
    console.log('id: ', id)
    const product = await store.dispatch('getProduct', id)
    return {product}
  }
}
</script>

<style lang="scss" scoped>
.sp-product-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-bottom: 0.5em;
  }
}
.sp-stretch {
  width: 100%;
  /* white-space: nowrap; */
}
.sp-quantity {
  display: flex;
  justify-content: space-between;
  height: 40px;
  /* & *{
    height: 100%;
  } */
}
#sp-num-input {
  width: 85px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
  border-radius: 5px;
  border: 1px solid #ddd;
  text-align: center;
  -webkit-appearance: none;
}
</style>
