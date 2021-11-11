/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Stage, Layer } from "react-konva";
import Rectangle from "./Rectangle";
import TripWire from "./TripWire";

function HomePage() {
	const [rectangles, setRectangles] = useState([
		{
			x: 150,
			y: 150,
			width: 100,
			height: 2,
			fill: "black",
			rotation: 0,
			id: 1,
		},
	]);
	const [shapes, setShapes] = useState([]);
	const [selectedId, selectShape] = useState(null);
	const stageEl = React.createRef();
	const layerEl = React.createRef();

	const getRandomInt = (max) => {
		return Math.floor(Math.random() * Math.floor(max));
	};
	const addRectangle = () => {
		const rect = {
			x: getRandomInt(100),
			y: getRandomInt(100),
			width: 100,
			height: 2,
			fill: "black",
			rotation: 0,
			id: `rect${rectangles.length + 1}`,
		};
		const rects = rectangles.concat([rect]);
		setRectangles(rects);
		const shs = shapes.concat([`rect${rectangles.length + 1}`]);
		setShapes(shs);
	};

	return (
		<div className="home-page">
			<h1>Whiteboard</h1>
			<ButtonGroup>
				<Button variant="secondary" onClick={addRectangle}>
					Create a new Line +
				</Button>
			</ButtonGroup>
			<Stage
				width={window.innerWidth * 0.9}
				height={window.innerHeight - 150}
				ref={stageEl}
				onMouseDown={(e) => {
					const clickedOnEmpty = e.target === e.target.getStage();
					if (clickedOnEmpty) {
						selectShape(null);
					}
				}}
			>
				<Layer ref={layerEl}>
					{rectangles.map((rect, i) => {
						return (
							<TripWire
								key={i}
								shapeProps={rect}
								isSelected={rect.id === selectedId}
								x={rect.x}
								y={rect.y}
								width={rect.width}
								height={rect.height}
								color={rect.fill}
								Direction={0}
								directionArrow={true}
								onSelect={() => {
									selectShape(rect.id);
								}}
								onChange={(newAttrs) => {
									const rects = rectangles.slice();
									rects[i] = newAttrs;
									setRectangles(rects);
								}}
							/>
						);
					})}
				</Layer>
			</Stage>
		</div>
	);
}
export default HomePage;
