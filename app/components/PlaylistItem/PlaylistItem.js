import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import styles from "./PlaylistItem.css";
import classNamesBind from "classnames/bind";

const classNames = classNamesBind.bind(styles);

@observer
class PlaylistItem extends Component {
	/**
	 * Event Handlers
	 */

	removeItem = index => {
		this.props.removeItem(index);
	};

	setActiveItem = index => {
		this.props.setActiveItem(index);
	};

	/**
	 * Renders
	 */

	render() {
		const { item, index, active } = this.props;

		const containerStyles = classNames({
			container: true,
			active: active
		});

		return (
			<div className={containerStyles}>
				<div
					className={styles.content}
					onClick={this.setActiveItem.bind(this, index)}
				>
					<div
						className={styles.thumbnail}
						style={{ backgroundImage: `url(${item.thumb})` }}
					/>
					<p className={styles.title}>{item.title}</p>
				</div>
				<button onClick={this.removeItem.bind(this, index)}>Remove</button>
			</div>
		);
	}
}

PlaylistItem.propTypes = {
	item: PropTypes.object.isRequired,
	removeItem: PropTypes.func.isRequired,
	setActiveItem: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	active: PropTypes.bool.isRequired
};

export default PlaylistItem;
