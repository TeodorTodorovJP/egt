import { Users } from "./features/users/Users"
import { Flex, Layout } from "antd"
import Sider from "antd/es/layout/Sider"
import { Content, Footer, Header } from "antd/es/layout/layout"

const App = () => {
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
  }

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#0958d9",
  }

  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#4096ff",
  }

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
    minHeight: "100vh",
    margin: "5px 8px 5px 8px",
  }
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <Layout>
          <Header style={headerStyle}>Current Users</Header>
          <Content style={{}}>
            <Users />
          </Content>
          <Footer style={footerStyle}>EGT Digital</Footer>
        </Layout>
      </Layout>
    </Flex>
  )
}

export default App
