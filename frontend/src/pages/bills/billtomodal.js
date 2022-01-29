import React, { useEffect, useState } from "react"
import Select from "react-select"
import { Col, Row, Alert } from "reactstrap"
import axios from "../../axios/axios"
import Switch from "react-switch"
import Expense from "./expense"
const Offsymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      No
    </div>
  )
}

const OnSymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      Yes
    </div>
  )
}
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
  formExpense,
  setFormExpense,
  setFormData,
  formData,
  editable,
  success,
  error,
  errorMessage,
  successMessage,
  setError,
  setSuccess,
}) => {
  const [switch1, setswitch1] = useState(
    content.bill_type == "MandiIn" ? true : false
  )

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
  const { name, address, gstin } = formData
  return (
    <Row>
      <Col>
        <Row className="mb-3">
          <label
            htmlFor="example-email-input"
            className="col-md-2 col-form-label"
          >
            Name :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              readOnly={!editable}
              onChange={e => handleChange(e)}
              id="example-number-input"
            />
          </div>
          <label
            htmlFor="example-search-input"
            className="col-md-2 col-form-label"
          >
            GSTIN :
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              readOnly={!editable}
              name="gstin"
              value={gstin}
              onChange={e => handleChange(e)}
              id="example-number-input"
            />
          </div>
        </Row>
        <Row className="mb-4">
          <label
            htmlFor="example-email-input"
            className="col-md-2 col-form-label"
          >
            Address :
          </label>
          <div className="col-md-3">
            <input
              readOnly={!editable}
              className="form-control"
              type="text"
              name="address"
              value={address}
              onChange={e => handleChange(e)}
              id="example-number-input"
            />
          </div>
          <label
            htmlFor="example-text-input"
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
        <Row className="mb-4">
          <div>
            <label
              htmlFor="example-text-input"
              className="col-md-2 col-form-label"
            >
              Mandi In
            </label>
            <Switch
              uncheckedIcon={<Offsymbol />}
              checkedIcon={<OnSymbol />}
              onColor="#626ed4"
              disabled={!editable}
              onChange={() => {
                setswitch1(!switch1)
                setFormData({
                  ...formData,
                  bill_type: switch1 ? "MandiOut" : "MandiIn",
                })
              }}
              checked={switch1}
            />
          </div>
        </Row>
        {switch1 && (
          <Expense
            formExpense={formExpense}
            setFormExpense={setFormExpense}
            editable={editable}
          />
        )}
      </Col>
    </Row>
  )
}

export default BillModal
