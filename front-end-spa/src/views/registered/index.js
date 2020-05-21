
import React from 'react';
import QRCode from '../../assest/electric-sign.png';

function Registered() {
    return (
        <main className='form-registerd container'>
            <div className="row mb-2">
                <div className="form-frame col-sm">
                    <h4>Thông tin doanh nghiệp</h4>
                    <div className="registered-info">
                        <div> <span>Tên doanh nghiệp:</span> Công ty TNHH Thanh Dat</div>
                        <div> <span>Mã số doanh nghiệp:</span> 4108036796 </div>
                        <div> <span>Mã số thuế:</span> 101024198123 </div>
                        <div> <span>Địa chỉ:</span> Chấn Hưng, Phường 06, Quận Tân Bình, TP. HCM</div>
                        <div> <span>Số điện thoại doanh nghiệp:</span> 028.322.332</div>
                    </div>
                </div>

                <div className="form-frame col-sm">
                    <h4>Thông tin người đại diện</h4>
                    <div className="registered-info">
                        <div> <span>Họ tên:</span> Nguyễn Văn A</div>
                        <div> <span>CMND:</span> 241563388</div>
                        <div> <span>Ngày sinh:</span> 02/03/1989</div>
                        <div> <span>Ngày sinh:</span> 02/03/1989</div>
                        <div> <span>Nơi cấp:</span> DakLak</div>
                    </div>
                </div>
            </div>

            <div className="row mb-2 mt-4">
                <div className="form-frame col-sm">
                    <div className="electric-sign">
                        <h4>Chữ ký số</h4>
                        <div>
                            <img src={QRCode} alt="Qr Code" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-2 mt-4">
                <div className="col-sm form-frame">
                    <div className="qr-code-google">
                        <h4> Kích hoạt Google Authenticator </h4>

                        <div className="qr-code-gooogle-inner">
                            <p>
                                <strong>Để kích hoạt Google Authenticator vui lòng thực hiện các bước sau:</strong>
                            </p>
                            <ul className="steps">
                                <li>Bước 1: Mở ứng dụng Google Authenticator </li>
                                <li>
                                    Bước 2: Tạo trình xác thực mới bằng 2 cách:
                                        <ul className="child-steps">
                                        <li>Cách 1: Quét mã QR</li>
                                        <li>Cách 2: Nhập tên tài khoản (email) và khoá (secret key).</li>
                                    </ul>
                                </li>
                                <li>Bước 3: Nhập 6 số trên ứng dụng vào ô OTP. Click "Active" </li>
                            </ul>

                            <div className="qr-code-img">
                                <strong>QR Code:</strong>
                                <img src="./assets/images/qrcode.png" alt="" />
                            </div>

                            <div className="form-active">
                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" readonly value="dathtp@gmail.com" className="form-control" id="email" />
                                </div>

                                <div className="form-group">
                                    <label for="secret-key">Secret key</label>
                                    <input type="text" readonly value="7DDF-B236-7023-82A6-F70F-0001" className="form-control"
                                        id="secret-key" />
                                </div>

                                <div className="form-group">
                                    <label className="required" for="otp">OTP</label>
                                    <input type="password" className="form-control" id="otp" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="buttons text-center">
                <a href="./dashboard.html" className="btn btn-yellow">
                    Kích hoạt
            <i className="icontract-arrow-right"></i>
                </a>
            </div>
        </main>
    );
}

export default Registered;