Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">

            <div class="product-image">
                <a :href="product.link" target="_blank"><img :src="image"></a>
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="product.inventory > 10">In Stock</p>
                <p v-else-if="product.inventory > 0 && product.inventory <= 10">Almost sold out</p>
                <p v-else style=" text-decoration:line-through ">Out of Stock</p>

                <p>Shipping {{shipping}} </p>

                <ul>
                    <li v-for="detail in product.details" :key="detail">
                        {{detail}}
                    </li>
                </ul>

                <div v-for="(cor, index) in product.options" class="color-box" :style="{ backgroundColor: cor.descricao }"
                    @mouseover="updateProduct(index)">
                </div>

                <button @click="addToCart" :disabled="outOfStock"
                    :class="{ disabledButton: outOfStock }">Add do Cart</button>
                <button @click="removeFromCart">Remove from Cart</button>

            </div>

        </div>
    `,
    data() {
        return {
            product: {
                'name': 'Socks',
                'description': 'Warm socks for your cold feet',
                'selectedOption': 0,
                'options': [
                    {
                        'id': 4100,
                        'descricao': 'green',
                        'link': './assets/green-socks.jpg'
                    },
                    {
                        'id': 4200,
                        'descricao': 'blue',
                        'link': './assets/blue-socks.jpg'
                    }
                ],
                'link': 'https://www.lupo.com.br/masculino/meias',
                'inventory': 8,
                'details': ['100% cotton', '20% polyester', 'Gender-neutral']
            }
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.product.options[this.product.selectedOption].id);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.product.options[this.product.selectedOption].id);
        },
        updateProduct(index) {
            this.product.selectedOption = index;
        }
    },
    computed: {
        title() {
            return this.product.name + ' - ' + this.product.description
        },
        outOfStock() {
            return this.product.inventory === 0;
        },
        image() {
            return this.product.options[this.product.selectedOption].link;
        },
        shipping() {
            return this.premium ? 'Free' : ' 2.99 '
        }
    }
});



var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            this.cart = this.cart.filter(item => item !== id);
        }
    }
});