<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import userAPI from '@/api/user';
import { format } from 'date-fns';

const balanceRecord = ref([]);
const lineData = reactive({});
const lineOptions = ref(null);
const loading = ref(true);

onMounted(() => {
    userAPI.findAllBalanceRecord().then(data => {
        balanceRecord.value = data;
        loading.value = false;
        initLineData();
    })
});

function initLineData() {
    let data = [];
    for (let i = 0; i < 12; i++) {
        const monthData = balanceRecord.value.filter(e => e.date.getMonth() === i);
        let count = 0;
        monthData.forEach(e => {
            count += e.balance;
        })
        data.push(count);
    }
    lineData.labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    lineData.datasets = [
        {
            label: '金额',
            data: data,
            fill: false,
            backgroundColor: '#6366f1',
            borderColor: '#6366f1',
            tension: 0.4
        }
    ]
}

const formatCurrency = (value) => {
    return value.toLocaleString('zh', { style: 'currency', currency: 'CNY' });
};

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>平台金额流量</h5>
                <DataTable :value="balanceRecord" :rows="5" :paginator="true" responsiveLayout="scroll" :loading="loading">
                    <Column field="user_id" header="用户id" :sortable="true" style="width: 25%">
                        <template #body="slotProps">
                            {{ slotProps.data.user_id }}
                        </template>
                    </Column>
                    <Column field="date" header="日期" :sortable="true" style="width: 25%">
                        <template #body="slotProps">
                            {{ format(slotProps.data.date, 'yyyy-MM-dd HH:mm:ss') }}
                        </template>
                    </Column>
                    <Column field="old_balance" header="旧余额" style="width: 25%;">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.old_balance) }}
                        </template>
                    </Column>
                    <Column field="balance" header="新余额" style="width: 25%;">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.balance) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <h5>平台营额曲线图</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div>
        </div>
    </div>
</template>
