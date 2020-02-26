import React from "react";
import renderer from "react-test-renderer";

import CurrentDayButton from "../../components/CurrentDayButton";

const mock = () => undefined;

it("it renders without crashing", () => {
  const tree = renderer
    .create(
      <CurrentDayButton
        buttonPressed
        handlePress={mock}
        selectedDate="10-10-2020"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
