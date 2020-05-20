function ReviewContract() {
    const $modalBackdrop = document.querySelector('.modal-otp-backdrop');
    const $modalOtp = document.querySelector('.modal-otp');
    const $btnSignContract = document.querySelector('.btn-sign');
    const $btnCancelSign = document.querySelector('.btn-cancel-sign');

    function toggleModal(isOpen = true) {
        if (isOpen) {
            $modalBackdrop.classList.add('show', 'fade');
            $modalOtp.classList.add('show', 'fade');
            document.body.classList.add('modal-open');
        } else {
            $modalBackdrop.classList.remove('show', 'fade');
            $modalOtp.classList.remove('show', 'fade');
            document.body.classList.remove('modal-open');
        }
    }

    $btnSignContract.addEventListener('click', toggleModal);
    $btnCancelSign.addEventListener('click', () => toggleModal(false));

    const $btnConfirmSign = document.querySelector('.btn-confirm-sign');
    $btnConfirmSign.addEventListener('click', () => {
        const $otpInput = document.querySelector('.form-group #otp');
        const value = $otpInput.value.trim();
        if (!value) {
            $otpInput.classList.add('is-invalid');
            return;
        }

        let url = './dashboard-signed.html';
        if (document.body.classList.contains('is-b-part')) {
            url = './b-dashboard-signed.html'
        }

        window.location.href = url;
    });
}

export default ReviewContract;