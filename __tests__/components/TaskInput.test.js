import React from "react";
import renderer from "react-test-renderer";

import TaskInput from "../../components/TaskInput";

const mock = () => undefined;

it("it renders without crashing", () => {
  const tree = renderer.create(<TaskInput handleAddTask={mock} />).toJSON();
  expect(tree).toMatchSnapshot();
});
