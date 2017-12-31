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
			<div className={containerStyles} ref={this.props.domRef}>
				<div
					className={styles.thumbnail}
					style={{ backgroundImage: `url(${item.thumb})` }}
				/>
				<div
					className={styles.content}
					onClick={this.setActiveItem.bind(this, index)}
				>
					<p className={styles.title}>
						{item.title.substring(0, 38) +
							(item.title.length > 38 ? "..." : "")}
					</p>
					<p className={styles.artist}>by {item.artist}</p>
				</div>
				<button
					className={styles.remove}
					onClick={this.removeItem.bind(this, index)}
				/>
			</div>
		);
	}
}

PlaylistItem.propTypes = {
	item: PropTypes.object.isRequired,
	removeItem: PropTypes.func.isRequired,
	setActiveItem: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	active: PropTypes.bool.isRequired,
	domRef: PropTypes.func
};

export default PlaylistItem;
