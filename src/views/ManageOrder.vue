<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useAuthStore } from '@/stores/Auth';
import { ref, onBeforeMount } from 'vue';
import mvoAPI from '@/api/mvo';
import bvoAPI from '@/api/bvo';
import toast from '@/util/toast'
import { format } from 'date-fns';

const authStore = useAuthStore();
const orders = ref(null);
const filters = ref(null);
const loading = ref(null);
const product_statuses = ref(['待发货','已发货', '完成', '已取消']);
const severity = ref(['warning','primary', 'success', 'danger']);

onBeforeMount(() => {
    //加载时调用后端服务，拉取对应的订单列表
    if (authStore.type === 1) {
        orders.value = mvoAPI.findAllMVOOrder(authStore.mvo_id);
        loading.value = false;
    }
    else {
        orders.value = bvoAPI.findAllBVOOrder(authStore.bvo_id);
        loading.value = false;
    }

    initFilters();
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // representative: { value: null, matchMode: FilterMatchMode.IN },
        // date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        // balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        // status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        // activity: { value: [0, 50], matchMode: FilterMatchMode.BETWEEN },
        // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
};

const clearFilter = () => {
    initFilters();
};

const getSeverity= (code) => {
    return severity.value[code];
};

const getProductStatus= (code) => {
    return product_statuses.value[code];
};

const startOrder = (data) => {
    if(mvoAPI.startOrder(data.order_id)) {
        data.status = 1;
        toast.success('发货成功','已将订单状态设置为已发货~');
    } else {
        toast.error('操作失败','请稍后重试...');
    }
}

const finishOrder = (data) => {
    if(bvoAPI.finishOrder(data.order_id)) {
        data.status = 2;
        toast.success('支付成功','订单已完成~');
    } else {
        toast.error('操作失败','请稍后重试...');
    }
}


const cancelOrder = (data) => {
    if(bvoAPI.cancelOrder(data.order_id)) {
        data.status = 3;
        toast.success('取消成功','订单已取消~');
    } else {
        toast.error('操作失败','请稍后重试...');
    }
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
                    v-model:filters="filters"
                    :filters="filters"
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
                    <Column field="time" header="时间" style="max-width: 7rem">
                        <template #body="{ data }">
                            <div class="text-center">{{ format(data.time, 'yyyy-MM-dd HH:mm:ss') }}</div>
                        </template>
                    </Column>
                    <Column field="name" header="订购商品" style="min-width: 10rem">
                        <template #body="{ data }">
                            <div class="text-center">{{ data.name }}</div>
                        </template>
                    </Column>
                    <Column field="image_url" header="商品图片" style="max-width: 20rem; min-width:10rem">
                        <template #body="{ data }">
                            <img :src="data.image_url" :alt="data.name" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="amount" header="订购数量" style="min-width:8rem">
                        <template #body="{ data }">
                            <div class="text-center">{{ data.amount }}</div>
                        </template>
                    </Column>
                    <Column field="status" header="订单状态" style="min-width:7rem;">
                        <template #body="{ data }">
                            <Tag :value="getProductStatus(data.status)" :severity="getSeverity(data.status)" />
                        </template>
                    </Column>
                    <Column header="操作" headerStyle="min-width:10rem;">
                        <template #body="{ data }">
                            <Button v-if="authStore.type===1" :disabled="data.status!==0" icon="pi pi-truck" class="mr-2" label="发货" @click="startOrder(data)" />
                            <Button v-if="authStore.type===2" :disabled="data.status!==1" icon="pi pi-check-square" class="mr-2" severity="success" label="支付" @click="finishOrder(data)" />
                            <Button v-if="authStore.type===2" :disabled="data.status!==0" icon="pi pi-times" class="mr-2" severity="danger" label="取消" @click="cancelOrder(data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        
    </div>
</template>

<style scoped lang="scss">
</style>
