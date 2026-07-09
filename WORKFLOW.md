# 🧠 Development Workflow

This project follows a structured Git + testing workflow to ensure clean, maintainable code.

---

## 🚀 1. Branching Strategy

- `main` → stable production-ready code
- `ai-structured` → main working branch for this assignment
- `ai-vague` → experimental / earlier iteration

---

## 🔧 2. Development Process

1. Create or switch to a feature branch:
   ```bash
   git checkout ai-structured


   ---

## 🔍 Comparison: ai-vague vs ai-structured

### ❌ ai-vague (Vague Prompt)
- Generated with minimal instructions
- Missing proper validation edge cases
- No automated tests included
- Accessibility features (like aria attributes) were incomplete
- Required significant manual review and debugging

### ✅ ai-structured (Structured Prompt)
- Built with clear instructions and constraints
- Included validation logic for all fields
- Added unit and integration tests using Vitest
- Accessibility improvements (labels, aria-invalid, roles)
- More reliable due to test coverage

---

## 🧪 AI Mistake I Caught

During development, AI generated test code using `jest.spyOn`.  
However, the project was using **Vitest**, causing tests to fail.

I identified and fixed the issue by replacing:
- `jest.spyOn` → `vi.spyOn`

This highlights the importance of verifying AI-generated code.

---

## ⚖️ Review Effort Comparison

- **ai-vague**: High effort (manual checking required)
- **ai-structured**: Low effort (tests ensured correctness)

---

## 🎯 Conclusion

Using structured prompts with a verification loop (write → test → fix) produced significantly more reliable and maintainable code compared to vague prompting.