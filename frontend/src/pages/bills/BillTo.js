import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import Select from "react-select"
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  UncontrolledAlert,
} from "reactstrap"
import Switch from "react-switch"
import Expense from "./expense"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import axios from "../../axios/axios"
import { doPut } from "../../axios/restutils"
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

const BillTo = props => {
  const breadcrumbItems = [
    { title: "SKRKMK", link: "#" },
    { title: "Add Party", link: "#" },
  ]
  const [switch1, setswitch1] = useState(true)
  const [selectedGroup, setselectedGroup] = useState(null)
  const [formExpense, setFormExpense] = useState({
    tulai: "",
    dharmada: "",
    loading_charges: "",
    wages: "",
    mandi_shulk: "",
    sutli: "",
    commision: "",
    vikas_shulk: "",
    bardana: "",
    others: "",
  })
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    gstin: "",
    bill_type: "MandiIn",
    state: "",
    state_code: "",
  })
  useEffect(() => {
    props.setBreadcrumbItems("Add Party", breadcrumbItems)
  })
  const handleSubmit = () => {
    const data = {
      expense: formExpense,
      bill_to: formData,
    }
    doPut("api/bill-to/0", data)
      .then(response => {
        setSucess(true)
        setFormData({
          name: "",
          address: "",
          gstin: "",
          bill_type: "MandiIn",
          state: "",
          state_code: "",
        })
        setswitch1(true)
        setFormExpense({
          tulai: "",
          dharmada: "",
          loading_charges: "",
          wages: "",
          mandi_shulk: "",
          sutli: "",
          commision: "",
          vikas_shulk: "",
          bardana: "",
          others: "",
        })
        setselectedGroup(null)
      })
      .catch(error => {
        setError(true)
        setErrorMessage(error)
      })
  }
  const { name, address, gstin } = formData
  function handleSelectGroup(selectedGroup) {
    setFormData({
      ...formData,
      state: selectedGroup.label,
      state_code: selectedGroup.value,
    })
    setselectedGroup(selectedGroup)
  }
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>Add Party</title>
      </MetaTags>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="h4">Add Party</CardTitle>
              <p className="card-title-desc">
                Please Enter the details of the person you have to bill to
              </p>
              {error && (
                <UncontrolledAlert color="danger" role="alert">
                  {errorMessage}
                </UncontrolledAlert>
              )}
              {sucess && (
                <UncontrolledAlert color="success">
                  Party Added Successfully!!!
                </UncontrolledAlert>
              )}
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
                    onChange={e => handleChange(e)}
                    id="example-number-input"
                  />
                </div>
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Address :
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    value={address}
                    onChange={e => handleChange(e)}
                    id="example-number-input"
                  />
                </div>
              </Row>
              <Row className="mb-4">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  State :
                </label>
                <Select
                  className="col-md-3 col-form-control"
                  value={selectedGroup}
                  onChange={e => {
                    handleSelectGroup(e)
                  }}
                  options={StateGroup}
                  classNamePrefix="select2-selection"
                />
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
                    name="gstin"
                    value={gstin}
                    onChange={e => handleChange(e)}
                    id="example-number-input"
                  />
                </div>
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
                    onChange={() => {
                      setswitch1(!switch1)
                      setFormData({
                        ...formData,
                        bill_type: !switch1 ? "MandiIn" : "MandiOut",
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
                  editable={true}
                />
              )}
              <Row>
                <div className="col-10 text-end">
                  <button
                    className="btn btn-primary w-md waves-effect waves-light"
                    type="submit"
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    Add Party
                  </button>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(BillTo)
