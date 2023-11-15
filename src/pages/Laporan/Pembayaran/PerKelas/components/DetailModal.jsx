import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import DetailText from "./DetailText";

export default function DetailModal({isOpen,toggle,headerName,data}) {
    console.log(data)
    return (
        <Modal
        size="lg"
        style={{maxWidth: '70vw', width: '100%'}}
        isOpen={isOpen}
        toggle={() => {
          toggle()
      
        }}
      >
        <ModalHeader toggle={toggle}>{headerName}</ModalHeader>
        <ModalBody>
            <DetailText data={data}/>
          
        </ModalBody>
      </Modal>
    )

}
