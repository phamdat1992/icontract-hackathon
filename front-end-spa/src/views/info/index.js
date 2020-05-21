import React from 'react';
import { LOCATIONS } from '../../constants';

function Info() {
    return (
        <main class='form-info'>
            <form>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="form-frame col-sm">
                            <h4>Thông tin doanh nghiệp</h4>

                            <div class="form-group business-name">
                                <label class="required" for="business-name">Tên doanh nghiệp</label>
                                <input type="text" class="form-control" id="business-name" />
                                <div class="invalid-feedback">Vui lòng nhập tên doanh nghiệp</div>
                            </div>

                            <div class="form-group business-code">
                                <label class="required" for="business-code">Mã số doanh nghiệp</label>
                                <input type="number" class="form-control" id="business-code" />
                                <div class="invalid-feedback"></div>
                            </div>

                            <div class="form-group tax-code">
                                <label class="required" for="tax-code">Mã số thuế</label>
                                <input type="number" class="form-control" id="tax-code" />
                                <div class="invalid-feedback"></div>
                            </div>

                            <div class="form-group address">
                                <label class="required" for="address">Địa chỉ</label>
                                <input type="text" class="form-control" id="address" />
                                <div class="invalid-feedback">Vui lòng nhập địa chỉ</div>
                            </div>

                            <div class="form-group phone-number">
                                <label class="required" for="phone-number">Số điện thoại doanh nghiệp</label>
                                <input type="number" class="form-control" id="phone-number" />
                                <div class="invalid-feedback"></div>
                            </div>
                        </div>

                        <div class="form-frame col-sm">
                            <h4>Thông tin người đại diện</h4>

                            <div class="form-group full-name">
                                <label class="required" for="full-name">Họ tên</label>
                                <input type="text" class="form-control" id="full-name" />
                                <div class="invalid-feedback">Vui lòng nhập họ tên</div>
                            </div>

                            <div class="form-group cmnd">
                                <label class="required" for="cmnd">CMND</label>
                                <input type="number" class="form-control" id="cmnd" />
                                <div class="invalid-feedback"></div>
                            </div>

                            <div class="form-group birth-day">
                                <label class="required" for="birth-day">Ngày sinh</label>
                                <input type="date" class="form-control" id="birth-day" />
                                <div class="invalid-feedback">Vui lòng chọn ngày sinh</div>
                            </div>

                            <div class="form-group day-release">
                                <label class="required" for="day-release">Ngày cấp</label>
                                <input type="date" class="form-control" id="day-release" />
                                <div class="invalid-feedback">Vui lòng chọn ngày cấp</div>
                            </div>

                            <div class="form-group place-release">
                                <label class="required" for="place-release">Nơi cấp</label>
                                <select class="form-control" id="place-release">
                                    {Object.keys(LOCATIONS).map(key => <option value={key}>{LOCATIONS[key]}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="buttons text-center">
                        <a href="./registered.html" class="btn btn-yellow btn-register" role="button"
                            aria-disabled="true">
                            Đăng ký
                    <i class="icontract-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default Info;