import { Component } from 'react';
import style from './WorkOrder.style.module.css';

type OrderSectionProps = {
  label: string;
  text: string | string[];
};

// The assignment called for having a class component in the code.
// I'm aware that while React class components do have some advantages with their lifecycle methods, I couldn't think of such a use case for this assignment, which means I dedicated this component as a class component just as an example.
export class OrderSection extends Component<OrderSectionProps> {
  public render() {
    const textsToDisplay = Array.isArray(this.props.text) ? this.props.text : [this.props.text];

    return (
      <div className={style.orderSection}>
        <div className={style.orderLabel}>{this.props.label}</div>
        <div className={style.orderTextContainer}>
          {textsToDisplay.map((text, i) => (
            <div className={style.orderText} key={i}>
              {text}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
