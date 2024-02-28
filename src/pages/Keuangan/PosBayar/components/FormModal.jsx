import { Form, Formik } from 'formik'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import FormComponent from '../../../../component/Form/FormComponent'
import FormInput from './FormInput'

export default function ModalForm({
    isOpen,
    dataAccountCost,
    dataPiutang,
    toggle,
    initialValues,
    onSubmitHandler,
    schema,
    btnName,
    headerName,
    isLoadingSendData,
}) {
    return (
        <>
            <Formik
                enableReinitialize
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={initialValues}
                onSubmit={onSubmitHandler}
                validationSchema={schema}
            >
                {({
                    handleChange,
                    handleSubmit,

                    setFieldValue,
                    handleReset,
                    values,
                    errors,
                }) => (
                    <Modal
                        isOpen={isOpen}
                        toggle={() => {
                            toggle()
                            handleReset()
                        }}
                        onClosed={() => handleReset()}
                    >
                        <ModalHeader toggle={toggle}>{headerName}</ModalHeader>
                        <ModalBody>
                            <FormInput
                                btnName={btnName}
                                errors={errors}
                                dataAccountCost={dataAccountCost}
                                dataPiutang={dataPiutang}
                                values={values}
                                isLoadingSendData={isLoadingSendData}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        </ModalBody>
                    </Modal>
                )}
            </Formik>
        </>
    )
}
