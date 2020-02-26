import React from "react";
import renderer from "react-test-renderer";
import { Text } from "react-native";

import Card from "../../components/Card";

it("it renders without crashing", () => {
  const tree = renderer
    .create(
      <Card>
        <Text>Hello snapshot card test</Text>
      </Card>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
