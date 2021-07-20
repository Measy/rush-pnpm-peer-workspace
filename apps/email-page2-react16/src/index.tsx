import "webpack5base/webpackRuntimeConfig";
import "./index.module.less";
import React from "react";
import ReactDOM from "react-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";
import App from "./app";

export function provider({ dom, basename }: any) {
  return {
    render() {
      const ElementId = window.$slaveId || "page-app";
      ReactDOM.render(
        <App />,
        dom
          ? dom.querySelector(`#${ElementId}`)
          : document.querySelector(`#${ElementId}`)
      );
    },
    destroy({ dom }: any) {
      if (dom) {
        ReactDOM.unmountComponentAtNode(dom);
      }
    },
  };
}

if (!window.__GARFISH__) {
  ReactDOM.render(<App />, document.getElementById("page-app"));
}
