import { Flex, Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { Outlet, useLocation } from "react-router-dom"
import ErrorModal from "./app/components/ErrorModal"

const App = () => {
  const location = useLocation()

  let headerText = "All 10 Users"
  if (location.pathname.includes("posts")) {
    headerText = "User Posts"
  }

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
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
          <Header style={headerStyle}>{headerText}</Header>
          <Content style={{}}>
            <Outlet />
            <ErrorModal />
          </Content>
          <Footer style={footerStyle}>EGT Digital</Footer>
        </Layout>
      </Layout>
    </Flex>
  )
}

export default App
