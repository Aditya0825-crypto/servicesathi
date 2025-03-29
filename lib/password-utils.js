// Password strength checker
export function checkPasswordStrength(password) {
  // If no password, return empty result
  if (!password) {
    return {
      score: 0,
      feedback: "Enter a password",
      color: "gray",
      label: "",
    }
  }

  // Initialize score
  let score = 0
  const feedback = []

  // Check length
  if (password.length < 8) {
    feedback.push("Password should be at least 8 characters")
  } else {
    score += 1
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    feedback.push("Add uppercase letters")
  } else {
    score += 1
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    feedback.push("Add lowercase letters")
  } else {
    score += 1
  }

  // Check for numbers
  if (!/[0-9]/.test(password)) {
    feedback.push("Add numbers")
  } else {
    score += 1
  }

  // Check for special characters
  if (!/[^A-Za-z0-9]/.test(password)) {
    feedback.push("Add special characters")
  } else {
    score += 1
  }

  // Determine strength label and color
  let label = ""
  let color = ""

  if (score === 0) {
    label = ""
    color = "gray"
  } else if (score <= 2) {
    label = "Weak"
    color = "red"
  } else if (score <= 4) {
    label = "Medium"
    color = "orange"
  } else {
    label = "Strong"
    color = "green"
  }

  return {
    score,
    feedback: feedback.length > 0 ? feedback.join(", ") : "Strong password",
    color,
    label,
  }
}

