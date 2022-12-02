import React from 'react'
import { VictoryChart, VictoryTheme, VictoryScatter } from "victory-native";

const Chart = ({
    coordinateFPX, coordinateFPY, coordinateOPX, coordinateOPY, targetX, targetY
}) => {

    const test = () => {
        const a = (+coordinateFPX - 1000) * 0.001
        const b = (+targetX + 5000) * 0.001
        return { a, b }
    }
    console.log(test());
    const test1 = () => {
        const a = (+coordinateFPY - 1000) * 0.001
        const b = (+targetY + 1000) * 0.001
        return { a, b }
    }


    return (
        <VictoryChart
            theme={VictoryTheme.material}
        // domain={{ x: [test1().a, test1().b], y: [test().a, test().b] }}
        >
            <VictoryScatter
                style={{ data: { fill: "#c43a31" } }}
                size={7}
                data={[
                    { x: 30.750, y: 71.800, symbol: "triangleUp" },
                    { x: 29.255, y: 59.655 },
                    { x: 31.736, y: 72.560, symbol: 'star' },
                ]}
            />
        </VictoryChart>
    )
}

export default Chart