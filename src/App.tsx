import { Button, Flex, Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import ErrorModal from "./app/components/ErrorModal"
import { CustomButton } from "./app/components/CustomButton"

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()

  let tasksScreen = false

  let headerText = "All 10 Users"
  if (location.pathname.includes("posts")) {
    headerText = "User Posts"
  }
  if (location.pathname.includes("tasks")) {
    headerText = "Tasks"
    tasksScreen = true
  }
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
    position: "relative",
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
          <Header style={headerStyle}>
            {headerText}

            <div style={{ position: "absolute", top: "0px", right: "10px" }}>
              {!tasksScreen && <CustomButton onClick={() => navigate("/tasks")} label="Go to Tasks" />}
              {tasksScreen && <CustomButton onClick={() => navigate(-1)} label="Go back" />}
            </div>
          </Header>

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
