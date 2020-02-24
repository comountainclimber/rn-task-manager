import React from "react";
import { StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import { CalendarList as RNCalendar } from "react-native-calendars";

export default function Calendar({
  selectedDate,
  handleDayPress,
  calendarBackgroundColor,
  additionalCalendarStyles,
  calendarLabel,
  dimensions
}) {
  return (
    <>
      {!!calendarLabel && (
        <Text
          style={[
            styles.calendarLabel,
            { backgroundColor: calendarBackgroundColor }
          ]}
        >
          {calendarLabel}
        </Text>
      )}
      <RNCalendar
        horizontal
        pagingEnabled
        calendarWidth={dimensions.width}
        style={[
          styles.calendar,
          additionalCalendarStyles,
          { width: dimensions.width }
        ]}
        current={selectedDate}
        disableMonthChange
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange"
          }
        }}
        theme={{
          backgroundColor: calendarBackgroundColor,
          calendarBackground: calendarBackgroundColor,
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#5B99F8",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#5B99F8",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#5B99F8",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "#000000",
          indicatorColor: "blue",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
          textDayFontFamily: "Nunito-Regular",
          textMonthFontFamily: "Nunito-Bold",
          textDayHeaderFontFamily: "Nunito-Regular"
        }}
      />
    </>
  );
}

Calendar.defaultProps = {
  calendarBackgroundColor: "#F7F8FA",
  additionalCalendarStyles: {},
  calendarLabel: ""
};

Calendar.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  handleDayPress: PropTypes.func.isRequired,
  calendarBackgroundColor: PropTypes.string,
  additionalCalendarStyles: ViewPropTypes.style,
  calendarLabel: PropTypes.string,
  dimensions: PropTypes.exact({
    height: PropTypes.number,
    width: PropTypes.number
  }).isRequired
};

const styles = StyleSheet.create({
  calendar: {
    display: "flex",
    overflow: "hidden",
    marginBottom: -10,
    marginTop: -15
  },
  calendarLabel: {
    fontFamily: "Nunito-Regular",
    paddingLeft: 24,
    paddingTop: 12,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start"
  }
});
