import { Button, Modal } from "react-bootstrap";
import React from 'react';

function ConfirmationDialog({ show, title, content, primaryText, secondaryText, handlePrimary, handleSecondary }) {
    return (
        <Modal show={show}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{content}</p>
                </Modal.Body>

                <Modal.Footer>
                    {secondaryText && handleSecondary &&
                        <Button variant="secondary" onClick={handleSecondary}>{secondaryText}</Button>}
                        
                    <Button variant="primary" onClick={handlePrimary}>{primaryText}</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}

export default ConfirmationDialog;