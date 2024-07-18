import React from 'react'
import PropTypes from 'prop-types'
import './common-section.css'
import { Container, Row, Col } from 'reactstrap'

const CommonSection = ({ title }) => {
    return (
        <section className="common__section">
            <Container>
                <Row>
                    <Col lg='12'>
                        <h1>{title}</h1>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

CommonSection.propTypes = {
    title: PropTypes.string.isRequired
}

export default CommonSection
