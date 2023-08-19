<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import toast from '@/util/toast'
import bvoAPI from '@/api/bvo';
import { useAuthStore } from '@/stores/Auth';

const authStore = useAuthStore();

const cart = ref(null);
const submitOrderDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const cartProduct = ref({});
const selectedProducts = ref(null);
const filters = ref({});
const loading = ref(true);

onBeforeMount(() => {
    initFilters();
});

onMounted(() => {
    bvoAPI.getFromCart(authStore.bvo_id).then(data => {
        cart.value = data;
        loading.value = false;
    })
});

const formatCurrency = (value) => {
    return value.toLocaleString('zh', { style: 'currency', currency: 'CNY' });
};

const confirmDeleteProduct = (editProduct) => {
    cartProduct.value = editProduct;
    deleteProductDialog.value = true;
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};

const confirmOrder = (data) => {
    cartProduct.value = data;
    submitOrderDialog.value = true;
}

const submitOrder = () => {
    bvoAPI.submitOrder(authStore.bvo_id, cartProduct.value.product_id, cartProduct.value.amount).then(res => {
        if (res) {
            bvoAPI.deleteFromCart(authStore.bvo_id, cartProduct.value.product_id);
            cart.value = cart.value.filter(e => e.product_id !== cartProduct.value.product_id);
            toast.success('下单成功', '已提交 ' + cartProduct.value.name + ' 的订单');
            cartProduct.value = {};
        }
        else {
            toast.error('下单失败', '请稍后重试...');
            cartProduct.value = {};
        }
        submitOrderDialog.value = false;
    })

}

const deleteProduct = (delProduct) => {
    if(!delProduct) {
        delProduct = cartProduct.value;
    }
    bvoAPI.deleteFromCart(authStore.bvo_id, delProduct.product_id).then(res => {
        if (res) {
            cart.value = cart.value.filter((val) => val.product_id !== delProduct.product_id);
            toast.success('移除成功', '已将 ' + delProduct.name + ' 从购物车移出');
        }
        else {
            toast.error('移除失败', '请稍后重试...');
        }
        deleteProductDialog.value = false;
        cartProduct.value = {};
    })

};

const deleteSelectedProducts = () => {
    selectedProducts.value.forEach(e => {
        deleteProduct(e);
    })
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
};

const initFilters = () => {
    filters.value = {
        name: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <DataTable editMode="cell" :value="cart" v-model:selection="selectedProducts" dataKey="product_id" :loading="loading"
                    :paginator="true" :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="" responsiveLayout="scroll">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h3 class="m-0">购物车</h3>
                            <div>
                                <Button class="mr-3" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                                    :disabled="!selectedProducts || !selectedProducts.length" />
                                <span class="mt-2 md:mt-0 p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['name'].value" placeholder="搜索商品..." />
                                </span>
                            </div>

                        </div>
                    </template>
                    <template #empty>
                        <div class="text-center text-xl">购物车空空如也...</div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                    <Column field="name" header="名称" :sortable="true" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column header="图片" headerStyle="min-width:12rem;">
                        <template #body="slotProps">
                            <img :src="slotProps.data.image_url" :alt="slotProps.data.name" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="price" header="价格" :sortable="true" headerStyle="min-width:8rem;">
                        <template #body="slotProps">
                            <span>{{ formatCurrency(slotProps.data.price) }}</span>
                        </template>
                    </Column>
                    <Column field="amount" header="数量" headerStyle="min-width:6rem;">
                        <template #body="slotProps">
                            <InputNumber v-model="slotProps.data.amount" autofocus style="width: 5rem" />
                            <!-- {{ slotProps.data.amount }}<span class="pi pi-pencil ml-3 text-primary"></span> -->
                        </template>
                    </Column>
                    <Column field="category" header="类别" headerStyle="min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.category }}
                        </template>
                    </Column>
                    <Column field="rating" header="推荐" headerStyle="min-width:8rem;">
                        <template #body="slotProps">
                            <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
                        </template>
                    </Column>
                    <Column header="操作" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-check-square" severity="primary" label="下单" class="mr-2"
                                @click="confirmOrder(slotProps.data)" />
                            <Button icon="pi pi-trash" severity="danger" label="删除"
                                @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="submitOrderDialog" :style="{ width: '450px' }" header="确认下单" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="cartProduct">你确定想要订购 <b>{{ cartProduct.name }} × {{ cartProduct.amount }}</b> 吗？</span>
                    </div>
                    <template #footer>
                        <Button label="取消" icon="pi pi-times" class="p-button-text" @click="submitOrderDialog = false" />
                        <Button label="下单" icon="pi pi-check" class="p-button-text" severity="success"
                            @click="submitOrder" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="商品移除" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="cartProduct">你确定想要将 <b>{{ cartProduct.name }}</b> 从购物车中移除吗？</span>
                    </div>
                    <template #footer>
                        <Button label="取消" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                        <Button label="删除" icon="pi pi-check" class="p-button-text" severity="danger"
                            @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="批量移除" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="cartProduct">确认移除选中的 {{ selectedProducts.length }} 件商品？</span>
                    </div>
                    <template #footer>
                        <Button label="取消" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false" />
                        <Button label="删除" icon="pi pi-check" class="p-button-text" severity="danger"
                            @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style>
input.p-inputtext.p-component.p-inputnumber-input {
    width: 5rem;
}
</style>
