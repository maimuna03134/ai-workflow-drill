# 🤖 CLAUDE.md

This document describes how AI tools (like ChatGPT / Claude) were used in this project.

---

## 🧠 AI Usage Overview

AI was used to assist with:

- Understanding React form validation
- Writing clean and structured test cases
- Debugging test errors (Jest → Vitest migration)
- Git workflow guidance (branching, PR)
- Improving code quality and structure

---

## ⚙️ Key Contributions from AI

### 1. Testing Setup
- Helped configure **Vitest**
- Replaced Jest-specific code (`jest.spyOn`) with `vi.spyOn`

### 2. Debugging
- Identified:
  - "jest is not defined" issue
  - ES module parsing errors
- Provided exact fixes

### 3. Code Improvements
- Cleaner validation logic
- Better accessibility (aria attributes)
- Structured component testing

---

## 🧪 Test Strategy (AI Assisted)

- Unit tests for validators
- Integration tests for form behavior
- Accessibility checks
- User interaction simulation

---

## 📏 Project Rules Learned

1. Always verify the test framework before using AI-generated code  
   (Jest vs Vitest mismatch caused test failures)

2. Always include a testing step in prompts  
   (e.g., "write code → then write tests → then verify")

3. Prefer structured prompts with clear constraints and examples  
   (produces more accurate and predictable results)

4. Never blindly trust AI output — always review and test manually

## 🚀 Benefits of Using AI

- Faster debugging ⚡
- Better understanding of testing tools
- Improved developer productivity
- Reduced trial-and-error

---

## ⚠️ AI Mistake Observed

AI initially generated code using `jest.spyOn`, which was incompatible with the project's use of Vitest.  
This caused test failures and required manual correction using `vi.spyOn`.
## ⚠️ Notes

- All AI suggestions were reviewed before implementation
- Code was manually tested and verified

---

## ✅ Conclusion

AI acted as a **development assistant**, helping speed up workflow while maintaining code quality.