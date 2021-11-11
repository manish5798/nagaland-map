import React, { Fragment } from "react";
import { Rect, Transformer, Arrow } from "react-konva";
import PropTypes from "prop-types";

const TripWire = ({
	shapeProps,
	isSelected,
	x,
	y,
	width,
	height,
	color,
	Direction,
	directionArrow,
	onSelect,
	onChange,
	onEdit,
}) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();
	React.useEffect(() => {
		if (isSelected) {
			trRef.current.setNode(shapeRef.current);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);
	return (
		<React.Fragment>
			<Rect
				onClick={onSelect}
				ref={shapeRef}
				{...shapeProps}
				draggable
				onDragEnd={(e) => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
						rotation: e.target.rotation(),
					});
				}}
				onTransformEnd={(e) => {
					const node = shapeRef.current;
					// console.log("node", node);
					const scaleX = node.scaleX();
					// const scaleY = node.scaleY();
					node.scaleX(1);
					node.scaleY(1);
					// console.log("shapeProps", shapeProps);
					onChange({
						...shapeProps,
						rotation: node.rotation(),
						x: node.x(),
						y: node.y(),
						width: node.width() * scaleX,
						height: node.height(),
					});
				}}
			/>
			{isSelected && (
				<Transformer resizeEnabled={onEdit} rotateEnabled={true} ref={trRef} />
			)}
		</React.Fragment>
	);
};
TripWire.propTypes = {
	X: PropTypes.number,
	y: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
	rotation: PropTypes.number,
	isSelected: PropTypes.bool,
	direction: PropTypes.bool,
};

export default TripWire;
