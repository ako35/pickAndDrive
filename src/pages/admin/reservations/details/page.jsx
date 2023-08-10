import { useEffect, useState } from "react";
import { constants } from "../../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { utils } from "../../../../utils";
import { services } from "../../../../services";
import './style.scss';

const { routes } = constants;

const AdminReservaataionDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const vehiclesOptions = vehicles.map((vehicle) => ({
    id: vehicle?.id,
    value: vehicle?.id,
    name: vehicle?.model,
  }));

  const formItems = [
    {
      name: "pickUpLocation",
      label: "Pick Up Location",
    },
    {
      name: "dropOffLocation",
      label: "Drop Off Location",
    },
    {
      name: "pickUpDate",
      label: "Pick Up Date",
      type: "date",
    },
    {
      name: "pickUpTime",
      label: "Pick Up Time",
      type: "time",
    },
    {
      name: "dropOffDate",
      label: "Drop Off Date",
      type: "date",
    },
    {
      name: "dropOffTime",
      label: "Drop Off Time",
      type: "time",
    },
    {
      name: "carId",
      label: "Vehicle",
      type: "select",
      itemsArr: vehiclesOptions,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      itemsArr: constants.reservationStatus,
    },
  ];

  const [initialValues, setInitialValues] = useState({
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
    carId: "",
    status: "",
    userId: "",
  });

  const onSubmit = async (values) => {
    
  }

  const formik = useFormik({
    initialValues,
    validationSchema: utils.validations.adminReservationDetailsFormValidationSchema,
    onSubmit,
    enableReinitialize: true,
  })

  const removeReservation = async () => {
    setDeleting(true);
    try {
      await services.reservation.deleteReservation(reservationId)
      utils.functions.swalToast("Reservation deleted successfully.", "success");
      navigate(`${routes.adminReservations}`);
    } catch (error) {
      utils.functions.swalToast(
        "There was an error deleting the reservation.",
        "error"
      );
    } finally{
      setDeleting(false)
    }
  }

  const handleDelete = async () => {
    utils.functions
      .swalQuestion(
        "Are you sure you want to delete this reservation?",
        "You won't be able to revert this action!"
      )
      .then((result) => {
        if (result.isConfirmed) {
          removeReservation();
        }
      });
  }

  const loadData = async () => {
    try {
      const reservationData = await services.reservation.getReservationByIdAdmin(reservationId);
      const vehiclesData = await services.vehicle.getVehicles();
      const dto = {
        ...reservationData,
        pickUpDate: utils.functions.getDate(reservationData.pickUpDate),
        pickUpTime: utils.functions.getTime(reservationData.pickUpTime),
        dropOffDate: utils.functions.getDate(reservationData.dropOffDate),
        dropOffTime: utils.functions.getTime(reservationData.dropOffTime),
      };
      setVehicles(vehiclesData);
      setInitialValues(dto);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>AdminReservaataionDetailsPage</div>;
};

export default AdminReservaataionDetailsPage;
