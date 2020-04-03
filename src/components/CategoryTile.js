import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import "../styles/category-tile.css";

const CategoryTile = props => {
    return (
        <div>
            <Card style={{backgroundImage:"linear-gradient(100deg, "+props.gradient[0]+" -85%, "+props.gradient[1]+" 115%)"}}  className="category-tile">
                <Row>
                    <Col span="12"><span className="title">{props.title}</span></Col>
                    <Col span="12" style={{ textAlign: "right" }}><span className="desc">{props.count} records</span></Col>
                </Row>
            </Card>
        </div>);
};

CategoryTile.propTypes = {
    title:PropTypes.string.isRequired,
    count:PropTypes.string.isRequired,
    gradient:PropTypes.array
};

export { CategoryTile };

