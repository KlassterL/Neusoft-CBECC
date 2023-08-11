<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import toast from '@/util/toast'
import mvoAPI from '@/api/mvo';
import { useAuthStore } from '@/stores/Auth';

const authStore = useAuthStore();

const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const filters = ref({});
const submitted = ref(false);

onBeforeMount(() => {
    initFilters();
});

onMounted(() => {
    products.value = mvoAPI.findAllBrandProduct(authStore.mvo_id);
});

const formatCurrency = (value) => {
    return value.toLocaleString('zh', { style: 'currency', currency: 'CNY' });
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && product.value.price && product.value.stock && product.value.category && product.value.category.trim()) {
        if (product.value.product_id) {
            if(mvoAPI.editProduct(product.value.product_id, product.value)) {
                products.value[findIndexById(product.value.product_id)] = product.value;
                toast.success('保存成功','商品信息已更新');
            }
            else {
                toast.error('保存失败','请稍后重试...');
            }
        } else {
            product.value.mvo_id = authStore.mvo_id;
            let product_id = mvoAPI.addProduct(product.value);
            if(product_id.length > 0) {
                product.value.product_id = product_id;
                products.value.push(product.value);
                toast.success('添加成功','已添加新的商品信息');
            }
            else {
                toast.error('添加失败','请稍后重试...');
            }
        }
        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    if(mvoAPI.deleteProduct(product.value.product_id)) {
        products.value = products.value.filter((val) => val.product_id !== product.value.product_id);
        toast.success('删除成功','已成功删除 '+product.value.name+' 的商品信息');
    }
    else {
        toast.error('删除失败','请稍后重试...');

    }
    deleteProductDialog.value = false;
    product.value = {};
};

const findIndexById = (product_id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].product_id === product_id) {
            index = i;
            break;
        }
    }
    return index;
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    selectedProducts.value.forEach(e => {
        product.value = e;
        deleteProduct();
    })
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
};

const initFilters = () => {
    filters.value = {
        name: {value: null, matchMode: FilterMatchMode.CONTAINS}
    };
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <DataTable
                    :value="products"
                    v-model:selection="selectedProducts"
                    dataKey="product_id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate=""
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h3 class="m-0">商品管理</h3>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['name'].value" placeholder="搜索商品..." />
                            </span>
                            <div class="my-2">
                                <Button label="添加商品" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                                <Button label="批量删除" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                            </div>
                        </div>
                    </template>
                    <template #empty> <div class="text-center text-xl">暂无旗下商品信息</div> </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    
                    <Column field="name" header="名称" :sortable="true" headerStyle="width:20%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column header="图片" headerStyle="width:20%; min-width:10rem;">
                        <template #body="slotProps">
                            <img :src="slotProps.data.image_url" :alt="slotProps.data.name" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="price" header="价格" :sortable="true" headerStyle="width:20%; min-width:8rem;">
                        <template #body="slotProps">
                            <span>{{ formatCurrency(slotProps.data.price) }}</span>
                        </template>
                    </Column>
                    <Column field="category" header="类别" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.category }}
                        </template>
                    </Column>
                    <Column header="操作" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" severity="primary" label="修改" class="mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" severity="danger" label="删除" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="商品详情" :modal="true" class="p-fluid">
                    <img :src="product.image_url" v-if="product.image_url" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="field">
                        <label for="name">商品名称</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-error" v-if="submitted && !product.name">必须填写商品名称</small>
                    </div>
                    <div class="field">
                        <label for="image">图片URL路径</label>
                        <InputText id="image" v-model.trim="product.image_url" required="true" />
                    </div>
                    <div class="field">
                        <label for="description">商品描述</label>
                        <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
                    </div>

                    <div class="field">
                        <label class="mb-3">商品类别</label>
                        <InputText id="category" v-model.trim="product.category" required="true" :class="{ 'p-invalid': submitted && !product.category }" />
                        <small class="p-error" v-if="submitted && !product.category">必须填写商品类别</small>
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="price">商品价格</label>
                            <InputNumber id="price" v-model="product.price" mode="currency" currency="CNY" locale="zh" :class="{ 'p-invalid': submitted && !product.price }" required="true" />
                            <small class="p-error" v-if="submitted && !product.price">必须填写商品价格</small>
                        </div>
                        <div class="field col">
                            <label for="stock">库存数量</label>
                            <InputNumber id="stock" v-model="product.stock" integeronly required="true" :class="{ 'p-invalid': submitted && !product.stock }" />
                            <small class="p-error" v-if="submitted && !product.stock">必须填写库存数量</small>

                        </div>
                    </div>
                    <template #footer>
                        <Button label="取消" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="保存" icon="pi pi-check" severity="success" class="p-button-text" @click="saveProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="商品删除" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product"
                            >你确定想要删除 <b>{{ product.name }}</b
                            > 吗？</span
                        >
                    </div>
                    <template #footer>
                        <Button label="取消" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                        <Button label="删除" icon="pi pi-check" class="p-button-text" severity="danger" @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="批量删除" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">确认删除选中的 {{ selectedProducts.length }} 件商品？</span>
                    </div>
                    <template #footer>
                        <Button label="取消" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false" />
                        <Button label="删除" icon="pi pi-check" class="p-button-text" severity="danger" @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
