<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/Auth'
import bvoAPI from '@/api/bvo';
import toast from '@/util/toast';

const authStore = useAuthStore();
const dataviewValue = ref(null);
const cart = ref(null);
const layout = ref('grid');
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const sortOptions = ref([
    { label: '由高到低', value: '!price' },
    { label: '由低到高', value: 'price' }
]);

onMounted(() => {
    cart.value = bvoAPI.getFromCart(authStore.bvo_id);
    dataviewValue.value = bvoAPI.findAllProduct();
    dataviewValue.value.forEach(e => {
        if(inCart(e.product_id)) {
            e.inCart = true;
        }
    })
});

const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    } else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};

const inCart = (product_id) => {
    return cart.value.filter(e => e.product_id === product_id).length>0;
}

const addToCart = (data) => {
    if(bvoAPI.addToCart(authStore.bvo_id, data.product_id, 1)) {
        data.inCart = true;
        toast.success('添加成功','已将商品添加进购物车中~');
    }
    else {
        toast.error('添加失败','请稍后重试...');
    }
}

const stockStatus = (stock) => {
    if(stock<=50) {
        return "库存紧缺";
    } 
    else if(stock<=200) {
        return "库存较少";
    }
    else if(stock<=500) {
        return "库存较多";
    }
    else {
        return "库存充足";
    }
}

const stockSeverity = (stock) => {
    if(stock<=50) {
        return 'danger';
    } 
    else if(stock<=200) {
        return 'warning';
    }
    else if(stock<=500) {
        return 'primary';
    }
    else {
        return 'success';
    }
}

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
                    <template #header>
                        <div class="grid grid-nogutter">
                            <div class="col-6 text-left">
                                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="价格排序" @change="onSortChange($event)" />
                            </div>
                            <div class="col-6 text-right">
                                <DataViewLayoutOptions v-model="layout" />
                            </div>
                        </div>
                    </template>
                    <template #list="slotProps">
                        <div class="col-12">
                            <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                                <img :src="slotProps.data.image_url" :alt="slotProps.data.name" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
                                <div class="flex-1 text-center md:text-left">
                                    <div class="font-bold text-2xl mb-3">{{ slotProps.data.name }} <Tag :value="stockStatus(slotProps.data.stock)" :severity="stockSeverity(slotProps.data.stock)"></Tag></div>
                                    <!-- <div class="mb-3">{{ slotProps.data.description }}</div> -->
                                    <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" class="mb-2"></Rating>
                                    <div class="flex align-items-center">
                                        <i class="pi pi-tag mr-2"></i>
                                        <span class="font-semibold">{{ slotProps.data.category }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                                    <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">￥{{ slotProps.data.price }}</span>
                                    <Button icon="pi pi-shopping-cart" label="添加购物车" :disabled="slotProps.data.inCart"  @click="addToCart(slotProps.data)"></Button>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template #grid="slotProps">
                        <div class="col-12 md:col-4">
                            <div class="card m-3 border-1 surface-border">
                                <div class="flex align-items-center justify-content-between">
                                    <div class="flex align-items-center">
                                        <i class="pi pi-tag mr-2"></i>
                                        <span class="font-semibold">{{ slotProps.data.category }}</span>
                                    </div>
                                    <Tag :value="stockStatus(slotProps.data.stock)" :severity="stockSeverity(slotProps.data.stock)"></Tag>
                                </div>
                                <div class="text-center">
                                    <img :src="slotProps.data.image_url" :alt="slotProps.data.name" class="w-9 shadow-2 my-3 mx-0" />
                                    <div class="text-2xl font-bold mb-3">{{ slotProps.data.name }}</div>
                                    <!-- <div class="mb-3">{{ slotProps.data.description }}</div> -->
                                    <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
                                </div>
                                <div class="flex align-items-center justify-content-between">
                                    <span class="text-2xl font-semibold">￥{{ slotProps.data.price }}</span>
                                    <Button icon="pi pi-shopping-cart" :disabled="slotProps.data.inCart" @click="addToCart(slotProps.data)"></Button>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
    </div>
</template>
