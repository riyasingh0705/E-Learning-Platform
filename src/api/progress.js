async function request(url, options = {}) {
  const response = await fetch(`/api/progress${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export function getProgress() {
  return request("");
}

export function getStats() {
  return request("/stats");
}

export function enrollCourse(courseId) {
  return request("/enroll", {
    method: "POST",
    body: JSON.stringify({ courseId }),
  });
}

export function startCourse(courseId) {
  return request("/start", {
    method: "PUT",
    body: JSON.stringify({ courseId }),
  });
}

export function completeCourse(courseId) {
  return request("/complete", {
    method: "PUT",
    body: JSON.stringify({ courseId }),
  });
}