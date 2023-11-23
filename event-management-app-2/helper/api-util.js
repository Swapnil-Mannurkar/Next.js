export const getAllEvents = async () => {
  const response = await fetch(
    "https://nextjs-course-3d59e-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];
  for (const key in data) {
    events.push(data[key]);
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
};

export const getEventById = async (id) => {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
};
