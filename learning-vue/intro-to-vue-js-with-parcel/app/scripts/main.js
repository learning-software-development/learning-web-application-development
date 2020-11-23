const Vue = require("vue");

var eventBus = new Vue();

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: false
    }
  },
  template: `
  <div>
    <div>
      <span class="tab" v-bind:class="{activeTab: selectedTab === tab}"
        v-for="(tab, index) in tabs" v-bind:key="index"
        v-on:click="selectedTab = tab">{{tab}}</span>
    </div>
    <div v-show="selectedTab === 'Reviews'">
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
        <li v-for="review in reviews">
        <p>{{ review.name }}</p>
        <p>Rating: {{ review.rating }}</p>
        <p>{{ review.review }}</p>
        </li>
      </ul>
    </div>
    <div v-show="selectedTab === 'Make a Review'">
      <product-review></product-review>
    </div>
  </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews"
    };
  }
});

Vue.component("product-review", {
  template: `
    <form class="review-form" v-on:submit.prevent="onSubmit">
      <p v-if="errors.length" class="error">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name" type="text">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>

    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
      }
    }
  }
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img v-bind:src="image" v-bind:alt="altText">
      </div>
      <div class="product-info">
        <h1>{{title}}</h1>
        <p>{{description}}</p>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p v-show="onSale">On Sale!</p>
        <p>Shipping: {{ shipping }}</p>
        <ul>
          <li v-for="(detail, index) in details" v-bind:key="index"">{{detail}}</li>
        </ul>
        <div v-for="(variant, index) in variants" v-bind:key="variant.variantId" class="color-box"
          v-bind:style="{backgroundColor: variant.variantColor}"
          v-on:mouseover="updateProduct(index)">
        </div>
        <button v-on:click="addToCart" v-bind:disabled="!inStock" v-bind:class="{disabledButton: !inStock}">Add to cart</button>
        <product-tabs v-bind:reviews="reviews"></product-tabs>
      </div>
    </div>
  `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      description: "A pair of warm, fuzzy socks",
      selectedVariant: 0,
      altText: "A pair of socks",
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "images/vmSocks-green-onWhite.jpg",
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "images/vmSocks-blue-onWhite.jpg",
          variantQuantity: 0
        }
      ],
      reviews: []
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      return this.premium ? "free" : "2.99";
    }
  },
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
  }
});

const app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    }
  }
});
