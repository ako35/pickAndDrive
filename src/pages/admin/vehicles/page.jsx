import { useState } from "react";
import { constants } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { services } from "../../../services";
import { utils } from "../../../utils";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Loading } from "../../../components";
import './style.scss'

const { routes } = constants;

const AdminVehiclesPage = () => {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const loadData = async (page) => {
    try {
      const vehicleData = await services.vehicle.getVehiclesByPage(
        page,
        perPage
      );
      setVehicles(vehicleData.content);
      setTotalRows(vehicleData.totalElements);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const download = await services.vehicle.downloadVehicleReports();
      const url = window.URL.createObjectURL(download);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "vehicles.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      utils.functions.swalToast(
        "Vehicle data downloaded successfully!",
        "success"
      );
    } catch (error) {
      utils.functions.swalToast(
        "There was an error while downloading vehicle data!",
        "error"
      );
    } finally {
      setDownloading(false);
    }
  };

  const handlePerPageRowsChange = async (newPerPage, page) => {
    try {
      const data = await services.vehicle.getVehiclesByPage(
        page - 1,
        newPerPage
      );
      setVehicles(data.content);
      setPerPage(newPerPage);
    } catch (error) {
      utils.functions.swalToast(
        "There was an error while changing the page!",
        "error"
      );
    }
  };

  const handlePageChange = (page) => {
    loadData(page - 1);
  };

  const handleRowClicked = (row) => {
    navigate(`${routes.adminVehicles}/${row.id}`);
  };

  return (
    <div className="admin-reservations-page">
      <ButtonGroup className="align-self-end">
        <Button as={Link} to={`${routes.adminVehicles}/new`}>
          New Vehicle
        </Button>
        <Button onClick={handleDownload} disabled={downloading}>
          {downloading && <Spinner animation="border" size="sm" />} Download
          Vehicle Reports
        </Button>
      </ButtonGroup>
      <div className="admin-reservations-table-container">
        <DataTable
          title="Reservations"
          columns={utils.tables.adminReservationsColumns}
          data={vehicles}
          progressPending={loading}
          progressComponent={<Loading height={500} />}
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          onChangeRowsPerPage={handlePerPageRowsChange}
          onChangePage={handlePageChange}
          onRowClicked={handleRowClicked}
          pagination
          paginationServer
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default AdminVehiclesPage;
