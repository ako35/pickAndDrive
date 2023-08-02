import { Container, Row } from "react-bootstrap";
import {
  CustomPagination,
  PageHeader,
  Spacer,
  UserReservationsTable,
} from "../../../../components";
import { useEffect, useState } from "react";
import { utils } from "../../../../utils";
import { services } from "../../../../services";

const UserReservationsPage = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [paging, setPaging] = useState({});

  const loadData = async (page) => {
    try {
      const data = await services.reservation.getReservationsByPage(page);
      const {
        content,
        totalPages,
        pageable: { pageNumber },
      } = data;
      setReservations(content);
      setPaging({
        pageNumber,
        totalPages,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);
  return (
    <>
      <PageHeader title="User Reservations" />
      <Spacer />
      <Container>
        <UserReservationsTable loading={loading} reservations={reservations} />
        {paging.totalPages > 1 && (
          <Row className="mt-5">
            <CustomPagination paging={paging} loadData={loadData} />
          </Row>
        )}
      </Container>
      <Spacer />
    </>
  );
};

export default UserReservationsPage;
