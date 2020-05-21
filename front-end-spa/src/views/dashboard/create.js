import React from 'react';

function CreateContract() {
    return (
        <div className="create-new">
            <div className='form-group-custom form-group-custom--file mb-4' id='upload-contract'>
                <label>
                    <input hidden type='file' accept="" />
                    <div>
                        <strong>Upload hợp đồng của bạn</strong>
                        <p className="file-name"></p>
                        <p>Hỗ trợ định dạng: PDF, DOC, DOCX - Dung lượng tối đa: 4 MB</p>
                    </div>
                </label>
            </div>

            <div className="add-receiver mb-3">
                <div className="form-group">
                    <label for="name">Tên</label>
                    <input type="text" className="form-control" id="name" />
                </div>

                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="text" className="form-control" id="email" />
                </div>
            </div>

            <div className="form-group">
                <label for="name-contract">Tiêu đề</label>
                <input type="text" className="form-control" id="name-contract" />
            </div>

            <div className="form-group">
                <label for="content-contract">Nội dung</label>
                <textarea className="form-control" id="content-contract" rows="4"></textarea>
            </div>

            <div className="text-center">
                <a href="./review-contract.html" className="btn btn-yellow">
                    Tiếp tục <i className="icontract-arrow-right"></i>
                </a>
            </div>
        </div>
    );
}

export default CreateContract;