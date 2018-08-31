import { Layer } from './Layer';
import { FeatureMap } from "../../elements/FeatureMap";
import { colorUtils } from "../../utils/ColorUtils";

function Input(config) {

	Layer.call(this, config);

	this.shape = config.shape;
	this.width = config.shape[0];
	this.height = config.shape[1];
	this.depth = config.shape[2];
	this.neuralNum = config.shape[0] * config.shape[1];
	this.outputShape = config.shape;

	this.fmCenter = {
		x: 0,
		y: 0,
		z: 0
	};

	this.layerType = "input";
}

Input.prototype = Object.assign(Object.create(Layer.prototype), {

	init: function(center) {

		this.center = center;

		this.neuralGroup = new THREE.Group();
		this.neuralGroup.position.set(this.center.x, this.center.y, this.center.z);

		this.initAggregationElement();

		this.scene.add(this.neuralGroup);

	},

	initAggregationElement: function() {

		let aggregationHandler = new FeatureMap(this.width, this.height, this.fmCenter, this.color);

		this.aggregationHandler = aggregationHandler;
		this.neuralGroup.add(aggregationHandler.getElement());

	},

	assemble: function(layerIndex, modelConfig) {
		console.log("Assemble input layer");

		this.layerIndex = layerIndex;

		if (this.color !== undefined) {
			this.color = modelConfig.color.input;
		}
	},

	updateValue: function(value) {

		this.neuralValue = value;

		let colors = colorUtils.getAdjustValues(value);

		this.aggregationHandler.updateVis(colors);
	},

	clear: function() {
		console.log("clear input data");

		this.aggregationHandler.clear();
	}

});

export { Input };