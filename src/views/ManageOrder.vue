<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import { useAuthStore } from '@/stores/Auth';
import { ref, onBeforeMount } from 'vue';
import mvoAPI from '@/api/mvo';
import bvoAPI from '@/api/bvo';

const user_authStore = useAuthStore();
const orders = ref(null);
const customer = ref(null);
const filters = ref(null);
const loading = ref(null);
const product_statuses = ref(['待发货', '已发货', '完成', '已取消']);
const severity = ref(['warning', 'primary', 'success', 'danger']);

const customerService = new CustomerService();

onBeforeMount(() => {
    //加载时调用后端服务，拉取对应的订单列表
    if (user_authStore.type === 1) {
        mvoAPI.findAllMVOOrder(user_authStore.mvo_id).then((data) => {
            orders.value = data;
            loading.value = false;
        });
    }
    else {
        bvoAPI.findAllBVOOrder(user_authStore.bvo_id).then((data) => {
            orders.value = data;
            loading.value = false;
        });
    }
    customerService.getCustomersLarge().then((data) => {
        customer.value = data;
        loading.value = false;
        customer.value.forEach((customer) => (customer.date = new Date(customer.date)));
    });

    initFilters();
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: [0, 50], matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
};

const clearFilter = () => {
    initFilters();
};

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const getSeverity= (code) => {
    return severity.value[code];
};

const getProductStatus= (code) => {
    return product_statuses.value[code];
};

const startOrder = (order_id) => {
    mvoAPI.startOrder(order_id);
}

const finishOrder = (order_id) => {
    mvoAPI.finishOrder(order_id)
}


const cancelOrder = (order_id) => {
    mvoAPI.cancelOrder(order_id)
}

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <DataTable
                    :value="orders"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="10"
                    dataKey="id"
                    filterDisplay="menu"
                    :loading="loading"
                    responsiveLayout="scroll"
                    :globalFilterFields="['order_id', 'product_name']"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h3 class="m-0">订单管理</h3>
                            <!-- <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter()" /> -->
                            <span class=" p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="搜索订单..." style="width: 100%" />
                            </span>
                        </div>
                    </template>
                    <template #empty> <div class="text-center text-xl">未找到订单记录</div> </template>
                    <template #loading> <div class="text-center text-white text-xl">加载订单记录中，请稍后...</div></template>
                    <Column field="order_id" header="订单号" sortable style="min-width: 14rem">
                        <template #body="{ data }">
                            #{{ data.order_id }}
                        </template>
                    </Column>
                    <Column field="time" header="时间" style="min-width: 6rem">
                        <template #body="{ data }">
                            {{ formatDate(data.time) }}
                        </template>
                    </Column>
                    <Column field="name" header="订购商品" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                    </Column>
                    <Column field="image_url" header="商品图片" style="max-width: 20rem; min-width:10rem">
                        <template #body="{ data }">
                            <img :src="data.image_url" :alt="data.image_url" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="amount" header="订购数量" style="min-width:8rem">
                        <template #body="{ data }">
                            {{ data.amount }}
                        </template>
                    </Column>
                    <Column field="status" header="订单状态" style="min-width:5rem">
                        <template #body="{ data }">
                            <Tag :value="getProductStatus(data.status)" :severity="getSeverity(data.status)" />
                        </template>
                    </Column>
                    <Column header="操作" headerStyle="min-width:10rem;">
                        <template #body="{ data }">
                            <Button v-if="user_authStore.type===1" :disabled="data.status!==0" icon="pi pi-truck" class="mr-2" label="发货" @click="startOrder(data.order_id)" />
                            <Button v-if="user_authStore.type===2" :disabled="data.status!==1" icon="pi pi-check" class="mr-2" severity="success" label="完成" @click="finishOrder(data.order_id)" />
                            <Button v-if="user_authStore.type===2" :disabled="data.status!==0" icon="pi pi-times" class="mr-2" severity="danger" label="取消" @click="cancelOrder(data.order_id)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        
    </div>
</template>

<style scoped lang="scss">
</style>
