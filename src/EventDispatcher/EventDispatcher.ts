import { IEventsList } from './interfaces';

export const EventDispatcher = () => {
  let eventsList: IEventsList = {};

  return () => {
    const listen = (eventName: string, callback: Function) => {
      if (!eventsList[eventName]) {
        eventsList[eventName] = [];
      }

      eventsList[eventName].push(callback);
    };

    const dispatch = (eventName: string, dataObject: any) => {
      if (!eventsList[eventName] || eventsList[eventName].length < 1) {
        return;
      }

      eventsList[eventName].forEach((listener: any) => {
        listener(dataObject || {});
      });
    };

    const destroy = (eventName: string) => {
    	delete eventsList[eventName];
    };

    return {
      dispatch,
      listen,
      destroy
    };
  };
};
