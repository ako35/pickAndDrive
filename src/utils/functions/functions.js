import Swal from "sweetalert2"


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
    return Swal.fire({
        title,
        icon,
        timer,
        showConfirmButton: true
    })
}