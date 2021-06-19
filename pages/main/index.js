import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default function main() {
    return (
        <>
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </>
    )
}