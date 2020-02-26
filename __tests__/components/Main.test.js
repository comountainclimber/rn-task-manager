import React from "react";
import renderer from "react-test-renderer";

import Main from "../../screens/main/Main";

const mock = () => undefined;

it("it renders without crashing", () => {
  const tree = renderer
    .create(
      <Main
        tasks={{}}
        handleToggleCompleteTask={mock}
        handleMoveTask={mock}
        handleAddTask={mock}
        handleRemoveTask={mock}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
