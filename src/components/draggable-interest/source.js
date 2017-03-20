export default {
  beginDrag(props, monitor) {
    return {
      interestKey: props.interest['.key'],
      stage: props.interest.stage
    };
  }
  //
  // endDrag: function (props, monitor, component) {
  //   if (!monitor.didDrop()) {
  //     return;
  //   }
  //
  //   // When dropped on a compatible target, do something
  //   var item = monitor.getItem();
  //   var dropResult = monitor.getDropResult();
  //   debugger
  //   // CardActions.moveCardToList(item.id, dropResult.listId);
  // }
}
