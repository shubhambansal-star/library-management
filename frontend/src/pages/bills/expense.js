import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Col, Row } from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
const Expense = ({ formExpense, setFormExpense, editable }) => {
  const {
    tulai,
    dharmada,
    loading_charges,
    wages,
    mandi_shulk,
    sutli,
    commision,
    vikas_shulk,
    bardana,
    others,
  } = formExpense
  const handleChange = e => {
    setFormExpense({ ...formExpense, [e.target.name]: e.target.value })
  }
  return (
    <React.Fragment>
      <MetaTags>
        <title>Bill Details</title>
      </MetaTags>
      <Row>
        <Col>
          <Row className="mb-3">
            <label
              htmlFor="example-email-input"
              className="col-md-2 col-form-label"
            >
              Tulai :
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                name="tulai"
                value={tulai}
                onChange={e => handleChange(e)}
                readOnly={!editable}
                id="example-number-input"
              />
            </div>
            <label
              htmlFor="example-email-input"
              className="col-md-2 col-form-label"
            >
              Dharmada :
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                name="dharmada"
                value={dharmada}
                onChange={e => handleChange(e)}
                readOnly={!editable}
                id="example-number-input"
              />
            </div>
          </Row>
          <Row className="mb-4">
            <label
              htmlFor="example-text-input"
              className="col-md-2 col-form-label"
            >
              Wages :
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                name="wages"
                value={wages}
                onChange={e => handleChange(e)}
                readOnly={!editable}
                id="example-number-input"
              />
            </div>
            <label
              htmlFor="example-search-input"
              className="col-md-2 col-form-label"
            >
              Sutli :
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                name="sutli"
                value={sutli}
                readOnly={!editable}
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
              Mandi Shulk :
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                name="mandi_shulk"
                readOnly={!editable}
                value={mandi_shulk}
                onChange={e => handleChange(e)}
                id="example-number-input"
              />
            </div>
            <label
              htmlFor="example-search-input"
              className="col-md-2 col-form-label"
            >
              Vikas Shulk :
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                readOnly={!editable}
                name="vikas_shulk"
                value={vikas_shulk}
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
              Commision :
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                name="commision"
                readOnly={!editable}
                value={commision}
                onChange={e => handleChange(e)}
                id="example-number-input"
              />
            </div>
            <label
              htmlFor="example-search-input"
              className="col-md-2 col-form-label"
            >
              Loading Charges :
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                name="loading_charges"
                readOnly={!editable}
                value={loading_charges}
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
              Bardana :
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                name="bardana"
                readOnly={!editable}
                value={bardana}
                onChange={e => handleChange(e)}
                id="example-number-input"
              />
            </div>
            <label
              htmlFor="example-search-input"
              className="col-md-2 col-form-label"
            >
              Other :
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="number"
                readOnly={!editable}
                name="others"
                value={others}
                onChange={e => handleChange(e)}
                id="example-number-input"
              />
            </div>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Expense)
