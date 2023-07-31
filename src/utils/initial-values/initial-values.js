// login form

import { constants } from "../../constants";

export const loginFormInitialValues = {
    email: '',
    password: '',
}

// register form

export const registerFormInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
}

// CONTACT FORM
export const contactFormInitialValues = {
    name: "",
    subject: "",
    body: "",
    email: "",
};

// BOOKING FORM
export const bookingFormInitialValues = {
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    dropOffDate: "",
    pickUpTime: "",
    dropOffTime: "",
    cardNo: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
    terms: false,
};

/////////////// USER INITIAL VALUES ///////////////

// PASSWORD FORM
export const userPasswordFormInitialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
};

/////////////// ADMIN INITIAL VALUES ///////////////

// NEW VEHICLE FORM
export const adminNewVehicleFormInitialValues = {
    model: "",
    doors: "",
    seats: "",
    luggage: "",
    transmission: constants.transmissionTypes[0].value,
    airConditioning: constants.airConditioningTypes[0].value,
    fuelType: constants.fuelTypes[0].value,
    age: "",
    pricePerHour: "",
    image: "",
};