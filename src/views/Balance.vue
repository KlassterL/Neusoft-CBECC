<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/Auth';
import userAPI from '@/api/user';
import { format } from 'date-fns';
import toast from '@/util/toast';

const authStore = useAuthStore();
const balanceRecord = ref([]);
const balance = ref(0);
const loading = ref(true);
const lineData = reactive({});

const lineOptions = ref(null);

onMounted(() => {
    userAPI.checkBalance(authStore.user_id).then(data => {
        balance.value = formatCurrency(data.balance);
    });
    userAPI.findUserBalanceRecord(authStore.user_id).then(data => {
        balanceRecord.value = data;
        loading.value = false;
        initLineData();
    })
});

function initLineData() {
    let data = [];
    for (let i = 0; i < 12; i++) {
        const monthData = balanceRecord.value.filter(e => e.date.getMonth() === i);
        let max = 0;
        monthData.forEach(e => {
            max = max > e.balance ? max : e.balance;
        })
        data.push(max);
    }
    lineData.labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    lineData.datasets = [
        {
            label: '余额',
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

const isWithdraw = ref(false);

function withdraw() {
    if (!isWithdraw.value) {
        toast.success('申请成功', '已申请提现余额');
        isWithdraw.value = true;
    }
    else {
        toast.error('操作失败', '已申请提现余额，请勿重复申请');
    }
}

</script>

<template>
    <div class="grid">
        <div class="col-6">
            <div class="card">
                <h5>账户余额</h5>
                <div class="flex justify-content-center flex-column align-items-center">
                    <h1 class="-ml-5 text-orange-500">{{ balance }}</h1>
                    <div class="flex justify-content-between align-content-between w-10rem">
                        <Button label="提现" :disabled="isWithdraw" @click="withdraw"></Button>
                        <Button label="充值" :disabled="authStore.type === 1"></Button>
                    </div>
                </div>
            </div>
            <div class="card">
                <h5>余额明细</h5>
                <DataTable :value="balanceRecord" :rows="5" :paginator="true" responsiveLayout="scroll" :loading="loading">
                    <Column field="date" header="日期" :sortable="true" style="width: 25%">
                        <template #body="slotProps">
                            {{ format(slotProps.data.date, 'yyyy-MM-dd HH:mm:ss') }}
                        </template>
                    </Column>
                    <Column field="balance" header="余额" style="width: 50%;">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.balance) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="col-6">
            <div class="card">
                <h5>余额变化预览</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div>
        </div>
    </div>
</template>
