<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/Auth';
import mvoAPI from '@/api/mvo';
import bvoAPI from '@/api/bvo';

const authStore = useAuthStore();

const products = ref(null);
const lineData = reactive({
    labels: ['一季度', '二季度', '三季度', '四季度'],
    datasets: [
        {
            label: '2022',
            data: [65, 37, 68, 65],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: '2023',
            data: [28, 48, 40, 45],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});

const lineOptions = ref(null);

onMounted(() => {
    if(authStore.type === 1) {
        mvoAPI.findAllBrandProduct(authStore.mvo_id).then(data => {
            products.value = data;
        })
    }
    else {
        bvoAPI.findAllProduct().then(data => {
            products.value = data;
        })
    }
});

const formatCurrency = (value) => {
    return value.toLocaleString('zh', { style: 'currency', currency: 'CNY' });
};


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
                <h3>商店新品</h3>
                <Carousel :value="products" :numVisible="3" :numScroll="2" circular :autoplayInterval="3000" :responsiveOptions="carouselResponsiveOptions">
                    <template #item="product">
                        <div class="border-round m-2 text-center p-2" style="border: 1px solid var(--surface-d)">
                            <div class="my-5">
                                <img :src="product.data.image_url" :alt="product.data.name" class="w-6 shadow-2" />
                            </div>
                            <div>
                                <h5 class="mb-1">
                                    {{ product.data.name }}
                                </h5>
                                <h6 class="mt-0 mb-3">￥{{ product.data.price }}</h6>
                                <Rating class="justify-content-center mb-2" :modelValue="product.data.rating" :readonly="true" :cancel="false"></Rating>
                                <Tag :value="stockStatus(product.data.stock)" :severity="stockSeverity(product.data.stock)"></Tag>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>近期情况</h5>
                <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
                    <Column field="name" header="名称" :sortable="true" style="width: 25%"></Column>
                    <Column style="width: 15%">
                        <template #header> 图片 </template>
                        <template #body="slotProps">
                            <img :src="slotProps.data.image_url" :alt="slotProps.data.name" width="50" class="shadow-2" />
                        </template>
                    </Column>
                    <Column field="price" header="价格" :sortable="true" style="width: 15%">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="stock" header="库存" :sortable="true" style="width: 15%">
                        <template #body="slotProps">
                            <Tag :value="stockStatus(slotProps.data.stock)" :severity="stockSeverity(slotProps.data.stock)"></Tag>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div v-if="authStore.type===1" class="col-12 xl:col-6">
            <div class="card">
                <h5>销售预览</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div>
        </div>
    </div>
</template>
