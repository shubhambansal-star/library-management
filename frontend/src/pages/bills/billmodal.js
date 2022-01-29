import React, { useEffect, useState } from "react"
import Select from "react-select"
import { Col, Row, Alert } from "reactstrap"
const StateGroup = [
  {
    options: [
      { label: "Andhra Pradesh", value: 37 },
      { label: "Arunachal Pradesh", value: 12 },
      { label: "Assam", value: 18 },
      { label: "Bihar", value: 10 },
      { label: "Chattisgarh", value: 22 },
      { label: "Delhi", value: 7 },
      { label: "Goa", value: 30 },
      { label: "Gujarat", value: 24 },
      { label: "Haryana", value: 6 },
      { label: "Himachal Pradesh", value: 2 },
      { label: "Jammu and Kashmir", value: 1 },
      { label: "Jharkhand", value: 20 },
      { label: "Karnataka", value: 29 },
      { label: "Kerala", value: 32 },
      { label: "Lakshadweep Islands", value: 31 },
      { label: "Madhya Pradesh", value: 23 },
      { label: "Maharashtra", value: 27 },
      { label: "Manipur", value: 14 },
      { label: "Meghalaya", value: 17 },
      { label: "Mizoram", value: 15 },
      { label: "Nagaland", value: 13 },
      { label: "Odisha", value: 21 },
      { label: "Pondicherry", value: 34 },
      { label: "Punjab", value: 3 },
      { label: "Rajasthan", value: 8 },
      { label: "Sikkim", value: 11 },
      { label: "Tamil Nadu", value: 33 },
      { label: "Telangana", value: 36 },
      { label: "Tripura", value: 16 },
      { label: "Uttar Pradesh", value: 9 },
      { label: "Uttarakhand", value: 5 },
      { label: "West Bengal", value: 19 },
    ],
  },
]

const BillModal = ({
  content,
  editable,
  success,
  error,
  errorMessage,
  successMessage,
  setError,
  formData,
  setSuccess,
  setFormData,
}) => {
  const [selectedGroup, setselectedGroup] = useState({
    label: content.state,
    value: content.state_code,
  })
  function handleSelectGroup(selectedGroup) {
    setFormData({
      ...formData,
      state: selectedGroup.label,
      state_code: selectedGroup.value,
    })
    setselectedGroup(selectedGroup)
  }
  const onDismiss = () => {
    setError(false)
  }
  const onDismisssuccess = () => {
    setSuccess(false)
  }
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <Row>
      <Col>
        {error && (
          <Alert color="danger" isOpen={error} toggle={onDismiss}>
            {errorMessage}
          </Alert>
        )}
        {success && (
          <Alert color="success" isOpen={success} toggle={onDismisssuccess}>
            {successMessage}
          </Alert>
        )}
        <Row className="mb-3">
          <label
            htmlFor="example-email-input"
            className="col-md-2 col-form-label"
          >
            Company Name :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={e => {
                handleChange(e)
              }}
              value={formData.name}
              readOnly={!editable}
              id="example-number-input"
            />
          </div>
          <label
            htmlFor="example-email-input"
            className="col-md-2 col-form-label"
          >
            GSTIN :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="gstin"
              onChange={e => {
                handleChange(e)
              }}
              value={formData.gstin}
              readOnly={!editable}
              id="example-number-input"
            />
          </div>
        </Row>
        <Row className="mb-3">
          <label
            htmlFor="example-email-input"
            className="col-md-2 col-form-label"
          >
            Mobile No. :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="mobile1"
              onChange={e => {
                handleChange(e)
              }}
              value={formData.mobile1}
              readOnly={!editable}
              id="example-number-input"
            />
          </div>
          <label
            htmlFor="example-email-input"
            className="col-md-2 col-form-label"
          >
            Alternative Mobile No. :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="mobile2"
              onChange={e => {
                handleChange(e)
              }}
              value={formData.mobile2}
              readOnly={!editable}
              id="example-number-input"
            />
          </div>
        </Row>
        <Row className="mb-3">
          <label
            htmlFor="example-text-input"
            className="col-md-2 col-form-label"
          >
            Address :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="address"
              onChange={e => {
                handleChange(e)
              }}
              value={formData.address}
              readOnly={!editable}
              id="example-number-input"
            />
          </div>
          <label
            htmlFor="example-search-input"
            className="col-md-2 col-form-label"
          >
            State :
          </label>
          <Select
            className="col-md-3 col-form-control"
            value={selectedGroup}
            isDisabled={!editable}
            onChange={e => {
              handleSelectGroup(e)
            }}
            options={StateGroup}
            classNamePrefix="select2-selection"
          />
        </Row>
        <Row className="mb-3">
          <label
            htmlFor="example-email-input"
            className="col-md-2 col-form-label"
          >
            Bank Name :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="bank_name"
              onChange={e => {
                handleChange(e)
              }}
              value={formData.bank_name}
              readOnly={!editable}
              id="example-number-input"
            />
          </div>
          <label
            htmlFor="example-email-input"
            className="col-md-2 col-form-label"
          >
            Bank Account Number :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="bank_account_no"
              onChange={e => {
                handleChange(e)
              }}
              value={formData.bank_account_no}
              readOnly={!editable}
              id="example-number-input"
            />
          </div>
        </Row>
        <Row className="mb-3">
          <label
            htmlFor="example-email-input"
            className="col-md-2 col-form-label"
          >
            Bank IFSC Code :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="bank_ifsc"
              onChange={e => {
                handleChange(e)
              }}
              value={formData.bank_ifsc}
              readOnly={!editable}
              id="example-number-input"
            />
          </div>
          <label
            htmlFor="example-email-input"
            className="col-md-2 col-form-label"
          >
            Bank Branch :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="bank_branch"
              onChange={e => {
                handleChange(e)
              }}
              value={formData.bank_branch}
              readOnly={!editable}
              id="example-number-input"
            />
          </div>
        </Row>
      </Col>
    </Row>
  )
}

export default BillModal
