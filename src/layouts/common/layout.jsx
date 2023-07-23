import { Outlet } from "react-router-dom"
import { Header, Footer } from "../../components"


const CommonLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default CommonLayout