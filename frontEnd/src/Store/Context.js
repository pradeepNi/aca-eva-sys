import React from "react";

const data = {
  id: "26347",
  name: "test data",
};

const Context = React.createContext(data);

const Provider = Context.Provider;

const Consumer = Context.Consumer;

export default Context;

export { Provider, Consumer };
