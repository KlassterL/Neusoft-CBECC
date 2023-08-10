<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import { ref, onBeforeMount } from 'vue';

const customer = ref(null);
const filters = ref(null);
const loading = ref(null);
const product_statuses = ref(['待发货', '已发货', '完成', '已取消']);
const severity = ref(['warning', 'primary', 'success', 'danger']);

const customerService = new CustomerService();

onBeforeMount(() => {
    //TODO: 加载时调用后端服务，拉取对应的订单列表
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

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <DataTable
                    :value="customer"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="10"
                    dataKey="id"
                    v-model:filters="filters"
                    filterDisplay="menu"
                    :loading="loading"
                    :filters="filters"
                    responsiveLayout="scroll"
                    :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']"
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
                    <Column field="time" header="时间" dataType="date" style="min-width: 6rem">
                        <template #body="{ data }">
                            {{ formatDate(data.date) }}
                        </template>
                    </Column>
                    <Column field="product_name" header="订购商品" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ data.product_name }}
                        </template>
                    </Column>
                    <Column field="image_url" header="商品图片" style="width:20%; min-width:10rem">
                        <template #body="{ data }">
                            <img :src="data.image_url" :alt="data.image_url" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="product_amount" header="订购数量" style="min-width:8rem">
                        <template #body="{ data }">
                            <img :src="data.amount" :alt="data.amount" />
                        </template>
                    </Column>
                    <Column field="status" header="订单状态" style="min-width:5rem">
                        <template #body="{ data }">
                            <Tag :value="getProductStatus(data.status)" :severity="getSeverity(data.status)" />
                        </template>
                    </Column>
                    <Column header="操作" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" severity="danger" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        
    </div>
</template>

<style scoped lang="scss">
</style>
