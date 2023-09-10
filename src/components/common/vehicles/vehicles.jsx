import { useEffect, useState } from "react";
import { services } from "../../../services";
import { Col, Container, Row } from "react-bootstrap";
import SectionHeader from "../section-header/section-header";
import Loading from "../loading/loading";
import VehicleCard from "./vehicle-card/vehicle-card";
import CustomPagination from "../custom-pagination/custom-pagination";

const Vehicles = () => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [paging, setPaging] = useState({})

  const loadData = async (page) => {
    try {
      const vehiclesData = await services.vehicle.getVehiclesByPage(page);
      const { content, totalPages, pageable: { pageNumber}, } = vehiclesData;

      setVehicles(content);
      setPaging({
        pageNumber,
        totalPages
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData(0)
  }, []);

  return (
    <Container className="vehicles">
      <SectionHeader title1="Vehicle" title2="Models" desc="Explore our diverse range of high-quality vehicles. Whether you're seeking a fuel-efficient compact for city trips, a robust SUV for outdoor adventures, or a luxury sedan for utmost comfort, our comprehensive fleet is sure to cater to your specific needs." />
      {
        loading ? <Loading height={500} /> : 
        <>
          <Row className="gy-4">
            {
              vehicles && vehicles.length > 0 && vehicles.map((item, index) => (
                <Col sm={6} lg={4} key={index}>
                  <VehicleCard {...item} />
                </Col>
              ))
            }
          </Row> 
          {
            paging?.totalPages > 1 && (
              <Row className="mt-5">
                <CustomPagination loadData={loadData} paging={paging} />
              </Row>
            )
          }
        </>
      }
    </Container>
  )
}

export default Vehicles