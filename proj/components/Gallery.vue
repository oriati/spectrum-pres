<template>
  <div class="row">
    <transition name="fade" v-for="item in list" :key="item.id">
      <!-- <div v-for="item in list" :key="item.id" class="col-6 col-md-3 sp-card"> -->
      <div class="col-6 col-md-3 sp-card">
        <nuxt-link tag="div" :to="`/products/${item.id}`" class="image">
          <div class="image-wrapper">
            <img :src="item.image.url" :alt="item.title" />
          </div>
        </nuxt-link>
        <strong>{{ item.title }}</strong>
        <p>
          <i>{{ item.price }}</i>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['list'],
  filters: {
    costRange({ min, max }) {
      return min === max ? `$${min}` : `$${min} - ${max}`
    }
  }
}
</script>

<style lang="scss" scoped>
.sp-card {
  padding: 0 1.5em;
}
.image {
  position: relative;
  overflow: hidden;
  padding-bottom: 100%;
  cursor: pointer;
}
.image {
  .image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    img {
      max-height: 100%;
    }
  }
}
/* .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity 0.5s;
  }
  .fade-leave {
    }
  .fade-leave-active {
    transition: opacity 0.5s;
    opacity: 0
  } */
</style>
