import React, { useState, useEffect } from 'react'

import HeaderBar from '../../components/HeaderBar'
import { Row, Button, Col, Select } from 'antd'
import { FinancialFlatListTable } from '../../components/FinancialFlatListTable'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
import { Bar, Polar, Radar } from 'react-chartjs-2'

const { Option } = Select
const FinancialList = (props) => {
  const history = useHistory()
  const [selectedId, setSelectedId] = useState(0)
  const [loading, setLoading] = useState(false)
  const getAssetGroups = useStoreActions(
    (actions) => actions.assets.getAssetGroups
  )
  const assetGroups = useStoreState((state) => state.assets.assetGroups)

  function handleChange (id) {
    setSelectedId(id)
  }
  useEffect(() => {
    // Update the document title using the browser API
    console.log('::LIST Assets Called::')
    setLoading(true)
    getAssetGroups(() => {
      setLoading(false)
    })
  }, [])

  const datastoreFinancial = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug'],
    datasets: [
      {
        type:'bar',
        backgroundColor: '#7e31ed',
        // borderColor: 'rgba(0,0,0,1)',
        label: 'Cost',
        data: [18, 14, 17, 19, 21, 14, 12, 15],
        barThickness: 20,
        borderWidth: 2
      }
    ]
  }

  const datastoreFinancialSplit = {
    datasets: [{
      data: [
        11,
        16,
        7,
        3,
        14,
        18
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB',
        '#4BCC00',
      ],
      label: 'Product Contribution' // for legend
    }],
    labels: [
      'UPS',
      'Connectivity',
      'Racks',
      'Industrial & services',
      'Accescerries',
      'Battery'
    ]
  };

  const datastoreFinancialSplitPolar = {
    labels: [
      'UPS',
      'Connectivity',
      'Racks',
      'Industrial & services',
      'Accescerries',
      'Battery'
    ],
    datasets: [
      {
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: [28, 75, 40, 19, 96, 100]
      }
    ]
  };

  return (
    <HeaderBar>

      <Row justify="space-between" >
        <Col>                    
          <h5
              style={{
                fontFamily: 'Lato',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#150e4f',
                paddingLeft:'5px'
              }}
            >
              Financial Metrics
            </h5>
        </Col>
        <Col span="4">
          {/* <Button block type="primary" onClick={() => history.push('/admin/add-financial-metrics')} >
            Add Financial Metrics
          </Button > */}
          <Button style={{fontSize: '15px', paddingRight:'10px'}} type="link" onClick={() => history.push('/admin/add-financial-metrics')} >
                  + Add Financial Metrics
          </Button >  
        </Col>
      </Row>

      <FinancialFlatListTable id={selectedId} />

      <Row>
        <Col span="12">
            <h5
                style={{
                  fontFamily: 'Lato',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#150e4f',
                  paddingBottom: "10px"
                }}
              >
                Product Contribution
              </h5>
            <div className="admin-page-column-left">
              {/* <Polar 
                data={datastoreFinancialSplit}
                options={{
                  title: {
                    display: false,
                    text: 'Product Contribution',
                    fontSize: 15,
                    position: "top"
                  },
                  legend: {
                    display: true,
                    position: 'bottom'
                  }
                }}
              /> */}
              <Radar               
                data={datastoreFinancialSplitPolar}
                options={{
                  title: {
                    display: false,
                    text: 'Product Contribution',
                    fontSize: 15,
                    position: "top"
                  },
                  legend: {
                    display: false,
                    position: 'bottom'
                  }
                }}
              />
            </div>
          </Col>
          <Col span="12">
            <h5
                style={{
                  fontFamily: 'Lato',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#150e4f',
                  paddingBottom: "10px",
                  paddingLeft: "5px"
                }}
              >
                Financial Trend
              </h5>
            <div className="admin-page-column-right">
              <Bar
                data={datastoreFinancial}
                options={{
                  title: {
                    display: false,
                    text: 'Financial Trend',
                    fontSize: 15,
                    position: "top"
                  },
                  legend: {
                    display: true,
                    position: 'bottom'
                  }
                }}
              />
            </div>
          </Col>
      </Row>
    </HeaderBar>
  )
}

export { FinancialList }
