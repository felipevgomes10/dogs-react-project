import React from 'react'
import styles from './UserStatsGraphs.module.css'
import { VictoryPie, VictoryChart, VictoryBar } from 'victory'
const UserStatsGraphs = ({ data }) => {

  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (data.length !== 0) {
      const graphData = data.map(item => {
        return {
          x: item.title,
          y: Number(item.acessos)
        }
      })
      setTotal(data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b));
      setGraph(graphData);
    }
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total > 0 ? total : 0}</p>
      </div>
      <div className={styles.graphItem}>
        {graph.length !== 0 ? (
        <VictoryPie 
          data={graph}
          innerRadius={50}
          padding={{top: 20, bottom: 20, left: 80, right: 80}}
          style={{
            data: {
              fillOpacity: .9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
        ) : <p style={{padding: '2rem'}}>Não foi possivel calcular os acessos</p>}
      </div>
        {graph.length !== 0 && (
          <div className={styles.graphItem}>
              <VictoryChart>
                <VictoryBar data={graph} alignment='start' />
              </VictoryChart>
          </div>
        )}
    </section>
  )
}

export default UserStatsGraphs
