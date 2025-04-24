/**
 * Check password strength and return a score and feedback
 * @param {string} password - The password to check
 * @returns {Object} - An object with score, label, and feedback
 */
export function checkPasswordStrength(password) {
  if (!password) {
    return { score: 0, label: "", feedback: "" }
  }

  // Initialize score
  let score = 0
  let feedback = []

  // Length check
  if (password.length < 6) {
    feedback.push("Password is too short")
  } else if (password.length >= 8) {
    score += 1
  }

  // Check for lowercase letters
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push("Add lowercase letters")
  }

  // Check for uppercase letters
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push("Add uppercase letters")
  }

  // Check for numbers
  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push("Add numbers")
  }

  // Check for special characters
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push("Add special characters")
  }

  // Check for repeated characters
  if (/(.)\1{2,}/.test(password)) {
    score -= 1
    feedback.push("Avoid repeated characters")
  }

  // Check for sequential characters
  if (
    /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(
      password,
    )
  ) {
    score -= 1
    feedback.push("Avoid sequential characters")
  }

  // Check for common passwords
  const commonPasswords = ["password", "123456", "qwerty", "admin", "welcome", "login", "abc123"]
  if (commonPasswords.includes(password.toLowerCase())) {
    score = 0
    feedback = ["This is a commonly used password"]
  }

  // Determine label based on score
  let label = ""
  if (score <= 1) {
    label = "Weak"
  } else if (score <= 3) {
    label = "Medium"
  } else {
    label = "Strong"
  }

  // Limit score to 0-6 range
  score = Math.max(0, Math.min(6, score))

  return {
    score,
    label,
    feedback: feedback.length > 0 ? feedback.join(", ") : "Strong password",
  }
}

