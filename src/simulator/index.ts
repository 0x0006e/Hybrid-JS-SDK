// simulate Native injcet js
import handleBaseAction from "./handleBaseAction";
import handleAnswerAction from "./handleAnswerAction";
import handleCallBack from "./handleCallBack";

function simulator() {
  global.webkit = global.webkit ?? {};
  global.webkit.messageHandlers = global.webkit.messageHandlers ?? {};
  global.webkit.messageHandlers.nativeApp =
    global.webkit.messageHandlers.nativeApp ?? {};

  global.webkit.messageHandlers.nativeApp.postMessage = function<T>({
    id,
    payload: { module, action, params }
  }: {
    readonly id: string;
    payload: {
      module: string;
      action: string;
      params?: T;
    };
  }) {
    switch (module) {
      case "base": {
        handleBaseAction(id, action);
        break;
      }

      case "answer": {
        handleAnswerAction(id, action);
        break;
      }
    }
  };

  handleCallBack();
}

export default simulator;
