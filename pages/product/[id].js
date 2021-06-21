import { Layout } from "antd";
import { getAllProductsId } from "../../lib/product";

export default function Post({ postData }) {
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
  const postData = getProductData(params.id)
  return {
    props: {
      postData
    }
  }
}