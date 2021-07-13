const MessageListReducer = (state, action) => {
    let draftState = [...state];
    switch (action.type) {
      // these will add message in chat-box
      case "addMessage":
        return [...draftState, action.payload];
      // these wil return in alert  
        default:
        return state;
    }
  };
  
  export default MessageListReducer;