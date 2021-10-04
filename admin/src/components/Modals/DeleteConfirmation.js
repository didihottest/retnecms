import React from 'react'
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, message }) => {
    return (
        <Modal show={showModal} onHide={hideModal} centered>
            <Modal.Header closeButton>
                <Modal.Title><i className="la la-warning text-accent"></i> Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="default" className="btn btn-secondary btn-rounded" onClick={hideModal}>
                    Cancel
                </Button>
                <Button variant="danger" className="btn btn-danger btn-rounded" onClick={() => confirmModal(id)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmation;