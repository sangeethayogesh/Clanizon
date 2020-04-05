import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { DownCircleOutlined } from '@ant-design/icons';
import { Row, Button } from 'antd';
const LoadMore = props => {
// const [state, setState] = useState(InitialState);
    return (
        <Row justify="center" style={{marginTop:'1rem'}}>
            <Button shape="circle" icon={<DownCircleOutlined/>} onClick={props.onLoadMore()} loading={props.loading}/>
            
        </Row>
        
    );
};

LoadMore.propTypes = {
    onLoadMore:PropTypes.func.isRequired,
    loading:PropTypes.bool,
};

export { LoadMore };