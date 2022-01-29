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
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
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
const BillTo = props => {
  const breadcrumbItems = [
    { title: "SKRKMK", link: "/" },
    { title: "Add Company", link: "/bill-by" },
  ]
  const handleSubmit = () => {
    doPut("api/bill-by/0", formData)
      .then(response => {
        setSucess(true)
        setFormData({
          name: "",
          address: "",
          gstin: "",
          mobile1: "",
          mobile2: "",
          state: null,
          state_code: null,
          bank_name: "",
          bank_account_no: "",
          bank_ifsc: "",
          bank_branch: "",
        })
        setselectedGroup(null)
      })
      .catch(error => {
        setError(true)
        setErrorMessage(error)
      })
  }
  const [selectedGroup, setselectedGroup] = useState({
    label: "Uttar Pradesh",
    value: 9,
  })
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    gstin: "",
    mobile1: "",
    mobile2: "",
    state: "Uttar Pradesh",
    state_code: 9,
    bank_name: "",
    bank_account_no: "",
    bank_ifsc: "",
    bank_branch: "",
  })
  const {
    name,
    address,
    gstin,
    mobile1,
    mobile2,
    state,
    bank_name,
    bank_account_no,
    bank_ifsc,
    bank_branch,
  } = formData
  useEffect(() => {
    props.setBreadcrumbItems("Add Company", breadcrumbItems)
  })
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
        <title>Add Company</title>
      </MetaTags>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="h4">Add Company</CardTitle>
              <p className="card-title-desc">
                Please Enter your company details
              </p>
              {error && (
                <UncontrolledAlert color="danger" role="alert">
                  {errorMessage}
                </UncontrolledAlert>
              )}
              {sucess && (
                <UncontrolledAlert color="success">
                  Company Added Successfully!!!
                </UncontrolledAlert>
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
                    name="name"
                    value={name}
                    onChange={e => handleChange(e)}
                    type="text"
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
                    name="gstin"
                    value={gstin}
                    onChange={e => handleChange(e)}
                    type="text"
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
                    name="mobile1"
                    value={mobile1}
                    onChange={e => handleChange(e)}
                    type="text"
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
                    value={mobile2}
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
                <label
                  htmlFor="example-search-input"
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
                    name="bank_name"
                    value={bank_name}
                    onChange={e => handleChange(e)}
                    type="text"
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
                    value={bank_account_no}
                    onChange={e => handleChange(e)}
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
                    value={bank_ifsc}
                    onChange={e => handleChange(e)}
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
                    value={bank_branch}
                    onChange={e => handleChange(e)}
                    id="example-number-input"
                  />
                </div>
              </Row>
              <Row>
                <div className="col-10 text-end">
                  <button
                    className="btn btn-primary w-md waves-effect waves-light"
                    type="submit"
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    Add Company
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
