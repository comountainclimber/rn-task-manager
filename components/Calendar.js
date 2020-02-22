import React from "react";
import { StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import { CalendarList as RNCalendar } from "react-native-calendars";

export default function Calendar({
  selectedDate,
  handleDayPress,
  calendarBackgroundColor,
  additionalCalendarStyles,
  calendarLabel
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
        calendarWidth={350}
        style={[styles.calendar, additionalCalendarStyles]}
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
          textDayHeaderFontSize: 16
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
  calendarLabel: PropTypes.string
};

const styles = StyleSheet.create({
  calendar: {
    display: "flex",
    width: 350,
    overflow: "hidden",
    marginBottom: -10
  },
  calendarLabel: {
    paddingLeft: 24,
    paddingTop: 12,
    paddingBottom: 12,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start"
  }
});
