import './index.css'

const BarChart = ({data}) => (
  <div className="bar-chart">
    <h2>Price Range Distribution</h2>
    <div className="bar-chart-container">
      {data.map(item => (
        <div key={item.id} className="bar">
          <div className="label">{item.range}</div>
          <div className="bar-graph">
            <div className="fill" style={{height: `${item.count * 10}px`}} />
          </div>
          <div className="count">{item.count}</div>
        </div>
      ))}
    </div>
  </div>
)
export default BarChart
