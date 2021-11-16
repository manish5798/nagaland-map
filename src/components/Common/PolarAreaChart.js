import React, { Fragment } from "react";
import { Polar } from "react-chartjs-2";

class PolarAreaChart extends React.Component {
  render() {
    return (
      <Fragment>
        {this.props.data ? (
          <Fragment>
            <Polar
              data={this.props.data}
              height={this.props.height || 50}
              options={{
                maintainAspectRatio: true,
                responsive: true,
              }}
            />
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
      </Fragment>
    );
  }
}

export default PolarAreaChart;
