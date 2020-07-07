import React from 'react';
import CustomCard from '../Card/CustomCard.js';

class FlippingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStartStateFor(props);
  }

  startWithNewProps(props) {
    this.setState(this.getStartStateFor(props));
  }

  startForRightCard(card, cardProps) {
    const rect = card.getBoundingClientRect();
    this.startWithNewProps({backImg: card.src, startSize: [rect.width, rect.height], startXY: [rect.x+rect.width/2, rect.y+rect.height/2], isPlayerCard: false, cardProps: cardProps});
    this.goToCenter(() => {});
  }

  getStartStateFor(props) {
    return {
      progress: 0, // will range from 0 to 1
      goingToCenter: true, // false means going back to the edge
      isPlayerCard: props.isPlayerCard,
      backImg: props.backImg,
      startXY: props.startXY,
      startSize: props.startSize,
      cardProps: props.cardProps || [],
    };
  }

  getShowBackOrFront() { // returns false for back, true for front
    return this.state.progress < .5;
  }

  getWidthScale() { // scale from 0 to 1
    return Math.abs(this.state.progress - .5)*2;
  }

  step() {
    let stepSpeed = .05; // TODO maybe don't hardcode it
    this.setState({
      progress: this.state.goingToCenter ? Math.min(1, this.state.progress + stepSpeed) : Math.max(0, this.state.progress - stepSpeed),
    });
  }

  stepRecursively(goingToCenterVal, doneEvent) {
    //if (this.state.goingToCenter != goingToCenterVal) return;
    this.step();
    if (this.state.progress === (goingToCenterVal ? 1 : 0)) {
      doneEvent();
      return;
    }
    let timeoutVal = 10; // TODO maybe don't hardcode it
    setTimeout(() => this.stepRecursively(goingToCenterVal, doneEvent), timeoutVal);
  }

  changeGoingToCenter(v, doneEvent) {
    this.setState({
      goingToCenter: v,
    });
    this.stepRecursively(v, doneEvent);
  }

  goToCenter(doneEvent) {
    this.changeGoingToCenter(true, doneEvent);
  }

  goFromCenter(doneEvent) {
    this.changeGoingToCenter(false, doneEvent);
  }

  getEndSize() {
    const vw = window.screen.width * .01;
    return [13*vw, 13*vw*1.56];

  }

  lerp(startPoint, endPoint, progress) { // linear interpolate
    return [(endPoint[0]-startPoint[0])*progress + startPoint[0], (endPoint[1]-startPoint[1])*progress + startPoint[1]];
  }

  getFullSize() {
    if (this.state.progress < 0.5)
      return this.lerp(this.state.startSize, this.getEndSize(), this.state.progress * 2);
    else if (this.state.isPlayerCard)
      // return [855,530];
      return [];
    else
      return this.getEndSize();
  }

  getSize() {
    const fullSize = this.getFullSize();
    return [fullSize[0]*this.getWidthScale(), fullSize[1]];
  }

  getEndXY() {
    return [window.screen.width/2, window.screen.height/3];
  }

  getCurrentXY() {
    const centerPos = this.lerp(this.state.startXY, this.getEndXY(), this.state.progress);
    const size = this.getSize();
    return [centerPos[0]-size[0]/2, centerPos[1]-size[1]/2];
  }

  render() {
    const xy = this.getCurrentXY();
    const fullSize = this.getFullSize();
    return (
      <div style={{position: "absolute", left: xy[0]+"px", top: xy[1]+"px", transform: "scale("+this.getWidthScale()+",1) "}}>
        <img src={this.state.backImg} style={{borderRadius: '10px', width:fullSize[0]+"px", display: this.getShowBackOrFront() ? "" : "none"}} />
        <div style={{top: 0, display: (!this.getShowBackOrFront() && !this.state.isPlayerCard) ? "" : "none"}}><CustomCard cardProps={this.state.cardProps} /></div>
      </div>
    );
  }
}


export default FlippingCard;
