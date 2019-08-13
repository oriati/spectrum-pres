export const state = () => ({
  productList: [],
  selectedProduct: {},
  cart: {},
  toast: null
})
export const getters = {
  productList: (state) => state.productList,
  cart: (state) => state.cart,
  toast: (state) => state.toast
}
export const mutations = {
  getAllItemsSuccess: (state, payload) => {
    state.productList = payload
  },
  toast: (state, toast) => {
    state.toast = toast
    return setTimeout(() => {
      state.toast = null
    }, 5000)
  }
}
export const actions = {
  async getAllItems({ commit }) {
    let items = await this.$axios.get(
      'https://fedtest.monolith.co.il/api/catalog/getAll'
    )
    items = transpileProductList(items)
    console.log('items in action  :', items)
    return commit('getAllItemsSuccess', items)
  }
}

function transpileProductList({ data: { data: productList } }) {
  return productList.map(({ id, title, images, min_price: price }) => ({
    id,
    title,
    image: {
      title: images[0].title,
      url: `https://fedtest.monolith.co.il/api/imager.php?url=${
        images[0].url
      }&type=fit&width=${1000}&height=${1000}&quality=70`
    },
    price
  }))
}

// function transpileProduct({
//   data: {
//     data: { id, title, price, images, description }
//   }
// }) {
//   return {
//     id,
//     title,
//     description,
//     image: images[0],
//     price
//   }
// }
