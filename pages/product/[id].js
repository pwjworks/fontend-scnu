import { Layout } from "antd";
import getProductsId from '../api/product/get-products-id'
import getProductDetails from "../api/product/get-product-details";

const getAllProductsId = function () {
  const res = getProductsId().then((res) => {
    resolve(res);
  });
  console.log(res);
  return ids.map(productId => {
    return {
      params: {
        id: productId
      }
    }
  })
}


export default function productDetails({ postData }) {
  return (
    <Layout>
      {postData.id}
      <br />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllProductsId();
  return {
    paths,
    fallback: false
  }
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  const postData = getProductDetails(params.id)
  return {
    props: {
      postData
    }
  }
}