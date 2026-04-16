"use client";
import React, { useState, useMemo } from "react";

type CalendarEvent = {
  id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
};

function Calendar() {
  // View mode state: "week" or "month"
  const [view, setView] = useState("week");
  const [viewMode, setViewMode] = useState("week");

  // Current reference date (determines the week or month being shown)
  const [currentDate, setCurrentDate] = useState(new Date());
  // Events state: list of event objects (id, title, description, start Date, end Date)
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  // Modal state: whether the event modal is open and which event is being edited (if any)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  // Temporary event data for the form (used for both adding and editing events)
  const [tempEvent, setTempEvent] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  // Calculate the Monday of the current week (for week view)
  const startOfWeek = useMemo(() => {
    const date = currentDate;
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }, [currentDate]);

  // Generate an array of 7 dates [Mon...Sun] for the week header, based on startOfWeek
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  }, [startOfWeek]);

  // Compute the month view grid (array of weeks, each an array of 7 Date objects)
  const monthYearLabel = useMemo(() => {
    // e.g., "July 2025"
    return currentDate.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  }, [currentDate]);

  const monthGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    // First and last day of the current month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    // Start from the Monday of the week that contains the 1st
    const firstWeekday = firstDayOfMonth.getDay(); // 0=Sun ... 6=Sat
    const startOffset = firstWeekday === 0 ? -6 : 1 - firstWeekday;
    const startCal = new Date(firstDayOfMonth);
    startCal.setDate(firstDayOfMonth.getDate() + startOffset);
    startCal.setHours(0, 0, 0, 0);
    // End on the Sunday of the week that contains the last day of month
    const lastWeekday = lastDayOfMonth.getDay();
    const endOffset = lastWeekday === 0 ? 0 : 7 - lastWeekday;
    const endCal = new Date(lastDayOfMonth);
    endCal.setDate(lastDayOfMonth.getDate() + endOffset);
    endCal.setHours(0, 0, 0, 0);
    // Collect all dates from startCal to endCal
    const days = [];
    for (let d = new Date(startCal); d <= endCal; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    // Chunk into weeks of 7 days
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, [currentDate]);

  // Navigation handlers for Previous/Next/Today buttons
  const goToPrevious = () => {
    if (view === "week") {
      // Go to previous week
      const prevWeek = new Date(startOfWeek);
      prevWeek.setDate(prevWeek.getDate() - 7);
      setCurrentDate(prevWeek);
    } else {
      // Go to previous month
      const prevMonth = new Date(currentDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      setCurrentDate(prevMonth);
    }
  };
  const goToNext = () => {
    if (view === "week") {
      const nextWeek = new Date(startOfWeek);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setCurrentDate(nextWeek);
    } else {
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setCurrentDate(nextMonth);
    }
  };
  const goToToday = () => {
    setCurrentDate(new Date());
    // setView("today"); // Reset to month view on today
  };

  // Open the modal to create a new event. Optionally accepts default date & time.
  const openNewEventModal = (
    date: Date,
    startTime = "09:00",
    endTime = "10:00"
  ) => {
    setEditingEvent(null);
    // Pre-fill date and time for the new event
    const dateStr = date.toISOString().slice(0, 10); // format date as "YYYY-MM-DD"
    setTempEvent({
      title: "",
      description: "",
      date: dateStr,
      startTime,
      endTime,
    });
    setIsModalOpen(true);
  };

  // Open the modal to edit an existing event
  const openEditEventModal = (event: CalendarEvent) => {
    if (!event) return;
    setEditingEvent(event);
    setTempEvent({
      title: event.title,
      description: event.description,
      // Fill in date, start, end times from the event's Date objects
      date: event.start.toISOString().slice(0, 10),
      startTime: event.start.toTimeString().slice(0, 5), // "HH:MM"
      endTime: event.end.toTimeString().slice(0, 5),
    });
    setIsModalOpen(true);
  };

  // Save the event (new or edited) when the form is submitted
  const handleSaveEvent = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { title, description, date, startTime, endTime } = tempEvent;
    if (!title) return; // simple validation: title is required
    // Construct Date objects for start and end
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    if (editingEvent) {
      // Update existing event in state
      setEvents((prevEvents) =>
        prevEvents.map((ev) =>
          ev.id === editingEvent.id
            ? { ...ev, title, description, start, end }
            : ev
        )
      );
    } else {
      // Add new event to state
      const newEvent = { id: Date.now(), title, description, start, end };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    setIsModalOpen(false);
  };

  // Delete the currently editing event
  const handleDeleteEvent = () => {
    if (editingEvent) {
      setEvents((prevEvents) =>
        prevEvents.filter((ev) => ev.id !== editingEvent.id)
      );
    }
    setIsModalOpen(false);
  };

  // Helper: get all events on a given date (for month view)
  const eventsOnDate = (date: Date) => {
    return events.filter(
      (ev) => ev.start.toDateString() === date.toDateString()
    );
  };

  // Helper: format a Date to a user-friendly time string (e.g., "9:00 AM")
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Render event blocks for a given day in week view
  const renderEventsForDay = (day: Date) => {
    const dayEvents = events.filter(
      (ev) => ev.start.toDateString() === day.toDateString()
    );
    dayEvents.sort((a, b) => a.start.getTime() - b.start.getTime()); // sort by start time
    return dayEvents.map((ev) => {
      // Calculate position and size for the event block
      const startHour = ev.start.getHours() + ev.start.getMinutes() / 60;
      const endHour = ev.end.getHours() + ev.end.getMinutes() / 60;
      const top = startHour * 40; // 40px per hour slot
      const height = Math.max((endHour - startHour) * 40, 30); // minimum 30px height
      return (
        <button
          key={ev.id}
          onClick={() => openEditEventModal(ev)}
          className="absolute left-1 right-1 bg-blue-500 text-white text-xs p-1 rounded shadow"
          style={{ top: `${top}px`, height: `${height}px` }}
          title={ev.title}
          aria-label={`${formatTime(ev.start)} ${ev.title}`}
        >
          {ev.title}
        </button>
      );
    });
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Calendar</h1>
              <div className="w-16 h-1 bg-sky-400 rounded mt-1"></div>
            </div>
            {/* Header: Calendar title, navigation, and view toggle */}
            <div className="flex items-center justify-between">
              {/* View toggle (Week/Month) */}
              <div
                role="tablist"
                aria-label="View Switch"
                className="flex space-x-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={view === "week"}
                  onClick={() => {
                    setView("week");
                    setViewMode("week");
                  }}
                  className={`px-4 py-2 text-sm font-medium ${
                    viewMode === "week"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 border-b-2 border-transparent"
                  }`}
                >
                  Week
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={view === "month"}
                  onClick={() => {
                    setView("month");
                    setViewMode("month");
                  }}
                  className={`px-4 py-2 text-sm font-medium ${
                    viewMode === "month"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 border-b-2 border-transparent"
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => {
                    goToToday();
                    setViewMode("today");
                  }}
                  className={`px-4 py-2 text-sm font-medium ${
                    viewMode === "today"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 border-b-2 border-transparent"
                  }`}
                >
                  Today
                </button>
              </div>
              {/* Navigation buttons */}
              <div className="space-x-2">
                <button
                  onClick={goToPrevious}
                  className="px-3 py-1 border rounded"
                  aria-label="Previous"
                >
                  &larr;
                </button>
                <button
                  onClick={goToNext}
                  className="px-3 py-1 border rounded"
                  aria-label="Next"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Week View */}
        {view === "week" && (
          <div
            role="tabpanel"
            aria-hidden={view !== "week"}
            className="week-view"
          >
            {/* Week days header row */}
            <div className="grid grid-cols-8 border-b">
              <div className="bg-gray-50" />{" "}
              {/* top-left corner empty (time labels) */}
              {weekDays.map((day) => (
                <div
                  key={day.toISOString()}
                  className="text-center py-1 bg-gray-50 font-medium text-sm"
                >
                  {
                    day.toLocaleDateString(undefined, {
                      weekday: "short",
                      day: "numeric",
                    }) /* e.g., "Mon 5" */
                  }
                </div>
              ))}
            </div>
            {/* Time grid with day columns */}
            <div className="grid grid-cols-8 relative">
              {/* Time label column (left) */}
              <div className="flex flex-col">
                {Array.from({ length: 24 }).map((_, hour) => (
                  <div
                    key={hour}
                    className="h-10 border-t text-xs text-gray-500"
                  >
                    {
                      new Date(1970, 0, 1, hour).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        hour12: true,
                      }) /* "1 AM", "2 AM", ... */
                    }
                  </div>
                ))}
              </div>
              {/* One column per day of the week */}
              {weekDays.map((day) => (
                <div
                  key={day.toISOString()}
                  className="border-l-2 relative border-gray-400"
                  onClick={(e) => {
                    // Create new event on click-empty-slot
                    const rect = e.currentTarget.getBoundingClientRect();
                    const y = e.clientY - rect.top;
                    const hour = Math.floor(y / 40);
                    const startTime = hour.toString().padStart(2, "0") + ":00";
                    const endTime =
                      (hour + 1).toString().padStart(2, "0") + ":00";
                    openNewEventModal(day, startTime, endTime);
                  }}
                >
                  {/* Hour slots to give structure (24 * 40px tall) */}
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <div
                      key={hour}
                      className={`${
                        hour === 0 ? "" : ""
                      } h-10 border-t border-gray-200`}
                    ></div>
                  ))}
                  {/* Event blocks (absolute positioned within day column) */}
                  {renderEventsForDay(day)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Month View */}
        {view === "month" && (
          <div
            role="tabpanel"
            aria-hidden={view !== "month"}
            className="month-view"
          >
            <h3 className="text-lg font-semibold text-center mb-2">
              {monthYearLabel}
            </h3>
            {/* Weekday labels header */}
            <div className="grid grid-cols-7 text-center text-sm font-medium bg-gray-50 border-b">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>
            {/* Weeks of the month */}
            {monthGrid.map((week, wIdx) => (
              <div key={wIdx} className="grid grid-cols-7">
                {week.map((day) => {
                  const isCurrentMonth =
                    day.getMonth() === currentDate.getMonth();
                  return (
                    <div
                      key={day.toISOString()}
                      className={`p-1 h-20 sm:h-24 border-r border-b text-xs ${
                        !isCurrentMonth ? "text-gray-400" : ""
                      }`}
                      onClick={() => openNewEventModal(day)}
                    >
                      <div className="font-semibold">{day.getDate()}</div>
                      {/* List events on this day (if any) */}
                      {eventsOnDate(day).map((ev) => (
                        <div
                          key={ev.id}
                          className="mt-1 text-xxs sm:text-xs bg-blue-100 text-blue-800 rounded px-1 truncate cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditEventModal(ev);
                          }}
                        >
                          {formatTime(ev.start)} {ev.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* Event Modal (Add/Edit Event Form) */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
          >
            <div className="bg-white rounded shadow-lg w-80 sm:w-96 p-6 relative">
              <h3 id="event-modal-title" className="text-lg font-bold mb-4">
                {editingEvent ? "Edit Event" : "Add Event"}
              </h3>
              <form onSubmit={handleSaveEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded shadow-sm text-sm p-2"
                    value={tempEvent.title}
                    onChange={(e) =>
                      setTempEvent({ ...tempEvent, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full border-gray-300 rounded shadow-sm text-sm p-2"
                    value={tempEvent.date}
                    onChange={(e) =>
                      setTempEvent({ ...tempEvent, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="w-full border-gray-300 rounded shadow-sm text-sm p-2"
                      value={tempEvent.startTime}
                      onChange={(e) =>
                        setTempEvent({
                          ...tempEvent,
                          startTime: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="w-full border-gray-300 rounded shadow-sm text-sm p-2"
                      value={tempEvent.endTime}
                      onChange={(e) =>
                        setTempEvent({
                          ...tempEvent,
                          endTime: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full border-gray-300 rounded shadow-sm text-sm p-2"
                    rows={3}
                    value={tempEvent.description}
                    onChange={(e) =>
                      setTempEvent({
                        ...tempEvent,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  {editingEvent && (
                    <button
                      type="button"
                      onClick={handleDeleteEvent}
                      className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                    >
                      Delete
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
              {/* Close modal X button */}
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="sr-only">Close modal</span>&times;
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Calendar;
