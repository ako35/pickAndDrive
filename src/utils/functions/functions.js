import Swal from "sweetalert2"

// form check functions
export const validCheck = (field, obj) => {
    const myObject = {
        isValid: obj.touched[field] && !obj.errors[field],
        isInvalid: obj.touched[field] && obj.errors[field],
    }

    return myObject
}

// sweet alert functions
export const swalQuestion = (title, text) => {
    return Swal.fire({
        title,
        text,
        icon: 'question',
        showCancelButton: true
    })
}

export const swalToast = (title, icon='info', timer=5000) => {
    Swal.fire({
        title,
        icon,
        timer,
        showConfirmButton: true
    })
}