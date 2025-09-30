import * as React from "react";

/**
 * Demo hook: returns a simulated user object with purchasedCourseIds.
 * Replace with real auth + API integration when available.
 */
export function useCurrentUser() {
  // For demo: user has purchased the math-12-s1 course
  const [user] = React.useState({
    id: "u-demo-1",
    name: "Demo Student",
    purchasedCourseIds: ["math-12-s1"], // adjust to test access
    isLoggedIn: true,
  });

  return user;
}