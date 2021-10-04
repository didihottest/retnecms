import React from 'react'
import { Modal } from "react-bootstrap";

const DropImage = ({ showModal, hideModal }) => {
    return (
        <Modal show={showModal} onHide={hideModal} centered>
            <div class="card" data-widget="dropzone">
                <h5 class="card-header">Single File Upload</h5>
                <div class="card-body min-h-400">
                    <form class="dropzone" id="singleFileUpload">
                        <div class="dz-message needsclick singleFileUpload">
                            <h6 class="card-title text-center p-t-50">Drop files here or click to upload.</h6>
                            <i class="icon dripicons-cloud-upload gradient-1"></i>
                            <div class="d-block text-center">
                                <button type="button" class="btn btn-primary btn-rounded btn-floating btn-lg">Upload</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default DropImage;