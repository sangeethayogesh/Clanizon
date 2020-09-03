  import React, { useState, useEffect } from 'react'

  import HeaderBar from '../../components/HeaderBar'
  import { Row, Button, Col, DatePicker, Select } from 'antd'
  import { FinancialFlatListTable } from '../../components/FinancialFlatListTable'
  import { useStoreActions, useStoreState } from 'easy-peasy'
  import { useHistory } from 'react-router-dom'
  import { Bar, Polar, Radar } from 'react-chartjs-2'
  import moment from 'moment'

  const dateFormat = 'YYYY/MM/DD'
  const { Option } = Select
  const FinancialList = (props) => {
    const history = useHistory()
    const [selectedId, setSelectedId] = useState(0)
    const [loading, setLoading] = useState(false)
    const getMetrics = useStoreActions((actions) => actions.metrics.getMetrics)
    const currentUser = useStoreState((state) => state.auth.user)
    
    const getAmountMetrics = useStoreActions((actions) => actions.metricData.getAmountMetrics)
    const getBusinessMetrics = useStoreActions((actions) => actions.metricData.getBusinessMetrics)

    const userproductList = useStoreState((state) => state.metrics.userproductList)

    const businessmetrics = useStoreState((state) => state.metricData.businessmetrics)

    const amountmetrics = useStoreState((state) => state.metricData.amountmetrics)
    function handleDateChangeFrom (x,y){
      
    }
    function handleDateChangeTo (x,y){
      console.log(moment(x))
      console.log(new Date(y))
    }
    function handleChange (id) {
      setSelectedId(id)
    }

    
    useEffect(() => {
      getAmountMetrics("?adminMobile="+currentUser.userMobile)
      //getBusinessMetrics()
      
    }, [])
    

    const datastoreFinancial = {
      datasets: [
        {
          type:'bar',
          backgroundColor: '#7e31ed',
          // borderColor: 'rgba(0,0,0,1)',
          label: amountmetrics?amountmetrics.label:[],
          data: amountmetrics?amountmetrics.Amount:[],
          barThickness: 20,
          borderWidth: 2
        }
      ]
    }

   

    

    return (
      <HeaderBar>

        {/* <Row>
          <Col > */}
            <Row justify='space-between' >
              <Col>
              <h5
                    style={{
                      fontFamily: 'Lato',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#150e4f',
                      paddingBottom: "3px"
                    }}
                  >
                    Product Contribution
                </h5>   
                </Col>
                {/* <Col paddingRight= '10px'>
                    From :    <DatePicker defaultValue={moment('2020/08/01', dateFormat)} 
                    inputReadOnly={true}
                    onChange={handleDateChangeFrom}
                  
                    format={dateFormat} style={{ width: 200, height: 32, paddingLeft: '10px', 
                    
                    paddingRight: '10px' }}/>
                    To :    <DatePicker 
                    defaultValue={moment(new Date().toJSON().slice(0,10).replace(/-/g,'/'), dateFormat)} 
                    format={dateFormat}
                    
                    onChange={handleDateChangeTo}
                    disabledDate={d => !d || d.isAfter(moment())} 
                    inputReadOnly={true}
                    style={{ width: 200, height: 32, paddingLeft: '10px', paddingRight: '10px'  }
                    }/>
                </Col> 
                <Col span=".25">
                </Col>       */}
            </Row>
            
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
                  data={amountmetrics}
                  options={{
                    title: {
                      display: false,
                      text: 'Product Contribution',
                      fontSize: 15,
                      position: "top"
                    },
                    legend: {
                      fontSize: 10,
                      display: true,
                      position: 'top'
                    }
                  }}
                />
              </div>

              <Col span=".25">
                  </Col>   

            {/* </Col> */}
            {/* <Col span="12">
              <Row justify='space-between' >
                <Col>
                <h5
                      style={{
                        fontFamily: 'Lato',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#150e4f',
                        paddingBottom: "10px"
                      }}
                    >
                      Financial Trend
                  </h5>   
                  </Col>
                  <Col paddingRight= '10px'>
                      From :    <DatePicker defaultValue={moment('2020/08/01', dateFormat)} format={dateFormat} style={{ width: 200, height: 32, paddingLeft: '10px', paddingRight: '10px' }}/>
                      To :    <DatePicker defaultValue={moment(new Date().toJSON().slice(0,10).replace(/-/g,'/'), dateFormat)} format={dateFormat} style={{ width: 200, height: 32, paddingLeft: '10px', paddingRight: '10px'  }}/>
                  </Col> 
                  <Col span=".25">
                  </Col>      
              </Row>
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
            </Col> */}
        {/* </Row> */}

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

      </HeaderBar>
    )
  }

  export { FinancialList }
