<template>
    <div class="card">
        <DataTable v-model:filters="filters1" :value="mvos" paginator :rows="5" dataKey="user_id"
                filterDisplay="menu" :loading="loading1" :globalFilterFields="['name']">
            <template #header>
                <div class="flex justify-content-between">
                    <h3>品牌商用户</h3>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters1['global'].value" placeholder="搜索品牌商" />
                    </span>
                </div>
            </template>
            <Column field="user_id" header="用户ID" sortable style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.user_id }}
                </template>
            </Column>
            <Column field="mvo_id" header="品牌商ID" sortable style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.mvo_id }}
                </template>
            </Column>
            <Column field="avatar_url" header="头像" style="min-width: 12rem">
                <template #body="{ data }">
                <Avatar class="border-1 border-primary" :image="data.avatar_url" :icon="data.avatar_url?'':'pi pi-user'" shape="circle" />
                </template>
            </Column>
            <Column field="name" header="名称" sortable style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
            </Column>
            <Column field="balance" header="余额" sortable style="min-width: 10rem">
                <template #body="{ data }">
                    {{ formatCurrency(data.balance) }}
                </template>
            </Column>
        </DataTable>
    </div>
    <div class="card">
        
        
        <DataTable v-model:filters="filters2" :value="bvos" paginator :rows="5" dataKey="user_id"
                filterDisplay="menu" :loading="loading2" :globalFilterFields="['name']">
            <template #header>
                <div class="flex justify-content-between">
                    <h3>借卖方用户</h3>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters2['global'].value" placeholder="搜索借卖方" />
                    </span>
                </div>
            </template>
            <Column field="user_id" header="用户ID" sortable style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.user_id }}
                </template>
            </Column>
            <Column field="bvo_id" header="借卖方ID" sortable style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.bvo_id }}
                </template>
            </Column>
            <Column field="avatar_url" header="头像" style="min-width: 12rem">
                <template #body="{ data }">
                <Avatar class="border-1 border-primary" :image="data.avatar_url" :icon="data.avatar_url?'':'pi pi-user'" shape="circle" />
                </template>
            </Column>
            <Column field="name" header="名称" sortable style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
            </Column>
            <Column field="balance" header="余额" sortable style="min-width: 10rem">
                <template #body="{ data }">
                    {{ formatCurrency(data.balance) }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import adminAPI from '@/api/admin';

const mvos = ref();
const bvos = ref();

const filters1 = ref();
const filters2 = ref();
const loading1 = ref(true);
const loading2 = ref(true);

onMounted(() => {
    adminAPI.findAllMVO().then(data => {
        mvos.value = data;
        loading1 = false;
    })
    adminAPI.findAllMVO().then(data => {
        bvos.value = data;
        loading = false;
    })
});


const initFilters = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
    filters2.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

initFilters();

const formatCurrency = (value) => {
    return value.toLocaleString('zh', { style: 'currency', currency: 'CNY' });
};

</script>