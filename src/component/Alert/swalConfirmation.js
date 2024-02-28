import Swal from 'sweetalert2'

export const alertConfirmation = async (message, callback) => {
    Swal.fire({
        title: `Yakin Untuk ${message} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
    }).then(async (result) => {
        if (result.isConfirmed) {
            await callback()
        }
    })
}
