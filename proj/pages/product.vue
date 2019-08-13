<template>
  <div class="container">
    <div class="row" v-if="product">
      <b-col cols="12" md="4" class="flex justify-center">
        <!-- <h2>label: {{selectedLabel}}</h2> -->
        <!-- <h5>variant: {{selectedVariant}}</h5> -->
        <div>
          <h4>{{ selectedVariant.title }}</h4>
          <p>{{ { value: selectedVariant.price } | costDisplay }}</p>
          <br />
          <p>{{ product.description }}</p>
        </div>
      </b-col>
      <b-col cols="12" md="3" class="sp-product-controls">
        <!-- <b-form-select v-for="attr in product.attributes" :key="attr.id" v-model="selectedLabel"> -->
        <b-form-select
          v-for="attr in filteredAttributes"
          :key="attr.id"
          @input="onLabelChange(attr.id, $event)"
          :value="null"
        >
          <option :value="null">{{ attr.title }}</option>
          <option
            v-for="label in attr.labels"
            :key="label.id"
            :value="label.id"
            >{{ label.title }}</option
          >
          <!-- /*simplistic*/-->
          <!-- <option v-for="label in getLabels(attr)" :key="label.id" :value="label">{{label.title}}</option> -->
        </b-form-select>
        <div class="sp-stretch">
          <div class="sp-quantity">
            <div>Quantity:</div>
            &nbsp;
            <div>
              <input type="number" id="sp-num-input" v-model="quantity" />
            </div>
          </div>
        </div>
        <b-button class="sp-stretch sp-btn-success" @click="addVariant"
          >Add to cart</b-button
        >
      </b-col>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { forEach, uniq } from "lodash";

export default {
  data() {
    return {
      clickedImage: null,
      product: null,
      quantity: 1,
      selectedLabels: {}
      // labelsToShow: []
    }
  },
  methods: {
    ...mapActions(['cartAdd']),
    addVariant() {
      this.cartAdd({ id: this.selectedVariant.id, quantity: this.quantity })
    },
    imageClicked(image) {
      this.clickedImage = image
    },
    onLabelChange(key, value) {
      this.clickedImage = null
      const newSelectedLabels = {
        ...this.selectedLabels,
        [key]: value
      }
      this.selectedLabels = newSelectedLabels
    }
  },
  computed: {
    unselectedImages() {
      const imageToFilterBy = this.clickedImage || this.selectedVariant.image
      return this.product.images.filter(
        (image) => image.title !== imageToFilterBy.title
      )
    },
    selectedLabelIds() {
      return Object.values(this.selectedLabels).filter((value) => value)
    },

    filteredAttributes() {
      // returns the product's atrributes array with irrelevant labels filtered out
      if (!this.product.attributes) return false
      const resAttributes = [
        ...this.product.attributes.map((attr) => ({
          ...attr,
          labels: attr.labels.filter((label) => {
            return this.labelsToShow.includes(label.id)
          })
        }))
      ]
      return resAttributes
    },

    /** @ TODO: fix that : this function doesn't return what it should - labels are missing from the res  */

    labelsToShow() {
      // returns { attr_id: [label_ids], attr_id: [label_ids]... }
      // let res = {};
      // this.product.variants
      //   .filter(variant =>
      //     //only variants that comply with conditions of selectedLabels
      //     variant.labels.every(label => {
      //       const key = label.attribute_id;
      //       const value = label.label_id;
      //       return (
      //         !this.selectedLabels[key] || this.selectedLabels[key] === value
      //       );
      //     })
      //   )
      //   .map(variant => variant.labels)
      //   .forEach(varLabelsArr => {
      //     varLabelsArr.forEach(labelObj => {
      //       if (!res[labelObj.attribute_id]) {
      //         res[labelObj.attribute_id] = [labelObj.label_id];
      //       } else res[labelObj.attribute_id].push(labelObj.label_id);
      //     });
      //   });
      // res = forEach(res, (val, key) => {
      //   return (res[key] = uniq(val));
      // });
      // return res;

      // returns an array [label_ids to show]
      const res = new Set()
      this.product.variants.forEach((variant) => {
        // a flat array of the variant labels
        const variantLabelIds = variant.labels.map((label) => label.label_id)
        // console.log("flatArr in Variant: ", variantLabelIds, variant.title);
        if (
          this.selectedLabelIds.every((label) =>
            variantLabelIds.includes(label)
          )
        ) {
          // if all the selectedLabelIds are included in the variant labels
          // res.add(...variantLabelIds);
          variantLabelIds.forEach((id) => {
            res.add(id)
          })
        }
      })
      return Array.from(res)
    },

    selectedVariant() {
      if (!this.product.variants) {
        return {}
      }
      if (!this.selectedLabelIds[0]) {
        return this.product.variants[0]
      }
      const selectedVariant = this.product.variants.find((variant) => {
        const variantLabelIds = variant.labels.map((label) => label.label_id)
        return this.selectedLabelIds.every((label) =>
          variantLabelIds.includes(label)
        )
      })
      console.log('selectedVariant: ', selectedVariant)
      return selectedVariant
    }
  },
  components: {},

  beforeCreate() {
    const { id } = this.$route.params
    console.log('id: ', id)
    this.$http
      .get(`Catalog/Get?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.product = data.data
        // this.selectedVariant;
      })
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
