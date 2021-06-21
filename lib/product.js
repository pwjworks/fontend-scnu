import getProductsId from '../pages/api/product/get-products-id'

export function getAllProductsId() {
    const res = await getProductsId();
    const ids = res.data.ids;
    return ids.map(productId => {
        return {
            params: {
                id: productId
            }
        }
    })
}

export function getProductDetails(id) {

}