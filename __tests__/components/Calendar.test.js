import React from "react";
import renderer from "react-test-renderer";

import Calendar from "../../components/Calendar";

const mock = () => undefined;

it("it renders without crashing", () => {
  const tree = renderer
    .create(
      <Calendar
        handleDayPress={mock}
        selectedDate="10-10-2020"
        dimensions={{ height: 1200, width: 375 }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
